import { Category, Media, Project } from '@/payload-types'
import { MoveRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Position = { top?: string; left?: string; right?: string; bottom?: string }

const BackgroundBlur = ({ position }: { position: Position }) => {
  const { top, right, left, bottom } = position

  return (
    <div
      className="absolute w-[300px] h-[300px] rounded-full bg-blue-900 opacity-50 blur-xl"
      style={{ top, right, left, bottom }}
    />
  )
}

const OurWork = ({ item }: { item: Project }) => {
  const heroImage = item.heroImage as unknown as Media

  return (
    <div className="flex w-full h-full h-fit group flex-col group gap-4 rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105">
      <div className="relative rounded-2xl overflow-hidden w-full min-h-96 flex bg-white">
        {heroImage && (
          <Image
            src={heroImage.url ?? ''}
            alt={heroImage.filename ?? ''}
            fill
            className="scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute bottom-[10px] left-[10px] flex flex-wrap gap-2 items-start">
          {item.categories &&
            item.categories.map((category, index) => {
              const categoryTitle =
                typeof category === 'object' && category.title
                  ? category.title
                  : (category as unknown as Category)?.title || 'Category'

              return (
                <div key={`${index}-${categoryTitle}`} className="relative z-3 w-fit">
                  <div className="border border-white px-3 py-1 rounded-full bg-black/50 text-white">
                    <p className="text-xs font-medium">{categoryTitle}</p>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
      <p className="uppercase text-sm font-medium text-gray-400">{item.type}</p>
      <h1 className="font-bold text-2xl text-white group-hover:text-orange-500 transition-colors">
        {item.title}
      </h1>
      <p className="text-sm text-gray-500 group-hover:text-white transition-colors">
        {item.description}
      </p>
    </div>
  )
}

interface OurWorksSectionProps {
  data: Category[]
}

export const OurWorksSection: React.FC<OurWorksSectionProps> = ({ data }) => {
  const blurPositions: Position[] = [
    { top: '10%', left: '-10%' },
    { top: '0%', right: '0%' },
    { top: '40%', right: '20%' },
    { top: '30%', right: '30%' },
    { bottom: '0%', left: '25%' },
    { bottom: '0%', left: '30%' },
  ]

  return (
    <section className="relative w-full flex min-h-[60vh] overflow-hidden bg-white rounded-tl-[80px] rounded-tr-[80px] py-8">
      <div className="absolute top-0 left-0 right-0 w-full h-full bg-[#222426] overflow-hidden">
        {blurPositions.map((position, index) => (
          <BackgroundBlur key={index} position={position} />
        ))}
      </div>
      <div className="relative w-full flex flex-col px-4 sm:px-6 lg:px-16 xl:px-32 py-6 lg:py-8 z-10">
        <div className="justify-start items-center flex w-full mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Our Work</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-18 mb-8 md:mb-12">
          {data.map((item, index) => (
            <OurWork key={index} item={item} />
          ))}
        </div>
        <Link
          href={'/projects'}
          className="group relative inline-flex items-center gap-2 rounded-full border border-orange-400 px-4 py-2 transition-all duration-300 hover:bg-orange-400 w-fit self-center"
        >
          <div className="absolute right-2 h-5 w-5 rounded-full bg-orange-400 group-hover:bg-white opacity-25 z-0 blur-sm" />
          <span className="relative z-10 text-orange-400 transition-colors group-hover:text-white">
            View all
          </span>
          <MoveRight
            className="relative z-10 text-orange-400 transition-colors group-hover:text-white"
            size={18}
          />
        </Link>
      </div>
    </section>
  )
}
