'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/ui/ThemeToggle'

// Site navigation links (anchor targets + labels for desktop and mobile menus)
const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

// Site navigation bar: fixed header with logo, nav links and mobile menu
export default function Navbar() {
  // Hide the portfolio navbar on the sample websites (they have their own headers)
  const pathname = usePathname()
  if (pathname.startsWith('/samples')) return null

  return <NavbarInner />
}

function NavbarInner() {
  // Tracks whether page is scrolled, whether the mobile menu is open, and the active section
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // On scroll: set scrolled state and detect which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navLinks.map((link) => link.href.slice(1))
      const current = sections.find((section) => {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  // Smooth-scroll to the target section and close the mobile menu
  const handleClick = (href: string) => {
    setIsMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 bg-bg/70 backdrop-blur-lg transition-all duration-500',
          isScrolled
            ? 'shadow-lg shadow-black/20 border-b border-border bg-bg/90'
            : 'shadow-lg shadow-black/20'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={cn('flex items-center justify-between transition-all duration-500', isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20')}>
            {/* Brand logo linking back to the top of the page */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleClick('#home') }}
              className="relative group"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xl sm:text-2xl font-heading font-bold gradient-text drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                Ralph Felix
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
            </motion.a>

            {/* Desktop navigation links with active-section highlight */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg',
                    activeSection === link.href.slice(1)
                      ? 'text-text'
                      : 'text-text-secondary hover:text-text'
                  )}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/5 rounded-lg border border-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Theme toggle + mobile-only menu button */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg glass-strong hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? (
                  <X className="w-5 h-5 text-text" />
                ) : (
                  <Menu className="w-5 h-5 text-text" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {/* Mobile slide-in menu: dark overlay + sidebar drawer with staggered nav links */}
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setIsMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-surface/95 backdrop-blur-xl border-l border-border p-8 pt-24"
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      'text-lg font-medium py-3 px-4 rounded-xl transition-all duration-300',
                      activeSection === link.href.slice(1)
                        ? 'text-text bg-white/5'
                        : 'text-text-secondary hover:text-text hover:bg-white/5'
                    )}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
