'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { SiGithub, SiGmail } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { personalInfo } from '@/data/portfolio'

// Footer navigation links — match the navbar's section anchors
const footerLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

// Contact lines with icons (email, GitHub, LinkedIn)
const contactLinks = [
  { href: `mailto:${personalInfo.social.email}`, icon: SiGmail, label: 'Email', value: personalInfo.social.email },
  { href: personalInfo.social.github, icon: SiGithub, label: 'GitHub', value: personalInfo.social.github.replace('https://', '') },
  { href: personalInfo.social.linkedin, icon: FaLinkedin, label: 'LinkedIn', value: personalInfo.social.linkedin.replace('https://', '') },
]

// Page footer: name + title, nav links, contact info and copyright line
export default function Footer() {
  const currentYear = new Date().getFullYear()

  // Hide the portfolio footer on the sample websites (they have their own footers)
  const pathname = usePathname()
  if (pathname.startsWith('/samples')) return null

  // Smooth-scroll to a section anchor
  const handleClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/2 to-secondary/2 pointer-events-none" />
      <div className="section-container section-container--small">
        <div className="flex flex-col items-center gap-7 text-center">
          {/* Name and title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-2"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                handleClick('#home')
              }}
              className="text-2xl sm:text-3xl font-heading font-bold gradient-text"
            >
              {personalInfo.name}
            </a>
            <p className="text-sm sm:text-base text-text-secondary">
              Full Stack Developer <span className="text-primary">|</span> BSIT Student
            </p>
          </motion.div>

          {/* Navigation links */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
            aria-label="Footer"
          >
            {footerLinks.map((link, i) => (
              <span key={link.href} className="flex items-center gap-3">
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleClick(link.href)
                  }}
                  className="text-sm text-text-secondary hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </a>
                {i < footerLinks.length - 1 && <span className="text-text-secondary/50">|</span>}
              </span>
            ))}
          </motion.nav>

          {/* Contact lines: email, GitHub, LinkedIn */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-2.5 text-sm sm:text-base"
          >
            {contactLinks.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-300 group"
              >
                <contact.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                <span>{contact.label}:</span>
                <span className="text-text">{contact.value}</span>
              </a>
            ))}
          </motion.div>

          {/* Decorative divider line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-border to-transparent"
          />

          {/* Copyright and credit lines */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-1 text-sm text-text-secondary"
          >
            <p>&copy; {currentYear} Florita, Ralph Felix. All Rights Reserved.</p>
            <p>
              Designed &amp; Developed by <span className="gradient-text font-semibold">I Support You</span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
