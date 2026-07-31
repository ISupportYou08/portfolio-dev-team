'use client'

// 3D tilt wrapper used to wrap skill/service/project cards so they rotate toward the cursor
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  // Refs and state for the card element and its current tilt angle
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  // Compute tilt from the cursor position relative to the card center
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20
    setTilt({ x, y })
  }

  // Reset tilt when the cursor leaves the card
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    // Animated wrapper that applies the tilt as a springy rotateX/rotateY
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.y,
        rotateY: tilt.x,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
