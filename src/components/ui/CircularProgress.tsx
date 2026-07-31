'use client'

// Animated circular skill-level ring used in the Skills section
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'

interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
}

export default function CircularProgress({ value, size = 100, strokeWidth = 6 }: CircularProgressProps) {
  // Gold ring in light mode to match the premium gold theme
  const { theme } = useTheme()
  const isLight = theme === 'light'
  // Geometry of the ring based on size and stroke width
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    // Square container sized to the ring
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Static track ring in faint white */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.05)'}
          strokeWidth={strokeWidth}
        />
        {/* Progress arc that animates from empty to the value's offset when scrolled into view */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#skillGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <defs>
          {/* Gold-to-bronze gradient in light mode, blue-to-purple in dark */}
          <linearGradient id="skillGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={isLight ? '#C9A227' : '#3B82F6'} />
            <stop offset="100%" stopColor={isLight ? '#A26B1B' : '#8B5CF6'} />
          </linearGradient>
        </defs>
      </svg>
      {/* Percentage label centered over the ring, fades in on scroll */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-heading font-bold"
        >
          {value}%
        </motion.span>
      </div>
    </div>
  )
}
