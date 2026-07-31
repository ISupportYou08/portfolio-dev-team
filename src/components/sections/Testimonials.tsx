'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import { testimonials } from '@/data/portfolio'
import { Star } from 'lucide-react'

// Testimonials section — infinite marquee carousel of client quotes
export default function Testimonials() {
  // Testimonials duplicated once to enable the seamless infinite marquee loop
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <SectionWrapper id="testimonials" className="pt-32 pb-24 scroll-mt-24">
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
            Testimonials
            <span className="w-8 h-px bg-gradient-to-l from-primary to-transparent" />
          </p>
          <AnimatedTitle text="What People" gradient="Say" />
        </motion.div>

        {/* Marquee viewport that clips the scrolling row */}
        <div className="overflow-hidden mask-edges">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-50%' }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex gap-6"
          >
            {/* Each testimonial card: star rating, quote, and author */}
            {duplicatedTestimonials.map((testimonial, i) => (
              <div
                key={`${testimonial.id}-${i}`}
                className="glass-strong rounded-2xl p-6 sm:p-8 min-w-[350px] sm:min-w-[400px] flex-shrink-0"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-text-secondary text-xs">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
