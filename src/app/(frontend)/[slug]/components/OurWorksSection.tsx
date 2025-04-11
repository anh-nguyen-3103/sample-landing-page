'use client'

import Image from 'next/image'

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

const OurWork = ({ item }: { item: Work }) => {
  return (
    <div className="flex w-full h-[450px] flex-col group gap-4 hover:scale-105 transition-all duration-500 cursor-pointer">
      <div className="w-full h-64 relative rounded-2xl overflow-hidden">
        <Image src={item.image.url} alt={item.image.alt} fill />
        <div className="absolute bottom-[10px] left-[10px] flex flex-wrap gap-2 items-start">
          {item.categories &&
            item.categories.map((category, index) => {
              return (
                <div key={`${category}_${index}`} className="relative z-3 w-fit">
                  <div className="border-2 px-3 py-1 rounded-full bg-black/70 text-white">
                    <p className="text-xs font-medium">{category}</p>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
      <p className="uppercase text-sm font-medium text-gray-400">{item.type}</p>
      <h1 className="font-bold text-2xl text-white group-hover:text-orange-500 transition-colors">
        {item.name}
      </h1>
      <p className="text-sm text-gray-500 group-hover:text-white transition-colors">
        {item.description}
      </p>
    </div>
  )
}

export const OurWorksSection = () => {
  const blurPositions: Position[] = [
    { top: '10%', left: '-10%' },
    { top: '0%', right: '0%' },
    { top: '40%', right: '20%' },
    { top: '30%', right: '30%' },
    { bottom: '0%', left: '25%' },
    { bottom: '0%', left: '30%' },
  ]

  return (
    <section className="rounded-tl-[40px] rounded-tr-[40px] relative">
      <div className="absolute top-0 left-0 right-0 w-full h-full bg-[#222426] overflow-hidden">
        {blurPositions.map((position, index) => (
          <BackgroundBlur key={index} position={position} />
        ))}
      </div>
      <div className="relative container mx-auto px-4 md:px-6 lg:px-8 z-10 py-16">
        <div className="mb-12 justify-start items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Work</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {data.map((item, index) => (
            <OurWork key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

type Work = {
  id: number
  href?: string
  name?: string
  categories?: string[]
  type?: string
  description: string
  image: { alt: string; url: string }
}

const projectTypes = ['MOBILE APP', 'WEB DESIGN', 'BRANDING', 'UI/UX DESIGN']
const projectNames = [
  'Digital Marketplace',
  'Brand Identity System',
  'E-commerce Platform',
  'Corporate Website',
]
const categoryOptions = [
  'React',
  'NextJS',
  'Tailwind CSS',
  'TypeScript',
  'UI Design',
  'UX Research',
  'Mobile',
  'Web',
]

const data = Array.from({ length: 4 }).map((_, index) => {
  const hex = Array.from({ length: 6 }, () =>
    '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16)),
  ).join('')

  const shuffled = [...categoryOptions].sort(() => 0.5 - Math.random())
  const selectedCategories = shuffled.slice(0, Math.floor(Math.random() * 2) + 2)

  const safeIndex = index % projectTypes.length
  const projectType = projectTypes[safeIndex]
  const projectName = projectNames[safeIndex]

  return {
    id: index,
    href: '/',
    name: projectName,
    categories: selectedCategories,
    type: projectType,
    description:
      'This project demonstrates our ability to combine innovative design with technical excellence. We delivered a solution that exceeded client expectations and improved their business metrics significantly.',
    image: {
      alt: `Project ${index + 1}`,
      url: `https://fakeimg.pl/500x300/${hex}/?text=Project ${index + 1}&font_size=18`,
    },
  }
})
