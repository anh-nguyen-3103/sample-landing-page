'use client'

import { Videos } from '@/constants/videos'
import { Client } from '@/payload-types'
import { useEffect, useRef } from 'react'
import { Carousel } from '../Carousel'
import createCarouselContext from '../Carousel/provider'
import { InfoCompany } from '../InfoCompany'

const CompanyCarousel = createCarouselContext<Client>()

export const HeaderBackground = ({ clients }: { clients: Client[] }) => {
  return (
    <CompanyCarousel.CarouselProvider>
      <HeaderContent clients={clients} />
    </CompanyCarousel.CarouselProvider>
  )
}

const HeaderContent = ({ clients }: { clients: Client[] }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { hoveredItem, setHoveredItem } = CompanyCarousel.useCarousel()

  useEffect(() => {
    if (videoRef.current) {
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
            <InfoCompany
              item={hoveredItem}
              updateHoveredItem={(item) => {
                setHoveredItem(item)
              }}
            />
          </div>
          <Carousel
            data={clients}
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
