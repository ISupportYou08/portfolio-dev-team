'use client'

// EduLink — sample e-learning platform (deep violet).
// Interactive: course category tabs, search, course cards with progress bars, mentor profiles, enrollment form.
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, GraduationCap, Search, Clock, PlayCircle, Users, Trophy } from 'lucide-react'

// Course catalog — filtered by category tab + search text
const courses = [
  { title: 'Full-Stack Web Development', category: 'Development', students: 18400, hours: 42, level: 'Beginner', color: 'from-[#C4B5FD] to-[#7C3AED]', progress: 65 },
  { title: 'UI/UX Design Fundamentals', category: 'Design', students: 12300, hours: 28, level: 'Beginner', color: 'from-[#F9A8D4] to-[#BE185D]', progress: 40 },
  { title: 'Data Science with Python', category: 'Data', students: 9800, hours: 56, level: 'Intermediate', color: 'from-[#93C5FD] to-[#1D4ED8]', progress: 75 },
  { title: 'Digital Marketing Bootcamp', category: 'Business', students: 7600, hours: 24, level: 'Beginner', color: 'from-[#FCD34D] to-[#B45309]', progress: 20 },
  { title: 'Cloud & DevOps Essentials', category: 'Development', students: 6500, hours: 36, level: 'Intermediate', color: 'from-[#86EFAC] to-[#15803D]', progress: 10 },
  { title: 'Mobile App Development (Flutter)', category: 'Development', students: 8900, hours: 48, level: 'Intermediate', color: 'from-[#A5B4FC] to-[#4F46E5]', progress: 0 },
  { title: 'Graphic Design Masterclass', category: 'Design', students: 11200, hours: 32, level: 'Beginner', color: 'from-[#FCA5A5] to-[#DC2626]', progress: 0 },
  { title: 'Financial Analytics', category: 'Data', students: 4300, hours: 30, level: 'Advanced', color: 'from-[#FDBA74] to-[#EA580C]', progress: 0 },
  { title: 'Entrepreneurship 101', category: 'Business', students: 9100, hours: 18, level: 'Beginner', color: 'from-[#6EE7B7] to-[#047857]', progress: 0 },
]

const categories = ['All', 'Development', 'Design', 'Data', 'Business']

const mentors = [
  { name: 'Prof. Rina Santos', role: 'Full-Stack & Cloud', initials: 'RS', color: 'from-[#C4B5FD] to-[#7C3AED]', students: 21400 },
  { name: 'Mr. Vince Ocampo', role: 'UI/UX & Product', initials: 'VO', color: 'from-[#F9A8D4] to-[#BE185D]', students: 15700 },
  { name: 'Ms. Liza Fernandez', role: 'Data & AI', initials: 'LF', color: 'from-[#93C5FD] to-[#1D4ED8]', students: 12900 },
]

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 26 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
)

