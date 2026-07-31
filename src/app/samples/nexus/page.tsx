'use client'

// Nexus — sample SaaS analytics landing page.
// Interactive: monthly/yearly pricing toggle, animated dashboard mockup bars, feature cards.
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BarChart3, LineChart, Zap, Users, Bell, Shield, Check, ArrowRight, Sparkles } from 'lucide-react'

const features = [
  { icon: LineChart, title: 'Realtime dashboards', text: 'Stream metrics straight from your stack and watch them update live, down to the second.' },
  { icon: Zap, title: 'AI-powered insights', text: 'Nexus surfaces anomalies and trends before your team notices them.' },
  { icon: Users, title: 'Team workspaces', text: 'Granular roles, shared boards, and comments that keep everyone aligned.' },
  { icon: Bell, title: 'Smart alerts', text: 'Get pinged on Slack, email, or SMS the moment a metric crosses a threshold.' },
  { icon: Shield, title: 'Enterprise security', text: 'SOC 2 Type II, SSO/SAML, and audit logs included on every paid plan.' },
  { icon: BarChart3, title: 'Custom reports', text: 'Drag, drop, and schedule beautiful reports with a single click.' },
]

const plans = [
  { name: 'Starter', monthly: 0, yearly: 0, highlight: false, cta: 'Start free', perks: ['1 workspace', '7-day history', '3 dashboards', 'Community support'] },
  { name: 'Pro', monthly: 29, yearly: 23, highlight: true, cta: 'Start 14-day trial', perks: ['Unlimited dashboards', '1-year history', 'AI insights & alerts', 'Priority support'] },
  { name: 'Scale', monthly: 89, yearly: 71, highlight: false, cta: 'Talk to sales', perks: ['Everything in Pro', 'Unlimited history', 'SSO & audit logs', 'Dedicated engineer'] },
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

export default function NexusPage() {
  // Pricing interval toggle (monthly/yearly)
  const [yearly, setYearly] = useState(false)
  // Animated mockup chart — heights animate via framer-motion
  const bars = [42, 68, 55, 88, 72, 96, 61, 80, 52, 92, 76, 84]

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#F8FAFC]/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <BarChart3 size={16} className="text-white" />
            </div>
            <span className="font-heading font-bold text-xl">Nexus</span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm text-slate-600">
            {['Features', 'Pricing', 'Customers', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-indigo-600 transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900">Sign in</a>
            <a href="#pricing" className="px-4.5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-medium mb-8">
            <Sparkles size={13} /> New: AI anomaly detection is live
          </span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold leading-[1.08] max-w-3xl mx-auto">
            Analytics that <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">grow with you</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto">
            Realtime dashboards, effortless reports, and AI insights — so your team can spend less time in spreadsheets and more time shipping.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a href="#pricing" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25">
              Start free <ArrowRight size={17} />
            </a>
            <a href="#features" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-300 font-semibold hover:border-indigo-400 hover:text-indigo-600 transition-colors">
              See features
            </a>
          </div>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative mt-16"
        >
          <div className="absolute -inset-10 bg-gradient-to-b from-indigo-200/50 to-transparent blur-3xl rounded-full" />
          <div className="relative rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/50 overflow-hidden text-left">
            {/* Mockup window chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs text-slate-400 font-mono">app.nexus.io/dashboard</span>
            </div>
            <div className="p-6 grid md:grid-cols-3 gap-6">
              {/* KPI stat cards */}
              <div className="space-y-4">
                {[
                  { label: 'MRR', value: '$48,290', delta: '+12.4%', up: true },
                  { label: 'Active users', value: '12,847', delta: '+8.1%', up: true },
                  { label: 'Churn', value: '1.2%', delta: '-0.4%', up: false },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-slate-100 p-4">
                    <p className="text-xs text-slate-500">{s.label}</p>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-xl font-bold">{s.value}</span>
                      <span className={`text-xs font-semibold ${s.up ? 'text-emerald-600' : 'text-rose-500'}`}>{s.delta}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Animated bar chart */}
              <div className="md:col-span-2 rounded-xl border border-slate-100 p-5 flex items-end gap-2.5 h-full min-h-[190px]">
                {bars.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.06, ease: 'easeOut' }}
                    className={`flex-1 rounded-t-md ${i % 3 === 1 ? 'bg-violet-400' : 'bg-indigo-500'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Logo strip */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap justify-center gap-x-12 gap-y-4 text-slate-400 font-heading font-bold tracking-wide">
          {['VERTEX', 'Northwind', 'ORBIT', 'harbor', 'Cobalt&Co', 'LUMA'].map((logo) => (
            <span key={logo}>{logo}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-indigo-600 font-mono text-sm tracking-[0.3em] uppercase mb-4">Features</p>
            <h2 className="font-heading text-4xl font-bold">Everything you need to understand your numbers</h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-7 hover:border-indigo-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100 transition-all duration-400">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-400">
                  <f.icon size={22} />
                </div>
                <h3 className="mt-5 font-heading font-semibold text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-white border-y border-slate-200 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-indigo-600 font-mono text-sm tracking-[0.3em] uppercase mb-4">Pricing</p>
              <h2 className="font-heading text-4xl font-bold">Simple pricing that scales with you</h2>
              {/* Billing interval toggle */}
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1.5">
                <button
                  onClick={() => setYearly(false)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${!yearly ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setYearly(true)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${yearly ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
                >
                  Yearly
                  <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold align-middle">-20%</span>
                </button>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 0.1}>
                <div
                  className={`relative h-full rounded-3xl p-8 flex flex-col transition-transform duration-400 ${plan.highlight ? 'bg-gradient-to-b from-indigo-600 to-violet-700 text-white shadow-2xl shadow-indigo-600/30 md:-translate-y-3' : 'border border-slate-200 bg-white hover:-translate-y-1'}`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-[#0F172A] text-xs font-bold">
                      MOST POPULAR
                    </span>
                  )}
                  <h3 className={`font-heading font-semibold text-lg ${plan.highlight ? 'text-white' : ''}`}>{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold">${yearly ? plan.yearly : plan.monthly}</span>
                    <span className={`text-sm ${plan.highlight ? 'text-indigo-200' : 'text-slate-500'}`}>/mo</span>
                  </div>
                  {yearly && plan.monthly > 0 && (
                    <p className={`mt-1 text-xs ${plan.highlight ? 'text-indigo-200' : 'text-slate-500'}`}>billed annually · save ${(plan.monthly - plan.yearly) * 12}/yr</p>
                  )}
                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2.5 text-sm">
                        <Check size={16} className={plan.highlight ? 'text-amber-300' : 'text-emerald-500'} />
                        <span className={plan.highlight ? 'text-indigo-100' : 'text-slate-700'}>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`mt-8 w-full py-3 rounded-xl text-sm font-semibold transition-colors ${plan.highlight ? 'bg-white text-indigo-700 hover:bg-indigo-50' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <div className="relative rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-8 py-16 text-center text-white overflow-hidden">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-white/15 blur-3xl rounded-full" />
            <h2 className="relative font-heading text-3xl md:text-4xl font-bold">Ready to see your data clearly?</h2>
            <p className="relative mt-3 text-indigo-100 max-w-md mx-auto">Join 12,000+ teams who make decisions with Nexus. Free forever for small teams.</p>
            <a href="#" className="relative inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors">
              Start free today <ArrowRight size={17} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <BarChart3 size={13} className="text-white" />
            </div>
            <span className="font-heading font-bold">Nexus</span>
          </div>
          <p className="text-sm text-slate-500">© 2026 Nexus Analytics, Inc. Sample website for demonstration.</p>
        </div>
      </footer>

      {/* Floating link back to the portfolio */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-semibold shadow-lg hover:bg-indigo-700 transition-colors"
      >
        ← Back to Portfolio
      </Link>
    </div>
  )
}
