'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setDone(true)
            setTimeout(onComplete, 800)
          }, 300)
          return 100
        }
        return prev + 1
      })
    }, 18)
    return () => clearInterval(interval)
  }, [])

  const letters = ['T', 'I', 'N', 'U', ' ', 'L', 'A', 'L']

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f4f8 50%, #e8ecf4 100%)',
          }}
        >
          {/* Shimmer background */}
          <motion.div
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Letters */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '48px' }}>
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  fontWeight: 800,
                  color: letter === ' ' ? 'transparent' : '#0f172a',
                  letterSpacing: '-1px',
                  display: 'inline-block',
                  minWidth: letter === ' ' ? '1.5rem' : 'auto',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 400,
              color: '#64748b',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: '48px',
            }}
          >
            Web Designer · Dubai, UAE
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            style={{
              width: 'min(300px, 70vw)',
              height: '2px',
              background: '#e2e8f0',
              borderRadius: '2px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #3b82f6, #94a3b8)',
                borderRadius: '2px',
                width: `${count}%`,
                transition: 'width 0.05s linear',
                boxShadow: '0 0 8px rgba(59,130,246,0.5)',
              }}
            />
          </motion.div>

          {/* Counter */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '0.75rem',
              color: '#94a3b8',
              marginTop: '12px',
              letterSpacing: '0.1em',
            }}
          >
            {count}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
