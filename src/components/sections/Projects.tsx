'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { useState, useMemo } from 'react'
import { projects } from '@/data/portfolio'
import TiltCard from '@/components/ui/TiltCard'
import AnimatedTitle from '@/components/ui/AnimatedTitle'

// Filter tabs derived from the categories that actually exist in the data
const categories = ['All', ...new Set(projects.map((p) => p.category))]

export default function Projects() {
  // Currently selected filter category
  const [activeCategory, setActiveCategory] = useState('All')

  // Projects visible in the grid, derived from the active category (memoized)
  const filteredProjects = useMemo(
    () =>
      activeCategory === 'All'
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory]
  )

  return (
    <section id="projects" className="relative pt-32 pb-24 scroll-mt-24">
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
            Portfolio
            <span className="w-8 h-px bg-gradient-to-l from-primary to-transparent" />
          </p>
          <AnimatedTitle text="Featured" gradient="Projects" />
        </motion.div>

        {/* Category filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === cat ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'                   : 'glass-strong text-text-secondary hover:text-text hover:bg-white/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Animated project cards grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TiltCard className="h-full">
                {/* Clickable card: opens the full sample website, hover overlay, category tag, title, description, tech chips */}
                <Link
                  href={project.demo}
                  className="glass-strong rounded-2xl overflow-hidden group cursor-pointer h-full flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-medium bg-primary/20 text-primary border border-primary/30">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
                        Open Demo <ExternalLink className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-white/5 text-text-secondary border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
