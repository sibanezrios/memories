import { useState, useEffect, useCallback } from 'react'
import type { Friend } from '../data/friends'

interface Props {
  friend: Friend
  onClose: () => void
}

type MediaItem =
  | { kind: 'image'; filename: string; globalIndex: number }
  | { kind: 'video'; filename: string; globalIndex: number }

function buildMediaList(friend: Friend): MediaItem[] {
  const images: MediaItem[] = friend.images.map((filename, i) => ({
    kind: 'image',
    filename,
    globalIndex: i,
  }))
  const videos: MediaItem[] = (friend.videos ?? []).map((filename, i) => ({
    kind: 'video',
    filename,
    globalIndex: friend.images.length + i,
  }))
  return [...images, ...videos]
}

// Deterministic film-stock filter per index
function filmFilter(i: number): string {
  const sepia = 0.12 + (i * 7 % 22) / 100
  const brightness = 0.9 + (i * 11 % 15) / 100
  const contrast = 0.96 + (i * 5 % 6) / 100
  return `sepia(${sepia}) brightness(${brightness}) contrast(${contrast})`
}

// Deterministic slight rotation per photo
function photoRotation(i: number): string {
  const sign = i % 3 === 0 ? -1 : i % 3 === 1 ? 1 : 0
  const deg = sign * (0.6 + (i * 3 % 2))
  return `${deg}deg`
}

// ─── Lightbox ────────────────────────────────────────────────
interface LightboxProps {
  media: MediaItem[]
  friendId: string
  startIndex: number
  onClose: () => void
}

const ZOOM_STEP = 0.4
const ZOOM_MIN  = 1
const ZOOM_MAX  = 3

function Lightbox({ media, friendId, startIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(startIndex)
  const [zoom, setZoom] = useState(1)
  const total = media.length

  const prev = useCallback(() => { setCurrent((c) => (c - 1 + total) % total); setZoom(1) }, [total])
  const next = useCallback(() => { setCurrent((c) => (c + 1) % total);          setZoom(1) }, [total])

  const zoomIn  = () => setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX))
  const zoomOut = () => setZoom((z) => Math.max(z - ZOOM_STEP, ZOOM_MIN))

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape')     onClose()
      if (e.key === '+' || e.key === '=') zoomIn()
      if (e.key === '-')                  zoomOut()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [prev, next, onClose])

  const item = media[current]
  const isImage = item.kind === 'image'

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
        {item.kind === 'video' ? (
          <video
            key={item.filename}
            src={`/memories/${friendId}/${item.filename}`}
            controls
            autoPlay
            playsInline
            style={{ maxWidth: '100%', maxHeight: '82vh', display: 'block' }}
          />
        ) : (
          <img
            src={`/memories/${friendId}/${item.filename}`}
            alt={`Foto ${current + 1}`}
            style={{
              filter: filmFilter(item.globalIndex),
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
              transition: 'transform 0.25s ease',
              cursor: zoom > 1 ? 'zoom-out' : 'default',
            }}
          />
        )}
        <button className="lightbox-close" onClick={onClose} aria-label="Cerrar">×</button>
      </div>

      {isImage && (
        <div className="lightbox-zoom-controls" onClick={(e) => e.stopPropagation()}>
          <button
            className="lightbox-zoom-btn"
            onClick={zoomOut}
            disabled={zoom <= ZOOM_MIN}
            aria-label="Zoom out"
          >−</button>
          <span className="lightbox-zoom-level">{Math.round(zoom * 100)}%</span>
          <button
            className="lightbox-zoom-btn"
            onClick={zoomIn}
            disabled={zoom >= ZOOM_MAX}
            aria-label="Zoom in"
          >+</button>
        </div>
      )}

      {total > 1 && (
        <>
          <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Anterior">‹</button>
          <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); next() }} aria-label="Siguiente">›</button>
          <p className="lightbox-counter">{current + 1} de {total}</p>
        </>
      )}
    </div>
  )
}

// ─── Gallery ─────────────────────────────────────────────────
export function MemoryGallery({ friend, onClose }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const media = buildMediaList(friend)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxIndex === null) onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, lightboxIndex])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <>
      <div className="gallery-backdrop">
        <div className="gallery-container">
          <button className="gallery-close" onClick={onClose} aria-label="Cerrar galería">×</button>

          <header className="gallery-header">
            <h2 className="gallery-friend-name">{friend.name}</h2>
            <p className="gallery-quote">{friend.quote}</p>
            <hr className="gallery-divider" />
          </header>

          <div className="photos-grid">
            {media.map((item, i) => (
              <div
                key={item.filename}
                className="photo-frame"
                style={{
                  '--photo-rot': photoRotation(i),
                  animationDelay: `${i * 0.04}s`,
                } as React.CSSProperties}
                onClick={() => setLightboxIndex(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(i)}
                aria-label={item.kind === 'video' ? `Video ${i + 1}` : `Foto ${i + 1}`}
              >
                <div className="photo-paper">
                  {item.kind === 'video' ? (
                    <div className="video-thumb">
                      <video
                        src={`/memories/${friend.id}/${item.filename}`}
                        muted
                        playsInline
                        preload="metadata"
                      />
                      <div className="video-play-icon">▶</div>
                    </div>
                  ) : (
                    <img
                      src={`/memories/${friend.id}/${item.filename}`}
                      alt={`Recuerdo ${i + 1}`}
                      loading="lazy"
                      style={{ filter: filmFilter(item.globalIndex) }}
                    />
                  )}
                  <span className="photo-number">
                    {item.kind === 'video' ? '▶' : i + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {friend.note && (
            <div className="note-card">
              <p className="note-title">una nota</p>
              <p className="note-text">{friend.note}</p>
            </div>
          )}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          media={media}
          friendId={friend.id}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
