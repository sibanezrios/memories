import { useState, useRef, useEffect } from 'react'
import md5 from 'md5'
import type { Friend } from '../data/friends'

interface Props {
  friend: Friend
  onUnlock: (friend: Friend) => void
  onClose: () => void
}

export function PasswordOverlay({ friend, onUnlock, onClose }: Props) {
  const [value, setValue] = useState('')
  const [shaking, setShaking] = useState(false)
  const [wrongMsg, setWrongMsg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = () => {
    const hash = md5(value.toLowerCase().trim())
    if (hash === friend.password) {
      const audio = new Audio('/sounds/open.mp3')
      audio.volume = 0.6
      audio.play().catch(() => {})
      onUnlock(friend)
    } else {
      setShaking(true)
      setWrongMsg('esta historia no es tuya todavía...')
      setTimeout(() => setShaking(false), 550)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
    if (e.key === 'Escape') onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="overlay-backdrop" onClick={handleBackdropClick}>
      <div className="overlay-letter">
        <button className="overlay-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>

        <h2 className="overlay-friend-name">{friend.name}</h2>
        <p className="overlay-quote">{friend.quote}</p>

        <hr className="overlay-divider" />

        <p className="overlay-hint">{friend.passwordHint}</p>

        <div className={`password-input-wrap${shaking ? ' shake' : ''}`}>
          <input
            ref={inputRef}
            type="password"
            className="password-input"
            placeholder="escribe aquí..."
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setWrongMsg('')
            }}
            onKeyDown={handleKey}
            autoComplete="off"
            spellCheck={false}
          />

          <button className="stamp-button" onClick={handleSubmit}>
            abrir
          </button>

          {wrongMsg && <p className="wrong-message">{wrongMsg}</p>}
        </div>
      </div>
    </div>
  )
}
