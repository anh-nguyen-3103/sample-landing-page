'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

type ApproachStep = {
  id: string
  number: number
  title: string
  content: string
  bullets?: string[]
  image: string
}

export const OurApproachSection: React.FC = () => {
  const approaches: ApproachStep[] = [
    {
      id: 'initiation',
      number: 1,
      title: 'Initiation',
      content:
        "The initiation stage fosters rapport. You'll discover our team, and we'll grasp your needs to present tailored solutions, building trust in our partnership.",
      bullets: [
        'Getting in touch',
        'Receiving our diligently proposal',
        'Signing a contract and kick off the project',
      ],
      image: '/assets/images/approach/initiation.svg',
    },
    {
      id: 'discovery',
      number: 2,
      title: 'Discovery',
      content:
        'We thoroughly analyze your requirements and technical specifications to establish a solid foundation for your project, ensuring clarity and precision.',
      bullets: ['Requirement analysis', 'Technical specifications', 'Project planning'],
      image: '/assets/images/approach/discovery.svg',
    },
    {
      id: 'development',
      number: 3,
      title: 'Development',
      content:
        'Our skilled developers work collaboratively using Agile methodologies to build your solution with regular updates and transparent communication throughout.',
      bullets: ['Design implementation', 'Iterative development', 'Quality assurance testing'],
      image: '/assets/images/approach/development.svg',
    },
    {
      id: 'support',
      number: 4,
      title: 'Support And Further Development',
      content:
        'Our relationship continues after deployment with comprehensive support and maintenance services, ensuring your solution evolves with your business needs.',
      bullets: ['Ongoing maintenance', 'Performance optimization', 'Feature enhancement'],
      image: '/assets/images/approach/support.svg',
    },
  ]

  const [activeApproach, setActiveApproach] = useState<string>(approaches[0].id)
  const [direction, setDirection] = useState<number>(0)

  const handleApproachChange = (approachId: string) => {
    const currentIndex = approaches.findIndex((app) => app.id === activeApproach)
    const newIndex = approaches.findIndex((app) => app.id === approachId)
    setDirection(newIndex > currentIndex ? 1 : -1)
    setActiveApproach(approachId)
  }

  const currentApproach = approaches.find((app) => app.id === activeApproach) || approaches[0]

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 xl:px-32">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">Our Approach</h2>

        {/* Timeline navigation */}
        <div className="relative mb-16">
          {/* Timeline bar */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>

          {/* Timeline nodes */}
          <div className="flex justify-between relative">
            {approaches.map((approach, index) => (
              <div key={approach.id} className="flex flex-col items-center">
                <button
                  onClick={() => handleApproachChange(approach.id)}
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-medium text-lg mb-4 transition-all duration-300 ${
                    activeApproach === approach.id
                      ? 'bg-[#BAC7FF] text-[#4F46E5]'
                      : 'bg-white text-gray-500 border border-gray-200'
                  }`}
                >
                  {approach.number}

                  {/* Halo effect for active node */}
                  {activeApproach === approach.id && (
                    <div className="absolute w-16 h-16 rounded-full bg-[#BAC7FF] opacity-50 animate-pulse"></div>
                  )}
                </button>
                <span
                  className={`text-sm font-medium text-center ${
                    activeApproach === approach.id ? 'text-[#4F46E5]' : 'text-gray-500'
                  }`}
                >
                  {approach.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content section with animations */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeApproach}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-[220px] md:h-[220px] rounded-lg overflow-hidden"
              >
                <Image
                  src={currentApproach.image}
                  alt={currentApproach.title}
                  fill
                  //   className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="lg:w-1/2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeApproach}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                  {currentApproach.number}. {currentApproach.title}
                </h3>
                <p className="text-lg mb-6 text-gray-700">{currentApproach.content}</p>
                {currentApproach.bullets && (
                  <ul className="space-y-2">
                    {currentApproach.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start">
                        <div className="mr-2 mt-1.5 min-w-1.5 h-1.5 rounded-full bg-[#F0943F]"></div>
                        <span className="text-lg text-gray-700">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
