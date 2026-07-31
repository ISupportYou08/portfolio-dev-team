'use client'

// Emilia — sample restaurant website (warm editorial style).
// Interactive: tabbed menu with add-to-order counter, working reservation form.
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Plus, Minus, Clock, MapPin, Phone, CheckCircle } from 'lucide-react'

// Menu items grouped by category, shown in tabs
const menu = {
  Starters: [
    { name: 'Burrata & Heirloom Tomatoes', price: 14, desc: 'Creamy burrata, basil oil, aged balsamic' },
    { name: 'Roasted Beets & Goat Cheese', price: 12, desc: 'Hazelnut crumble, honey-thyme vinaigrette' },
    { name: 'Truffle Arancini', price: 13, desc: 'Wild mushroom risotto, parmesan foam' },
    { name: 'Charred Octopus', price: 18, desc: 'Fingerling potatoes, smoked paprika aioli' },
  ],
  Mains: [
    { name: 'Handmade Tagliatelle', price: 22, desc: 'Slow-cooked beef ragù, 24-month parmesan' },
    { name: 'Crispy Skin Salmon', price: 26, desc: 'Saffron risotto, charred lemon, dill oil' },
    { name: 'Grilled Lamb Chops', price: 32, desc: 'Rosemary jus, roasted root vegetables' },
    { name: 'Parmesan Crusted Chicken', price: 24, desc: 'Wild mushroom sauce, garlic mash' },
  ],
  Desserts: [
    { name: 'Pistachio Panna Cotta', price: 10, desc: 'Amarena cherries, crushed pistachio' },
    { name: 'Dark Chocolate Tart', price: 11, desc: '70% single-origin, sea salt, crème fraîche' },
    { name: 'Tiramisu del Giorno', price: 10, desc: 'Espresso-soaked savoiardi, mascarpone' },
  ],
}

const tabs = Object.keys(menu)

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

