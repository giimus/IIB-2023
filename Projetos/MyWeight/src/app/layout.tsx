import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WeightContextProvider } from '@/context/WeightContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MyWeight',
  description: 'The easiest way to track your weight',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="apple-touch-icon" sizes="57x57" href="/icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-180x180.png" />

        <meta name="mobile-web-app-capable" content="yes" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/icon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icon-16x16.png"
        />

        <meta name="msapplication-TileImage" content="/icon-144x144.png"></meta>
        <meta name="theme-color" content="#010101" />

        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <WeightContextProvider>{children}</WeightContextProvider>
      </body>
    </html>
  )
}
