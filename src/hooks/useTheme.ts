'use client'

// useTheme — live theme detection ('light' | 'dark') driven by the class on <html>.
// Reacts immediately to theme toggles via a MutationObserver, so canvas/CSS effects
// can pick the right colors for the current mode without re-mounting.
import { useEffect, useRef, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const themeRef = useRef(theme)

  useEffect(() => {
    const html = document.documentElement
    // Sync state + ref whenever the class on <html> changes (theme toggle)
    const update = () => {
      const next = html.classList.contains('light') ? 'light' : 'dark'
      themeRef.current = next
      setTheme(next)
    }
    update()
    const observer = new MutationObserver(update)
    observer.observe(html, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return { theme, themeRef }
}
