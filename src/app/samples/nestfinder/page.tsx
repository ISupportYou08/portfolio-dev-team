'use client'

// NestFinder — sample real estate platform (deep green).
// Interactive: sale/rent + beds filters, property cards, mortgage calculator with sliders.
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Home, Bath, Ruler, MapPin, Calculator, KeyRound, Star } from 'lucide-react'

// Property catalog — filtered by listing type and minimum beds
const properties = [
  { title: 'Modern Lakeside Villa', location: 'Tagaytay, PH', price: 18500000, type: 'For Sale', beds: 4, baths: 3, sqm: 320, image: 'linear-gradient(135deg, #34D399 0%, #059669 55%, #064E3B 100%)', badge: 'New' },
  { title: 'Cozy Loft Condo', location: 'BGC, Taguig', price: 9500, type: 'For Rent', beds: 1, baths: 1, sqm: 48, image: 'linear-gradient(135deg, #6EE7B7 0%, #10B981 55%, #065F46 100%)' },
  { title: 'Family Townhouse', location: 'Antipolo, Rizal', price: 6800000, type: 'For Sale', beds: 3, baths: 2, sqm: 150, image: 'linear-gradient(135deg, #A7F3D0 0%, #047857 55%, #064E3B 100%)' },
  { title: 'Studio by the Bay', location: 'Pasay, PH', price: 8500, type: 'For Rent', beds: 1, baths: 1, sqm: 35, image: 'linear-gradient(135deg, #86EFAC 0%, #16A34A 55%, #14532D 100%)' },
  { title: 'Executive Penthouse', location: 'Makati, PH', price: 42000000, type: 'For Sale', beds: 5, baths: 4, sqm: 480, image: 'linear-gradient(135deg, #4ADE80 0%, #059669 55%, #022C22 100%)', badge: 'Premium' },
  { title: 'Riverside Duplex', location: 'Naga, Camarines Sur', price: 5200, type: 'For Rent', beds: 2, baths: 1, sqm: 90, image: 'linear-gradient(135deg, #BBF7D0 0%, #15803D 55%, #052E16 100%)' },
]

const bedsOptions = ['Any beds', '1+', '2+', '3+', '4+']

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

