'use client'
import { useEffect, useState, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const pos = useRef({ x: -200, y: -200 })
  const ring = useRef({ x: -200, y: -200 })

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move)

    let frame
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1
      ring.current.y += (pos.current.y - ring.current.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top = ring.current.y + 'px'
      }
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    const down = () => setClicking(true)
    const up = () => setClicking(false)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)

    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)
    const addListeners = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    addListeners()
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed',
        width: clicking ? 6 : 8,
        height: clicking ? 6 : 8,
        borderRadius: '50%',
        background: hovering ? '#3b82f6' : '#0f172a',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 99999,
        boxShadow: hovering ? '0 0 12px rgba(59,130,246,0.5)' : 'none',
        transition: 'width 0.15s, height 0.15s, background 0.2s',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed',
        width: hovering ? 48 : clicking ? 24 : 36,
        height: hovering ? 48 : clicking ? 24 : 36,
        borderRadius: '50%',
        border: `1.5px solid ${hovering ? 'rgba(59,130,246,0.5)' : 'rgba(15,23,42,0.2)'}`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 99998,
        transition: 'width 0.2s, height 0.2s, border-color 0.2s',
      }} />
    </>
  )
}
