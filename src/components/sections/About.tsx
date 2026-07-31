'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import { personalInfo, experience, certifications } from '@/data/portfolio'
import { Download, MapPin, Award, GraduationCap, ExternalLink } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import { education } from '@/data/portfolio'
import ralphPhoto from '../../../img/ralph.jpg'

// About section — biography, photo card, experience, and certifications
export default function About() {
  // Cursor position (in %) inside the profile card, used for the mouse-following glow
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false })

  // Update glow position relative to the card while the mouse moves over it
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    })
  }

  return (
    <SectionWrapper id="about" className="pt-32 pb-24 scroll-mt-24">
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
            About Me
            <span className="w-8 h-px bg-gradient-to-l from-primary to-transparent" />
          </p>
          <AnimatedTitle text="Crafting Digital" gradient="Excellence" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left column: profile photo card with glass frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:-mt-3"
          >
            <div
              className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={() => setSpotlight((s) => ({ ...s, active: false }))}
            >
              {/* Light glow that follows the mouse inside the card */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: spotlight.active ? 1 : 0,
                  background: `radial-gradient(320px circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.12) 0%, transparent 70%)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/5 rounded-3xl" />
              <div className="absolute inset-4 glass-strong rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full border-2 border-primary/30">
                    <Image
                      src={ralphPhoto}
                      alt={personalInfo.name}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-2">{personalInfo.name}</h3>
                  <p className="text-text-secondary text-sm mb-4">{personalInfo.title}</p>
                  {/* School — placed at the level of the bio line mentioning the school */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-primary">{education[0].school}</span>
                  </div>
                  {/* Role badges: what I do */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/15 text-primary border border-primary/30">IT Student</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/15 text-secondary border border-secondary/30">Student Assistant</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/15 text-accent border border-accent/30">Web Development</span>
                  </div>
                  {/* Short description */}
                  <p className="text-text-secondary text-xs leading-relaxed mb-4 max-w-[280px] mx-auto">
                    IT student and developer team assistant focused on building functional web applications.
                  </p>
                  {/* School location button */}
                  <a
                    href={education[0].mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold bg-primary/15 text-primary border border-primary/30 rounded-full px-4 py-2 hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    School Location
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm -z-10" />
            </div>

            {/* Floating badge: years of experience */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 glass-strong rounded-2xl p-4 flex flex-col items-center justify-center">
              <span className="text-3xl font-heading font-bold gradient-text">5+</span>
              <span className="text-xs text-text-secondary text-center leading-tight">Years of Experience</span>
            </div>
          </motion.div>

          {/* Right column: bio text, stats, experience list, and certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            {/* Bio paragraphs */}
            <div className="flex flex-col gap-4">
              <p className="text-text-secondary leading-relaxed text-base sm:text-lg">
                {personalInfo.aboutBio}
              </p>
              <p className="text-text-secondary leading-relaxed">
                I specialize in building modern, scalable applications using cutting-edge technologies.
                My approach combines clean code architecture with pixel-perfect design to deliver
                exceptional user experiences.
              </p>
            </div>

            {/* Stats grid with animated counters (moved to StatsBar under the navbar) */}

            {/* Short experience list (first 3 roles) */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading font-semibold text-lg">Experience</h3>
              {experience.slice(0, 3).map((exp) => (
                <div key={exp.id} className="glass rounded-xl p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-sm">{exp.position}</p>
                      <p className="text-text-secondary text-xs">{exp.company}</p>
                    </div>
                    <span className="text-text-secondary text-xs whitespace-nowrap font-mono">{exp.duration}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Certification cards with details */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                Certifications
                <span className="text-xs font-normal text-text-secondary bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                  {certifications.length} valid & free
                </span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <div key={cert.name} className="glass rounded-xl px-4 py-3 hover:border-primary/40 transition-colors duration-300 w-full sm:w-[calc(50%-0.25rem)]">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-primary shrink-0" />
                      {cert.name}
                    </p>
                    <p className="text-text-secondary text-xs mt-0.5">{cert.issuer}</p>
                    <p className="text-text-secondary/70 text-xs mt-1 leading-relaxed">{cert.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume download button */}
            <MagneticButton variant="secondary" href={personalInfo.resumeUrl}>
              <Download className="w-4 h-4" />
              Download Full Resume
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
