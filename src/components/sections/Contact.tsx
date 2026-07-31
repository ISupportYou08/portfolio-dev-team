'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import MagneticButton from '@/components/ui/MagneticButton'
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import { personalInfo } from '@/data/portfolio'
import { Send, MapPin, CheckCircle } from 'lucide-react'
import { SiGithub, SiFacebook, SiGmail } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'

// Contact section — contact info, social links, and a mock contact form
export default function Contact() {
  // Values of the form fields
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' })
  // True while the fake submit delay is running
  const [isSubmitting, setIsSubmitting] = useState(false)
  // True briefly after submit to show the success message
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Sends the message by opening the visitor's email app with the form pre-filled
  // (to upgrade to Formspree/EmailJS later, replace this body with a fetch to your form endpoint)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    setIsSubmitting(false)

    const subject = encodeURIComponent(formState.subject || `Message from ${formState.name}`)
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    )
    window.location.href = `mailto:${personalInfo.social.email}?subject=${subject}&body=${body}`

    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 4000)
    setFormState({ name: '', email: '', subject: '', message: '' })
  }

  // Social profile links rendered as icon buttons with their official brand icons
  const socialLinks = [
    { href: personalInfo.social.github, icon: SiGithub, label: 'GitHub', color: 'hover:text-white' },
    { href: personalInfo.social.linkedin, icon: FaLinkedin, label: 'LinkedIn', color: 'hover:text-[#0A66C2]' },
    { href: personalInfo.social.facebook, icon: SiFacebook, label: 'Facebook', color: 'hover:text-[#1877F2]' },
    { href: `mailto:${personalInfo.social.email}`, icon: SiGmail, label: 'Email', color: 'hover:text-[#EA4335]' },
  ]

  return (
    <SectionWrapper id="contact" className="pt-32 pb-24 scroll-mt-24">
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
            Contact
            <span className="w-8 h-px bg-gradient-to-l from-primary to-transparent" />
          </p>
          <AnimatedTitle text="Let's Work" gradient="Together" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          {/* Left column: intro text, contact details, and social icons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-heading font-semibold">Get in Touch</h3>
              <p className="text-text-secondary leading-relaxed">
                Have a project in mind or just want to say hello? I&apos;d love to hear from you.
                Drop me a message and I&apos;ll get back to you as soon as possible.
              </p>
            </div>

            {/* Email and location details */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-text-secondary">
                <SiGmail className="w-5 h-5 text-primary" />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{personalInfo.location}</span>
              </div>
            </div>

            {/* Social media icon buttons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`w-12 h-12 rounded-xl glass-strong flex items-center justify-center ${social.color} transition-all duration-300 hover:glow-primary`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right column: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-6 sm:p-8 flex flex-col gap-5">
              {/* Name and email fields */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-text-secondary">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="bg-white/5 border border-border rounded-xl px-4 py-3 text-text placeholder:text-text-secondary/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-text-secondary">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="bg-white/5 border border-border rounded-xl px-4 py-3 text-text placeholder:text-text-secondary/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Subject field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-medium text-text-secondary">Subject</label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="bg-white/5 border border-border rounded-xl px-4 py-3 text-text placeholder:text-text-secondary/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300"
                  placeholder="Project Collaboration"
                />
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-text-secondary">Message</label>
                <textarea
                  id="message"
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={5}
                  className="bg-white/5 border border-border rounded-xl px-4 py-3 text-text placeholder:text-text-secondary/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Success message or submit button with loading spinner */}
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Message sent successfully!</span>
                  </motion.div>
                ) : (
                  <MagneticButton type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </MagneticButton>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
