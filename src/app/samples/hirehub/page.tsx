'use client'

// HireHub — sample job portal (deep indigo).
// Interactive: keyword search, job-type filter chips, live listings, apply form with success state.
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Briefcase, Search, MapPin, Clock, CheckCircle, Building2, TrendingUp } from 'lucide-react'

// Job catalog — filtered by search text and job type
const jobs = [
  { title: 'Senior Frontend Engineer', company: 'TechNova', location: 'Manila, PH', type: 'Full-time', salary: '$4,200/mo', tags: ['React', 'TypeScript'], featured: true },
  { title: 'Backend Developer (PHP)', company: 'CloudShift', location: 'Remote', type: 'Remote', salary: '$3,800/mo', tags: ['PHP', 'MySQL'] },
  { title: 'UI/UX Designer', company: 'PixelWorks', location: 'Makati, PH', type: 'Full-time', salary: '$2,900/mo', tags: ['Figma', 'Design Systems'] },
  { title: 'Data Analyst', company: 'Quantia', location: 'Remote', type: 'Remote', salary: '$3,200/mo', tags: ['SQL', 'Python'], featured: true },
  { title: 'Junior QA Tester', company: 'AppBrew', location: 'Quezon City, PH', type: 'Part-time', salary: '$1,400/mo', tags: ['Testing', 'CI/CD'] },
  { title: 'Software Engineering Intern', company: 'DevRocket', location: 'Hybrid, PH', type: 'Internship', salary: '$600/mo', tags: ['Java', 'Git'] },
  { title: 'DevOps Engineer', company: 'Stackline', location: 'Remote', type: 'Remote', salary: '$4,600/mo', tags: ['Docker', 'AWS'] },
  { title: 'Mobile Developer (Flutter)', company: 'AppBrew', location: 'Cebu, PH', type: 'Full-time', salary: '$3,400/mo', tags: ['Flutter', 'Dart'], featured: true },
]

const jobTypes = ['All', 'Full-time', 'Remote', 'Part-time', 'Internship']

