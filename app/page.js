'use client'
import { useState } from 'react'
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
          <Navbar />
          <main style={{ minHeight: '200vh', paddingTop: '100px' }}>
            <div id="home" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              fontFamily: 'Syne, sans-serif',
              textAlign: 'center',
            }}>
              <h1 style={{ fontSize: '4rem', fontWeight: 800, color: '#0f172a' }}>
                Tinu Lal
              </h1>
            </div>
          </main>
        </>
      )}
    </>
  )
}