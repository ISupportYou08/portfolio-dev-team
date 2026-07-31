'use client'

// Wanderly — sample travel app landing page (warm sand + deep teal).
// Interactive: search bar, destination filter chips, trip cards, itinerary steps.
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Search, Compass, Plane, Hotel, Camera, Star, ArrowRight } from 'lucide-react'

// Destination catalog — filtered by the active chip
const destinations = [
  { name: 'Santorini, Greece', country: 'Greece', category: 'Islands', price: 1890, rating: 4.9, days: 7, image: 'linear-gradient(135deg, #2DD4BF 0%, #0F766E 55%, #1E3A5F 100%)' },
  { name: 'Kyoto, Japan', country: 'Japan', category: 'Culture', price: 2250, rating: 4.8, days: 8, image: 'linear-gradient(135deg, #F472B6 0%, #BE185D 55%, #3B0764 100%)' },
  { name: 'Patagonia, Chile', country: 'Chile', category: 'Adventure', price: 3100, rating: 4.9, days: 10, image: 'linear-gradient(135deg, #34D399 0%, #059669 50%, #1E293B 100%)' },
  { name: 'Marrakech, Morocco', country: 'Morocco', category: 'Culture', price: 1450, rating: 4.7, days: 6, image: 'linear-gradient(135deg, #F59E0B 0%, #C2410C 55%, #78350F 100%)' },
  { name: 'Bali, Indonesia', country: 'Indonesia', category: 'Islands', price: 1680, rating: 4.8, days: 9, image: 'linear-gradient(135deg, #4ADE80 0%, #16A34A 50%, #065F46 100%)' },
  { name: 'Banff, Canada', country: 'Canada', category: 'Adventure', price: 1980, rating: 4.9, days: 6, image: 'linear-gradient(135deg, #93C5FD 0%, #2563EB 55%, #1E3A8A 100%)' },
  { name: 'Florence, Italy', country: 'Italy', category: 'Culture', price: 2120, rating: 4.8, days: 7, image: 'linear-gradient(135deg, #FDE68A 0%, #D97706 50%, #7C2D12 100%)' },
  { name: 'Reykjavik, Iceland', country: 'Iceland', category: 'Adventure', price: 2650, rating: 4.9, days: 8, image: 'linear-gradient(135deg, #A5F3FC 0%, #0891B2 50%, #1E293B 100%)' },
  { name: 'Lisbon, Portugal', country: 'Portugal', category: 'Islands', price: 1390, rating: 4.7, days: 5, image: 'linear-gradient(135deg, #FDBA74 0%, #EA580C 55%, #431407 100%)' },
]

const categories = ['All', 'Islands', 'Culture', 'Adventure']

