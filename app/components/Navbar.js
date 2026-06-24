'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
        style={{
         position: 'fixed',
         top: '20px',
         left: 0,
         right: 0,
         marginLeft: 'auto',
         marginRight: 'auto',
         width: 'fit-content',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '8px 12px',
          borderRadius: '999px',
          background: scrolled
            ? 'rgba(255,255,255,0.65)'
            : 'rgba(255,255,255,0.45)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.85)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(148,163,184,0.25), inset 0 1px 0 rgba(255,255,255,0.9)'
            : '0 4px 16px rgba(148,163,184,0.15), inset 0 1px 0 rgba(255,255,255,0.9)',
          transition: 'background 0.3s, box-shadow 0.3s',
        }}
        className="desktop-nav"
      >
        {/* Logo */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.05 }}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: '1.1rem',
            color: '#0f172a',
            textDecoration: 'none',
            padding: '8px 20px',
            marginRight: '4px',
            letterSpacing: '-0.5px',
          }}
        >
          TL
        </motion.a>

        {/* Divider */}
        <div style={{
          width: '1px',
          height: '20px',
          background: 'rgba(148,163,184,0.3)',
          marginRight: '4px',
        }} />

        {/* Links */}
        {navLinks.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            onClick={() => setActive(link.label)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              position: 'relative',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.92rem',
              fontWeight: active === link.label ? 600 : 400,
              color: active === link.label ? '#0f172a' : '#64748b',
              textDecoration: 'none',
              padding: '6px 18px',
              borderRadius: '999px',
              background: active === link.label
                ? 'rgba(255,255,255,0.9)'
                : 'transparent',
              boxShadow: active === link.label
                ? '0 2px 8px rgba(148,163,184,0.2), inset 0 1px 0 rgba(255,255,255,1)'
                : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {link.label}
          </motion.a>
        ))}
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 20px',
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.85)',
          boxShadow: '0 4px 16px rgba(148,163,184,0.2)',
          width: 'calc(100vw - 32px)',
          maxWidth: '420px',
        }}
        className="mobile-nav"
      >
        <span style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: '1rem',
          color: '#0f172a',
        }}>TL</span>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            padding: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            cursor: 'pointer',
          }}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={{
                rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                y: menuOpen && i === 0 ? 10 : menuOpen && i === 2 ? -10 : 0,
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: '#0f172a',
                borderRadius: '2px',
                transformOrigin: 'center',
              }}
            />
          ))}
        </button>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 999,
              width: 'calc(100vw - 32px)',
              maxWidth: '420px',
              borderRadius: '24px',
              background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.85)',
              boxShadow: '0 16px 48px rgba(148,163,184,0.25)',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
            className="mobile-menu"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => { setActive(link.label); setMenuOpen(false) }}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: '#0f172a',
                  textDecoration: 'none',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  background: active === link.label ? 'rgba(59,130,246,0.08)' : 'transparent',
                  transition: 'background 0.2s',
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS to show/hide desktop vs mobile */}
      <style jsx global>{`
        .desktop-nav { display: flex !important; }
        .mobile-nav { display: none !important; }
        .mobile-menu { display: flex !important; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </>
  )
}
