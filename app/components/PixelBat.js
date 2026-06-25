'use client'
import { useEffect } from 'react'

export default function PixelBat({ size = 3, color = 'rgba(15,23,42,0.6)' }) {
  useEffect(() => {
    if (document.getElementById('pixel-bat-style')) return
    const style = document.createElement('style')
    style.id = 'pixel-bat-style'
    style.innerHTML = `
      .pixel-bat {
        width: 1px;
        height: 1px;
        position: relative;
        animation: pixelbat 0.4s steps(1) infinite;
      }
      @keyframes pixelbat {
        0% { box-shadow:
          128px 122px,131px 122px,134px 122px,138px 122px,141px 122px,145px 122px,148px 122px,152px 122px,
          125px 123px,128px 123px,131px 123px,134px 123px,138px 123px,141px 123px,145px 123px,148px 123px,152px 123px,155px 123px,
          122px 124px,125px 124px,131px 124px,134px 124px,138px 124px,141px 124px,145px 124px,148px 124px,155px 124px,158px 124px,
          119px 125px,122px 125px,125px 125px,131px 125px,134px 125px,138px 125px,141px 125px,145px 125px,148px 125px,155px 125px,158px 125px,161px 125px,
          116px 126px,119px 126px,122px 126px,125px 126px,131px 126px,134px 126px,138px 126px,141px 126px,145px 126px,148px 126px,155px 126px,158px 126px,161px 126px,164px 126px,
          116px 127px,119px 127px,122px 127px,125px 127px,128px 127px,131px 127px,134px 127px,138px 127px,141px 127px,145px 127px,148px 127px,152px 127px,155px 127px,158px 127px,161px 127px,164px 127px,
          116px 128px,119px 128px,122px 128px,125px 128px,128px 128px,131px 128px,134px 128px,138px 128px,141px 128px,145px 128px,148px 128px,152px 128px,155px 128px,158px 128px,161px 128px,164px 128px,
          116px 129px,119px 129px,122px 129px,128px 129px,131px 129px,134px 129px,138px 129px,141px 129px,145px 129px,148px 129px,152px 129px,155px 129px,158px 129px,161px 129px,164px 129px,
          119px 130px,122px 130px,125px 130px,128px 130px,134px 130px,138px 130px,141px 130px,145px 130px,148px 130px,152px 130px,155px 130px,158px 130px,161px 130px,
          122px 131px,125px 131px,128px 131px,131px 131px,134px 131px,138px 131px,141px 131px,145px 131px,148px 131px,152px 131px,155px 131px,158px 131px,
          125px 132px,128px 132px,131px 132px,134px 132px,138px 132px,141px 132px,145px 132px,148px 132px,152px 132px,155px 132px,
          128px 133px,131px 133px,134px 133px,138px 133px,141px 133px,145px 133px,148px 133px,152px 133px,
          131px 134px,134px 134px,138px 134px,141px 134px,145px 134px,148px 134px,
          134px 135px,138px 135px,141px 135px,145px 135px,
          138px 136px,141px 136px,138px 137px,141px 137px,138px 138px,138px 139px,138px 140px; }
        50% { box-shadow:
          128px 132px,131px 132px,134px 132px,138px 132px,141px 132px,145px 132px,148px 132px,152px 132px,
          125px 133px,128px 133px,131px 133px,134px 133px,138px 133px,141px 133px,145px 133px,148px 133px,152px 133px,155px 133px,
          122px 134px,125px 134px,131px 134px,134px 134px,138px 134px,141px 134px,145px 134px,148px 134px,155px 134px,158px 134px,
          119px 135px,122px 135px,125px 135px,131px 135px,134px 135px,138px 135px,141px 135px,145px 135px,148px 135px,155px 135px,158px 135px,161px 135px,
          116px 136px,119px 136px,122px 136px,125px 136px,131px 136px,134px 136px,138px 136px,141px 136px,145px 136px,148px 136px,155px 136px,158px 136px,161px 136px,164px 136px,
          116px 137px,119px 137px,122px 137px,125px 137px,128px 137px,131px 137px,134px 137px,138px 137px,141px 137px,145px 137px,148px 137px,152px 137px,155px 137px,158px 137px,161px 137px,164px 137px,
          116px 138px,119px 138px,122px 138px,125px 138px,128px 138px,131px 138px,134px 138px,138px 138px,141px 138px,145px 138px,148px 138px,152px 138px,155px 138px,158px 138px,161px 138px,164px 138px,
          116px 139px,119px 139px,122px 139px,128px 139px,131px 139px,134px 139px,138px 139px,141px 139px,145px 139px,148px 139px,152px 139px,155px 139px,158px 139px,161px 139px,164px 139px,
          119px 140px,122px 140px,125px 140px,128px 140px,134px 140px,138px 140px,141px 140px,145px 140px,148px 140px,152px 140px,155px 140px,158px 140px,161px 140px,
          122px 141px,125px 141px,128px 141px,131px 141px,134px 141px,138px 141px,141px 141px,145px 141px,148px 141px,152px 141px,155px 141px,158px 141px,
          125px 142px,128px 142px,131px 142px,134px 142px,138px 142px,141px 142px,145px 142px,148px 142px,152px 142px,155px 142px,
          128px 143px,131px 143px,134px 143px,138px 143px,141px 143px,145px 143px,148px 143px,152px 143px,
          131px 144px,134px 144px,138px 144px,141px 144px,145px 144px,148px 144px,
          134px 145px,138px 145px,141px 145px,145px 145px,
          138px 146px,141px 146px,138px 147px,141px 147px,138px 148px,138px 149px,138px 150px; }
      }
    `
    document.head.appendChild(style)
  }, [])

  return (
    <div style={{ 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: `${50 * size}px`, height: `${50 * size}px`,
      overflow: 'hidden', position: 'relative',
    }}>
      <div
        className="pixel-bat"
        style={{
          transform: `scale(${size})`,
          left: '-128px', top: '-128px',
          background: color,
          boxShadow: `128px 122px ${color}`,
        }}
      />
    </div>
  )
}