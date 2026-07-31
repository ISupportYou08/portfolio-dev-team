'use client'

// MouseSpotlight — tracks the cursor globally and exposes its position as
// CSS variables (--mx / --my) so interactive surfaces like .section-container
// can light up a spotlight under the pointer without per-element JS.
import { useEffect } from 'react'

export default function MouseSpotlight() {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const root = document.documentElement
      root.style.setProperty('--mx', `${(e.clientX / innerWidth) * 100}%`)
      root.style.setProperty('--my', `${(e.clientY / innerHeight) * 100}%`)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return null
}
