'use client'

import { Earth3D } from '@/components/Earth3D'
import { Backgrounds } from '@/constants/images'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const StatisticsSection = () => {
  const [years, setYear] = useState<number>(0)
  const [monthAverage, setMonthAverage] = useState<number>(0)
  const [rate, setRate] = useState<number>(0)
  const [servicePercent, setServicePercent] = useState<number>(0)

  useEffect(() => {
    const targetYears = 8
    const targetMonthAverage = 36
    const targetRate = 97
    const targetServicePercent = 100

    const duration = 2000
    const steps = 100
    const interval = duration / steps

    let currentStep = 0

    const animationTimer = setInterval(() => {
      currentStep++

      if (currentStep <= steps) {
        const progress = currentStep / steps

        if (progress <= 0.8) {
          const animationProgress = progress / 0.8
          setYear(Math.round(animationProgress * 100))
          setMonthAverage(Math.round(animationProgress * 100))
          setRate(Math.round(animationProgress * 100))
          setServicePercent(Math.round(animationProgress * 100))
        } else {
          const rollbackProgress = (progress - 0.8) / 0.2
          setYear(Math.round(100 - rollbackProgress * (100 - targetYears)))
          setMonthAverage(Math.round(100 - rollbackProgress * (100 - targetMonthAverage)))
          setRate(Math.round(100 - rollbackProgress * (100 - targetRate)))
          setServicePercent(Math.round(100 - rollbackProgress * (100 - targetServicePercent)))
        }
      } else {
        setYear(targetYears)
        setMonthAverage(targetMonthAverage)
        setRate(targetRate)
        setServicePercent(targetServicePercent)
        clearInterval(animationTimer)
      }
    }, interval)

    return () => clearInterval(animationTimer)
  }, [])

  return (
    <section
      className="w-full flex flex-col min-h-[50vh] bg-white bg-contain"
      style={{ backgroundImage: `url(${Backgrounds.statistic})`, backgroundRepeat: 'no-repeat' }}
    >
      <div className="w-full flex flex-col lg:flex-row justify-between items-center py-12 lg:h-2/3 px-28">
        <div className="flex flex-col justify-center gap-4 max-w-2xl mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-black text-center lg:text-left">
            Why Choose Us?
          </h1>
          <p className="text-md md:text-base font-medium text-gray-500 text-center lg:text-left">
            {`At Zien Solutions, We deliver tailored IT outsourcing solutions unlock your business's
            true potential. With personalized service and expert dedication, we ensure a seamless
            experience for our clients. Join our satisfied customers and witness your business
            thrive with our proven expertise. Partner with us to drive your success forward.`}
          </p>
          <div className="flex justify-center lg:justify-start mt-2">
            <Link
              href={'/'}
              className="group relative inline-flex items-center gap-2 rounded-full border border-[#3D4BFC] px-4 py-2 transition-all duration-300 hover:bg-[#3D4BFC] w-fit"
            >
              <div className="absolute right-2 h-5 w-5 rounded-full bg-[#3D4BFC] group-hover:bg-white opacity-25 z-0 blur-sm" />
              <span className="relative z-10 text-[#3D4BFC] transition-colors group-hover:text-white">
                About Us
              </span>
              <MoveRight
                className="relative z-10 text-[#3D4BFC] transition-colors group-hover:text-white"
                size={18}
              />
            </Link>
          </div>
        </div>
        <div className="w-full max-w-md lg:max-w-none lg:w-1/2 flex justify-center">
          <Earth3D />
        </div>
      </div>

      <div className="w-full flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 py-12 px-28">
        <div className="w-full p-6 flex justify-between gap-6">
          <div className="w-1 h-[55%] bg-orange-400 rounded-full" />
          <div className="flex flex-col h-full justify-evenly items-start flex-1">
            <h1 className="text-5xl md:text-5xl font-bold text-black mb-4">{`${years}+`}</h1>
            <p className="text-xs md:text-base font-medium text-gray-500">Years of experience</p>
          </div>
        </div>
        <div className="w-full p-6 flex justify-between gap-6">
          <div className="w-1 h-[55%] bg-orange-400 rounded-full" />
          <div className="flex flex-col h-full justify-evenly items-start flex-1">
            <h1 className="text-5xl md:text-5xl font-bold text-black mb-4">{`${monthAverage}`}</h1>
            <p className="text-xs md:text-base font-medium text-gray-500">
              month average engagement
            </p>
          </div>
        </div>
        <div className="w-full p-6 flex justify-between gap-6">
          <div className="w-1 h-[55%] bg-orange-400 rounded-full" />
          <div className="flex flex-col h-full justify-evenly items-start flex-1">
            <h1 className="text-5xl md:text-5xl font-bold text-black mb-4">{`${rate}%`}</h1>
            <p className="text-xs md:text-base font-medium text-gray-500">Client Retention Rate</p>
          </div>
        </div>
        <div className="w-full p-6 flex justify-between gap-6">
          <div className="w-1 h-[55%] bg-orange-400 rounded-full" />
          <div className="flex flex-col h-full justify-evenly items-start flex-1">
            <h1 className="text-5xl md:text-5xl font-bold text-black mb-4">{`${servicePercent}%`}</h1>
            <p className="text-xs md:text-base font-medium text-gray-500">
              Dedicated & Personalized Service
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
