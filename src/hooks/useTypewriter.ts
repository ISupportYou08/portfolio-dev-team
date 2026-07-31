'use client'

import { useState, useEffect } from 'react'

// Hook that types out a string character-by-character and exposes the current progress
export function useTypewriter(text: string, speed: number = 50, delay: number = 0) {
  // displayText: characters revealed so far; isComplete: true once the full text is typed
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    let currentIndex = 0

    // Appends one character per interval tick until the whole text is shown
    const startTyping = () => {
      timeout = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(timeout)
          setIsComplete(true)
        }
      }, speed)
    }

    // Waits for the initial delay before typing starts
    const delayTimeout = setTimeout(startTyping, delay)

    // Cleans up timers on unmount or when text/speed/delay change
    return () => {
      clearTimeout(delayTimeout)
      clearInterval(timeout)
    }
  }, [text, speed, delay])

  return { displayText, isComplete }
}
