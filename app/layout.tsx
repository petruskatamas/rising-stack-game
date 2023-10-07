import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from "./Providers";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rising Stack Demo',
  description: 'Demo by Tamás Petruska',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='bg-gray-200'>
          <AuthProvider>{children}</AuthProvider>
        </main>
      </body>
    </html>
  )
}
