'use client'

// Luxora — sample premium e-commerce website (fashion).
// Interactive: category filter, add-to-cart with live badge, hover product cards.
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingBag, Star, Truck, RotateCcw, ShieldCheck, ArrowRight } from 'lucide-react'

// Product catalog with category, price, rating, and gradient artwork
const products = [
  { id: 1, name: 'Aurora Silk Dress', category: 'Dresses', price: 189, rating: 4.9, gradient: 'from-[#7C3AED] to-[#4C1D95]', tag: 'Bestseller' },
  { id: 2, name: 'Meridian Trench Coat', category: 'Outerwear', price: 320, rating: 4.8, gradient: 'from-[#B45309] to-[#78350F]', tag: 'New' },
  { id: 3, name: 'Vela Leather Tote', category: 'Bags', price: 245, rating: 5.0, gradient: 'from-[#92400E] to-[#451A03]', tag: 'Limited' },
  { id: 4, name: 'Noir Stiletto Heels', category: 'Shoes', price: 210, rating: 4.7, gradient: 'from-[#1F2937] to-[#000000]', tag: 'Classic' },
  { id: 5, name: 'Solene Linen Set', category: 'Dresses', price: 165, rating: 4.6, gradient: 'from-[#0D9488] to-[#134E4A]', tag: 'Summer' },
  { id: 6, name: 'Arcadia Wool Blazer', category: 'Outerwear', price: 280, rating: 4.9, gradient: 'from-[#57534E] to-[#1C1917]', tag: 'Tailored' },
]

const categories = ['All', 'Dresses', 'Outerwear', 'Bags', 'Shoes']

// Small scroll-reveal helper
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

