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
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full h-full px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8 md:py-10 gap-6 md:gap-8"
      onMouseEnter={() => updateHoveredItem(item)}
      onMouseLeave={() => updateHoveredItem(undefined)}
    >
      <div className="flex h-52 sm:h-full w-full relative overflow-hidden rounded-lg">
        <Image
          src={item.thumbnail?.url ?? ''}
          alt={item.thumbnail?.alt ?? ''}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-col justify-center h-full w-full text-white space-y-2 sm:space-y-3">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl sm:text-2xl font-bold uppercase">{item.info?.title}</h2>
        </div>

        <p className="text-xs sm:text-sm text-gray-300 line-clamp-6 md:line-clamp-none">
          {item.info?.description}
        </p>
      </div>

      <div className="flex flex-col justify-center h-full w-full text-white space-y-3 sm:space-y-4 pl-0 sm:pl-4 lg:pl-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
          <span className="text-white md:text-xs xl:text-base 2xl:text-xl uppercase font-thin mb-1 sm:mb-0">
            INDUSTRY
          </span>
          <div className="flex items-center">
            <span className="md:text-xs xl:text-base 2xl:text-xl uppercase">
              {item.industry?.join('/')}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-600 my-2 md:my-4" />

        <div className="flex justify-between w-full">
          <span className="text-white md:text-xs xl:text-base 2xl:text-xl uppercase font-thin mb-2 sm:mb-0">
            SCOPE OF WORK
          </span>
          <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 mt-1">
            {item.scope &&
              item.scope.map((s, index) =>
                s.href ? (
                  <Link
                    key={index}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer transition-colors duration-200 hover:bg-white hover:text-black rounded-full"
                  >
                    <div className="border border-white text-white md:text-xs xl:text-base 2xl:text-xl uppercase px-2 sm:px-3 md:px-4 xl:px-5 py-1 rounded-full whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200">
                      {s.name}
                    </div>
                  </Link>
                ) : (
                  <div
                    key={index}
                    className="border border-white text-white md:text-xs xl:text-base 2xl:text-xl uppercase px-2 sm:px-3 md:px-4 xl:px-5 py-1 rounded-full whitespace-nowrap"
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
