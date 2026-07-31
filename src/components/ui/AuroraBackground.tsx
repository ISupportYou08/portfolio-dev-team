'use client'

// Canvas-rendered aurora (slowly shifting radial gradient) behind the Hero content
import { useEffect, useRef } from 'react'
import { useTheme } from '@/hooks/useTheme'

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Live theme so the gradient gets stronger alphas on light backgrounds
  const { themeRef } = useTheme()

  // Set up the canvas and start the aurora animation loop on mount
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    // Match the canvas size to the window
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Per-frame: redraw a radial gradient whose center and color alpha drift over time
    const animate = () => {
      time += 0.005
      const gradient = ctx.createRadialGradient(
        canvas.width * (0.5 + Math.sin(time * 0.3) * 0.2),
        canvas.height * (0.4 + Math.cos(time * 0.4) * 0.2),
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.8
      )

      // Gold/bronze/champagne color stops in light mode, blue/purple/cyan in dark.
      // Alphas are boosted in light mode so the aurora stays visible on a white page.
      const isLight = themeRef.current === 'light'
      const stops = isLight
        ? [
            { rgb: '201, 162, 39', alpha: 0.16 },
            { rgb: '162, 107, 27', alpha: 0.14 },
            { rgb: '227, 188, 63', alpha: 0.12 },
          ]
        : [
            { rgb: '59, 130, 246', alpha: 0.08 },
            { rgb: '139, 92, 246', alpha: 0.06 },
            { rgb: '6, 182, 212', alpha: 0.04 },
          ]
      gradient.addColorStop(0, `rgba(${stops[0].rgb}, ${stops[0].alpha + Math.sin(time) * 0.04})`)
      gradient.addColorStop(0.3, `rgba(${stops[1].rgb}, ${stops[1].alpha + Math.cos(time * 0.7) * 0.03})`)
      gradient.addColorStop(0.6, `rgba(${stops[2].rgb}, ${stops[2].alpha + Math.sin(time * 0.5) * 0.03})`)
      gradient.addColorStop(1, 'rgba(8, 8, 8, 0)')

      // Clear the frame and fill it with the animated gradient
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Keep the loop going
      animationId = requestAnimationFrame(animate)
    }

    // Kick off the animation and re-fit the canvas on window resize
    resize()
    animate()
    window.addEventListener('resize', resize)

    // Clean up the animation loop and listener on unmount
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
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