export default function EduLinkPage() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const visible = courses.filter(
    (c) =>
      (category === 'All' || c.category === category) &&
      c.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#120B1E] text-[#F5F3FF] font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#120B1E]/85 backdrop-blur-xl border-b border-violet-400/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="flex items-center gap-2.5 font-heading text-xl font-black tracking-tight">
            <span className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-400/40 flex items-center justify-center">
              <GraduationCap size={19} className="text-violet-400" />
            </span>
            Edu<span className="text-violet-400">Link</span>
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#F5F3FF]/60">
            {['Courses', 'Mentors', 'Paths'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-violet-400 transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <a href="#courses" className="px-5 py-2.5 rounded-xl bg-violet-500 text-white text-sm font-black hover:bg-violet-400 transition-colors">
            Start Learning
          </a>
        </div>
      </header>

      {/* Hero + search */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-400/40 text-violet-300 text-xs font-bold mb-7"
          >
            <Trophy size={13} /> 96,000+ learners certified
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-6xl md:text-7xl font-black leading-[0.95] tracking-tight"
          >
            Learn skills that
            <br />
            <span className="text-violet-400">move you forward.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg text-[#F5F3FF]/50 max-w-lg mx-auto"
          >
            Structured paths, real mentors, and certificates that employers recognize — at your own pace.
          </motion.p>

          {/* Course search */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 max-w-xl mx-auto flex items-center gap-3 p-2.5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur"
          >
            <Search size={18} className="text-violet-400 shrink-0 ml-2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any course…"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#F5F3FF]/30 py-2.5"
            />
          </motion.div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="max-w-6xl mx-auto px-6 py-16">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight">Popular courses</h2>
            {/* Category navbar-style tabs */}
            <div className="flex p-1 rounded-2xl border border-violet-400/25 bg-white/[0.03]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${category === cat ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30' : 'text-[#F5F3FF]/55 hover:text-violet-300'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div key={category + query} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((course, i) => (
              <Reveal key={course.title} delay={i * 0.05}>
                <div className="group rounded-3xl border border-violet-400/15 bg-white/[0.03] overflow-hidden hover:border-violet-400/50 hover:-translate-y-1.5 transition-all duration-400">
                  <div className={`relative h-28 bg-gradient-to-br ${course.color}`}>
                    <BookOpen size={40} className="absolute bottom-4 left-5 text-white/90" />
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#120B1E]/70 backdrop-blur text-[10px] font-black text-violet-300 uppercase tracking-wider">
                      {course.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-[11px] text-[#F5F3FF]/45 font-mono">
                      <span className="flex items-center gap-1.5"><Clock size={11} /> {course.hours}h</span>
                      <span>{course.level}</span>
                      <span className="flex items-center gap-1"><Users size={11} /> {course.students.toLocaleString()}</span>
                    </div>
                    <h3 className="mt-3 font-heading text-lg font-black leading-snug">{course.title}</h3>
                    {/* Progress bar for in-progress courses */}
                    {course.progress > 0 ? (
                      <div className="mt-4">
                        <div className="flex justify-between text-[10px] font-bold text-[#F5F3FF]/45 mb-1.5">
                          <span>In progress</span>
                          <span className="text-violet-300">{course.progress}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${course.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"
                          />
                        </div>
                      </div>
                    ) : (
                      <button className="mt-4 w-full py-2.5 rounded-xl bg-violet-500/10 border border-violet-400/30 text-violet-300 text-xs font-black group-hover:bg-violet-500 group-hover:text-white transition-colors">
                        Enroll now — free
                      </button>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>

        {visible.length === 0 && (
          <p className="text-center py-12 text-[#F5F3FF]/40 font-medium">No courses match “{query}”.</p>
        )}
      </section>

      {/* Mentors */}
      <section id="mentors" className="border-y border-violet-400/10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-violet-400 font-mono tracking-[0.3em] text-xs uppercase mb-4">Mentors</p>
              <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight">Learn from the field</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {mentors.map((mentor, i) => (
              <Reveal key={mentor.name} delay={i * 0.1}>
                <div className="group text-center p-8 rounded-3xl border border-violet-400/15 bg-[#120B1E] hover:border-violet-400/50 transition-colors duration-400">
                  <div className={`mx-auto w-24 h-24 rounded-full bg-gradient-to-br ${mentor.color} flex items-center justify-center text-3xl font-black text-white mb-5`}>
                    {mentor.initials}
                  </div>
                  <h3 className="font-heading font-black">{mentor.name}</h3>
                  <p className="mt-1 text-sm text-[#F5F3FF]/45">{mentor.role}</p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-violet-300">
                    <Users size={13} /> {mentor.students.toLocaleString()} students mentored
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Learning paths CTA */}
      <section id="paths" className="px-6 py-24 max-w-6xl mx-auto">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-violet-600 px-8 py-16 text-center text-white">
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-violet-400/30 blur-3xl" />
            <p className="font-heading text-3xl md:text-5xl font-black tracking-tight leading-tight">Not sure where to start?<br />Take the 2-minute skill quiz.</p>
            <button className="mt-8 inline-flex items-center gap-2 px-9 py-4 rounded-xl bg-white text-violet-700 font-black hover:bg-violet-50 transition-colors">
              <PlayCircle size={18} /> Build my learning path
            </button>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-violet-400/10 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-heading font-black tracking-tight">Edu<span className="text-violet-400">Link</span></span>
          <p className="text-sm text-[#F5F3FF]/30">© 2026 EduLink Learning. Sample website for demonstration.</p>
        </div>
      </footer>

      {/* Floating link back to the portfolio */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-xl bg-violet-500 text-white text-xs font-black shadow-lg hover:bg-violet-400 transition-colors"
      >
        ← Back to Portfolio
      </Link>
    </div>
  )
}
