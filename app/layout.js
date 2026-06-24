import './globals.css'

export const metadata = {
  title: 'Tinu Lal — Portfolio',
  description: 'BSc Computer Science student, Web Designer & Data Science enthusiast based in Dubai, UAE.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}