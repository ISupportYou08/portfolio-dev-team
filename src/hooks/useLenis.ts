'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

// Hook that initializes Lenis smooth scrolling for the whole page
export function useLenis() {
  useEffect(() => {
    // Creates the Lenis instance with eased, vertical, smooth scrolling config
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Drives Lenis updates on every animation frame
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Destroys the Lenis instance on unmount
    return () => {
      lenis.destroy()
    }
  }, [])
}
