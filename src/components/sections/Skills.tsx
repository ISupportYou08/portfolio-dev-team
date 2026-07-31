'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import CircularProgress from '@/components/ui/CircularProgress'
import TiltCard from '@/components/ui/TiltCard'
import { skills } from '@/data/portfolio'
import { cn } from '@/lib/utils'
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiVuedotjs,
  SiBootstrap, SiTailwindcss, SiPhp, SiLaravel, SiPython, SiNodedotjs,
  SiMysql, SiFirebase, SiMongodb, SiFigma,
  SiCloudflare, SiVercel, SiNetlify, SiGit, SiGithub,
  SiDocker, SiOpenjdk,
} from 'react-icons/si'

// Skills section — category tabs with skill cards showing proficiency circles
const iconMap: Record<string, React.ElementType> = {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiVuedotjs,
  SiBootstrap, SiTailwindcss, SiPhp, SiLaravel, SiPython, SiNodedotjs,
  SiMysql, SiFirebase, SiMongodb, SiFigma,
  SiCloudflare, SiVercel, SiNetlify, SiGit, SiGithub,
  SiDocker, SiOpenjdk,
}

// Skill categories derived from the skills data keys
const categories = Object.keys(skills) as (keyof typeof skills)[]

export default function Skills() {
  // Currently active skill category tab
  const [activeCategory, setActiveCategory] = useState<keyof typeof skills>('Languages')

  return (
    <SectionWrapper id="skills" className="pt-32 pb-24 scroll-mt-24">
      <div className="section-container">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-primary font-mono text-lg sm:text-2xl font-bold tracking-[0.2em] uppercase mb-5 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-gradient-to-r from-primary to-transparent" />
            Skills & Expertise
            <span className="w-8 h-px bg-gradient-to-l from-primary to-transparent" />
          </p>
          <AnimatedTitle text="My" gradient="Tech Stack" />
        </motion.div>

        {/* Category tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300',
                activeCategory === cat
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
                  : 'glass-strong text-text-secondary hover:text-text hover:bg-white/10'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill cards grid for the active category */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {skills[activeCategory].map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <TiltCard className="h-full">
                  {/* Skill card: proficiency ring + skill name */}
                  <div className="glass-strong rounded-2xl p-6 h-full group hover:glow-primary transition-all duration-500 cursor-default flex flex-col items-center text-center">
                    <CircularProgress value={skill.level} size={110} strokeWidth={6} />
                    <div className="mt-4 text-center">
                      <span className="px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  )
}
