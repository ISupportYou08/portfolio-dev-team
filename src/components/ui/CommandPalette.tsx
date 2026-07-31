'use client'

// Cmd+K command palette (spotlight-style navigation) rendered site-wide in the root layout
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Command, Search, X, ArrowRight } from 'lucide-react'
import { personalInfo } from '@/data/portfolio'

// Static list of navigable commands: in-page anchors and external links
const commands = [
  { label: 'Home', action: '#home', shortcut: 'G H' },
  { label: 'About', action: '#about', shortcut: 'G A' },
  { label: 'Skills', action: '#skills', shortcut: 'G S' },
  { label: 'Projects', action: '#projects', shortcut: 'G P' },
  { label: 'Experience', action: '#experience', shortcut: 'G E' },
  { label: 'Services', action: '#services', shortcut: 'G S' },
  { label: 'Contact', action: '#contact', shortcut: 'G C' },
  { label: 'View Resume', action: '/resume.html', shortcut: 'G R', external: true },
  { label: 'GitHub', action: personalInfo.social.github, shortcut: 'G G', external: true },
  { label: 'LinkedIn', action: personalInfo.social.linkedin, shortcut: 'G L', external: true },
  { label: 'Facebook', action: personalInfo.social.facebook, shortcut: 'G F', external: true },
  { label: 'Email', action: `mailto:${personalInfo.social.email}`, shortcut: 'G M', external: true },
]

export default function CommandPalette() {
  // Palette open state and the search query
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  // Open/close the palette with Cmd/Ctrl+K and close it with Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Lock page scroll while the palette is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Filter commands by the search query
  const filteredCommands = commands.filter(
    (cmd) => cmd.label.toLowerCase().includes(query.toLowerCase())
  )

  // Close the palette and run the command: open external links or smooth-scroll to anchors
  const handleSelect = useCallback((action: string, external?: boolean) => {
    setIsOpen(false)
    setQuery('')
    if (external) {
      window.open(action, '_blank')
    } else if (action.startsWith('#')) {
      document.querySelector(action)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    // Animate the palette in/out
    <AnimatePresence>
      {isOpen && (
        // Dimmed full-screen overlay that closes on click
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              {/* Search input with icon, keyboard hint, and close button */}
              <Search className="w-5 h-5 text-text-secondary" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, actions..."
                className="flex-1 bg-transparent text-text placeholder:text-text-secondary/50 focus:outline-none text-sm"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-[10px] text-text-secondary font-mono border border-border">
                <Command className="w-3 h-3" />
                K
              </kbd>
              <button onClick={() => setIsOpen(false)} className="text-text-secondary hover:text-text transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable list of matching commands */}
            <div className="max-h-72 overflow-y-auto p-2">
              {filteredCommands.length === 0 && (
                <p className="text-text-secondary text-sm text-center py-8">No results found</p>
              )}
              {/* One row per command; clicking runs its action */}
              {filteredCommands.map((cmd) => (
                <button
                  key={cmd.label}
                  onClick={() => handleSelect(cmd.action, cmd.external)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <span className="text-sm">{cmd.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-text-secondary font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                      {cmd.shortcut}
                    </span>
                    <ArrowRight className="w-4 h-4 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
