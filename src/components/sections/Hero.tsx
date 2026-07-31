'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Download, Mail } from 'lucide-react'
import ParticleBackground from '@/components/ui/ParticleBackground'
import AuroraBackground from '@/components/ui/AuroraBackground'
import MeshGradient from '@/components/ui/MeshGradient'
import GlowingRing from '@/components/ui/GlowingRing'
import SpotlightEffect from '@/components/ui/SpotlightEffect'
import MagneticButton from '@/components/ui/MagneticButton'
import { useTypewriter } from '@/hooks/useTypewriter'
import { personalInfo, projects } from '@/data/portfolio'
import ralphPhoto from '../../../img/ralph.jpg'

// Hero section — landing banner with intro, CTA buttons, and profile photo
export default function Hero() {
  // Typewriter hook cycles through the hero role text word by word
  const { displayText } = useTypewriter(
    'Full-Stack Developer & UI/UX Designer',
    40,
    1000
  )

  // Scroll progress of the whole page, used to drive the hero parallax
  const { scrollY } = useScroll()

  // Portrait drifts up and fades out as the user scrolls away from the hero
  const portraitY = useTransform(scrollY, [0, 600], [0, 120])
  const portraitScale = useTransform(scrollY, [0, 600], [1, 0.85])
  const portraitOpacity = useTransform(scrollY, [0, 500], [1, 0])

  // Text drifts up slower than the portrait for a layered depth effect
  const textY = useTransform(scrollY, [0, 600], [0, 60])
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0.2])

  // Smooth-scrolls the page to the given section id
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Layered animated background effects */}
      <MeshGradient />
      <AuroraBackground />
      <ParticleBackground />
      <SpotlightEffect />

      <div className="section-container section-container--hero w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Left column: intro text, typewriter role, and CTA buttons (parallax wrapper) */}
          <motion.div style={{ y: textY, opacity: textOpacity }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-3">
              {/* Eyebrow label: "Welcome to Ralph's Portfolio" */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-primary font-mono text-xs sm:text-sm tracking-widest uppercase"
              >
                Welcome to Ralph Felix C. Florita&apos;s Portfolio
              </motion.p>

              {/* Main heading with the name highlighted in gradient */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight"
              >
                {personalInfo.heroHeading.split("I'm")[0]}
                <span className="gradient-text">I&apos;m {personalInfo.name.split(' ')[0]}</span>
              </motion.h1>

              {/* Typewriter role text with blinking cursor */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="h-6 flex items-center"
              >
                <span className="text-base sm:text-lg text-text-secondary font-mono">
                  {displayText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-block w-[3px] h-5 bg-primary ml-1 align-middle"
                  />
                </span>
              </motion.div>

              {/* Subtitle paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-text-secondary text-sm sm:text-base max-w-lg leading-relaxed"
              >
                {personalInfo.heroSubtitle}
              </motion.p>
            </div>

            {/* CTA buttons: View Projects, Resume, Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <MagneticButton onClick={() => scrollTo('#projects')} size="lg">
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <MagneticButton variant="secondary" size="lg" href={personalInfo.resumeUrl}>
                <Download className="w-5 h-5" />
                Resume
              </MagneticButton>
              <MagneticButton variant="ghost" size="lg" onClick={() => scrollTo('#contact')}>
                <Mail className="w-5 h-5" />
                Contact
              </MagneticButton>
            </motion.div>

            {/* Availability badge with avatar dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-4 text-sm text-text-secondary"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-bg bg-gradient-to-br from-primary/30 to-secondary/30"
                  />
                ))}
              </div>
              <span>Available for freelance work</span>
            </motion.div>
          </motion.div>
          </motion.div>

          {/* Right column: photo card with glowing ring and floating stat badges (parallax wrapper) */}
          <motion.div style={{ y: portraitY, scale: portraitScale, opacity: portraitOpacity }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex items-center justify-center h-[320px] sm:h-[420px] lg:h-[500px]"
          >
            <GlowingRing />

            {/* Photo card with name and "Open to work" status */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl animate-pulse-glow" />
              <div className="absolute inset-4 rounded-full glass-strong flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full p-6">
                  <Image
                    src={ralphPhoto}
                    alt={personalInfo.name}
                    fill
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                    className="rounded-full object-cover"
                    priority
                  />
                  <div className="absolute inset-x-6 bottom-6 text-center">
                    <p className="text-xs sm:text-sm text-text-secondary font-mono drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{personalInfo.name}</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs text-text-secondary drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Open to work</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating badge: years of experience */}
            <motion.div
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-20 h-20 sm:w-28 sm:h-28 glass-strong rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <span className="text-2xl sm:text-3xl font-heading font-bold gradient-text">5+</span>
              <span className="text-[10px] sm:text-xs text-text-secondary text-center leading-tight">Years of Experience</span>
            </motion.div>

            {/* Floating badge: projects done */}
            <motion.div
              className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 glass-strong rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              <span className="text-xl sm:text-3xl font-heading font-bold gradient-text">{projects.length}+</span>
              <span className="text-[10px] sm:text-xs text-text-secondary text-center leading-tight">Projects Done</span>
            </motion.div>
          </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll-down indicator that smooth-scrolls to the about section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-text-secondary cursor-pointer"
          onClick={() => scrollTo('#about')}
        >
          <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
