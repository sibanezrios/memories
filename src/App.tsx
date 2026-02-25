import { useState, useEffect } from 'react'
import { friends } from './data/friends'
import type { Friend } from './data/friends'
import { Particles } from './components/Particles'
import { FriendCard } from './components/FriendCard'
import { PasswordOverlay } from './components/PasswordOverlay'
import { MemoryGallery } from './components/MemoryGallery'

function Hero() {
  const scrollToCards = () => {
    document.querySelector('.friends-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <h1 className="hero-title">La vida que construimos</h1>
      <p className="hero-subtitle">cada persona aquí carga un pedazo mío</p>
      <hr className="hero-divider" />
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
