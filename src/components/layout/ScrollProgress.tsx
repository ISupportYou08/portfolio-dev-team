'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

// Thin gradient progress bar pinned to the top of the page
export default function ScrollProgress() {
  // Raw scroll progress (0-1) smoothed with a spring for a fluid feel
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Render the progress bar, scaled horizontally by scroll progress
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent z-[9999] origin-left"
    />
  )
}
