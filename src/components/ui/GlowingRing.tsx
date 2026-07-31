'use client'

// Pulsing concentric rings shown behind the portrait in the Hero section
import { motion } from "framer-motion"
import { useTheme } from '@/hooks/useTheme'

export default function GlowingRing() {
  // Stronger border colors in light mode so the rings stay visible on a white page
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const ringColors = [
    isLight ? 'rgba(201, 162, 39, 0.55)' : 'rgba(59, 130, 246, 0.2)',
    isLight ? 'rgba(162, 107, 27, 0.45)' : 'rgba(139, 92, 246, 0.15)',
    isLight ? 'rgba(227, 188, 63, 0.4)' : 'rgba(6, 182, 212, 0.1)',
  ]
  const ringGlows = [
    isLight ? 'rgba(201, 162, 39, 0.3)' : 'rgba(59, 130, 246, 0.1)',
    isLight ? 'rgba(162, 107, 27, 0.25)' : 'rgba(139, 92, 246, 0.08)',
    isLight ? 'rgba(227, 188, 63, 0.2)' : 'rgba(6, 182, 212, 0.05)',
  ]

  return (
    // Centered container for the three animated rings
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Render three rings that pulse in opacity and scale with staggered delays */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isLight ? [0.35, 0.6, 0.35] : [0.15, 0.3, 0.15],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          className="absolute rounded-full border"
          style={{
            // Ring sizes scale up per index, each with its own accent color and glow
            width: `${120 + i * 60}px`,
            height: `${120 + i * 60}px`,
            borderColor: ringColors[i - 1],
            boxShadow: `0 0 ${20 + i * 10}px ${ringGlows[i - 1]}`,
          }}
        />
      ))}
    </div>
  )
}
