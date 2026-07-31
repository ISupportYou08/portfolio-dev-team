'use client'

// Vault — sample fintech banking dashboard (dark + amber).
// Interactive: category-filtered transactions, savings goals with progress, transfer form with success state.
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Wallet, ArrowDownLeft, ArrowUpRight, TrendingUp, PiggyBank, CreditCard, CheckCircle, Send } from 'lucide-react'

// Transaction catalog — filtered by category chips
const transactions = [
  { merchant: 'Acme Payroll', category: 'Income', amount: 3200, date: 'Today', icon: ArrowDownLeft, positive: true },
  { merchant: 'Coffee House', category: 'Food', amount: 4.5, date: 'Today', icon: ArrowUpRight, positive: false },
  { merchant: 'SuperMart', category: 'Shopping', amount: 87.2, date: 'Yesterday', icon: ArrowUpRight, positive: false },
  { merchant: 'Rent Payment', category: 'Housing', amount: 1200, date: 'Jul 28', icon: ArrowUpRight, positive: false },
  { merchant: 'Freelance Gig', category: 'Income', amount: 450, date: 'Jul 26', icon: ArrowDownLeft, positive: true },
  { merchant: 'Grab Rides', category: 'Transport', amount: 32.4, date: 'Jul 24', icon: ArrowUpRight, positive: false },
  { merchant: 'StreamFlix', category: 'Entertainment', amount: 15.99, date: 'Jul 22', icon: ArrowUpRight, positive: false },
  { merchant: 'Online Store', category: 'Shopping', amount: 124.75, date: 'Jul 20', icon: ArrowUpRight, positive: false },
]

const categories = ['All', 'Income', 'Food', 'Shopping', 'Housing', 'Transport', 'Entertainment']

