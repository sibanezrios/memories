import type { Friend } from '../data/friends'

interface Props {
  friend: Friend
  index: number
  isUnlocked: boolean
  isLoading: boolean
  onClick: () => void
}

function WaxSeal({ initial, unlocked }: { initial: string; unlocked: boolean }) {
  return (
    <div className={`wax-seal${unlocked ? ' unlocked' : ''}`}>
      <svg width="36" height="36" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="16" fill="#8B3E3E" />
        <circle cx="18" cy="18" r="13" fill="#A04545" />
        <circle cx="18" cy="18" r="12" fill="none" stroke="#6B2E2E" strokeWidth="1" />
        <text
          x="18"
          y="23"
          textAnchor="middle"
          fill="#F2E8D5"
          fontFamily="Playfair Display, Georgia, serif"
          fontSize="13"
          fontWeight="bold"
        >
          {initial}
        </text>
      </svg>
    </div>
  )
}

export function FriendCard({ friend, index, isUnlocked, isLoading, onClick }: Props) {
  const rotation = index % 2 === 0 ? '-2deg' : '2deg'
  const delay = `${index * 0.1}s`
  const firstImage = `/memories/${friend.id}/${friend.images[0]}`

  if (isLoading) {
    return (
      <div
        className="friend-card skeleton"
        style={{ '--rotation': rotation, animationDelay: delay } as React.CSSProperties}
      >
        <div className="envelope-body" style={{ minHeight: 200 }}>
          <div className="envelope-flap" />
          <div className="card-content" />
        </div>
      </div>
    )
  }

  return (
    <div
      className="friend-card"
      style={{ '--rotation': rotation, animationDelay: delay } as React.CSSProperties}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`Sobre de ${friend.name}`}
    >
      <div className="envelope-body">
        <div className="envelope-flap" />
        <div className="card-content">
          <div className={`avatar-circle${isUnlocked ? '' : ' locked'}`}>
            <img src={firstImage} alt={friend.name} loading="lazy" />
          </div>

          <span className="card-name">{friend.name}</span>

          <p className="card-quote">{friend.quote}</p>

          <WaxSeal
            initial={friend.name.charAt(0)}
            unlocked={isUnlocked}
          />
        </div>
      </div>
    </div>
  )
}
