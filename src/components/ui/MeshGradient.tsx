'use client'

// Ambient floating gradient blobs used as the bottom background layer of the Hero section
import { useTheme } from '@/hooks/useTheme'

export default function MeshGradient() {
  // Gold/bronze orbs in light mode to match the premium gold theme
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const orbColors = [
    isLight ? 'rgba(201,162,39,0.22)' : 'rgba(59,130,246,0.15)',
    isLight ? 'rgba(162,107,27,0.2)' : 'rgba(139,92,246,0.15)',
    isLight ? 'rgba(227,188,63,0.18)' : 'rgba(6,182,212,0.15)',
  ]

  return (
    // Full-screen layer holding three drifting radial gradient orbs
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Gold orb drifting in the top-left */}
      <div
        className="mesh-orb absolute -top-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${orbColors[0]} 0%, transparent 70%)`,
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      {/* Bronze orb drifting in the bottom-right */}
      <div
        className="mesh-orb absolute -bottom-1/2 -right-1/2 w-[800px] h-[800px] rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${orbColors[1]} 0%, transparent 70%)`,
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />
      {/* Champagne orb drifting at the center */}
      <div
        className="mesh-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: `radial-gradient(circle, ${orbColors[2]} 0%, transparent 70%)`,
          animation: 'float 12s ease-in-out infinite',
        }}
      />
    </div>
  )
}
