'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import TiltCard from '@/components/ui/TiltCard'
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import { services } from '@/data/portfolio'
import {
  Globe, Smartphone, Palette, Server, Database, Cloud,
} from 'lucide-react'

// Services section — grid of cards describing what the developer offers
const iconMap: Record<string, React.ElementType> = {
  Globe, Smartphone, Palette, Server, Database, Cloud,
}

export default function Services() {
  return (
    <SectionWrapper id="services" className="pt-32 pb-24 scroll-mt-24">
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
            What I Do
            <span className="w-8 h-px bg-gradient-to-l from-primary to-transparent" />
          </p>
          <AnimatedTitle text="My" gradient="Services" />
        </motion.div>

        {/* Service cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon]
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <TiltCard className="h-full">
                  {/* Service card: icon, title, description, hover "Learn more" hint */}
                  <div className="glass-strong rounded-2xl p-6 sm:p-8 h-full group hover:glow-primary transition-all duration-500">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      {Icon && (
                        <Icon className="w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300" />
                      )}
                    </div>
                    <span className="px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 inline-block mb-3">
                      {service.title}
                    </span>
                    <p className="text-text-secondary text-sm leading-relaxed">{service.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Learn more</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