export default function NestFinderPage() {
  const [listingType, setListingType] = useState('All')
  const [minBeds, setMinBeds] = useState('Any beds')

  // Mortgage calculator inputs
  const [price, setPrice] = useState(5000000)
  const [downPayment, setDownPayment] = useState(20)
  const [years, setYears] = useState(20)
  const loan = price * (1 - downPayment / 100)
  const rate = 0.065
  const monthly = (loan * (rate / 12)) / (1 - Math.pow(1 + rate / 12, -years * 12))

  const visible = properties.filter(
    (p) => (listingType === 'All' || p.type === listingType) && (minBeds === 'Any beds' || p.beds >= parseInt(minBeds))
  )

  return (
    <div className="min-h-screen bg-[#071210] text-[#ECFDF5] font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#071210]/85 backdrop-blur-xl border-b border-emerald-400/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="flex items-center gap-2.5 font-heading text-xl font-black tracking-tight">
            <span className="w-9 h-9 rounded-xl bg-emerald-400/15 border border-emerald-400/40 flex items-center justify-center">
              <Home size={18} className="text-emerald-400" />
            </span>
            Nest<span className="text-emerald-400">Finder</span>
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#ECFDF5]/60">
            {['Listings', 'Agents', 'Calculator'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-emerald-400 transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <a href="#calculator" className="px-5 py-2.5 rounded-xl bg-emerald-400 text-[#071210] text-sm font-black hover:bg-emerald-300 transition-colors">
            List a Property
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/40 text-emerald-300 text-xs font-bold mb-7"
          >
            <KeyRound size={13} /> 15,000+ homes matched this year
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-6xl md:text-7xl font-black leading-[0.95] tracking-tight"
          >
            Find a home
            <br />
            <span className="text-emerald-400">that feels like you.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg text-[#ECFDF5]/50 max-w-lg mx-auto"
          >
            Browse verified listings, compare neighborhoods, and know exactly what your mortgage will cost — before you visit.
          </motion.p>
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="max-w-6xl mx-auto px-6 py-16">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight">Featured listings</h2>
            <div className="flex flex-wrap items-center gap-2">
              {/* Sale/rent toggle */}
              <div className="flex p-1 rounded-full border border-emerald-400/25 bg-white/[0.03]">
                {['All', 'For Sale', 'For Rent'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setListingType(type)}
                    className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${listingType === type ? 'bg-emerald-400 text-[#071210]' : 'text-[#ECFDF5]/55 hover:text-emerald-300'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {/* Bed filter */}
              <select
                value={minBeds}
                onChange={(e) => setMinBeds(e.target.value)}
                className="px-4 py-2 rounded-full border border-emerald-400/25 bg-[#0B1F19] text-sm font-bold text-[#ECFDF5]/80 outline-none cursor-pointer hover:border-emerald-400/60 transition-colors"
              >
                {bedsOptions.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div key={listingType + minBeds} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((prop, i) => (
              <Reveal key={prop.title} delay={i * 0.06}>
                <div className="group rounded-3xl overflow-hidden border border-emerald-400/15 bg-[#0B1F19] hover:border-emerald-400/50 hover:-translate-y-1.5 transition-all duration-400">
                  <div className="relative h-48" style={{ background: prop.image }}>
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#071210]/80 backdrop-blur text-[10px] font-black text-emerald-300 uppercase tracking-wider">
                      {prop.type}
                    </span>
                    {prop.badge && (
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-400 text-[#071210] text-[10px] font-black uppercase tracking-wider">
                        {prop.badge}
                      </span>
                    )}
                    <div className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-4 py-2 rounded-full bg-[#071210]/80 backdrop-blur text-xs font-bold text-emerald-300">Schedule a tour →</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-black">{prop.title}</h3>
                    <p className="mt-1.5 text-sm text-[#ECFDF5]/50 flex items-center gap-1.5">
                      <MapPin size={13} className="text-emerald-400" /> {prop.location}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-[#ECFDF5]/55">
                      <span className="flex items-center gap-1.5"><Home size={14} className="text-emerald-400" /> {prop.beds} beds</span>
                      <span className="flex items-center gap-1.5"><Bath size={14} className="text-emerald-400" /> {prop.baths} baths</span>
                      <span className="flex items-center gap-1.5"><Ruler size={14} className="text-emerald-400" /> {prop.sqm} m²</span>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <p className="text-xl font-black text-emerald-300">
                        {prop.type === 'For Rent' ? `₱${prop.price.toLocaleString()}/mo` : `₱${(prop.price / 1000000).toFixed(1)}M`}
                      </p>
                      <button className="px-5 py-2.5 rounded-full bg-[#071210] border border-emerald-400/30 text-emerald-300 text-xs font-bold hover:bg-emerald-400 hover:text-[#071210] transition-colors">
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Mortgage calculator */}
      <section id="calculator" className="border-y border-emerald-400/10 bg-[#0B1F19]/40">
        <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <p className="text-emerald-400 font-mono tracking-[0.3em] text-xs uppercase mb-4">Calculator</p>
              <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight leading-tight">What will your mortgage cost?</h2>
              <p className="mt-5 text-[#ECFDF5]/50 leading-relaxed max-w-md">
                Drag the sliders to see a realistic monthly estimate at 6.5% interest — no hidden fees, no surprises.
              </p>
              <div className="mt-10 rounded-3xl border border-emerald-400/25 bg-[#071210] p-8 text-center">
                <p className="text-xs tracking-[0.3em] uppercase text-[#ECFDF5]/40 font-mono">Estimated monthly payment</p>
                <p className="mt-3 text-5xl font-black text-emerald-400">₱{Math.round(monthly).toLocaleString()}</p>
                <p className="mt-2 text-xs text-[#ECFDF5]/40">Loan of ₱{Math.round(loan).toLocaleString()} over {years} years</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-emerald-400/20 bg-[#0B1F19] p-8 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold">Property price</label>
                  <span className="text-sm font-black text-emerald-300">₱{(price / 1000000).toFixed(1)}M</span>
                </div>
                <input type="range" min={1000000} max={30000000} step={500000} value={price} onChange={(e) => setPrice(parseInt(e.target.value))} className="w-full accent-emerald-400 cursor-pointer" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold">Down payment</label>
                  <span className="text-sm font-black text-emerald-300">{downPayment}%</span>
                </div>
                <input type="range" min={5} max={50} step={5} value={downPayment} onChange={(e) => setDownPayment(parseInt(e.target.value))} className="w-full accent-emerald-400 cursor-pointer" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold">Loan term</label>
                  <span className="text-sm font-black text-emerald-300">{years} years</span>
                </div>
                <input type="range" min={5} max={30} step={5} value={years} onChange={(e) => setYears(parseInt(e.target.value))} className="w-full accent-emerald-400 cursor-pointer" />
              </div>
              <button className="w-full py-4 rounded-xl bg-emerald-400 text-[#071210] font-black hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2">
                <Calculator size={18} /> Get pre-approval
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Agents */}
      <section id="agents" className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-emerald-400 font-mono tracking-[0.3em] text-xs uppercase mb-4">Agents</p>
            <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight">Local experts</h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { name: 'Carla Dimaculangan', role: 'Metro Manila', initials: 'CD', rating: 4.9 },
            { name: 'Joel Ramirez', role: 'Tagaytay & Batangas', initials: 'JR', rating: 4.8 },
            { name: 'Anna Villanueva', role: 'Visayas Region', initials: 'AV', rating: 5.0 },
          ].map((agent, i) => (
            <Reveal key={agent.name} delay={i * 0.1}>
              <div className="group text-center p-8 rounded-3xl border border-emerald-400/15 bg-[#0B1F19] hover:border-emerald-400/50 transition-colors duration-400">
                <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center text-3xl font-black text-[#071210] mb-5">
                  {agent.initials}
                </div>
                <h3 className="font-heading font-black">{agent.name}</h3>
                <p className="mt-1 text-sm text-[#ECFDF5]/45">{agent.role}</p>
                <div className="mt-4 flex items-center justify-center gap-1 text-emerald-400">
                  {[...Array(5)].map((_, s) => <Star key={s} size={13} className="fill-emerald-400" />)}
                  <span className="ml-1 text-xs text-[#ECFDF5]/50">{agent.rating}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-400/10 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-heading font-black tracking-tight">Nest<span className="text-emerald-400">Finder</span></span>
          <p className="text-sm text-[#ECFDF5]/30">© 2026 NestFinder Realty. Sample website for demonstration.</p>
        </div>
      </footer>

      {/* Floating link back to the portfolio */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-xl bg-emerald-400 text-[#071210] text-xs font-black shadow-lg hover:bg-emerald-300 transition-colors"
      >
        ← Back to Portfolio
      </Link>
    </div>
  )
}
