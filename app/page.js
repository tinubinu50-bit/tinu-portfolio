'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Cursor />
      <Loader onComplete={() => setLoaded(true)} />

      {loaded && (
        <>
          {/* Watermark — fixed, always visible */}
          <div className="watermark">
            <span>TINU LAL</span>
          </div>

          <Navbar />

          <main style={{ position: 'relative', zIndex: 1 }}>

            {/* ── HERO ── */}
            <section id="home" style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 24px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '48px',
                maxWidth: '1100px',
                width: '100%',
                flexWrap: 'wrap',
              }}>

                {/* Left — Text */}
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      color: '#3b82f6',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      marginBottom: '16px',
                    }}
                  >
                    Based in Dubai, UAE
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.7 }}
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                      fontWeight: 800,
                      color: '#0f172a',
                      lineHeight: 1.1,
                      letterSpacing: '-2px',
                      marginBottom: '20px',
                    }}
                  >
                    Tinu<br />Lal
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '28px',
                    }}
                  >
                    {['Web Designer', 'CS Student', 'Data Science'].map((tag) => (
                      <span key={tag} style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        color: '#64748b',
                        padding: '5px 14px',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.6)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(148,163,184,0.25)',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1rem',
                      color: '#475569',
                      lineHeight: 1.7,
                      maxWidth: '420px',
                      marginBottom: '36px',
                    }}
                  >
                    BSc Computer Science student at Westford University College,
                    exploring the intersection of web design, data science, and creative technology.
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75, duration: 0.6 }}
                    style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
                  >
                    <motion.a
                      href="#projects"
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: '#fff',
                        textDecoration: 'none',
                        padding: '12px 28px',
                        borderRadius: '999px',
                        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                        boxShadow: '0 4px 16px rgba(59,130,246,0.35)',
                        transition: 'box-shadow 0.2s',
                      }}
                    >
                      View Projects
                    </motion.a>
                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: '#0f172a',
                        textDecoration: 'none',
                        padding: '12px 28px',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(148,163,184,0.3)',
                        boxShadow: '0 2px 8px rgba(148,163,184,0.15)',
                      }}
                    >
                      Get in Touch
                    </motion.a>
                  </motion.div>
                </div>

                {/* Right — Photo */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  style={{
                    flex: '0 0 auto',
                    width: 'clamp(260px, 35vw, 420px)',
                    aspectRatio: '3/4',
                    borderRadius: '32px',
                    overflow: 'hidden',
                    position: 'relative',
                    background: 'rgba(255,255,255,0.4)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.8)',
                    boxShadow: '0 24px 64px rgba(148,163,184,0.3), inset 0 1px 0 rgba(255,255,255,0.9)',
                  }}
                >
                  <img
                    src="/images/hero.jpg"
                    alt="Tinu Lal"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                    }}
                  />
                  {/* Glass overlay bottom */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '40%',
                    background: 'linear-gradient(to top, rgba(255,255,255,0.3), transparent)',
                  }} />
                </motion.div>

              </div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                style={{
                  position: 'absolute',
                  bottom: '32px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.7rem',
                  color: '#94a3b8',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}>Scroll</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    width: '1px',
                    height: '32px',
                    background: 'linear-gradient(to bottom, #94a3b8, transparent)',
                  }}
                />
              </motion.div>
            </section>

            {/* Placeholder sections — we'll build these next */}
            <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '3rem', color: '#0f172a', opacity: 0.3 }}>About — coming next</h2>
            </section>
            <section id="skills" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '3rem', color: '#0f172a', opacity: 0.3 }}>Skills — coming next</h2>
            </section>
            <section id="projects" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '3rem', color: '#0f172a', opacity: 0.3 }}>Projects — coming next</h2>
            </section>
            <section id="contact" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '3rem', color: '#0f172a', opacity: 0.3 }}>Contact — coming next</h2>
            </section>

          </main>
        </>
      )}
    </>
  )
}
