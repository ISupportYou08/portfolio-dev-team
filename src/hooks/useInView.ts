'use client'

import { useEffect, useRef, useState } from 'react'

// Hook that reports whether the attached element has entered the viewport (fires once)
export function useInView(options?: IntersectionObserverInit) {
  // ref: attach to the element to observe; isInView: true once it becomes visible
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Fires when the element crosses the viewport threshold, then stops observing
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.unobserve(element)
      }
    }, { threshold: 0.1, ...options })

    observer.observe(element)
    // Disconnects the observer on unmount
    return () => observer.disconnect()
  }, [])

  return { ref, isInView }
}
