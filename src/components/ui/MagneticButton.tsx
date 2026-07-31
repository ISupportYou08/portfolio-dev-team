'use client'

// Reusable button/link that is magnetically pulled toward the cursor; used across Hero, About, Projects, Contact, and GitHub sections
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
}: MagneticButtonProps) {
  // Motion values for the magnetic offset, smoothed with springs
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })
  const [isHovered, setIsHovered] = useState(false)

  // Pull the button toward the cursor based on the cursor's distance from the button center
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = e.clientX - centerX
    const distY = e.clientY - centerY
    x.set(distX * 0.15)
    y.set(distY * 0.15)
  }

  // Reset the offset when the cursor leaves the button
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  // Style maps for each button variant and size
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40',
    secondary: 'glass-strong text-text hover:bg-white/10 border border-border',
    ghost: 'text-text-secondary hover:text-text hover:bg-white/5',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  // Render a link when href is provided, otherwise a button
  const Component = href ? motion.a : motion.button

  return (
    // Animated element with the magnetic offset, hover/tap scale, and variant styles
    <Component
      href={href}
      onClick={onClick}
      type={type}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer overflow-hidden group',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {/* Expanding light flash overlay shown while hovering a primary button */}
      {isHovered && variant === 'primary' && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 2 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white/10 rounded-xl"
        />
      )}
      {/* Button content sits above the flash overlay */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
  )
}
