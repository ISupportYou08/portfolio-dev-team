'use client'

import { motion } from 'framer-motion'

// AnimatedTitle — section heading with a word-by-word mask reveal on scroll
export default function AnimatedTitle({
  text,
  gradient,
  className = '',
}: {
  text: string
  gradient?: string
  className?: string
}) {
  // Split the plain part and the gradient-highlighted part into words
  const normalWords = text.split(' ')
  const gradientWords = gradient ? gradient.split(' ') : []

  return (
    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-heading font-bold ${className}`}>
      {/* Each word slides up out of an overflow-hidden mask */}
      {normalWords.map((word, i) => (
        <span key={`n${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.06 }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
      {gradientWords.map((word, i) => (
        <span key={`g${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block gradient-text"
            initial={{ y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: (normalWords.length + i) * 0.06,
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </h2>
  )
}
