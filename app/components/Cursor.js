'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [ring, setRing] = useState({ x: -100, y: -100 })
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)

    // Lag for ring
    let frame
    const lerp = (a, b, t) => a + (b - a) * t
    let rx = -100, ry = -100
    const loop = () => {
      rx = lerp(rx, pos.x, 0.12)
      ry = lerp(ry, pos.y, 0.12)
      setRing({ x: rx, y: ry })
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    const down = () => setClicking(true)
    const up = () => setClicking(false)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)

    // Hover on links/buttons
    const addHover = () => setHovering(true)
    const removeHover = () => setHovering(false)
    const targets = document.querySelectorAll('a, button, [data-hover]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      cancelAnimationFrame(frame)
    }
  }, [pos.x, pos.y])

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          width: clicking ? 6 : 8,
          height: clicking ? 6 : 8,
          borderRadius: '50%',
          background: hovering ? '#3b82f6' : '#0f172a',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.15s, height 0.15s, background 0.2s',
          boxShadow: hovering ? '0 0 12px rgba(59,130,246,0.6)' : 'none',
        }}
      />
      {/* Ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: ring.x,
          top: ring.y,
          width: hovering ? 48 : clicking ? 28 : 36,
          height: hovering ? 48 : clicking ? 28 : 36,
          borderRadius: '50%',
          border: `1.5px solid ${hovering ? '#3b82f6' : 'rgba(15,23,42,0.3)'}`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
          backdropFilter: hovering ? 'blur(2px)' : 'none',
        }}
      />
    </>
  )
}
