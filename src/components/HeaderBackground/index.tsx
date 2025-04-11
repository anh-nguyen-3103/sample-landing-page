'use client'

import { Images } from '@/constants/images'
import { Videos } from '@/constants/videos'
import { useEffect, useRef } from 'react'
import { Carousel } from '../Carousel'
import { Company } from '../Carousel/components/CompanyItem'
import { InfoCompany } from '../InfoCompany'
import createCarouselContext from '../Carousel/provider'

const companies: Company[] = [
  {
    id: 0,
    name: 'bobidi',
    url: Images.bobidi,
    thumbnail: 'https://fakeimg.pl/500x300/?text=bobidi',
    title: 'Bobidi AI Crowdtesting Platform',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    industry: ['AI', 'Crowdsourcing'],
    scope: {
      name: 'Full Product Design & Development',
      href: 'https://bobidi.com',
    },
  },
  {
    id: 1,
    name: 'joongang',
    url: Images.joongang,
    thumbnail: 'https://fakeimg.pl/500x300/?text=jongang',
    title: 'Joongang Media Group',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    industry: ['Media', 'News'],
    scope: {
      name: 'UI/UX Overhaul & Frontend Development',
      href: 'https://joongang.co.kr',
    },
  },
  {
    id: 2,
    name: 'simonSays',
    url: Images.simonSays,
    thumbnail: 'https://fakeimg.pl/500x300/?text=simonn-says',
    title: 'Simon Says Transcription',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    industry: ['Media', 'AI', 'Productivity'],
    scope: {
      name: 'AI Integration & Web App Optimization',
      href: 'https://simonsays.ai',
    },
  },
  {
    id: 3,
    name: 'techcombank',
    url: Images.techcombank,
    thumbnail: 'https://fakeimg.pl/500x300/?text=techcom-bank',
    title: 'Techcombank Mobile Banking',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    industry: ['Finance', 'Banking'],
    scope: {
      name: 'Mobile App Design & Security Consulting',
      href: 'https://techcombank.com.vn',
    },
  },
  {
    id: 4,
    name: 'timelessWallet',
    url: Images.timelessWallet,
    thumbnail: 'https://fakeimg.pl/500x300/?text=timeless-wallet',
    title: 'Timeless Wallet',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    industry: ['Fintech', 'Crypto'],
    scope: {
      name: 'Branding, Design & App Development',
      href: 'https://timelesswallet.io',
    },
  },
  {
    id: 5,
    name: 'windDriver',
    url: Images.windDriver,
    thumbnail: 'https://fakeimg.pl/500x300/?text=wind-river',
    title: 'WindDriver E-Mobility',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    industry: ['Transportation', 'IoT'],
    scope: {
      name: 'IoT Integration & Dashboard Development',
      href: 'https://winddriver.io',
    },
  },
]

// Create a specific carousel context for Company type
const CompanyCarousel = createCarouselContext<Company>()

export const HeaderBackground = () => {
  return (
    <CompanyCarousel.CarouselProvider>
      <HeaderContent />
    </CompanyCarousel.CarouselProvider>
  )
}

const HeaderContent = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { hoveredItem } = CompanyCarousel.useCarousel()

  useEffect(() => {
    if (videoRef.current) {
      // videoRef.current.pause()
      videoRef.current.play().catch((err) => {
        console.warn('Video autoplay failed:', err.message)
      })
    }
  }, [])

  return (
    <section className="relative flex w-full min-h-screen overflow-hidden">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute z-0 object-cover w-full h-full"
      >
        <source src={Videos.headerBackground} type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-1 w-full h-full bg-black opacity-60" />

      <div className="absolute inset-0 z-2 flex flex-col justify-between w-full h-full">
        <div className="flex w-full h-full items-center justify-center">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-white md:text-5xl leading-tight tracking-wide md:text-start text-center">
              Innovate efficient solutions to
              <br className="hidden md:block" />
              <span className="md:pl-0"> transform idea into reality.</span>
              <br className="hidden md:block" />
              <span className="md:pl-0"> To empowering growth</span>
            </h1>
          </div>
        </div>

        <div className="absolute bottom-0 z-3 w-full">
          <div
            className={`w-full transition-opacity duration-500 flex ${hoveredItem !== undefined ? 'h-[85vh] md:h-[300px] bg-black opacity-90' : 'h-0 bg-black opacity-0'}`}
          >
            <InfoCompany item={hoveredItem} />
          </div>
          <Carousel
            data={companies}
            type="Logo"
            speed={50}
            className="rounded-lg flex bg-gray-400"
            contextHook={CompanyCarousel.useCarousel}
          />
        </div>
      </div>
    </section>
  )
}
