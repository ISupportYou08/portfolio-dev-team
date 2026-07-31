'use client'

// Global custom cursor (dot + trailing glow) rendered site-wide in the root layout
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  // True once the mouse has moved — the cursor stays invisible (opacity 0) until then,
  // so it can always be rendered without any SSR/client mismatch
  const [isVisible, setIsVisible] = useState(false)
  // Motion values for cursor position, smoothed by springs for a laggy follow effect
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 })
  // Slower springs for the large soft glow that trails further behind
  const glowX = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 })
  const glowY = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 })

  // Track the mouse and hover state over links/buttons while mounted
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      if (!isVisible) setIsVisible(true)
    }
    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => {}
    document.addEventListener("mousemove", handleMouseMove)
    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })
    // Remove listeners on cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [isVisible, cursorX, cursorY])

  // Don't render anything before hydration to avoid a flash of the native cursor overlay
  return (
    <>
      {/* Small white dot that follows the cursor instantly */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998] mix-blend-difference hidden md:block"
        style={{
          x: springX,
          y: springY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="w-full h-full rounded-full bg-text" />
      </motion.div>
      {/* Large blurred gradient glow that trails behind the dot */}
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 pointer-events-none z-[9997] hidden md:block"
        style={{
          x: glowX,
          y: glowY,
        }}
      >
        <div
          className="w-full h-full rounded-full bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 blur-3xl"
          style={{
            transform: `translate(${cursorX.get()}px, ${cursorY.get()}px)`,
          }}
        />
      </motion.div>
    </>
  )
}