export default function LuxoraPage() {
  // Active product filter and number of items in the bag
  const [activeCategory, setActiveCategory] = useState('All')
  const [cartCount, setCartCount] = useState(0)
  // Compact navbar once the page is scrolled
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const visibleProducts =
    activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#F5EFE6] font-sans">
      {/* Navbar */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${isScrolled ? 'bg-[#0B0B0F]/85 backdrop-blur-xl border-b border-[#C9A227]/15 py-3' : 'bg-transparent py-5'}`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <span className="font-heading text-xl tracking-[0.3em] font-bold">LUXORA</span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#F5EFE6]/60">
            {['Shop', 'Collections', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#C9A227] transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {/* Cart badge that bumps when items are added */}
            <motion.div
              key={cartCount}
              initial={{ scale: 1.35 }}
              animate={{ scale: 1 }}
              className="relative w-11 h-11 rounded-full border border-[#C9A227]/30 flex items-center justify-center"
            >
              <ShoppingBag className="w-4.5 h-4.5" size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C9A227] text-[#0B0B0F] text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </motion.div>
            <a href="#shop" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C9A227] text-[#0B0B0F] text-sm font-semibold hover:bg-[#E5C05A] transition-colors">
              Shop Now
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="shop" className="pt-36 md:pt-44 pb-20 px-6 max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#C9A227] tracking-[0.4em] text-xs uppercase mb-6 font-mono"
          >
            New Autumn Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]"
          >
            Timeless pieces,
            <span className="italic text-[#C9A227]"> crafted</span> for the modern wardrobe.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-[#F5EFE6]/55 text-lg leading-relaxed max-w-md"
          >
            Luxury materials, honest tailoring, and silhouettes that outlive seasons. Designed in-house, delivered worldwide.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a href="#shop" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C9A227] text-[#0B0B0F] font-semibold hover:bg-[#E5C05A] transition-colors">
              Explore Collection <ArrowRight size={18} />
            </a>
            <a href="#features" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#C9A227]/30 hover:border-[#C9A227] transition-colors">
              Our Story
            </a>
          </motion.div>
        </div>

        {/* Hero visual — floating layered card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-8 bg-[#C9A227]/10 blur-3xl rounded-full" />
          <div className="relative rounded-3xl overflow-hidden border border-[#C9A227]/20 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0B0B0F] aspect-[4/5] flex flex-col justify-end p-8">
            <div className="absolute top-6 right-6 w-20 h-20 rounded-full border border-[#C9A227]/40 flex items-center justify-center animate-pulse">
              <Star size={28} className="text-[#C9A227]" />
            </div>
            <p className="text-[#C9A227] tracking-[0.3em] text-xs uppercase mb-2 font-mono">The Signature</p>
            <h2 className="font-heading text-3xl font-bold">Meridian<br />Trench Coat</h2>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-2xl font-semibold text-[#C9A227]">$320</span>
              <button
                onClick={() => setCartCount((c) => c + 1)}
                className="px-5 py-2.5 rounded-full bg-[#C9A227] text-[#0B0B0F] text-sm font-semibold hover:bg-[#E5C05A] transition-colors"
              >
                Add to Bag
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature strip */}
      <section id="features" className="border-y border-[#C9A227]/15 bg-[#101016]">
        <div className="max-w-6xl mx-auto px-6 py-8 grid sm:grid-cols-3 gap-6">
          {[
            { icon: Truck, title: 'Free Express Shipping', text: 'On all orders over $150' },
            { icon: RotateCcw, title: '30-Day Returns', text: 'No questions asked' },
            { icon: ShieldCheck, title: 'Secure Checkout', text: '256-bit SSL protected' },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#C9A227]/30 flex items-center justify-center shrink-0">
                  <f.icon size={20} className="text-[#C9A227]" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{f.title}</p>
                  <p className="text-[#F5EFE6]/45 text-xs mt-0.5">{f.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Product grid */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-[#C9A227] tracking-[0.35em] text-xs uppercase font-mono mb-3">The Edit</p>
              <h2 className="font-heading text-4xl font-bold">Shop the collection</h2>
            </div>
            {/* Category filter chips */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${activeCategory === cat ? 'bg-[#C9A227] text-[#0B0B0F]' : 'border border-[#C9A227]/25 text-[#F5EFE6]/60 hover:border-[#C9A227] hover:text-[#C9A227]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProducts.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.07}>
              <div className="group rounded-3xl overflow-hidden border border-[#C9A227]/15 bg-[#101016] hover:border-[#C9A227]/40 hover:-translate-y-1.5 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(201,162,39,0.25)]">
                {/* Product artwork */}
                <div className={`relative aspect-[4/3] bg-gradient-to-br ${product.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity duration-500" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur text-[10px] tracking-widest uppercase font-mono text-[#C9A227]">
                    {product.tag}
                  </span>
                  <div className="absolute bottom-4 right-4 flex items-center gap-1 text-white text-xs">
                    <Star size={13} className="text-[#C9A227] fill-[#C9A227]" /> {product.rating}
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[#F5EFE6]/40 text-[11px] uppercase tracking-widest font-mono">{product.category}</p>
                    <h3 className="font-heading font-semibold mt-1 group-hover:text-[#C9A227] transition-colors">{product.name}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#C9A227]">${product.price}</span>
                    {/* Add to cart — increments the bag badge */}
                    <button
                      onClick={() => setCartCount((c) => c + 1)}
                      aria-label={`Add ${product.name} to bag`}
                      className="w-9 h-9 rounded-full border border-[#C9A227]/30 flex items-center justify-center hover:bg-[#C9A227] hover:text-[#0B0B0F] transition-colors"
                    >
                      <ShoppingBag size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden border border-[#C9A227]/20 bg-gradient-to-r from-[#1C1917] via-[#292524] to-[#1C1917] px-8 py-16 text-center">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C9A227]/15 blur-3xl rounded-full" />
            <h2 className="relative font-heading text-3xl md:text-4xl font-bold">Become a Luxora Insider</h2>
            <p className="relative mt-3 text-[#F5EFE6]/55 max-w-md mx-auto">Early access to drops, private sales, and styling notes. No spam, ever.</p>
            <div className="relative mt-8 inline-flex w-full max-w-md">
              <input
                placeholder="Enter your email"
                className="flex-1 rounded-l-full bg-black/40 border border-[#C9A227]/25 px-6 py-3.5 text-sm outline-none focus:border-[#C9A227]"
              />
              <button className="px-7 rounded-r-full bg-[#C9A227] text-[#0B0B0F] text-sm font-semibold hover:bg-[#E5C05A] transition-colors">
                Join
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#C9A227]/15 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="font-heading tracking-[0.3em] font-bold">LUXORA</span>
          <p className="text-[#F5EFE6]/35 text-sm">© 2026 Luxora Atelier. Sample website for demonstration.</p>
        </div>
      </footer>

      {/* Floating link back to the portfolio */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-full bg-[#C9A227] text-[#0B0B0F] text-xs font-semibold shadow-lg hover:bg-[#E5C05A] transition-colors"
      >
        ← Back to Portfolio
      </Link>
    </div>
  )
}
