'use client'

// Sweatbase — sample fitness app landing page (bold dark + volt).
// Interactive: animated stat counters, program tabs, trainer cards, pricing tiers.
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Dumbbell, Flame, HeartPulse, Sparkles, Star, ArrowRight, Play } from 'lucide-react'

// Program catalog — content swaps when the active tab changes
const programs = {
  Strength: [
    { name: 'Power Builder', level: 'Intermediate', minutes: 45, focus: 'Heavy compound lifts' },
    { name: 'Sculpt & Tone', level: 'Beginner', minutes: 30, focus: 'Bodyweight + dumbbells' },
    { name: 'Deadlift 12', level: 'Advanced', minutes: 60, focus: 'Pull strength cycle' },
  ],
  HIIT: [
    { name: 'Inferno 20', level: 'All levels', minutes: 20, focus: 'Fat-burning intervals' },
    { name: 'Tabata Blast', level: 'Intermediate', minutes: 25, focus: '8-round tabata sets' },
    { name: 'Boxer Engine', level: 'Advanced', minutes: 40, focus: 'Combat conditioning' },
  ],
  Yoga: [
    { name: 'Flow & Breathe', level: 'Beginner', minutes: 35, focus: 'Slow vinyasa flows' },
    { name: 'Power Flexibility', level: 'Intermediate', minutes: 45, focus: 'Strength + mobility' },
    { name: 'Deep Stretch Reset', level: 'All levels', minutes: 30, focus: 'Recovery & release' },
  ],
  Mobility: [
    { name: 'Joint Reset', level: 'Beginner', minutes: 20, focus: 'Daily movement repair' },
    { name: 'Athlete Warm-up', level: 'Intermediate', minutes: 25, focus: 'Pre-training prep' },
    { name: 'Hip & Spine Rx', level: 'All levels', minutes: 30, focus: 'Posture correction' },
  ],
}

const tabKeys = Object.keys(programs)

// Animated number counter that counts up when scrolled into view
function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      setValue(Math.round(end * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, end])

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}

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

