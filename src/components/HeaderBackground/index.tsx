'use client'

import { Videos } from '@/constants/videos'
import React, { useEffect, useRef } from 'react'

export const HeaderBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play()
        } catch (error) {
          console.log('[HeaderBackground/playVideo/error]: ', error)
        }
      }
    }

    playVideo()
  }, [])

  return (
    <section className="relative flex w-full min-h-[70vh] overflow-hidden">
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
      <div className="absolute inset-0 z-2 flex flex-col justify-center w-full h-full px-4 md:px-8 lg:px-12">
        <div className="container mx-auto p-8 md:p-16 lg:p-32">
          <h1 className="text-2xl font-bold text-center text-white md:text-4xl lg:text-6xl md:text-left leading-tight tracking-wide">
            Innovate efficient solutions to
            <br className="hidden md:block" />
            <span className="md:pl-0"> transform idea into reality.</span>
            <br className="hidden md:block" />
            <span className="md:pl-0"> To empowering growth</span>
          </h1>
        </div>
      </div>
    </section>
  )
}
