import { Company } from '@/models/client'
import React from 'react'

interface InfoCompanyProps {
  item?: Company
}

export const InfoCompany: React.FC<InfoCompanyProps> = ({ item }) => {
  if (!item) return <></>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-full px-20 p-10 gap-8">
      <div className="flex h-full w-full relative overflow-hidden rounded-lg">
        <Image src={item.thumbnail} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex flex-col justify-center h-full w-full text-white space-y-3">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold uppercase">{item.title}</h2>
        </div>

        <p className="text-sm text-gray-300">{item.description}</p>
      </div>

      <div className="flex flex-col justify-center h-full w-full text-white space-y-4 pl-8">
        <div className="flex items-center justify-between w-full">
          <span className="text-white text-xl uppercase font-thin">INDUSTRY</span>
          <div className="flex items-center">
            <span className="text-xl uppercase">{item.industry.join('/')}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-4" />

        {/* Scope of Work section */}
        <div className="flex justify-between w-full">
          <span className="text-white text-xl uppercase font-thin">SCOPE OF WORK</span>
          <div className="flex flex-col items-end gap-2 mt-1">
            {item.scope.map((s, index) => (
              <div
                key={index}
                className="border border-white text-white text-xs px-4 py-1 rounded-full whitespace-nowrap"
              >
                {s.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