const companies = [
  { name: 'TechNova', color: 'from-[#818CF8] to-[#4F46E5]', initials: 'TN' },
  { name: 'CloudShift', color: 'from-[#A5B4FC] to-[#6366F1]', initials: 'CS' },
  { name: 'PixelWorks', color: 'from-[#F472B6] to-[#BE185D]', initials: 'PW' },
  { name: 'Quantia', color: 'from-[#34D399] to-[#059669]', initials: 'QA' },
  { name: 'AppBrew', color: 'from-[#FBBF24] to-[#B45309]', initials: 'AB' },
  { name: 'DevRocket', color: 'from-[#60A5FA] to-[#1D4ED8]', initials: 'DR' },
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

export default function HireHubPage() {
  const [query, setQuery] = useState('')
  const [jobType, setJobType] = useState('All')
  const [applying, setApplying] = useState<typeof jobs[0] | null>(null)
  const [application, setApplication] = useState({ name: '', email: '', note: '' })
  const [applied, setApplied] = useState(false)

  const visible = jobs.filter(
    (job) =>
      (jobType === 'All' || job.type === jobType) &&
      (job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())))
  )

  const submitApplication = () => {
    if (!application.name || !application.email) return
    setApplied(true)
  }

  return (
    <div className="min-h-screen bg-[#0B1020] text-white font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#0B1020]/85 backdrop-blur-xl border-b border-indigo-400/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="flex items-center gap-2.5 font-heading text-xl font-black tracking-tight">
            <span className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-400/40 flex items-center justify-center">
              <Briefcase size={18} className="text-indigo-400" />
            </span>
            Hire<span className="text-indigo-400">Hub</span>
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
            {['Jobs', 'Companies', 'Careers'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-indigo-400 transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <a href="#jobs" className="px-5 py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-black hover:bg-indigo-400 transition-colors">
            Post a Job
          </a>
        </div>
      </header>

      {/* Hero + search */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-400/40 text-indigo-300 text-xs font-bold mb-7"
          >
            <TrendingUp size={13} /> 40,000+ jobs matched this month
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-6xl md:text-7xl font-black leading-[0.95] tracking-tight"
          >
            Find the role that
            <br />
            <span className="text-indigo-400">fits your future.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg text-white/50 max-w-lg mx-auto"
          >
            Smart matching, honest salaries, and one-tap applications — from first interview to first paycheck.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 p-2.5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur"
          >
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search size={18} className="text-indigo-400 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Job title, company, or skill…"
                className="w-full bg-transparent outline-none text-sm placeholder:text-white/30 py-2.5"
              />
            </div>
            <button className="px-7 py-3 rounded-2xl bg-indigo-500 text-white text-sm font-bold hover:bg-indigo-400 transition-colors">
              Search Jobs
            </button>
          </motion.div>
        </div>
      </section>

      {/* Job listings */}
      <section id="jobs" className="max-w-6xl mx-auto px-6 py-16">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight">Latest openings</h2>
            <div className="flex flex-wrap gap-2">
              {jobTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setJobType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${jobType === type ? 'bg-indigo-500 text-white' : 'border border-white/15 text-white/55 hover:border-indigo-400/50 hover:text-indigo-300'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.div key={jobType + query} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="flex flex-col gap-4">
              {visible.map((job, i) => (
                <Reveal key={job.title} delay={i * 0.05}>
                  <div className={`group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-2xl border p-6 transition-all duration-400 hover:-translate-y-0.5 ${job.featured ? 'border-indigo-400/40 bg-indigo-500/[0.07]' : 'border-white/10 bg-white/[0.03] hover:border-indigo-400/30'}`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-heading text-lg font-black group-hover:text-indigo-300 transition-colors">{job.title}</h3>
                        {job.featured && <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-wider">Featured</span>}
                      </div>
                      <p className="mt-1.5 text-sm text-white/50 flex items-center gap-2">
                        <Building2 size={13} className="text-indigo-400" /> {job.company}
                        <span className="w-1 h-1 rounded-full bg-white/25" />
                        <MapPin size={13} className="text-indigo-400" /> {job.location}
                        <span className="w-1 h-1 rounded-full bg-white/25" />
                        <Clock size={13} className="text-indigo-400" /> {job.type}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {job.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-white/5 text-white/50 border border-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-lg font-black text-indigo-300">{job.salary}</span>
                      <button
                        onClick={() => { setApplying(job); setApplied(false); setApplication({ name: '', email: '', note: '' }) }}
                        className="px-5 py-2.5 rounded-xl bg-indigo-500 text-white text-xs font-black hover:bg-indigo-400 transition-colors"
                      >
                        Apply now
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </motion.div>
          </AnimatePresence>
          {visible.length === 0 && (
            <p className="text-center py-12 text-white/40 font-medium">No jobs match “{query}” — try different keywords.</p>
          )}
        </div>
      </section>

      {/* Companies */}
      <section id="companies" className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-indigo-400 font-mono tracking-[0.3em] text-xs uppercase mb-4">Companies</p>
              <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight">Hiring right now</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {companies.map((company, i) => (
              <Reveal key={company.name} delay={i * 0.07}>
                <div className="group rounded-3xl border border-white/10 bg-[#0B1020] p-7 text-center hover:border-indigo-400/40 transition-colors duration-400">
                  <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${company.color} flex items-center justify-center text-xl font-black text-white`}>
                    {company.initials}
                  </div>
                  <h3 className="mt-4 font-heading font-black">{company.name}</h3>
                  <p className="mt-1 text-xs text-white/40">12 open roles</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="careers" className="px-6 py-24 max-w-6xl mx-auto">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-indigo-600 px-8 py-16 text-center text-white">
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-indigo-400/30 blur-3xl" />
            <p className="font-heading text-3xl md:text-5xl font-black tracking-tight leading-tight">Hiring too?<br />Your next teammate is here.</p>
            <button className="mt-8 px-9 py-4 rounded-xl bg-white text-indigo-700 font-black hover:bg-indigo-50 transition-colors">
              Post a job free
            </button>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-heading font-black tracking-tight">Hire<span className="text-indigo-400">Hub</span></span>
          <p className="text-sm text-white/30">© 2026 HireHub Careers. Sample website for demonstration.</p>
        </div>
      </footer>

      {/* Application modal */}
      <AnimatePresence>
        {applying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setApplying(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-3xl bg-[#10163A] border border-indigo-400/30 max-w-md w-full p-8"
            >
              {applied ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-16 h-16 text-indigo-400 mx-auto" />
                  <h3 className="font-heading text-2xl font-black mt-5">Application sent!</h3>
                  <p className="mt-2 text-sm text-white/50">
                    Good luck, {application.name.split(' ')[0] || 'applicant'}! {applying.company} typically replies within 3 days.
                  </p>
                  <button onClick={() => setApplying(null)} className="mt-7 px-6 py-3 rounded-xl bg-indigo-500 text-white text-sm font-bold hover:bg-indigo-400 transition-colors">
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl font-black">Apply — {applying.title}</h3>
                    <button onClick={() => setApplying(null)} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/60 text-sm transition-colors">✕</button>
                  </div>
                  <p className="text-xs text-white/40 mt-1">{applying.company} · {applying.location}</p>
                  <div className="mt-6 space-y-4">
                    <input value={application.name} onChange={(e) => setApplication({ ...application, name: e.target.value })} placeholder="Full name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none placeholder:text-white/25 focus:border-indigo-400 text-sm transition-colors" />
                    <input value={application.email} onChange={(e) => setApplication({ ...application, email: e.target.value })} placeholder="Email address" type="email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none placeholder:text-white/25 focus:border-indigo-400 text-sm transition-colors" />
                    <textarea value={application.note} onChange={(e) => setApplication({ ...application, note: e.target.value })} placeholder="Why are you a great fit? (optional)" rows={3} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none placeholder:text-white/25 focus:border-indigo-400 text-sm transition-colors resize-none" />
                    <button onClick={submitApplication} disabled={!application.name || !application.email} className="w-full py-3.5 rounded-xl bg-indigo-500 text-white font-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-400 transition-colors">
                      Submit application
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating link back to the portfolio */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-xl bg-indigo-500 text-white text-xs font-black shadow-lg hover:bg-indigo-400 transition-colors"
      >
        ← Back to Portfolio
      </Link>
    </div>
  )
}