export default function SweatbasePage() {
  const [activeProgram, setActiveProgram] = useState('Strength')

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-heading text-xl font-black tracking-tight">
            SWEAT<span className="text-[#C6FF3D]">BASE</span>
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
            {['Programs', 'Coaches', 'Pricing'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#C6FF3D] transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <a href="#pricing" className="px-5 py-2.5 rounded-lg bg-[#C6FF3D] text-[#0A0A0A] text-sm font-black hover:bg-white transition-colors">
            Start Free
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C6FF3D]/40 text-[#C6FF3D] text-xs font-bold mb-7"
          >
            <Flame size={13} /> 12,000+ athletes training now
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-6xl md:text-7xl font-black leading-[0.95] uppercase tracking-tight"
          >
            Train hard.
            <br />
            <span className="text-[#C6FF3D]">Live loud.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg text-white/50 max-w-md"
          >
            Programmed by world-class coaches. Delivered to your phone. No equipment excuses — from apartment to arena.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a href="#pricing" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#C6FF3D] text-[#0A0A0A] font-black hover:bg-white transition-colors">
              Start Training Free <ArrowRight size={18} />
            </a>
            <a href="#programs" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/20 font-bold hover:border-[#C6FF3D] hover:text-[#C6FF3D] transition-colors">
              <Play size={17} /> Watch demo
            </a>
          </motion.div>
        </div>

        {/* Hero visual — fitness score ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative flex items-center justify-center py-10"
        >
          <div className="absolute w-96 h-96 bg-[#C6FF3D]/10 blur-3xl rounded-full" />
          <div className="relative w-72 h-72 rounded-full border-4 border-white/10 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#C6FF3D"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="276.5"
                initial={{ strokeDashoffset: 276.5 }}
                animate={{ strokeDashoffset: 276.5 * 0.16 }}
                transition={{ duration: 1.4, delay: 0.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="text-center">
              <p className="text-6xl font-black text-[#C6FF3D]">
                <Counter end={84} suffix="%" />
              </p>
              <p className="mt-1 text-xs tracking-[0.3em] uppercase text-white/40 font-mono">Fitness score</p>
            </div>
          </div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-2 right-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
            <p className="text-[10px] text-white/40">This week</p>
            <p className="text-sm font-bold">5 sessions done</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-3 gap-6 text-center">
          {[
            { end: 500, suffix: '+', label: 'Programs' },
            { end: 12000, suffix: '+', label: 'Athletes' },
            { end: 4.9, suffix: '★', label: 'App rating' },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <p className="text-4xl md:text-5xl font-black text-[#C6FF3D]">
                <Counter end={stat.end} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-xs tracking-[0.25em] uppercase text-white/40 font-mono">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-[#C6FF3D] font-mono tracking-[0.3em] text-xs uppercase mb-4">Programs</p>
            <h2 className="font-heading text-4xl md:text-5xl font-black uppercase">Find your grind</h2>
            {/* Program tabs */}
            <div className="mt-8 inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl border border-white/10 bg-white/5">
              {tabKeys.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveProgram(tab)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeProgram === tab ? 'bg-[#C6FF3D] text-[#0A0A0A]' : 'text-white/60 hover:text-white'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <motion.div
          key={activeProgram}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {programs[activeProgram as keyof typeof programs].map((prog, i) => (
            <Reveal key={prog.name} delay={i * 0.08}>
              <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:border-[#C6FF3D]/60 hover:-translate-y-1.5 hover:bg-[#C6FF3D]/5 transition-all duration-400">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#C6FF3D]/10 border border-[#C6FF3D]/30 flex items-center justify-center text-[#C6FF3D] group-hover:bg-[#C6FF3D] group-hover:text-[#0A0A0A] transition-colors">
                    {activeProgram === 'Strength' ? <Dumbbell size={22} /> : activeProgram === 'HIIT' ? <Flame size={22} /> : activeProgram === 'Yoga' ? <Sparkles size={22} /> : <HeartPulse size={22} />}
                  </div>
                  <span className="text-[10px] px-3 py-1 rounded-full border border-white/15 text-white/50 font-mono uppercase tracking-wider">{prog.level}</span>
                </div>
                <h3 className="mt-6 font-heading text-xl font-black uppercase">{prog.name}</h3>
                <p className="mt-1.5 text-sm text-white/45">{prog.focus}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#C6FF3D]">{prog.minutes} min</span>
                  <button className="text-xs font-bold uppercase tracking-wider text-white/50 group-hover:text-[#C6FF3D] transition-colors">Start →</button>
                </div>
              </div>
            </Reveal>
          ))}
        </motion.div>
      </section>

      {/* Coaches */}
      <section id="coaches" className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[#C6FF3D] font-mono tracking-[0.3em] text-xs uppercase mb-4">Coaches</p>
              <h2 className="font-heading text-4xl md:text-5xl font-black uppercase">Learn from the best</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { name: 'Mara Delgado', role: 'Strength & Power', initials: 'MD', accent: 'from-[#C6FF3D] to-[#8FB51F]' },
              { name: 'Ken Okafor', role: 'HIIT & Conditioning', initials: 'KO', accent: 'from-white to-[#8a8a8a]' },
              { name: 'Yuki Tanaka', role: 'Mobility & Recovery', initials: 'YT', accent: 'from-[#3D9BFF] to-[#1D5EA8]' },
            ].map((coach, i) => (
              <Reveal key={coach.name} delay={i * 0.1}>
                <div className="group text-center p-8 rounded-3xl border border-white/10 hover:border-[#C6FF3D]/50 transition-colors duration-400">
                  <div className={`mx-auto w-24 h-24 rounded-full bg-gradient-to-br ${coach.accent} flex items-center justify-center text-3xl font-black text-[#0A0A0A] mb-5`}>
                    {coach.initials}
                  </div>
                  <h3 className="font-heading font-black uppercase">{coach.name}</h3>
                  <p className="mt-1 text-sm text-white/45">{coach.role}</p>
                  <div className="mt-4 flex items-center justify-center gap-1 text-[#C6FF3D]">
                    {[...Array(5)].map((_, s) => <Star key={s} size={13} className="fill-[#C6FF3D]" />)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-[#C6FF3D] font-mono tracking-[0.3em] text-xs uppercase mb-4">Pricing</p>
            <h2 className="font-heading text-4xl md:text-5xl font-black uppercase">Pick your plan</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Rookie', price: 0, tagline: 'Get a taste of the grind', perks: ['3 programs', 'Community workouts', 'Basic tracking'] },
            { name: 'Athlete', price: 12, tagline: 'The full Sweatbase experience', perks: ['All 500+ programs', 'Custom training plans', 'Coach check-ins', 'Offline downloads'], popular: true },
            { name: 'Elite', price: 25, tagline: 'For serious competitors', perks: ['Everything in Athlete', '1-on-1 coaching calls', 'Diet & recovery plans', 'Early feature access'] },
          ].map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1}>
              <div className={`relative rounded-3xl p-8 h-full flex flex-col ${plan.popular ? 'bg-[#C6FF3D] text-[#0A0A0A] shadow-[0_0_60px_-15px_rgba(198,255,61,0.4)] md:-translate-y-2' : 'border border-white/10 bg-white/[0.03] hover:border-white/25 transition-colors'}`}>
                {plan.popular && <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0A0A0A] text-[#C6FF3D] text-xs font-black uppercase tracking-wider">Most popular</span>}
                <h3 className={`font-heading font-black uppercase text-lg ${plan.popular ? '' : 'text-[#C6FF3D]'}`}>{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-black">${plan.price}</span>
                  <span className={plan.popular ? 'text-[#0A0A0A]/50' : 'text-white/40'}>/month</span>
                </div>
                <p className={`mt-1 text-sm ${plan.popular ? 'text-[#0A0A0A]/60' : 'text-white/40'}`}>{plan.tagline}</p>
                <ul className={`mt-7 space-y-3 flex-1 text-sm`}>
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${plan.popular ? 'bg-[#0A0A0A]' : 'bg-[#C6FF3D]'}`} />
                      {perk}
                    </li>
                  ))}
                </ul>
                <button className={`mt-8 w-full py-3.5 rounded-xl text-sm font-black transition-colors ${plan.popular ? 'bg-[#0A0A0A] text-[#C6FF3D] hover:bg-black' : 'bg-[#C6FF3D] text-[#0A0A0A] hover:bg-white'}`}>
                  {plan.price === 0 ? 'Join free' : `Get ${plan.name}`}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden border border-[#C6FF3D]/40 bg-[#C6FF3D] px-8 py-16 text-center text-[#0A0A0A]">
            <p className="font-heading text-3xl md:text-5xl font-black uppercase leading-tight">No excuses. <br /> Show up today.</p>
            <a href="#pricing" className="inline-flex items-center gap-2 mt-8 px-9 py-4 rounded-lg bg-[#0A0A0A] text-[#C6FF3D] font-black hover:bg-black transition-colors">
              Start Free — it&apos;s on us <ArrowRight size={18} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-heading font-black tracking-tight">SWEAT<span className="text-[#C6FF3D]">BASE</span></span>
          <p className="text-sm text-white/35">© 2026 Sweatbase Fitness. Sample website for demonstration.</p>
        </div>
      </footer>

      {/* Floating link back to the portfolio */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-lg bg-[#C6FF3D] text-[#0A0A0A] text-xs font-black shadow-lg hover:bg-white transition-colors"
      >
        ← Back to Portfolio
      </Link>
    </div>
  )
}
