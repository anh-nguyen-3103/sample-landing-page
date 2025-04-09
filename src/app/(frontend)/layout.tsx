import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { Carousel } from '@/components/Carousel'
import { Logo } from '@/components/Carousel/components/LogoItem'
import { HeaderBackground } from '@/components/HeaderBackground'
import { Images } from '@/constants/images'
import { getServerSideURL } from '@/utilities/getURL'
import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          {/* <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          /> */}
          <Header />
          <HeaderBackground />
          <Carousel data={logos} type="logo" className="bg-gray-400 mb-32" />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

const logos: Logo[] = [
  { id: 0, name: 'bobidi', url: Images.bobidi },
  { id: 1, name: 'joongang', url: Images.joongang },
  { id: 2, name: 'simonSays', url: Images.simonSays },
  { id: 3, name: 'techcombank', url: Images.techcombank },
  { id: 4, name: 'timelessWallet', url: Images.timelessWallet },
  { id: 5, name: 'windDriver', url: Images.windDriver },
]

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
