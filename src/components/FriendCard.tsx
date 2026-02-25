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
      <svg width="38" height="38" viewBox="0 0 38 38">
        <circle cx="19" cy="19" r="17" fill="#7A4A62" />
        <circle cx="19" cy="19" r="14" fill="#9E6080" />
        <circle cx="19" cy="19" r="13" fill="none" stroke="#5A3A52" strokeWidth="1.2" />
        <circle cx="19" cy="19" r="9" fill="none" stroke="rgba(255,235,245,0.25)" strokeWidth="0.8" />
        <text
          x="19"
          y="24"
          textAnchor="middle"
          fill="#FFF0F5"
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
