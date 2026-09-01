import confetti from 'canvas-confetti'

const BRAND_COLORS = ['#E8536F', '#D8A657', '#FBEAE6', '#F27C93']

export function burstConfetti(options = {}) {
  confetti({
    particleCount: 90,
    spread: 75,
    startVelocity: 38,
    origin: { y: 0.6 },
    colors: BRAND_COLORS,
    ...options,
  })
}

export function sideCannons() {
  const end = Date.now() + 700
  ;(function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: BRAND_COLORS })
    confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: BRAND_COLORS })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
}

export function heartsBurst() {
  const heart = confetti.shapeFromText({ text: '❤', scalar: 2.4 })
  confetti({
    particleCount: 26,
    spread: 100,
    startVelocity: 32,
    scalar: 2.4,
    shapes: [heart],
    origin: { y: 0.55 },
  })
}
