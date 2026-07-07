'use client'
import { useEffect, useState } from 'react'

export default function ScrollLine() {
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress((window.scrollY / total) * 100)
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  if (isMobile) return null

  return (
    <div style={{
      position: 'fixed',
      right: '18px',
      top: '50%',
      transform: 'translateY(-50%)',
      height: '40vh',
      width: '1.5px',
      background: 'rgba(148,163,184,0.15)',
      borderRadius: '2px',
      zIndex: 500,
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%',
        height: `${progress}%`,
        background: 'linear-gradient(to bottom, rgba(15,23,42,0.5), rgba(148,163,184,0.3))',
        borderRadius: '2px',
        transition: 'height 0.1s linear',
      }} />
      <div style={{
        position: 'absolute',
        left: '50%',
        top: `${progress}%`,
        transform: 'translate(-50%, -50%)',
        width: '5px', height: '5px',
        borderRadius: '50%',
        background: '#0f172a',
        opacity: 0.5,
        transition: 'top 0.1s linear',
        boxShadow: '0 0 6px rgba(15,23,42,0.3)',
      }} />
    </div>
  )
}
