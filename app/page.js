'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import PixelBat from './components/PixelBat'

function BatCageButton({ caged, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'fixed', bottom: '28px', right: '28px', zIndex: 9500,
        width: '48px', height: '48px', borderRadius: '50%', border: 'none',
        background: 'rgba(255,255,255,0.65)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: '0 4px 20px rgba(148,163,184,0.2), inset 0 1px 0 rgba(255,255,255,1)',
        border: '1px solid rgba(255,255,255,0.9)',
        fontSize: '1.3rem', cursor: 'none', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
      }}
      title={caged ? 'Release bat' : 'Cage bat'}
    >
      {caged ? '🦇' : ''}
    </motion.button>
  )
}

function BatPet({ caged }) {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [flipped, setFlipped] = useState(false)
  const [sleeping, setSleeping] = useState(false)
  const [clicked, setClicked] = useState(false)
  const target = useRef({ x: -200, y: -200 })
  const current = useRef({ x: -200, y: -200 })
  const idleTimer = useRef(null)
  const frame = useRef(null)

  useEffect(() => {
    const move = (e) => {
      if (caged) return
      target.current = { x: e.clientX, y: e.clientY }
      setSleeping(false)
      clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => setSleeping(true), 4000)
    }
    window.addEventListener('mousemove', move)

    const loop = () => {
      if (!caged) {
        const dx = target.current.x - current.current.x
        const dy = target.current.y - current.current.y
        current.current.x += dx * 0.05
        current.current.y += dy * 0.05
        setPos({ x: current.current.x, y: current.current.y })
        if (dx < -2) setFlipped(true)
        if (dx > 2) setFlipped(false)
      }
      frame.current = requestAnimationFrame(loop)
    }
    frame.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(frame.current)
      clearTimeout(idleTimer.current)
    }
  }, [caged])

  if (caged) return null

  return (
    <div
      onClick={() => { setClicked(true); setTimeout(() => setClicked(false), 500) }}
      style={{
        position: 'fixed', left: pos.x, top: pos.y,
        transform: `translate(-50%, -50%) scaleX(${flipped ? -1 : 1})`,
        zIndex: 9000, pointerEvents: 'auto', cursor: 'none',
        userSelect: 'none', fontSize: clicked ? '1.6rem' : '1.2rem',
        transition: 'font-size 0.2s',
        filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.1))',
      }}
    >
      {sleeping ? '🦇💤' : clicked ? '✨🦇✨' : '🦇'}
    </div>
  )
}

// ── Reveal hook ──────────────────────────────────────────
function useReveal(threshold = 0.08) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const fade = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
  })
  return { ref, fade }
}

// ── Shared styles ─────────────────────────────────────────
const glass = {
  borderRadius: '24px', padding: '28px',
  background: 'rgba(255,255,255,0.55)',
  backdropFilter: 'blur(20px) saturate(160%)',
  WebkitBackdropFilter: 'blur(20px) saturate(160%)',
  border: '1px solid rgba(255,255,255,0.85)',
  boxShadow: '0 4px 24px rgba(148,163,184,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
}

const SLabel = ({ text }) => (
  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.3em', textTransform: 'uppercase' }}>{text}</span>
)
const STitle = ({ text }) => (
  <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-2px', marginTop: '6px', lineHeight: 1.1 }}>{text}</h2>
)