const goals = [
  { name: 'Emergency fund', target: 10000, saved: 6400, color: '#FBBF24' },
  { name: 'Japan trip', target: 5000, saved: 3100, color: '#F472B6' },
  { name: 'New laptop', target: 3500, saved: 3500, color: '#34D399' },
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

export default function VaultPage() {
  const [category, setCategory] = useState('All')
  const [transfer, setTransfer] = useState({ recipient: '', amount: '' })
  const [sent, setSent] = useState(false)

  const visible = transactions.filter((t) => category === 'All' || t.category === category)

  const sendTransfer = () => {
    if (!transfer.recipient || !transfer.amount) return
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-[#0D0F12] text-[#FFFBEB] font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#0D0F12]/85 backdrop-blur-xl border-b border-amber-400/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="flex items-center gap-2.5 font-heading text-xl font-black tracking-tight">
            <span className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center">
              <Wallet size={18} className="text-amber-400" />
            </span>
            Vault
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#FFFBEB]/60">
            {['Accounts', 'Goals', 'Cards'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-amber-400 transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <a href="#transfer" className="px-5 py-2.5 rounded-xl bg-amber-400 text-[#0D0F12] text-sm font-black hover:bg-amber-300 transition-colors">
            Send Money
          </a>
        </div>
      </header>

      {/* Balance overview */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="grid lg:grid-cols-3 gap-6">
          {/* Main balance card */}
          <div className="lg:col-span-1 relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 p-8 text-[#0D0F12]">
            <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Total balance</p>
            <p className="mt-3 text-5xl font-black">$12,480<span className="text-2xl">.50</span></p>
            <p className="mt-2 text-xs font-bold flex items-center gap-1.5 opacity-70"><TrendingUp size={13} /> +4.2% this month</p>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Visa Platinum</span>
              <span className="flex gap-1.5">
                <span className="w-7 h-5 rounded-md bg-[#0D0F12]/20" />
                <span className="w-7 h-5 rounded-md bg-[#0D0F12]/40" />
              </span>
            </div>
          </div>

          {/* Income / spending cards */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-6">
            <Reveal>
              <div className="rounded-3xl border border-amber-400/15 bg-white/[0.03] p-8">
                <p className="text-xs text-[#FFFBEB]/45 uppercase tracking-wider font-mono">Income this month</p>
                <p className="mt-3 text-4xl font-black text-emerald-400">+$3,650</p>
                <div className="mt-5 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '78%' }} transition={{ duration: 1.2, ease: 'easeOut' }} className="h-full rounded-full bg-emerald-400" />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-amber-400/15 bg-white/[0.03] p-8">
                <p className="text-xs text-[#FFFBEB]/45 uppercase tracking-wider font-mono">Spending this month</p>
                <p className="mt-3 text-4xl font-black text-rose-400">−$1,464</p>
                <div className="mt-5 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '42%' }} transition={{ duration: 1.2, ease: 'easeOut' }} className="h-full rounded-full bg-rose-400" />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-amber-400/15 bg-white/[0.03] p-8">
                <p className="text-xs text-[#FFFBEB]/45 uppercase tracking-wider font-mono">Savings</p>
                <p className="mt-3 text-4xl font-black text-amber-400">$5,640</p>
                <p className="mt-2 text-xs text-[#FFFBEB]/40">3 goals on track</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-amber-400/15 bg-white/[0.03] p-8">
                <p className="text-xs text-[#FFFBEB]/45 uppercase tracking-wider font-mono">Cashback earned</p>
                <p className="mt-3 text-4xl font-black text-emerald-400">$86.20</p>
                <p className="mt-2 text-xs text-[#FFFBEB]/40">from 214 purchases</p>
              </div>
            </Reveal>
          </div>
        </motion.div>
      </section>

      {/* Transactions */}
      <section id="accounts" className="max-w-6xl mx-auto px-6 py-10">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-amber-400 font-mono tracking-[0.3em] text-xs uppercase mb-3">Transactions</p>
              <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight">Recent activity</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${category === cat ? 'bg-amber-400 text-[#0D0F12]' : 'border border-amber-400/25 text-[#FFFBEB]/55 hover:border-amber-400/60 hover:text-amber-300'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div key={category} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="rounded-3xl border border-amber-400/15 bg-white/[0.02] divide-y divide-white/5 overflow-hidden">
            {visible.map((tx, i) => (
              <Reveal key={tx.merchant} delay={i * 0.04}>
                <div className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.03] transition-colors">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${tx.positive ? 'bg-emerald-400/10 text-emerald-400' : 'bg-white/5 text-rose-400'}`}>
                    <tx.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold truncate">{tx.merchant}</p>
                    <p className="text-xs text-[#FFFBEB]/40 mt-0.5">{tx.category} · {tx.date}</p>
                  </div>
                  <p className={`font-black ${tx.positive ? 'text-emerald-400' : 'text-[#FFFBEB]'}`}>
                    {tx.positive ? '+' : '−'}${tx.amount.toFixed(2)}
                  </p>
                </div>
              </Reveal>
            ))}
            {visible.length === 0 && <p className="text-center py-12 text-[#FFFBEB]/40 font-medium">No transactions in this category.</p>}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Savings goals + transfer */}
      <section id="goals" className="border-y border-amber-400/10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-10">
          {/* Goals */}
          <div>
            <Reveal>
              <p className="text-amber-400 font-mono tracking-[0.3em] text-xs uppercase mb-3">Goals</p>
              <h2 className="font-heading text-3xl md:text-4xl font-black tracking-tight mb-8">Savings goals</h2>
            </Reveal>
            <div className="flex flex-col gap-5">
              {goals.map((goal, i) => {
                const pct = Math.round((goal.saved / goal.target) * 100)
                return (
                  <Reveal key={goal.name} delay={i * 0.08}>
                    <div className="rounded-2xl border border-amber-400/15 bg-[#0D0F12] p-6">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-heading font-bold flex items-center gap-2">
                          <PiggyBank size={16} className="text-amber-400" /> {goal.name}
                        </p>
                        <span className="text-xs font-black" style={{ color: goal.color }}>{pct}%</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ background: goal.color }}
                        />
                      </div>
                      <p className="mt-2.5 text-xs text-[#FFFBEB]/40">
                        ${goal.saved.toLocaleString()} of ${goal.target.toLocaleString()} saved
                        {pct === 100 && <span className="ml-2 text-emerald-400 font-bold">✓ Goal reached!</span>}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>

          {/* Transfer form */}
          <div id="transfer">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-amber-400/20 bg-[#0D0F12] p-8 lg:sticky lg:top-24">
                <h3 className="font-heading text-xl font-black flex items-center gap-2">
                  <Send size={18} className="text-amber-400" /> Send money
                </h3>
                {sent ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
                    <h4 className="font-heading text-2xl font-black mt-5">Transfer sent!</h4>
                    <p className="mt-2 text-sm text-[#FFFBEB]/50">
                      ${parseFloat(transfer.amount || '0').toFixed(2)} is on its way to {transfer.recipient}.
                    </p>
                    <button onClick={() => { setSent(false); setTransfer({ recipient: '', amount: '' }) }} className="mt-7 px-6 py-3 rounded-xl border border-amber-400/40 text-amber-400 text-sm font-bold hover:bg-amber-400/10 transition-colors">
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <div className="mt-6 space-y-4">
                    <input
                      value={transfer.recipient}
                      onChange={(e) => setTransfer({ ...transfer, recipient: e.target.value })}
                      placeholder="Recipient name or account"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#0D0F12] border border-amber-400/20 outline-none placeholder:text-[#FFFBEB]/25 focus:border-amber-400 text-sm transition-colors"
                    />
                    <input
                      value={transfer.amount}
                      onChange={(e) => setTransfer({ ...transfer, amount: e.target.value })}
                      placeholder="Amount ($)"
                      type="number"
                      min="0"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#0D0F12] border border-amber-400/20 outline-none placeholder:text-[#FFFBEB]/25 focus:border-amber-400 text-sm transition-colors"
                    />
                    <div className="flex flex-wrap gap-2">
                      {[50, 100, 250, 1000].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setTransfer({ ...transfer, amount: String(amt) })}
                          className="px-4 py-2 rounded-full border border-amber-400/25 text-xs font-bold text-amber-300 hover:bg-amber-400/10 transition-colors"
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={sendTransfer}
                      disabled={!transfer.recipient || !transfer.amount}
                      className="w-full py-4 rounded-xl bg-amber-400 text-[#0D0F12] font-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-300 transition-colors"
                    >
                      Transfer now
                    </button>
                    <p className="text-[10px] text-[#FFFBEB]/30 text-center">Instant & free. Funds arrive in under 30 seconds.</p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section id="cards" className="max-w-6xl mx-auto px-6 py-24 text-center">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[#1A1710] border border-amber-400/20 px-8 py-16">
            <div className="absolute -top-24 left-1/3 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl" />
            <CreditCard className="w-12 h-12 text-amber-400 mx-auto" />
            <p className="mt-5 font-heading text-3xl md:text-4xl font-black tracking-tight">One card for everything you do.</p>
            <p className="mt-3 text-[#FFFBEB]/50 max-w-md mx-auto text-sm">Virtual cards, 1% cashback, and instant freezes — right from the app.</p>
            <button className="mt-8 px-9 py-4 rounded-xl bg-amber-400 text-[#0D0F12] font-black hover:bg-amber-300 transition-colors">
              Order your card
            </button>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-400/10 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-heading font-black tracking-tight">Vault</span>
          <p className="text-sm text-[#FFFBEB]/30">© 2026 Vault Financial. Sample website for demonstration.</p>
        </div>
      </footer>

      {/* Floating link back to the portfolio */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-xl bg-amber-400 text-[#0D0F12] text-xs font-black shadow-lg hover:bg-amber-300 transition-colors"
      >
        ← Back to Portfolio
      </Link>
    </div>
  )
}
