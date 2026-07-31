'use client'

// Section components — one per page section, rendered in order below
import StatsBar from '@/components/sections/StatsBar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import TechStack from '@/components/sections/TechStack'
import GitHubSection from '@/components/sections/GitHubSection'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      {/* Hero — intro headline and call-to-action (first on page) */}
      <Hero />
      {/* StatsBar — animated stats strip right below the hero */}
      <StatsBar />
      {/* About — bio and background */}
      <About />
      {/* Skills — technical skill highlights */}
      <Skills />
      {/* Projects — featured work showcase */}
      <Projects />
      {/* Experience — work history and timeline */}
      <Experience />
      {/* Services — offered services */}
      <Services />
      {/* Testimonials — client quotes */}
      <Testimonials />
      {/* TechStack — technologies used */}
      <TechStack />
      {/* GitHubSection — GitHub activity/contribution stats */}
      <GitHubSection />
      {/* Contact — contact form and links (last on page) */}
      <Contact />
    </>
  )
}
