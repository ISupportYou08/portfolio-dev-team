'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import { experience, education } from '@/data/portfolio'
import { MapPin, ExternalLink, GraduationCap, Monitor, Cpu, Network, LifeBuoy, Box, FileText } from 'lucide-react'
import {
  SiPhp, SiMysql, SiOpenjdk, SiJavascript, SiHtml5, SiCss, SiBootstrap, SiLinux,
} from 'react-icons/si'


// Tech logo lookup for each technology label used in experience entries
const techIconMap: Record<string, React.ElementType> = {
  PHP: SiPhp,
  MySQL: SiMysql,
  Java: SiOpenjdk,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss,
  Bootstrap: SiBootstrap,
  Windows: Monitor,
  Linux: SiLinux,
  Hardware: Cpu,
  Networking: Network,
  'IT Support': LifeBuoy,
  Software: Box,
  Documentation: FileText,
}

// Official brand color for each tech logo (watermark tint)
const brandColors: Record<string, string> = {
  PHP: '#777BB4',
  MySQL: '#4479A1',
  Java: '#E76F00',
  JavaScript: '#F7DF1E',
  HTML: '#E34F26',
  CSS: '#1572B6',
  Bootstrap: '#7952B3',
  Windows: '#00A4EF',
  Linux: '#FCC624',
  Hardware: '#D97706',
  Networking: '#22C55E',
  'IT Support': '#38BDF8',
  Software: '#A78BFA',
  Documentation: '#94A3B8',
}


// Experience section — vertical timeline of work history entries
export default function Experience() {
  return (
    <SectionWrapper id="experience" className="pt-32 pb-24 scroll-mt-24">
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
            Career
            <span className="w-8 h-px bg-gradient-to-l from-primary to-transparent" />
          </p>
          <AnimatedTitle text="Work" gradient="Experience" />
        </motion.div>

        {/* Timeline with a vertical gradient line */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-[23px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary via-secondary to-accent/20" />

          <div className="flex flex-col gap-8">
            {/* Education entry: school, degree, and campus address */}
            {education.map((edu, i) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative pl-16"
              >
                <div className="absolute left-[14px] top-1 w-[19px] h-[19px] rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center">
                  <div className="w-[7px] h-[7px] rounded-full bg-text" />
                </div>

                <div className="glass-strong rounded-2xl p-6 sm:p-8 hover:glow-primary transition-all duration-500 border border-primary/20">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                        {edu.school}
                      </h3>
                      <p className="text-text-secondary text-sm mt-0.5">{edu.role}</p>
                      <p className="text-text-secondary text-sm mt-0.5">{edu.degree}</p>
                    </div>
                    <span className="text-text-secondary text-xs font-mono bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">
                      {edu.year}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <p className="text-text-secondary text-sm leading-relaxed flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {edu.address}
                    </p>
                    <a
                      href={edu.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors"
                    >
                      Open in Maps
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <a
                    href={edu.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors"
                  >
                    {edu.website.replace('https://', '')}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}

            {/* Each experience entry: dot marker + card with role, company, duration, tech */}
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative pl-16"
              >
                <div className="absolute left-[14px] top-1 w-[19px] h-[19px] rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <div className="w-[7px] h-[7px] rounded-full bg-text" />
                </div>

<div className="glass-strong rounded-2xl p-6 sm:p-8 hover:glow-primary transition-all duration-500 relative overflow-hidden group">
                  {/* Tech logos as centered fill background */}
                  <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 pointer-events-none">
                    <div className="relative flex flex-wrap gap-3 sm:gap-4 w-full h-full items-center justify-center">
                      {exp.technologies.map((tech) => {
                        const TechIcon = techIconMap[tech]
                        return TechIcon ? (
                          <TechIcon
                            key={tech}
                            style={{ color: brandColors[tech] ?? 'currentColor' }}
                            className="w-1/3 h-auto max-h-[40%] min-h-[36px] opacity-[0.08] group-hover:opacity-20 transition-opacity duration-500"
                          />
                        ) : null
                      })}
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-heading font-semibold text-lg">{exp.position}</h3>
                      <p className="text-text-secondary text-sm">{exp.company}</p>
                    </div>
                    <span className="text-text-secondary text-xs font-mono bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">
                      {exp.duration}
                    </span>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-4 relative z-10">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 relative z-10">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
