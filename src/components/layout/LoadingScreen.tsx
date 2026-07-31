'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Initial loading screen shown for ~2.8s: animated "R" monogram, staggered
// "Welcome to my Portfolio" reveal, and a gradient progress bar
export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  // Lock page scroll and auto-dismiss the loader after 2.8s
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = ''
    }, 2800)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [])

  // Word-split for the eyebrow line and letters for the main title
  const eyebrowWords = ['Welcome', 'to']
  const titleLetters = 'My Portfolio'.split('')

  return (
    <AnimatePresence>
      {/* Full-screen overlay that fades out when loading finishes */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg"
        >
          <div className="relative flex flex-col items-center gap-10 px-6">
            {/* Glowing animated logo mark with the "R" monogram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative"
            >
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary via-secondary to-accent animate-spin-slow blur-xl opacity-50" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-bg" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-3xl font-heading font-bold gradient-text">R</span>
              </motion.div>
            </motion.div>

            {/* Welcome heading: word reveal, then big gradient title */}
            <div className="flex flex-col items-center gap-4">
              {/* "Welcome to" — mono eyebrow, words cascade in one by one */}
              <div className="flex items-center gap-3">
                {eyebrowWords.map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.25, duration: 0.5, ease: 'easeOut' }}
                    className="text-text-secondary text-sm sm:text-base font-mono tracking-[0.35em] uppercase"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              {/* "My Portfolio" — letters spring in with a slight rotation reset */}
              <h1 className="text-4xl sm:text-6xl font-heading font-bold tracking-tight">
                {titleLetters.map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 28, rotateX: 90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: 1.1 + i * 0.045,
                      type: 'spring',
                      stiffness: 260,
                      damping: 22,
                    }}
                    className={letter === ' ' ? 'inline-block w-3 sm:w-5' : 'inline-block'}
                  >
                    <span className={i >= 3 ? 'gradient-text' : ''}>{letter}</span>
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Gradient progress bar filling across the welcome message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="w-64 sm:w-80"
            >
              <div className="h-[3px] rounded-full bg-border overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.4, delay: 1.2, ease: 'easeInOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
                />
              </div>
              <div className="flex items-center justify-between mt-3">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: 1.3, duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-text-secondary text-xs font-mono tracking-widest uppercase"
                >
                  Loading
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="text-text-secondary text-xs font-mono tracking-widest uppercase"
                >
                  Experience
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
