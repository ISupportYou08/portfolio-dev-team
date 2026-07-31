import type { Metadata } from 'next'
// Google fonts — each exposes a CSS variable used by Tailwind theme
import { Space_Grotesk, Sora, Inter } from 'next/font/google'
// Server-side theme cookie — lets the layout apply the theme class before first paint
import { cookies } from 'next/headers'
// Global styles / Tailwind entry point
import './globals.css'
// Layout components — persistent UI around the page content
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LoadingScreen from '@/components/layout/LoadingScreen'
import ScrollProgress from '@/components/layout/ScrollProgress'
import BackToTop from '@/components/layout/BackToTop'
// UI components
import CustomCursor from '@/components/ui/CustomCursor'
import CommandPalette from '@/components/ui/CommandPalette'
import PageBackground from '@/components/ui/PageBackground'
import MouseSpotlight from '@/components/ui/MouseSpotlight'

// Heading font (Space Grotesk) — registered as --font-space-grotesk
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

// Display font (Sora) — registered as --font-sora
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

// Body font (Inter) — registered as --font-inter
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Site metadata — title/description used by browsers and SEO/social shares
export const metadata: Metadata = {
  title: 'Ralph Felix C. Florita | Full-Stack Developer & UI/UX Designer',
  description: 'Premium portfolio showcasing innovative web development, mobile apps, and UI/UX design by Ralph Felix C. Florita.',
  keywords: ['developer', 'designer', 'portfolio', 'full-stack', 'UI/UX', 'React', 'Next.js'],
  authors: [{ name: 'Ralph Felix C. Florita' }],
  openGraph: {
    title: 'Ralph Felix C. Florita | Portfolio',
    description: 'Full-Stack Developer & UI/UX Designer crafting exceptional digital experiences.',
    type: 'website',
  },
}

// Root layout — wraps every page in the app
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Read the saved theme from the cookie and apply it during SSR.
  // No client script is involved, so there is no flash of the wrong theme,
  // no hydration mismatch, and no React script-tag warnings.
  const savedTheme = (await cookies()).get('theme')?.value
  return (
    // Apply font CSS variables + saved theme class to the whole document
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${sora.variable} ${inter.variable} ${savedTheme === 'light' ? 'light' : ''}`}
    >
      <body className="bg-bg text-text antialiased noise-bg">
        {/* Premium fixed background layer — orbs, grid, and glow behind all content */}
        <PageBackground />
        {/* Loading screen — overlay shown while the app loads */}
        <LoadingScreen />
        {/* Custom cursor — replaces the default pointer */}
        <CustomCursor />
        {/* Scroll progress — bar showing page scroll position */}
        <ScrollProgress />
        {/* Mouse spotlight — feeds cursor position to interactive CSS surfaces */}
        <MouseSpotlight />
        {/* Navbar — top navigation */}
        <Navbar />
        {/* Command palette — keyboard-driven search/commands */}
        <CommandPalette />
        {/* Main content — rendered page sections */}
        <main className="relative">
          {children}
        </main>
        {/* Footer — site footer */}
        <Footer />
        {/* Back-to-top — floating button that scrolls to top */}
        <BackToTop />
      </body>
    </html>
  )
}
