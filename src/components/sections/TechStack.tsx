'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import { techStack } from '@/data/portfolio'
import { Code2, Layers, Database, Wrench, ArrowUpRight } from 'lucide-react'
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiPhp, SiLaravel,
  SiPython, SiDart, SiFlutter, SiOpenjdk, SiDotnet, SiMysql, SiFirebase,
  SiGit, SiGithub, SiDocker, SiNodedotjs, SiReact, SiVuedotjs,
  SiBootstrap, SiTailwindcss, SiXampp, SiRailway,
} from 'react-icons/si'

// TechStack section — technologies grouped by purpose, browsed through an interactive navbar-style tab switcher
const iconMap: Record<string, React.ElementType> = {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiPhp, SiLaravel,
  SiPython, SiDart, SiFlutter, SiOpenjdk, SiDotnet, SiMysql, SiFirebase,
  SiGit, SiGithub, SiDocker, SiNodedotjs, SiReact, SiVuedotjs,
  SiBootstrap, SiTailwindcss, SiXampp, SiRailway,
  Database,
}

// Official docs URL for each tech icon
const techUrls: Record<string, string> = {
  SiHtml5: 'https://html.spec.whatwg.org/',
  SiCss: 'https://www.w3.org/Style/CSS/',
  SiJavascript: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  SiTypescript: 'https://www.typescriptlang.org/',
  SiPhp: 'https://www.php.net/',
  SiLaravel: 'https://laravel.com/',
  SiPython: 'https://www.python.org/',
  SiDart: 'https://dart.dev/',
  SiFlutter: 'https://flutter.dev/',
  SiOpenjdk: 'https://openjdk.org/',
  SiDotnet: 'https://dotnet.microsoft.com/',
  SiMysql: 'https://www.mysql.com/',
  SiFirebase: 'https://firebase.google.com/',
  SiGit: 'https://git-scm.com/',
  SiGithub: 'https://github.com/',
  SiDocker: 'https://www.docker.com/',
  SiNodedotjs: 'https://nodejs.org/',
  SiReact: 'https://react.dev/',
  SiVuedotjs: 'https://vuejs.org/',
  SiBootstrap: 'https://getbootstrap.com/',
  SiTailwindcss: 'https://tailwindcss.com/',
  SiXampp: 'https://www.apachefriends.org/',
  SiRailway: 'https://railway.app/',
  Database: 'https://learn.microsoft.com/en-us/sql/ssms/sql-server-management-studio-ssms',
}

// Official brand color for each tech icon (shown on hover)
const techColors: Record<string, string> = {
  SiHtml5: '#E34F26',
  SiCss: '#1572B6',
  SiJavascript: '#F7DF1E',
  SiTypescript: '#3178C6',
  SiPhp: '#777BB4',
  SiLaravel: '#FF2D20',
  SiPython: '#3776AB',
  SiDart: '#0175C2',
  SiFlutter: '#02569B',
  SiOpenjdk: '#E76F00',
  SiDotnet: '#512BD4',
  SiMysql: '#4479A1',
  SiFirebase: '#FFCA28',
  SiGit: '#F05032',
  SiGithub: '#FFFFFF',
  SiDocker: '#2496ED',
  SiNodedotjs: '#5FA04E',
  SiReact: '#61DAFB',
  SiVuedotjs: '#4FC08D',
  SiBootstrap: '#7952B3',
  SiTailwindcss: '#06B6D4',
  SiXampp: '#FB7A24',
  SiRailway: '#8C1FFF',
  Database: '#CC2927',
}

// Navbar tabs: compact label + icon for each tech group
const tabDefs: { key: keyof typeof techStack; label: string; icon: React.ElementType }[] = [
  { key: 'Languages', label: 'Languages', icon: Code2 },
  { key: 'Frameworks & Libraries', label: 'Frameworks', icon: Layers },
  { key: 'Database', label: 'Database', icon: Database },
  { key: 'Tools & Platforms', label: 'Tools', icon: Wrench },
]

export default function TechStack() {
  // Active technology group shown in the content area
  const [activeTab, setActiveTab] = useState<keyof typeof techStack>('Languages')
  const activeDef = tabDefs.find((t) => t.key === activeTab)!
  const activeItems = techStack[activeTab]

  return (
    <SectionWrapper id="techstack" className="pt-32 pb-24 scroll-mt-24">
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
            Technologies
            <span className="w-8 h-px bg-gradient-to-l from-primary to-transparent" />
          </p>
          <AnimatedTitle text="Tools I" gradient="Use" />
        </motion.div>

        {/* Navbar-style tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <nav className="glass-strong rounded-2xl p-1.5 sm:p-2 flex flex-wrap justify-center gap-1 sm:gap-1.5 border border-border/60 shadow-lg shadow-black/10 max-w-fit mx-auto">
            {tabDefs.map((tab) => {
              const isActive = activeTab === tab.key
              const Icon = tab.icon
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="relative flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-medium transition-colors duration-300 outline-none"
                >
                  {/* Sliding gradient pill behind the active tab */}
                  {isActive && (
                    <motion.span
                      layoutId="tech-nav-pill"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30"
                    />
                  )}
                  <Icon
                    className={`relative z-10 w-4 h-4 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-text-secondary group-hover:text-text'
                    }`}
                  />
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive ? 'text-white font-semibold' : 'text-text-secondary hover:text-text'
                    }`}
                  >
                    {tab.label}
                  </span>
                  {/* Item count badge */}
                  <span
                    className={`relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-md transition-colors duration-300 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-text-secondary'
                    }`}
                  >
                    {techStack[tab.key].length}
                  </span>
                </button>
              )
            })}
          </nav>
        </motion.div>

        {/* Content for the active group */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            {/* Group purpose heading */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/25">
                <activeDef.icon className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-text">
                {activeDef.label}
                <span className="ml-3 text-sm font-normal text-text-secondary">
                  {activeItems.length} technologies
                </span>
              </h3>
              <span className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
            </div>

            {/* Technology tiles — shake on hover, link to official docs */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {activeItems.map((tech, i) => {
                const Icon = iconMap[tech.icon]
                return (
                  <motion.div
                    key={tech.icon}
                    initial={{ opacity: 0, scale: 0.85, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 260, damping: 20 }}
                    whileHover={{
                      x: [0, -6, 6, -5, 5, -3, 3, 0],
                      y: [0, -3, 3, -2, 2, 0],
                      transition: { type: 'tween', duration: 0.5, ease: 'easeInOut' },
                    }}
                    className="glass-strong rounded-2xl px-5 py-4 flex flex-col items-center gap-2 group cursor-pointer hover:glow-primary transition-all duration-300"
                    style={{ '--icon-color': techColors[tech.icon] } as React.CSSProperties}
                  >
                    {Icon && (
                      <a
                        href={techUrls[tech.icon]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={tech.name}
                        className="flex flex-col items-center gap-2"
                      >
                        <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-text-secondary group-hover:text-(--icon-color) transition-colors duration-300" />
                        <span className="text-xs font-medium text-text-secondary group-hover:text-text transition-colors duration-300 flex items-center gap-1">
                          {tech.name}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </span>
                      </a>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  )
}
