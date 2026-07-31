'use client'

import { useState, useEffect } from 'react'

// Shape of the cursor coordinates relative to the viewport
interface MousePosition {
  x: number
  y: number
}

// Hook that tracks the cursor position and updates it as the mouse moves
export function useMousePosition(): MousePosition {
  // position: latest viewport coordinates of the cursor
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    // Updates state with the cursor's current coordinates on every mousemove
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    // Subscribes to mousemove globally and removes the listener on unmount
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return position
}
