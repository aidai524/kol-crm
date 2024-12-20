import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WalletProvider } from '@/components/providers/WalletProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Meme KOLs Platform',
  description: 'Web3 KOL 激励平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <WalletProvider>
          <main className="min-h-screen bg-background">
            {children}
          </main>
        </WalletProvider>
      </body>
    </html>
  )
}
