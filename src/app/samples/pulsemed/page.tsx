'use client'

// PulseMed — sample healthcare booking system (dark + medical teal).
// Interactive: specialty filter, doctor cards, appointment form with success state, live queue board.
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { HeartPulse, Stethoscope, CalendarCheck, Clock, Star, CheckCircle, Users, Syringe, Activity, Pill } from 'lucide-react'

// Doctor catalog — filtered by specialty chip
const doctors = [
  { name: 'Dr. Maya Santos', specialty: 'Cardiology', rating: 4.9, patients: 2840, color: 'from-[#4FD1C5] to-[#2C7A7B]', initials: 'MS' },
  { name: 'Dr. Leo Mercado', specialty: 'Pediatrics', rating: 4.8, patients: 3210, color: 'from-[#81E6D9] to-[#285E61]', initials: 'LM' },
  { name: 'Dr. Aria Reyes', specialty: 'Neurology', rating: 5.0, patients: 1940, color: 'from-[#63B3ED] to-[#2B6CB0]', initials: 'AR' },
  { name: 'Dr. Noah Bautista', specialty: 'Orthopedics', rating: 4.7, patients: 2280, color: 'from-[#4FD1C5] to-[#2C7A7B]', initials: 'NB' },
  { name: 'Dr. Elena Cruz', specialty: 'Dermatology', rating: 4.9, patients: 2650, color: 'from-[#B794F4] to-[#6B46C1]', initials: 'EC' },
  { name: 'Dr. Sam Dela Cruz', specialty: 'Cardiology', rating: 4.8, patients: 3100, color: 'from-[#81E6D9] to-[#234E52]', initials: 'SD' },
]

const specialties = ['All', 'Cardiology', 'Pediatrics', 'Neurology', 'Orthopedics', 'Dermatology']

