import { useState, useEffect } from 'react'
import { friends } from './data/friends'
import type { Friend } from './data/friends'
import { Particles } from './components/Particles'
import { FriendCard } from './components/FriendCard'
import { PasswordOverlay } from './components/PasswordOverlay'
import { MemoryGallery } from './components/MemoryGallery'

function HeroStamp() {
  return (
    <svg
      className="hero-stamp"
      viewBox="0 0 200 200"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path
          id="stamp-ring"
          d="M 100,100 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
        />
      </defs>
      <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="64" fill="none" stroke="currentColor" strokeWidth="1" />
      <text
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="9.5"
        letterSpacing="3.5"
        fill="currentColor"
      >
        <textPath href="#stamp-ring" startOffset="4%">
          ARCHIVO PERSONAL · MEMORIAS · VIDA ·
        </textPath>
      </text>
      <text
        x="100" y="97"
        textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="24"
        fill="currentColor"
      >
        ✦
      </text>
      <text
        x="100" y="114"
        textAnchor="middle"
        fontFamily="Lora, Georgia, serif"
        fontSize="9"
        letterSpacing="6"
        fill="currentColor"
      >
        2026
      </text>
    </svg>
  )
}

const herosPhrases = [
  { text: 'for us, from the future',       style: { top: '14%',  left: '6%',   transform: 'rotate(-6deg)' } },
  { text: 'small pieces of me',            style: { top: '22%',  right: '8%',  transform: 'rotate(4deg)'  } },
  { text: 'you were always home',          style: { bottom: '28%', left: '4%', transform: 'rotate(-3deg)' } },
  { text: 'we carry each other',           style: { bottom: '20%', right: '6%',transform: 'rotate(5deg)'  } },
  { text: '"some people feel like home"',  style: { top: '48%',  left: '5%',   transform: 'rotate(-2deg)' } },
  { text: 'time is a thief and a gift',    style: { top: '68%',  right: '7%',  transform: 'rotate(3deg)'  } },
]

function Hero() {
  const scrollToCards = () => {
    document.querySelector('.friends-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <HeroStamp />

      {herosPhrases.map((p, i) => (
        <span
          key={i}
          className="hero-phrase"
          style={{ animationDelay: `${0.8 + i * 0.3}s`, ...p.style }}
        >
          {p.text}
        </span>
      ))}

      <div className="hero-content">
        <p className="hero-label">archivo personal</p>

        <h1 className="hero-title">
          <span className="hero-title-line1">La vida</span>
          <span className="hero-title-line2">que construimos</span>
        </h1>

        <div className="hero-ornament" aria-hidden="true">
          <span className="hero-ornament-line" />
          <span className="hero-ornament-symbol">✦</span>
          <span className="hero-ornament-line" />
        </div>

        <p className="hero-subtitle">cada persona aquí carga un pedazo mío</p>
      </div>

      <button className="scroll-hint" onClick={scrollToCards} aria-label="Ver amistades">
        <span className="scroll-hint-text">ver amistades</span>
        <span className="scroll-arrow">↓</span>
      </button>
    </section>
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null)
  const [unlockedFriends, setUnlockedFriends] = useState<Set<string>>(new Set())
  const [viewingFriend, setViewingFriend] = useState<Friend | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1100)
    return () => clearTimeout(t)
  }, [])

  const handleCardClick = (friend: Friend) => {
    if (unlockedFriends.has(friend.id)) {
      setViewingFriend(friend)
    } else {
      setSelectedFriend(friend)
    }
  }

  const handleUnlock = (friend: Friend) => {
    setUnlockedFriends((prev) => new Set([...prev, friend.id]))
    setSelectedFriend(null)
    setTimeout(() => setViewingFriend(friend), 350)
  }

  return (
    <div className="app">
      <Particles />

      <main>
        <Hero />

        <section className="friends-section">
          <div className="friends-grid">
            {friends.map((friend, i) => (
              <FriendCard
                key={friend.id}
                friend={friend}
                index={i}
                isUnlocked={unlockedFriends.has(friend.id)}
                isLoading={isLoading}
                onClick={() => handleCardClick(friend)}
              />
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>hecho con memoria y cariño</p>
      </footer>

      {selectedFriend && (
        <PasswordOverlay
          friend={selectedFriend}
          onUnlock={handleUnlock}
          onClose={() => setSelectedFriend(null)}
        />
      )}

      {viewingFriend && (
        <MemoryGallery
          friend={viewingFriend}
          onClose={() => setViewingFriend(null)}
        />
      )}
    </div>
  )
}
