'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ArrowUp } from 'lucide-react'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useTheme } from '@/hooks/useTheme'

// Floating button that scrolls back to the top once the user has scrolled down
export default function BackToTop() {
  const progress = useScrollProgress()
  // Gold ring in light mode to match the premium gold theme
  const { theme } = useTheme()
  const isLight = theme === 'light'
  // The sample websites manage their own UI — hide the portfolio button there
  const pathname = usePathname()
  if (pathname.startsWith('/samples')) return null

  // Smoothly scroll the window back to the top
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {/* Only show the button after scrolling past 30% of the page */}
      {progress > 30 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full glass-strong flex items-center justify-center group cursor-pointer hover:glow-primary transition-all duration-300"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors duration-300" />
          {/* Circular progress ring that fills up as the user scrolls */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={isLight ? '#C9A227' : '#3B82F6'} />
                <stop offset="50%" stopColor={isLight ? '#A26B1B' : '#8B5CF6'} />
                <stop offset="100%" stopColor={isLight ? '#E3BC3F' : '#06B6D4'} />
              </linearGradient>
            </defs>
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke={isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.1)'}
              strokeWidth="2"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray={`${progress * 1.26} 126`}
              strokeLinecap="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
