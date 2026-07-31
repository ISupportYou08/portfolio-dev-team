'use client'

// Fade/slide-in wrapper used to animate each page section (About, Skills, Projects, etc.) into view on scroll
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  id?: string
  className?: string
}

export default function SectionWrapper({ children, id, className = '' }: SectionWrapperProps) {
  return (
    // Section that fades and slides up once it enters the viewport
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  )
}
