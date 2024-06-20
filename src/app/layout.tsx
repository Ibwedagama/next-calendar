import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import TheNavbar from '@/components/TheNavbar'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <TheNavbar />
          <main className="min-h-screen max-w-screen-lg mx-auto py-8">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