export default function EmiliaPage() {
  // Active menu tab and total dishes added to the order
  const [activeTab, setActiveTab] = useState('Mains')
  const [orderCount, setOrderCount] = useState(0)
  // Reservation form state
  const [reservation, setReservation] = useState({ name: '', date: '', guests: '2' })
  const [reserved, setReserved] = useState(false)

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2B2118] font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#FAF6F0]/85 backdrop-blur-xl border-b border-[#2B2118]/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-heading text-2xl italic font-bold tracking-tight">Emilia</span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#2B2118]/70">
            {['Story', 'Menu', 'Reserve'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#C4552D] transition-colors">
                {item}
              </a>
            ))}
          </nav>
          {/* Live order counter */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#C4552D]/30 bg-white">
            <Plus size={14} className="text-[#C4552D]" />
            <span className="text-sm font-semibold">{orderCount}</span>
            <span className="text-xs text-[#2B2118]/50">in your order</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#C4552D] font-mono tracking-[0.35em] text-xs uppercase mb-6"
          >
            Modern Italian · Since 1998
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-5xl md:text-6xl font-bold leading-[1.08]"
          >
            Seasonal. Local.
            <span className="italic text-[#C4552D]"> Unforgettable.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg text-[#2B2118]/60 leading-relaxed max-w-md"
          >
            A modern Italian kitchen rooted in family recipes. Pasta made by hand each morning, produce from farms we visit ourselves.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a href="#reserve" className="px-7 py-3.5 rounded-full bg-[#C4552D] text-[#FAF6F0] font-semibold hover:bg-[#A84425] transition-colors">
              Reserve a Table
            </a>
            <a href="#menu" className="px-7 py-3.5 rounded-full border border-[#2B2118]/25 hover:border-[#C4552D] hover:text-[#C4552D] transition-colors">
              View Menu
            </a>
          </motion.div>
        </div>

        {/* Hero visual — a stylized dish plate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative flex items-center justify-center py-10"
        >
          <div className="absolute w-80 h-80 rounded-full bg-[#C4552D]/15 blur-3xl" />
          <div className="relative w-72 h-72 rounded-full bg-gradient-to-br from-[#E0A45F] to-[#B97B3C] border-8 border-[#2B2118]/10 shadow-2xl shadow-[#B97B3C]/30">
            <div className="absolute inset-8 rounded-full bg-[#FAF6F0]/20 flex items-center justify-center">
              <span className="text-[#FAF6F0] font-heading italic text-6xl font-bold">E</span>
            </div>
          </div>
          {/* Floating info chips */}
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-6 -right-2 px-4 py-2.5 rounded-2xl bg-white shadow-lg">
            <p className="text-xs text-[#2B2118]/50">Signature</p>
            <p className="text-sm font-semibold">Handmade Pesto</p>
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute bottom-8 -left-4 px-4 py-2.5 rounded-2xl bg-white shadow-lg">
            <p className="text-xs text-[#2B2118]/50">Wine list</p>
            <p className="text-sm font-semibold">120+ labels</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Story */}
      <section id="story" className="border-y border-[#2B2118]/10 bg-white/60">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
          {[
            { title: 'From the market', text: 'Our chefs shop the farmers market every morning and build the day\'s specials around what is freshest.' },
            { title: 'Handmade daily', text: 'Pasta, bread, and desserts are crafted in-house — no shortcuts, no freezers, no compromises.' },
            { title: 'Family recipes', text: 'Chef Lucia\'s nonna\'s sauces, handed down three generations and perfected over 28 years.' },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="group">
                <span className="text-5xl font-heading italic text-[#C4552D]/25 group-hover:text-[#C4552D]/50 transition-colors">0{i + 1}</span>
                <h3 className="mt-3 font-heading text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-[#2B2118]/60 leading-relaxed text-sm">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-[#C4552D] font-mono tracking-[0.35em] text-xs uppercase mb-4">Menu</p>
            <h2 className="font-heading text-4xl font-bold">From our kitchen tonight</h2>
            {/* Menu tabs */}
            <div className="mt-8 inline-flex flex-wrap justify-center gap-2 rounded-full border border-[#2B2118]/15 bg-white p-1.5">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === tab ? 'bg-[#C4552D] text-[#FAF6F0]' : 'text-[#2B2118]/60 hover:text-[#C4552D]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto"
        >
          {menu[activeTab as keyof typeof menu].map((item) => (
            <div key={item.name} className="group flex items-start justify-between gap-6 border-b border-dashed border-[#2B2118]/15 pb-6">
              <div>
                <h3 className="font-heading font-semibold text-lg group-hover:text-[#C4552D] transition-colors">{item.name}</h3>
                <p className="mt-1 text-sm text-[#2B2118]/55">{item.desc}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-heading font-bold text-[#C4552D]">${item.price}</span>
                {/* Add dish to the order counter */}
                <button
                  onClick={() => setOrderCount((c) => c + 1)}
                  aria-label={`Add ${item.name} to order`}
                  className="w-8 h-8 rounded-full border border-[#C4552D]/30 flex items-center justify-center hover:bg-[#C4552D] hover:text-[#FAF6F0] transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Hours + Reservation */}
      <section id="reserve" className="bg-[#2B2118] text-[#FAF6F0] py-24">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14">
          {/* Opening hours */}
          <Reveal>
            <div>
              <p className="text-[#D99E73] font-mono tracking-[0.35em] text-xs uppercase mb-4">Visit us</p>
              <h2 className="font-heading text-4xl font-bold">Dinner is served nightly</h2>
              <div className="mt-8 space-y-4">
                {[
                  { day: 'Monday — Thursday', hours: '5:00 PM – 10:00 PM' },
                  { day: 'Friday — Saturday', hours: '5:00 PM – 11:00 PM' },
                  { day: 'Sunday', hours: '4:00 PM – 9:00 PM' },
                ].map((row) => (
                  <div key={row.day} className="flex items-center justify-between border-b border-[#FAF6F0]/10 pb-4">
                    <span className="flex items-center gap-3 text-[#FAF6F0]/70"><Clock size={15} /> {row.day}</span>
                    <span className="font-semibold">{row.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-3 text-sm text-[#FAF6F0]/60">
                <p className="flex items-center gap-3"><MapPin size={15} className="text-[#D99E73]" /> 214 Olive Street, Little Italy</p>
                <p className="flex items-center gap-3"><Phone size={15} className="text-[#D99E73]" /> +1 (555) 014-0198</p>
              </div>
            </div>
          </Reveal>

          {/* Reservation form */}
          <Reveal delay={0.15}>
            <div className="rounded-3xl bg-white/5 border border-[#FAF6F0]/10 p-8">
              {reserved ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 gap-4">
                  <CheckCircle size={48} className="text-[#D99E73]" />
                  <h3 className="font-heading text-2xl font-bold">Table reserved!</h3>
                  <p className="text-[#FAF6F0]/60 max-w-xs">
                    Thank you {reservation.name || 'friend'} — we look forward to seeing you on {reservation.date || 'your date'}.
                  </p>
                  <button
                    onClick={() => { setReserved(false); setReservation({ name: '', date: '', guests: '2' }) }}
                    className="mt-4 px-6 py-3 rounded-full border border-[#D99E73]/40 text-sm font-semibold hover:bg-[#D99E73] hover:text-[#2B2118] transition-colors"
                  >
                    Make another reservation
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-heading text-2xl font-bold mb-6">Reserve a table</h3>
                  <form
                    className="space-y-5"
                    onSubmit={(e) => {
                      e.preventDefault()
                      setReserved(true)
                    }}
                  >
                    <input
                      required
                      value={reservation.name}
                      onChange={(e) => setReservation({ ...reservation, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full rounded-xl bg-white/5 border border-[#FAF6F0]/15 px-5 py-3.5 text-sm outline-none focus:border-[#D99E73] placeholder:text-[#FAF6F0]/30"
                    />
                    <input
                      required
                      type="date"
                      value={reservation.date}
                      onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
                      className="w-full rounded-xl bg-white/5 border border-[#FAF6F0]/15 px-5 py-3.5 text-sm outline-none focus:border-[#D99E73] [color-scheme:dark]"
                    />
                    {/* Guest count stepper */}
                    <div className="flex items-center justify-between rounded-xl bg-white/5 border border-[#FAF6F0]/15 px-5 py-3">
                      <span className="text-sm text-[#FAF6F0]/70">Guests</span>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setReservation((r) => ({ ...r, guests: String(Math.max(1, Number(r.guests) - 1)) }))}
                          className="w-8 h-8 rounded-full border border-[#FAF6F0]/25 flex items-center justify-center hover:border-[#D99E73] transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="font-semibold w-6 text-center">{reservation.guests}</span>
                        <button
                          type="button"
                          onClick={() => setReservation((r) => ({ ...r, guests: String(Math.min(12, Number(r.guests) + 1)) }))}
                          className="w-8 h-8 rounded-full border border-[#FAF6F0]/25 flex items-center justify-center hover:border-[#D99E73] transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                    <button type="submit" className="w-full py-4 rounded-xl bg-[#C4552D] font-semibold hover:bg-[#A84425] transition-colors">
                      Confirm Reservation
                    </button>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-heading italic text-xl font-bold">Emilia</span>
          <p className="text-sm text-[#2B2118]/50">© 2026 Emilia Ristorante. Sample website for demonstration.</p>
        </div>
      </footer>

      {/* Floating link back to the portfolio */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-full bg-[#C4552D] text-[#FAF6F0] text-xs font-semibold shadow-lg hover:bg-[#A84425] transition-colors"
      >
        ← Back to Portfolio
      </Link>
    </div>
  )
}
