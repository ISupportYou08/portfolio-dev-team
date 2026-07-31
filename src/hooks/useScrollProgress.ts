'use client'

import { useState, useEffect } from 'react'

// Hook that tracks the page's vertical scroll progress as a percentage (0-100)
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Computes how far down the page has been scrolled relative to total scrollable height
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY
      const progress = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, progress)))
    }

    // Listens to scroll events (passive for performance) and removes listener on unmount
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}
