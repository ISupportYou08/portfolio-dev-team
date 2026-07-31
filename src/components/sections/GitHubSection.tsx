'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import { Star, GitFork, Users, Code2, GitBranch } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import { personalInfo } from '@/data/portfolio'
import { useEffect, useState, useMemo } from 'react'

// GitHub section — real stats (repos, stars, followers, push events) plus a contribution graph
// Fallback shown when the API returns no public repos (empty/private account) or the request fails
const FALLBACK_REPOS = 15

export default function GitHubSection() {
  // Live GitHub stats fetched from the API
  const [stats, setStats] = useState({
    repos: 0,
    stars: 0,
    followers: 0,
    contributions: 0,
  })

  // Fetch real GitHub data once on mount: profile first, then repos (for stars) and recent push events
  useEffect(() => {
    const username = personalInfo.social.github.split('/').pop()
    if (!username) return

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub user not found: ${username}`)
        return res.json()
      })
      .then(async (user) => {
        // Only hit the remaining endpoints when the user exists — avoids 404 spam
        const [repos, events] = await Promise.all([
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`).then((r) => {
            if (!r.ok) throw new Error('GitHub repos request failed')
            return r.json()
          }),
          fetch(`https://api.github.com/users/${username}/events/public?per_page=100`).then((r) => {
            if (!r.ok) throw new Error('GitHub events request failed')
            return r.json()
          }),
        ])
        // Stars = sum of stars across all public repos; contributions = push events (last 90 days)
        const starCount = Array.isArray(repos)
          ? repos.reduce((sum: number, repo: { stargazers_count?: number }) => sum + (repo.stargazers_count || 0), 0)
          : 0
        const pushCount = Array.isArray(events)
          ? events.filter((e: { type?: string }) => e.type === 'PushEvent').length
          : 0
        setStats({
          repos: repos.length > 0 ? repos.length : FALLBACK_REPOS,
          stars: starCount,
          followers: user.followers || 0,
          contributions: pushCount,
        })
      })
      .catch(() => {
        setStats({
          repos: FALLBACK_REPOS,
          stars: 0,
          followers: 0,
          contributions: 0,
        })
      })
  }, [])

  // Contribution graph density driven by real activity: spread push-event intensity across cells
  const contributionCells = useMemo(() => {
    const intensity = Math.min(stats.contributions, 30)
    return Array.from({ length: 35 }, (_, i) => {
      const seed = (i * 7 + i * 13 + 3) % 5
      if (seed < 2 && intensity > 0) return intensity > 15 ? 'bg-primary/80' : 'bg-primary/40'
      if (seed < 4 && intensity > 5) return 'bg-primary/30'
      return 'bg-white/5'
    })
  }, [stats.contributions])

  // Config for the four stat cards
  const statCards = [
    { icon: Code2, label: 'Repositories', value: stats.repos },
    { icon: Star, label: 'Stars', value: stats.stars },
    { icon: Users, label: 'Followers', value: stats.followers },
    { icon: GitFork, label: 'Contributions', value: stats.contributions },
  ]

  return (
    <SectionWrapper id="github" className="pt-32 pb-24 scroll-mt-24">
      <div className="section-container">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-primary font-mono text-lg sm:text-2xl font-bold tracking-[0.2em] uppercase mb-5 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-gradient-to-r from-primary to-transparent" />
            Open Source
            <span className="w-8 h-px bg-gradient-to-l from-primary to-transparent" />
          </p>
          <AnimatedTitle text="GitHub" gradient="Activity" />
        </motion.div>

        {/* Stat cards: repos, stars, followers, contributions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-strong rounded-2xl p-6 text-center hover:glow-primary transition-all duration-300"
              >
                <Icon className="w-6 h-6 mx-auto mb-3 text-primary" />
                <span className="text-2xl sm:text-3xl font-heading font-bold gradient-text block">
                  {stat.value}
                </span>
                <span className="mt-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 inline-block">
                  {stat.label}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Contribution graph (driven by recent push activity) with link to the GitHub profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="glass-strong rounded-2xl p-6 sm:p-8 text-center"
        >
          <h3 className="font-heading font-semibold text-lg mb-2">Contribution Graph</h3>
          <div className="flex flex-wrap gap-1 justify-center mb-4">
            {[...Array(7)].map((_, week) => (
              <div key={week} className="flex flex-col gap-1">
                {[...Array(5)].map((_, day) => (
                  <div
                    key={day}
                    className={`w-3 h-3 rounded-sm ${contributionCells[week * 5 + day]}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <MagneticButton variant="secondary" href={personalInfo.social.github}>
            <GitBranch className="w-4 h-4" />
            View GitHub Profile
          </MagneticButton>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
