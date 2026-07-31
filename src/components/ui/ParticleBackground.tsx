'use client'

// Canvas-based drifting particle network used as a background layer in the Hero section
import { useEffect, useRef } from 'react'
import { useTheme } from '@/hooks/useTheme'

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Live theme so particles flip to dark colors when light mode is active
  const { themeRef } = useTheme()

  // Set up the canvas, spawn particles, and run the animation loop on mount
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []

    // Match the canvas size to the window
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Spawn particles with random position, velocity, size, and opacity
    const createParticles = () => {
      const count = Math.floor((window.innerWidth * window.innerHeight) / 10000)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      }))
    }

    // Per-frame: move particles, draw dots, and connect nearby ones with fading lines
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Pick dot color per theme: white on dark, slate on light so they stay visible
      const isLight = themeRef.current === 'light'
      const dotRgb = isLight ? '51, 65, 85' : '255, 255, 255'
      const linkRgb = isLight ? '201, 162, 39' : '59, 130, 246'
      const linkAlpha = isLight ? 0.18 : 0.06
      // Move each particle and wrap it around the screen edges
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw the particle as a small dot in the theme's color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dotRgb}, ${p.opacity})`
        ctx.fill()
      })

      // Draw faint blue lines between particles that are close together
      particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${linkRgb}, ${linkAlpha * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      // Keep the loop going
      animationId = requestAnimationFrame(animate)
    }

    // Kick off the animation and re-seed particles when the window resizes
    resize()
    createParticles()
    animate()

    window.addEventListener("resize", () => {
      resize()
      createParticles()
    })

    // Clean up the animation loop and listener on unmount
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
    // Run once on mount only; the current theme is read live via themeRef inside animate().
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    // Full-screen canvas rendered behind the hero content
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
