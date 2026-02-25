export function Particles() {
  const particles = Array.from({ length: 14 }, (_, i) => ({
    left: `${((Math.sin(i * 137.508) + 1) / 2) * 90 + 5}%`,
    delay: `${(i * 1.31) % 9}s`,
    duration: `${9 + (i * 2.73) % 7}s`,
    size: `${2 + (i * 1.7) % 2.5}px`,
    opacity: 0.25 + (i * 0.04) % 0.35,
  }))

  return (
    <div className="particles-container" aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}
