import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DogBreed AI - AI-Powered Dog Breed Classification',
  description: 'Discover your dog\'s breed with AI-powered classification, access comprehensive breed information, and connect with a community of dog lovers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  
  return (
    <html lang="en">
      <head>
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-0 lg:ml-64">
            {children}
          </main>
        </div>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}