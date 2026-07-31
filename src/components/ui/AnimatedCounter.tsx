'use client'

// Count-up number animation used for stats in the About section
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedCounterProps {
  end: number
  suffix?: string
  duration?: number
}

export default function AnimatedCounter({ end, suffix = '', duration = 2 }: AnimatedCounterProps) {
  // Current displayed count, the span ref for scroll detection, and whether it's in view
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  // Animate the count from 0 to `end` with easing once the element enters the viewport
  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationId: number

    // Per-frame: compute eased progress and update the displayed count
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * end))

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    // Start the loop and cancel it on cleanup
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [isInView, end, duration])

  return (
    // Renders the animated number plus optional suffix (e.g. "+")
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}
