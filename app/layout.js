import './globals.css'

export const metadata = {
  title: 'Tinu Lal | Portfolio',
  description: 'BSc Computer Science student and Web Designer based in Dubai. Exploring web design & full-stack development.',
  keywords: ['Tinu Lal', 'Tinu Lal Dubai', 'Tinu Lal Portfolio', 'Computer Science Student Dubai', 'Web Developer Dubai'],
  authors: [{ name: 'Tinu Lal' }],
  creator: 'Tinu Lal',
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'gb29RoEdHWZazRujTmWRtqp8Q_AlmZnWa3mPedPNvKA',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}