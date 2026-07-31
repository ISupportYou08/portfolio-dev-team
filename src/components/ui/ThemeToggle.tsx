'use client'

// Theme toggle — switches between dark and light mode.
// The initial theme is applied server-side from the 'theme' cookie (see app/layout.tsx),
// so no client script is needed and no script-tag warnings occur.
// Icon visibility is driven purely by CSS (html.light), so the SSR HTML always matches the client.
import { useCallback, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  // Persist the theme in a cookie (read server-side for a flash-free first paint)
  // and in localStorage (legacy fallback)
  const persistTheme = useCallback((isLight: boolean) => {
    const theme = isLight ? 'light' : 'dark'
    document.cookie = `theme=${theme}; max-age=31536000; path=/; SameSite=Lax`
    localStorage.setItem('theme', theme)
  }, [])

  // One-time migration for visitors who saved the theme in localStorage before cookies existed
  useEffect(() => {
    if (document.cookie.includes('theme=')) return
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') persistTheme(stored === 'light')
  }, [persistTheme])

  // Toggle the theme class on <html> and persist the choice
  const toggleTheme = () => {
    const isLight = document.documentElement.classList.toggle('light')
    persistTheme(isLight)
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-10 h-10 flex items-center justify-center rounded-lg glass-strong hover:bg-white/10 transition-colors"
    >
      {/* Both icons are always rendered; CSS shows the one matching the current theme */}
      <Sun className="theme-icon theme-icon-sun w-5 h-5 text-text" />
      <Moon className="theme-icon theme-icon-moon w-5 h-5 text-text" />
    </button>
  )
}
