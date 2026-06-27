import './globals.css'

export const metadata = {
  title: 'Tinu Lal | Portfolio',
  description: 'BSc Computer Science student and Web Designer based in Dubai. Exploring web design, data science & full-stack development.',
  metadataBase: new URL('https://tinu-portfolio.vercel.app'),
  openGraph: {
    title: 'Tinu Lal | Portfolio',
    description: 'BSc Computer Science student and Web Designer based in Dubai.',
    url: 'https://tinu-portfolio.vercel.app',
    siteName: 'Tinu Lal Portfolio',
    images: [{ url: '/opengraph-image.png', width: 512, height: 512, alt: 'Tinu Lal' }],
    type: 'website',
    icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    }
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