const itinerary = [
  { step: '01', title: 'Tell us your vibe', text: 'Beach, food, mountains — pick your travel personality and budget.', icon: Compass },
  { step: '02', title: 'Get a custom plan', text: 'Our AI builds a day-by-day itinerary in minutes, not weeks.', icon: MapPin },
  { step: '03', title: 'Book everything', text: 'Flights, stays and experiences in one cart — no tab-hopping.', icon: Plane },
  { step: '04', title: 'Travel worry-free', text: 'Real-time alerts, offline maps and 24/7 human support.', icon: Hotel },
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

export default function WanderlyPage() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const visible = destinations.filter(
    (d) => (category === 'All' || d.category === category) && d.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#FDF8F0] text-[#0F172A] font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#FDF8F0]/85 backdrop-blur-xl border-b border-[#0F172A]/8">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-heading text-2xl font-black tracking-tight">
            Wander<span className="text-[#0F766E]">ly</span>
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#0F172A]/60">
            {['Destinations', 'Itinerary', 'Reviews'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#0F766E] transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <a href="#itinerary" className="px-5 py-2.5 rounded-full bg-[#0F766E] text-white text-sm font-bold hover:bg-[#115E59] transition-colors">
            Plan a Trip
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#2DD4BF]/20 blur-3xl" />
        <div className="absolute top-40 -left-40 w-96 h-96 rounded-full bg-[#F59E0B]/15 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0F766E]/30 text-[#0F766E] text-xs font-bold mb-7"
          >
            <Camera size={13} /> 80k+ trips planned in 2026
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-6xl md:text-7xl font-black leading-[0.95] tracking-tight"
          >
            Go further with
            <br />
            <span className="text-[#0F766E]">a plan that fits.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg text-[#0F172A]/55 max-w-lg mx-auto"
          >
            Wanderly builds personalized itineraries, books your trip end-to-end, and keeps you in the loop — wherever you go.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 p-2.5 rounded-3xl bg-white border border-[#0F172A]/10 shadow-xl shadow-[#0F766E]/5"
          >
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search size={18} className="text-[#0F766E] shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Where do you want to go?"
                className="w-full bg-transparent outline-none text-sm placeholder:text-[#0F172A]/35 py-2.5"
              />
            </div>
            <button className="px-7 py-3 rounded-2xl bg-[#0F766E] text-white text-sm font-bold hover:bg-[#115E59] transition-colors">
              Search
            </button>
          </motion.div>
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="max-w-6xl mx-auto px-6 py-16">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight">Top destinations</h2>
            {/* Filter chips */}
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${category === cat ? 'bg-[#0F766E] text-white' : 'bg-white border border-[#0F172A]/10 text-[#0F172A]/60 hover:border-[#0F766E]/50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((dest, i) => (
            <motion.div
              key={dest.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="group rounded-3xl overflow-hidden border border-[#0F172A]/10 bg-white shadow-sm hover:shadow-2xl hover:shadow-[#0F766E]/10 transition-shadow"
            >
              {/* Trip art */}
              <div className="relative h-52" style={{ background: dest.image }}>
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-black text-[#0F172A]">
                  {dest.category}
                </span>
                <div className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-[#0F766E]">View trip plan →</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-black">{dest.name}</h3>
                  <span className="flex items-center gap-1 text-sm font-bold text-[#0F766E]">
                    <Star size={14} className="fill-[#0F766E]" /> {dest.rating}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm text-[#0F172A]/50">
                  <span className="flex items-center gap-1.5"><MapPin size={14} /> {dest.country}</span>
                  <span>{dest.days} days</span>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-xl font-black">
                    ${dest.price.toLocaleString()}
                    <span className="text-sm font-medium text-[#0F172A]/40">/person</span>
                  </p>
                  <button className="px-5 py-2.5 rounded-full bg-[#0F172A] text-white text-xs font-bold hover:bg-[#0F766E] transition-colors">
                    Book now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {visible.length === 0 && (
          <p className="text-center py-16 text-[#0F172A]/40 font-medium">No destinations match “{query}” — try another search.</p>
        )}
      </section>

      {/* How it works */}
      <section id="itinerary" className="border-y border-[#0F172A]/8 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-[#0F766E] font-mono tracking-[0.3em] text-xs uppercase mb-4">How it works</p>
              <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight">Planned in four steps</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {itinerary.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.1}>
                <div className="relative p-7 rounded-3xl border border-[#0F172A]/10 bg-[#FDF8F0] hover:-translate-y-1.5 hover:border-[#0F766E]/40 transition-all duration-400 h-full">
                  <span className="text-4xl font-black text-[#0F766E]/15 absolute top-5 right-6">{step.step}</span>
                  <div className="w-12 h-12 rounded-2xl bg-[#0F766E]/10 border border-[#0F766E]/25 flex items-center justify-center text-[#0F766E]">
                    <step.icon size={22} />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-black">{step.title}</h3>
                  <p className="mt-2 text-sm text-[#0F172A]/55 leading-relaxed">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[#0F766E] px-8 py-16 text-center text-white">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#2DD4BF]/30 blur-3xl" />
            <p className="font-heading text-3xl md:text-5xl font-black tracking-tight leading-tight">Your next adventure is<br />one search away.</p>
            <button className="mt-8 inline-flex items-center gap-2 px-9 py-4 rounded-full bg-white text-[#0F766E] font-black hover:bg-[#FDF8F0] transition-colors">
              Plan my trip <ArrowRight size={18} />
            </button>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#0F172A]/8 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-heading text-2xl font-black tracking-tight">Wander<span className="text-[#0F766E]">ly</span></span>
          <p className="text-sm text-[#0F172A]/40">© 2026 Wanderly Travel. Sample website for demonstration.</p>
        </div>
      </footer>

      {/* Floating link back to the portfolio */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-full bg-[#0F766E] text-white text-xs font-black shadow-lg hover:bg-[#115E59] transition-colors"
      >
        ← Back to Portfolio
      </Link>
    </div>
  )
}
