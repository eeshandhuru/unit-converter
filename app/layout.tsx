import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata = {
  title: "Smart Unit Converter - Convert Between All Units",
  description:
    "Convert between different units with intelligent suggestions and real-time calculations. Support for length, weight, temperature, volume, and many more unit types.",
  generator: 'v0.app',
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a855f7' strokeWidth='2'%3E%3Cpath d='M8 3L4 7l4 4'/%3E%3Cpath d='M4 7h16'/%3E%3Cpath d='M16 21l4-4-4-4'/%3E%3Cpath d='M20 17H4'/%3E%3C/svg%3E",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
