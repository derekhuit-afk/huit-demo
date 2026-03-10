export const metadata = {
  title: 'Huit.AI — Mortgage Intelligence Platform',
  description: 'HyperLoan AI · APEX Recruiting · CRMEX Intelligence',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#060a10' }}>{children}</body>
    </html>
  )
}