const services = [
  { icon: Stethoscope, title: 'General Check-up', text: 'Annual physicals and preventive screenings.' },
  { icon: Syringe, title: 'Vaccination', text: 'Immunizations for every stage of life.' },
  { icon: Activity, title: 'Lab Diagnostics', text: 'Blood work and imaging with fast results.' },
  { icon: Pill, title: 'Pharmacy', text: 'Prescriptions filled and delivered same-day.' },
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

export default function PulseMedPage() {
  const [specialty, setSpecialty] = useState('All')
  const [appointment, setAppointment] = useState({ name: '', date: '', time: '' })
  const [appointmentBooked, setAppointmentBooked] = useState(false)

  const visible = doctors.filter((d) => specialty === 'All' || d.specialty === specialty)

  const bookAppointment = () => {
    if (!appointment.name || !appointment.date || !appointment.time) return
    setAppointmentBooked(true)
  }

  return (
    <div className="min-h-screen bg-[#06121A] text-[#E6FFFB] font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#06121A]/85 backdrop-blur-xl border-b border-[#4FD1C5]/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="flex items-center gap-2.5 font-heading text-xl font-black tracking-tight">
            <span className="w-9 h-9 rounded-xl bg-[#4FD1C5]/15 border border-[#4FD1C5]/40 flex items-center justify-center">
              <HeartPulse size={19} className="text-[#4FD1C5]" />
            </span>
            Pulse<span className="text-[#4FD1C5]">Med</span>
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#E6FFFB]/60">
            {['Doctors', 'Services', 'Queue'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#4FD1C5] transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <a href="#book" className="px-5 py-2.5 rounded-xl bg-[#4FD1C5] text-[#06121A] text-sm font-black hover:bg-[#81E6D9] transition-colors">
            Book Now
          </a>
        </div>
      </header>

      {/* Hero + appointment form */}
      <section id="book" className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4FD1C5]/40 text-[#4FD1C5] text-xs font-bold mb-7"
          >
            <Users size={13} /> Trusted by 120,000+ patients
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-6xl md:text-7xl font-black leading-[0.95] tracking-tight"
          >
            Your health,
            <br />
            <span className="text-[#4FD1C5]">on schedule.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg text-[#E6FFFB]/50 max-w-md"
          >
            Book specialists in seconds, skip the waiting room, and track your care in one secure record.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a href="#doctors" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#4FD1C5] text-[#06121A] font-black hover:bg-[#81E6D9] transition-colors">
              <CalendarCheck size={18} /> Find a Doctor
            </a>
            <a href="#services" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#4FD1C5]/30 font-bold text-[#4FD1C5] hover:bg-[#4FD1C5]/10 transition-colors">
              Our Services
            </a>
          </motion.div>
        </div>

        {/* Appointment form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl border border-[#4FD1C5]/20 bg-[#0A1D28] p-8"
        >
          {appointmentBooked ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
              <CheckCircle className="w-16 h-16 text-[#4FD1C5] mx-auto" />
              <h3 className="font-heading text-2xl font-black mt-5">Appointment booked!</h3>
              <p className="mt-2 text-[#E6FFFB]/50 text-sm">
                {appointment.name}, you&apos;re set for {appointment.date} at {appointment.time}. A confirmation was sent to your email.
              </p>
              <button onClick={() => { setAppointmentBooked(false); setAppointment({ name: '', date: '', time: '' }) }} className="mt-7 px-6 py-3 rounded-xl border border-[#4FD1C5]/40 text-[#4FD1C5] text-sm font-bold hover:bg-[#4FD1C5]/10 transition-colors">
                Book another
              </button>
            </motion.div>
          ) : (
            <>
              <h3 className="font-heading text-xl font-black">Book an appointment</h3>
              <p className="text-sm text-[#E6FFFB]/40 mt-1">Average wait time today: 12 minutes</p>
              <div className="mt-6 space-y-4">
                <input
                  value={appointment.name}
                  onChange={(e) => setAppointment({ ...appointment, name: e.target.value })}
                  placeholder="Full name"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#06121A] border border-[#4FD1C5]/20 outline-none placeholder:text-[#E6FFFB]/25 focus:border-[#4FD1C5] text-sm transition-colors"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={appointment.date}
                    onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#06121A] border border-[#4FD1C5]/20 outline-none focus:border-[#4FD1C5] text-sm transition-colors [color-scheme:dark]"
                  />
                  <input
                    type="time"
                    value={appointment.time}
                    onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#06121A] border border-[#4FD1C5]/20 outline-none focus:border-[#4FD1C5] text-sm transition-colors [color-scheme:dark]"
                  />
                </div>
                <button
                  onClick={bookAppointment}
                  disabled={!appointment.name || !appointment.date || !appointment.time}
                  className="w-full py-4 rounded-xl bg-[#4FD1C5] text-[#06121A] font-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#81E6D9] transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </>
          )}
        </motion.div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="max-w-6xl mx-auto px-6 py-16">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-[#4FD1C5] font-mono tracking-[0.3em] text-xs uppercase mb-3">Doctors</p>
              <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight">Meet our specialists</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSpecialty(spec)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${specialty === spec ? 'bg-[#4FD1C5] text-[#06121A]' : 'border border-[#4FD1C5]/25 text-[#E6FFFB]/55 hover:border-[#4FD1C5]/60 hover:text-[#4FD1C5]'}`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={specialty}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visible.map((doc, i) => (
              <Reveal key={doc.name} delay={i * 0.07}>
                <div className="group rounded-3xl border border-[#4FD1C5]/15 bg-[#0A1D28] p-7 hover:border-[#4FD1C5]/50 hover:-translate-y-1.5 transition-all duration-400">
                  <div className="flex items-start justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${doc.color} flex items-center justify-center text-lg font-black text-[#06121A]`}>
                      {doc.initials}
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold text-[#4FD1C5]">
                      <Star size={13} className="fill-[#4FD1C5]" /> {doc.rating}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-black">{doc.name}</h3>
                  <p className="mt-1 text-sm text-[#4FD1C5]">{doc.specialty}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-[#E6FFFB]/45">
                    <span>{doc.patients.toLocaleString()} patients</span>
                    <button className="px-4 py-2 rounded-lg bg-[#4FD1C5]/10 border border-[#4FD1C5]/30 text-[#4FD1C5] font-bold group-hover:bg-[#4FD1C5] group-hover:text-[#06121A] transition-colors">
                      Book visit
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Services */}
      <section id="services" className="border-y border-[#4FD1C5]/10 bg-[#0A1D28]/50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[#4FD1C5] font-mono tracking-[0.3em] text-xs uppercase mb-4">Services</p>
              <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight">Care under one roof</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.08}>
                <div className="group rounded-3xl border border-[#4FD1C5]/15 bg-[#06121A] p-7 h-full hover:border-[#4FD1C5]/50 transition-colors duration-400">
                  <div className="w-12 h-12 rounded-2xl bg-[#4FD1C5]/10 border border-[#4FD1C5]/30 flex items-center justify-center text-[#4FD1C5] group-hover:bg-[#4FD1C5] group-hover:text-[#06121A] transition-colors">
                    <service.icon size={22} />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-black">{service.title}</h3>
                  <p className="mt-2 text-sm text-[#E6FFFB]/45 leading-relaxed">{service.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Live queue board */}
      <section id="queue" className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <div className="rounded-3xl border border-[#4FD1C5]/20 bg-[#0A1D28] p-8">
            <div className="flex items-center gap-3 mb-8">
              <Clock size={20} className="text-[#4FD1C5]" />
              <h2 className="font-heading text-2xl font-black">Live queue — Outpatient Wing B</h2>
              <span className="ml-auto flex items-center gap-2 text-xs font-bold text-[#4FD1C5]">
                <span className="w-2 h-2 rounded-full bg-[#4FD1C5] animate-pulse" /> LIVE
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { room: 'Cardio Clinic', now: 12, waiting: 4 },
                { room: 'Pediatrics', now: 8, waiting: 2 },
                { room: 'Lab & Diagnostics', now: 23, waiting: 7 },
                { room: 'Pharmacy', now: 31, waiting: 5 },
              ].map((row, i) => (
                <Reveal key={row.room} delay={i * 0.08}>
                  <div className="rounded-2xl bg-[#06121A] border border-[#4FD1C5]/15 p-5">
                    <p className="text-xs text-[#E6FFFB]/45 uppercase tracking-wider font-mono">{row.room}</p>
                    <p className="mt-3 text-4xl font-black text-[#4FD1C5]">#{row.now}</p>
                    <p className="mt-1 text-xs text-[#E6FFFB]/45">{row.waiting} people ahead</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[#4FD1C5] px-8 py-16 text-center text-[#06121A]">
            <p className="font-heading text-3xl md:text-5xl font-black tracking-tight leading-tight">Feeling off today?<br />Book a doctor in 30 seconds.</p>
            <a href="#book" className="inline-flex items-center gap-2 mt-8 px-9 py-4 rounded-xl bg-[#06121A] text-[#4FD1C5] font-black hover:bg-black transition-colors">
              <CalendarCheck size={18} /> Book an appointment
            </a>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#4FD1C5]/10 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-heading font-black tracking-tight">Pulse<span className="text-[#4FD1C5]">Med</span></span>
          <p className="text-sm text-[#E6FFFB]/30">© 2026 PulseMed Healthcare. Sample website for demonstration.</p>
        </div>
      </footer>

      {/* Floating link back to the portfolio */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-xl bg-[#4FD1C5] text-[#06121A] text-xs font-black shadow-lg hover:bg-[#81E6D9] transition-colors"
      >
        ← Back to Portfolio
      </Link>
    </div>
  )
}