// ── Page ─────────────────────────────────────────────────
export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [batCaged, setBatCaged] = useState(false)

  return (
    <>
      <Cursor />
      <Loader onComplete={() => setLoaded(true)} />
      {loaded && (
        <>
          <BatPet caged={batCaged} />
          <BatCageButton caged={batCaged} onClick={() => setBatCaged(b => !b)} />

          <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 0, userSelect: 'none', overflow: 'hidden' }}>
            <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 7vw, 6rem)', fontWeight: 800, color: 'rgba(15,23,42,0.04)', letterSpacing: '0.4em', whiteSpace: 'nowrap' }}>TINU LAL</span>
          </div>
          <Navbar />
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <ContactSection />
          </motion.main>
        </>
      )}
    </>
  )
}
// ── Hero ─────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="home" style={{ height: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ padding: '0 0 0 6vw' }}>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px' }}>
          Based in Dubai, UAE
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.0, letterSpacing: '-3px', marginBottom: '20px', whiteSpace: 'nowrap' }}>
          Tinu Lal
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {['Web Designer', 'CS Student', 'Data Science'].map(tag => (
            <span key={tag} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 500, color: '#475569', padding: '4px 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(148,163,184,0.2)' }}>{tag}</span>
          ))}
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#64748b', lineHeight: 1.8, maxWidth: '340px', marginBottom: '28px' }}>
          BSc Computer Science student at Westford University College, exploring web design, data science, and creative technology.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <motion.a href="#projects" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 600, color: '#fff', textDecoration: 'none', padding: '12px 26px', borderRadius: '999px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', boxShadow: '0 4px 20px rgba(15,23,42,0.2)' }}>
            View Projects
          </motion.a>
          <motion.a href="#contact" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 600, color: '#0f172a', textDecoration: 'none', padding: '12px 26px', borderRadius: '999px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(148,163,184,0.25)', boxShadow: '0 2px 12px rgba(148,163,184,0.15)' }}>
            Get in Touch
          </motion.a>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.88 }}
          style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>

        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '18px', height: '28px', borderRadius: '9px', border: '1.5px solid rgba(148,163,184,0.3)', display: 'flex', justifyContent: 'center', paddingTop: '5px' }}>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '3px', height: '5px', borderRadius: '2px', background: '#94a3b8' }} />
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', color: '#94a3b8', letterSpacing: '0.25em', textTransform: 'uppercase' }}>scroll</span>
        </motion.div>
      </div>

      {/* Photo */}
      <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.9 }}
        style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '56px 36px 56px 16px' }}>
        <div style={{ position: 'absolute', top: '10%', right: '0', width: '240px', height: '65%', background: 'radial-gradient(ellipse, rgba(120,170,100,0.2) 0%, transparent 70%)', filter: 'blur(48px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, width: '85%', maxWidth: '400px', height: '75vh', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 20px 70px rgba(148,163,184,0.2), 0 0 0 1px rgba(255,255,255,0.5)' }}>
          <img src="/images/hero.jpeg" alt="Tinu Lal" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '40% top', display: 'block' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '20%', background: 'linear-gradient(to top, rgba(245,247,250,0.4), transparent)', pointerEvents: 'none' }} />
        </div>
      </motion.div>
    </section>
  )
}
// ── About Section──────
function AboutSection() {
  const { ref, fade } = useReveal()
  
  // Track window width dynamically for accurate responsive layouts
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 850)
    handleResize() // Run on initial mount
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Dino Game State & Refs
  const canvasRef = useRef(null)
  const [gameState, setGameState] = useState('IDLE')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  
  const gameLoopRef = useRef(null)
  const dinoY = useRef(100)
  const dinoVelocity = useRef(0)
  const isJumping = useRef(false)
  const obstacles = useRef([])
  const gameScore = useRef(0)
  const speed = useRef(4.5)

  const GRAVITY = 0.6
  const JUMP_FORCE = -9.5
  const GROUND_Y = 100

  const DINO_SPRITE = [
    "            ########",
    "            #########",
    "            # #######",
    "            #########",
    "            ###     ",
    "#           ######  ",
    "##         ####      ",
    "##        ######    ",
    "##       ##########    ",
    "###     ########  # ",
    " ##############     ",
    " ##############     ",
    "  ############      ",
    "   ##########       ",
    "    ########        ",
    "     ######         ",
    "      ####          ",
    "      #  #          ",
    "      #  #          ",
    "     ##  ##         "
  ]

  const CACTUS_SPRITE = [
    "   ##   ",
    "   ##   ",
    " # ## # ",
    " # ## # ",
    " ###### ",
    "   ##   ",
    "   ##   ",
    "   ##   ",
    "   ##   ",
    "   ##   "
  ]

  const triggerJump = () => {
    if (gameState === 'IDLE' || gameState === 'GAMEOVER') {
      resetGame()
      setGameState('PLAYING')
    } else if (!isJumping.current) {
      dinoVelocity.current = JUMP_FORCE
      isJumping.current = true
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        triggerJump()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState])

  const resetGame = () => {
    dinoY.current = GROUND_Y
    dinoVelocity.current = 0
    isJumping.current = false
    obstacles.current = []
    gameScore.current = 0
    speed.current = 4.5
    setScore(0)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let obstacleTimer = 0

    const updateGame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, GROUND_Y + 40)
      ctx.lineTo(canvas.width, GROUND_Y + 40)
      ctx.stroke()

      if (gameState === 'PLAYING') {
        dinoVelocity.current += GRAVITY
        dinoY.current += dinoVelocity.current

        if (dinoY.current >= GROUND_Y) {
          dinoY.current = GROUND_Y
          dinoVelocity.current = 0
          isJumping.current = false
        }

        gameScore.current += 0.15
        setScore(Math.floor(gameScore.current))
        speed.current += 0.001

        obstacleTimer++
        if (obstacleTimer > Math.random() * 40 + 80) {
          obstacles.current.push({
            x: canvas.width,
            width: 16,
            height: 20
          })
          obstacleTimer = 0
        }
      }

      ctx.fillStyle = '#0f172a'
      const pixelSize = 2
      DINO_SPRITE.forEach((row, rowIndex) => {
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
          if (row[colIndex] === '#') {
            ctx.fillRect(
              40 + colIndex * pixelSize,
              dinoY.current + rowIndex * pixelSize,
              pixelSize,
              pixelSize
            )
          }
        }
      })

      for (let i = obstacles.current.length - 1; i >= 0; i--) {
        const obs = obstacles.current[i]
        if (gameState === 'PLAYING') {
          obs.x -= speed.current
        }

        ctx.fillStyle = '#10b981'
        CACTUS_SPRITE.forEach((row, rowIndex) => {
          for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] === '#') {
              ctx.fillRect(
                obs.x + colIndex * pixelSize,
                (GROUND_Y + 40) - (CACTUS_SPRITE.length * pixelSize) + rowIndex * pixelSize,
                pixelSize,
                pixelSize
              )
            }
          }
        })

        if (
          obs.x < 40 + (20 * pixelSize) &&
          obs.x + obs.width > 40 &&
          dinoY.current + (20 * pixelSize) > (GROUND_Y + 40) - obs.height
        ) {
          setGameState('GAMEOVER')
          if (Math.floor(gameScore.current) > highScore) {
            setHighScore(Math.floor(gameScore.current))
          }
        }

        if (obs.x + obs.width < 0) {
          obstacles.current.splice(i, 1)
        }
      }

      if (gameState === 'IDLE') {
        ctx.fillStyle = '#475569'
        ctx.font = '600 13px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('TAP HERE OR PRESS SPACE TO JUMP', canvas.width / 2, canvas.height / 2 + 5)
      } else if (gameState === 'GAMEOVER') {
        ctx.fillStyle = '#ef4444'
        ctx.font = '700 14px Syne, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 5)
        ctx.fillStyle = '#475569'
        ctx.font = '500 11px Inter, sans-serif'
        ctx.fillText('Tap to try again', canvas.width / 2, canvas.height / 2 + 15)
      }

      gameLoopRef.current = requestAnimationFrame(updateGame)
    }

    gameLoopRef.current = requestAnimationFrame(updateGame)
    return () => cancelAnimationFrame(gameLoopRef.current)
  }, [gameState, highScore])

  const matteGlass = {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.35)',
    boxShadow: '0 8px 32px 0 rgba(15, 23, 42, 0.03)',
    borderRadius: '16px'
  }

  return (
    <section id="about" ref={ref} style={{ padding: isMobile ? '40px 4vw' : '80px 6vw', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ ...fade(0), marginBottom: '32px' }}>
          <SLabel text="About Me" /><STitle text="Who I Am" />
        </div>
        
        {/* Row 1: Dynamically handles the layout asymmetry to stop squishing */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1fr 320px', 
          gap: '16px', 
          marginBottom: '24px', 
          alignItems: 'start' 
        }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            {/* Bio Text Card */}
            <div style={{ ...fade(0.1), ...glass, padding: isMobile ? '24px' : '32px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#334155', lineHeight: 1.85, fontWeight: 300 }}>
                I'm <strong style={{ fontWeight: 600, color: '#0f172a' }}>Tinu Lal</strong>, a Computer Science student based in Dubai. First year BSc at <strong style={{ fontWeight: 600, color: '#0f172a' }}>Westford University College</strong> (Liverpool John Moores University). I hold a <strong style={{ fontWeight: 600, color: '#0f172a' }}>Diploma in Data Science & AI</strong> from G-Tech / ABMA Education (Grade B+), Level 3 RQF accredited.
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#334155', lineHeight: 1.85, fontWeight: 300, marginTop: '14px' }}>
                Actively exploring <strong style={{ fontWeight: 600, color: '#0f172a' }}>web design & development</strong>  building real client projects with a strong visual and technical sensibility. 
              </p>
            </div>

            {/* Clear Matte Glass Retro Dino Game */}
            <div 
              style={{ ...fade(0.12), ...matteGlass, padding: '16px', position: 'relative', cursor: 'pointer', overflow: 'hidden', width: '100%' }}
              onClick={triggerJump}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 4px' }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.68rem', fontWeight: 800, color: '#475569', letterSpacing: '0.05em' }}>
                  MINI-GAME
                </span>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 600, color: '#0f172a', display: 'flex', gap: '12px' }}>
                  <span>SCORE: <span style={{ tabularNums: true }}>{score}</span></span>
                  <span style={{ color: '#64748b' }}>HI: <span style={{ tabularNums: true }}>{highScore}</span></span>
                </div>
              </div>

              <div style={{ width: '100%', overflow: 'hidden' }}>
                <canvas 
                  ref={canvasRef} 
                  width={760} 
                  height={145} 
                  style={{ width: '100%', height: '145px', display: 'block' }}
                />
              </div>
            </div>
          </div>

          {/* Portrait Image Card (Clean width enforcement) */}
          <div style={{ 
            ...fade(0.15), 
            ...glass, 
            padding: '12px', 
            width: '100%',
            maxWidth: isMobile ? '100%' : '320px',
            order: isMobile ? -1 : 0 // Displays image on top when stacked on mobile formats
          }}>
            <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(15,23,42,0.06)', border: '1px solid rgba(255,255,255,0.6)' }}>
              <img 
                src="/images/portrait.jpeg" 
                alt="Tinu Lal Portrait" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} 
              />
            </div>
          </div>

        </div>

        {/* Row 2: Symmetric Grid for Lower Credentials */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', alignItems: 'start' }}>
          
          {/* Languages & Quick Facts */}
          <div style={{ ...fade(0.2), ...glass, padding: '24px' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Languages</h3>
            {[['English', 5], ['Malayalam', 5], ['Hindi', 4]].map(([lang, level]) => (
              <div key={lang} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: '#334155', fontWeight: 500 }}>{lang}</span>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[...Array(5)].map((_, j) => (
                    <div key={j} style={{ width: '16px', height: '3px', borderRadius: '2px', background: j < level ? '#0f172a' : 'rgba(148,163,184,0.2)' }} />
                  ))}
                </div>
              </div>
            ))}
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(148,163,184,0.1)' }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Quick Facts</h3>
              {[['Location', 'Dubai, UAE'], ['Degree', 'BSc Computer Science'], ['University', 'Westford · LJMU'], ['Phone', '+971 056 117 1829'], ['Email', 'tinubinu50@gmail.com']].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', gap: '12px' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#94a3b8', fontWeight: 500 }}>{l}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#334155', fontWeight: 500, textAlign: 'right' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div style={{ ...fade(0.25), ...glass, padding: '24px' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>Education</h3>
            {[
              { title: 'BSc Computer Science', sub: 'Westford · Liverpool John Moores University', date: '2025 — Ongoing', tag: 'Current' },
              { title: 'Diploma — Data Science & AI', sub: 'G-Tech / ABMA Education · Grade B+', date: 'Sep 2025', tag: 'Level 3 RQF' },
              { title: 'High School Graduate', sub: 'New Indian Model School · Dubai', date: 'Completed', tag: 'Maths & CS' },
            ].map((item, i, arr) => (
              <div key={i} style={{ marginBottom: i < arr.length - 1 ? '16px' : 0, paddingBottom: i < arr.length - 1 ? '16px' : 0, borderBottom: i < arr.length - 1 ? '1px solid rgba(148,163,184,0.1)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.83rem', fontWeight: 600, color: '#0f172a', marginBottom: '2px' }}>{item.title}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#64748b', lineHeight: 1.4 }}>{item.sub}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.67rem', color: '#94a3b8', marginTop: '3px' }}>{item.date}</p>
                  </div>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 600, color: '#64748b', padding: '2px 9px', borderRadius: '999px', background: 'rgba(148,163,184,0.1)', border: '1px solid rgba(148,163,184,0.15)', whiteSpace: 'nowrap' }}>{item.tag}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div style={{ ...fade(0.3), ...glass, padding: '24px' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>Experience</h3>
            {[
              { title: 'Data Collector', sub: "Byju's Learning App · Dubai", date: 'Internship', points: ['Conducted surveys & documented feedback', 'Generated weekly & monthly reports', 'Maintained data integrity processes'] },
              { title: 'Event Organiser', sub: 'EXPO Centre Sharjah · Volunteer', date: 'Volunteering', points: ['Event setup, registration & guidance', 'Collaborated on safety protocols', 'Logistical coordination at exhibitions'] },
            ].map((item, i, arr) => (
              <div key={i} style={{ marginBottom: i < arr.length - 1 ? '20px' : 0, paddingBottom: i < arr.length - 1 ? '20px' : 0, borderBottom: i < arr.length - 1 ? '1px solid rgba(148,163,184,0.1)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.83rem', fontWeight: 600, color: '#0f172a', marginBottom: '2px' }}>{item.title}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#64748b' }}>{item.sub}</p>
                  </div>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 600, color: '#64748b', padding: '2px 9px', borderRadius: '999px', background: 'rgba(148,163,184,0.1)', border: '1px solid rgba(148,163,184,0.15)', whiteSpace: 'nowrap' }}>{item.date}</span>
                </div>
                {item.points.map((pt, j) => (
                  <div key={j} style={{ display: 'flex', gap: '6px', marginBottom: '3px' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.68rem', marginTop: '3px', flexShrink: 0 }}>—</span>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#64748b', lineHeight: 1.55 }}>{pt}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
// ── Projects ──────────────────────────────────────────────
function ProjectsSection() {
  const { ref, fade } = useReveal()
  const projects = [
    { title: 'RealTimes Cargo Transport LLC', description: 'Professional Logistics business website built for a client  clean layout, responsive design, polished UI.', url: 'https://www.realtimestc.ae/', tags: ['Web Design', 'Client Project', 'Responsive'], color: 'rgba(59,130,246,0.06)', accent: '#3b82f6' },
    { title: 'Florified(Ongoing)', description: 'Floral e-commerce concept with elegant product presentation, smooth interactions and modern aesthetics.', url: 'https://florified.vercel.app/', tags: ['E-Commerce', 'UI Design', 'Next.js'], color: 'rgba(236,72,153,0.06)', accent: '#ec4899' },
    { title: 'FastGrowing Cargo(Ongoing)', description: 'Logistics company website, and mobile-first responsive layout, The client wanted similar to the first project .', url: 'https://fastgrowing-cargo.vercel.app/', tags: ['Web Design', 'Logistics', 'Responsive'], color: 'rgba(16,185,129,0.06)', accent: '#10b981' },
  ]
  return (
    <section id="projects" ref={ref} style={{ padding: '80px 6vw', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ ...fade(0), marginBottom: '36px' }}>
          <SLabel text="My Work" /><STitle text="Projects" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {projects.map((project, i) => (
            <motion.a key={project.title} href={project.url} target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.01 }} whileTap={{ scale: 0.98 }}
              style={{ ...fade(i * 0.1), textDecoration: 'none', borderRadius: '24px', padding: '24px', background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px) saturate(160%)', WebkitBackdropFilter: 'blur(20px) saturate(160%)', border: '1px solid rgba(255,255,255,0.85)', boxShadow: '0 4px 24px rgba(148,163,184,0.12), inset 0 1px 0 rgba(255,255,255,0.9)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ width: '100%', height: '150px', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: project.color, border: `1px solid ${project.accent}22` }}>
                <iframe src={project.url} style={{ width: '200%', height: '200%', transform: 'scale(0.5)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }} loading="lazy" title={project.title} />
                <div style={{ position: 'absolute', inset: 0 }} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{project.title}</h3>
                  <span style={{ color: '#94a3b8' }}>↗</span>
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#64748b', lineHeight: 1.65, marginBottom: '12px' }}>{project.description}</p>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.63rem', fontWeight: 500, color: project.accent, padding: '3px 9px', borderRadius: '999px', background: project.color, border: `1px solid ${project.accent}30` }}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
// ── Skills ────────────────────────────────────────────────
function SkillsSection() {
  const { ref, fade } = useReveal()
  const skillGroups = [
    { category: 'Web Design & Dev', accent: '#3b82f6', skills: ['HTML & CSS', 'JavaScript', 'Next.js', 'React', 'Responsive Design', 'UI/UX Design', 'Framer Motion', 'SEO'] },
    { category: 'Data & AI', accent: '#8b5cf6', skills: ['Python', 'VBA Code', 'Machine Learning', 'Data Science', 'Microsoft Excel', 'Reporting & Dashboards', 'PowerBI', 'MongoDB','MS Acess','Supabase'] },
    { category: 'Tools & Soft Skills', accent: '#10b981', skills: ['MS Office', 'Adobe Photoshop', 'Multitasking', 'Designing', 'Documentation', 'Schedule Management','3D modeling','Vibe Coading'] },
  ]
  return (
    <section id="skills" ref={ref} style={{ padding: '80px 6vw', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ ...fade(0), marginBottom: '36px' }}>
          <SLabel text="What I Know" /><STitle text="Skills" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {skillGroups.map((group, i) => (
            <div key={group.category} style={{ ...fade(i * 0.1), ...glass }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: group.accent, boxShadow: `0 0 8px ${group.accent}60` }} />
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>{group.category}</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {group.skills.map(skill => (
                  <motion.span key={skill} whileHover={{ scale: 1.06, y: -2 }}
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.73rem', fontWeight: 500, color: '#334155', padding: '5px 12px', borderRadius: '999px', background: `${group.accent}0d`, border: `1px solid ${group.accent}25`, cursor: 'none' }}>
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
// ── Contact ───────────────────────────────────────────────
function ContactSection() {
  const { ref, fade } = useReveal()
  const socials = [
    { label: 'GitHub', href: 'https://github.com/tinubinu50-bit', handle: '@tinubinu50-bit', color: '#0f172a' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tinu-binu-348548390/', handle: 'Tinu Binu', color: '#0a66c2' },
    { label: 'Instagram', href: 'https://www.instagram.com/tinu.lal/', handle: '@tinu.lal', color: '#e1306c' },
  ]
  return (
    <section id="contact" ref={ref} style={{ padding: '80px 6vw 120px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ ...fade(0), marginBottom: '36px' }}>
          <SLabel text="Get In Touch" /><STitle text="Contact" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div style={{ ...fade(0.1), ...glass, gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px', padding: '40px' }}>
            <div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 2.5vw, 2rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-1px', marginBottom: '10px' }}>Let's work together</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#64748b', lineHeight: 1.65, maxWidth: '380px' }}>Open to freelance projects, collaborations, and opportunities. Feel free to reach out!</p>
            </div>

          </div>

          {[
            { label: 'Email', value: 'tinubinu50@gmail.com', href: 'mailto:tinubinu50@gmail.com', icon: '✉' },
            { label: 'Phone', value: '+971 056 117 1829', href: 'tel:+971561171829', icon: '✆' },
            { label: 'Location', value: 'Dubai, UAE', href: null, icon: '◎' },
          ].map((item, i) => (
            <div key={item.label} style={{ ...fade(0.15 + i * 0.05), ...glass }}>
              <div style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '10px' }}>{item.icon}</div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.67rem', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '5px' }}>{item.label}</p>
              {item.href
                ? <a href={item.href} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#0f172a', fontWeight: 500, textDecoration: 'none' }}>{item.value}</a>
                : <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#0f172a', fontWeight: 500 }}>{item.value}</p>}
            </div>
          ))}

          {socials.map((s, i) => (
            <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.01 }} whileTap={{ scale: 0.98 }}
              style={{ ...fade(0.3 + i * 0.05), ...glass, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.67rem', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '5px' }}>{s.label}</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#0f172a', fontWeight: 500 }}>{s.handle}</p>
              </div>
              <span style={{ fontSize: '1.1rem', color: s.color, opacity: 0.6 }}>↗</span>
            </motion.a>
          ))}
        </div>

        <div style={{ ...fade(0.5), marginTop: '56px', paddingTop: '28px', borderTop: '1px solid rgba(148,163,184,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>Tinu Lal</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.73rem', color: '#94a3b8', textDecoration: 'none', fontWeight: 500 }}>{s.label}</a>
            ))}
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.73rem', color: '#94a3b8' }}>© 2026 · Built with Next.js · Deployed on Vercel</span>
        </div>
      </div>
    </section>
  )
}
