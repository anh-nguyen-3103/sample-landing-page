'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

type ValueBoxProps = {
  title: string
  icon: string
  isSelected: boolean
  onClick: () => void
}

const ValueBox: React.FC<ValueBoxProps> = ({ title, icon, isSelected, onClick }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300 cursor-pointer h-[180px] w-full
        ${
          isSelected
            ? 'bg-[#F0943F] text-white border border-[#F0943F]'
            : 'bg-white text-black hover:border-[#F0943F] border border-transparent'
        }
      `}
      onClick={onClick}
    >
      <div className="mb-4">
        <Image
          src={icon}
          alt={title}
          width={48}
          height={48}
          className={isSelected ? 'brightness-0 invert' : 'filter-none'}
        />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-center">{title}</h3>
    </div>
  )
}

type ValueContent = {
  id: string
  title: string
  icon: string
  content: string
}

export const ValueRepresentSection: React.FC = () => {
  const valueContents: ValueContent[] = [
    {
      id: 'cost-effective',
      title: 'Cost effective',
      icon: '/assets/icons/cost-effective.svg',
      content:
        'Zien Solutions we leverage the advantages offered by the Vietnamese government, such as tax incentives, political stability, Our team always keeps your business goals in mind and works diligently to save you costs while delivering the highest quality services. business goals in mind and works.',
    },
    {
      id: 'talent-pool',
      title: 'Talent engineer pool',
      icon: '/assets/icons/talent-engineer.svg',
      content:
        'Our elite engineering team offers diverse skills, agile collaboration, and innovative problem-solving. Choose us for cutting-edge solutions and exceptional technical excellence.',
    },
    {
      id: 'partnership',
      title: 'Long-term partnership',
      icon: '/assets/icons/long-term-partnership.svg',
      content:
        "At Zien Solutions, we take pride in turning our clients' dreams into reality. By fostering strong, long-term relationships and working collaboratively with our clients, we provide customized solutions that meet their unique needs. Our commitment to excellence has earned us the trust and loyalty of many clients who have partnered with us from the early stages of their projects and continue to do so.",
    },
    {
      id: 'quality-delivery',
      title: 'Ensured quality & Fast delivery',
      icon: '/assets/icons/ensured-quality.svg',
      content:
        'Our agile approach allows us to prioritize tasks effectively, ensuring that we deliver high-quality products to our clients quickly. We use the scrum framework and MVP to expedite the development process without compromising on quality.',
    },
  ]

  const [selectedValue, setSelectedValue] = useState<string>(
    valueContents[0]?.id || 'cost-effective',
  )

  const currentValue = valueContents.find((item) => item.id === selectedValue) ?? valueContents[0]!

  return (
    <section className="relative w-full flex overflow-hidden bg-white flex-col py-12 lg:py-16">
      <div className="relative w-full flex flex-col px-4 sm:px-6 lg:px-16 xl:px-32 z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-black mb-12">The Value We Represent</h2>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              {valueContents.map((value) => (
                <ValueBox
                  key={value.id}
                  title={value.title}
                  icon={value.icon}
                  isSelected={selectedValue === value.id}
                  onClick={() => setSelectedValue(value.id)}
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedValue}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <div className="border-l-4 border-[#F0943F] pl-4 mb-6">
                  <h3 className="text-4xl md:text-5xl text-black font-bold">
                    {currentValue.title}
                  </h3>
                </div>
                <p className="text-lg md:text-2xl text-gray-700">{currentValue.content}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
