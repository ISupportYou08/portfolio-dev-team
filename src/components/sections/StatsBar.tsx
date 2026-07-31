'use client'

// StatsBar — animated stat counters displayed in a strip directly under the fixed navbar
import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { stats, projects } from '@/data/portfolio'

export default function StatsBar() {
  return (
    <section className="relative pt-8 pb-8 border-b border-border bg-bg/40 backdrop-blur-sm">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="glass-strong relative group rounded-2xl p-4 sm:p-6 text-center hover:glow-primary transition-all duration-300"
            >
              <span className="text-2xl sm:text-3xl font-heading font-bold gradient-text">
                <AnimatedCounter
                  end={stat.label === 'Projects Completed' ? projects.length : stat.value}
                  suffix={stat.suffix}
                />
              </span>
              <p className="text-text-secondary text-xs sm:text-sm mt-1">{stat.label}</p>

              {/* Hover tooltip: lists the languages on the Languages stat */}
              {stat.detail && (
                <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-3 z-20 opacity-0 -translate-y-2 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300">
                  <div className="glass-strong relative rounded-xl px-4 py-3 shadow-xl border border-primary/30 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {stat.detail.map((lang) => (
                        <span
                          key={lang}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-primary/15 text-primary border border-primary/25"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-surface border-l border-t border-primary/30" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
