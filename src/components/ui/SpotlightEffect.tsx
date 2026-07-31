'use client'

// Mouse-following spotlight overlay used in the Hero section background
import { useMousePosition } from '@/hooks/useMousePosition'
import { useTheme } from '@/hooks/useTheme'

export default function SpotlightEffect() {
  // Track the cursor position across the page
  const { x, y } = useMousePosition()
  // Stronger tint in light mode so the spotlight is visible on a white page
  const { theme } = useTheme()

  return (
    // Full-screen radial gradient that lights up around the cursor
    <div
      className="absolute inset-0 pointer-events-none z-[2]"
      style={{
        background: `radial-gradient(600px at ${x}px ${y}px, rgba(${theme === 'light' ? '201, 162, 39, 0.1' : '59, 130, 246, 0.03'}) 0%, transparent 80%)`,
      }}
    />
  )
}
