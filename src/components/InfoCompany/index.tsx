import { Company } from '@/models/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface InfoCompanyProps {
  item?: Company
  updateHoveredItem: (item?: Company) => void
}

export const InfoCompany: React.FC<InfoCompanyProps> = ({ item, updateHoveredItem }) => {
  if (!item) return <></>

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 gap-6 md:gap-8"
      onMouseEnter={() => updateHoveredItem(item)}
      onMouseLeave={() => updateHoveredItem(undefined)}
    >
      <div className="flex h-64 sm:h-72 md:h-full w-full relative overflow-hidden rounded-lg">
        <Image
          src={item.thumbnail?.url ?? ''}
          alt={item.thumbnail?.alt ?? ''}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-col justify-center w-full text-white space-y-3 md:space-y-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase">
            {item.info?.title}
          </h2>
        </div>

        <p className="text-sm text-gray-300 line-clamp-6 lg:line-clamp-none">
          {item.info?.description}
        </p>
      </div>

      <div className="flex flex-col justify-center w-full text-white space-y-4 md:pl-0 lg:pl-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
          <span className="text-sm lg:text-base uppercase font-thin mb-1 sm:mb-0">INDUSTRY</span>
          <div className="flex items-center">
            <span className="text-sm lg:text-base uppercase">{item.industry?.join('/')}</span>
          </div>
        </div>

        <div className="border-t border-gray-600 my-3" />

        <div className="flex flex-col sm:flex-row sm:justify-between w-full">
          <span className="text-sm lg:text-base uppercase font-thin mb-2 sm:mb-0">
            SCOPE OF WORK
          </span>
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 sm:justify-end">
            {item.scope &&
              item.scope.map((s, index) =>
                s.href ? (
                  <Link
                    key={index}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    <div className="border border-white text-white text-xs md:text-sm uppercase px-3 py-1 rounded-full whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200">
                      {s.name}
                    </div>
                  </Link>
                ) : (
                  <div
                    key={index}
                    className="border border-white text-white text-xs md:text-sm uppercase px-3 py-1 rounded-full whitespace-nowrap"
                  >
                    {s.name}
                  </div>
                ),
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
