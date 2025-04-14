import React from 'react'
import { Company } from '../Carousel/components/CompanyItem'
import Image from 'next/image'

interface InfoCompanyProps {
  item?: Company
}

export const InfoCompany: React.FC<InfoCompanyProps> = ({ item }) => {
  if (!item) return <></>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-full p-8 px-8 gap-6">
      {/* Cột bên trái - Hình ảnh */}
      <div className="flex h-full w-full relative overflow-hidden rounded-lg">
        <Image src={item.thumbnail} alt={item.name} fill className="object-cover" />
      </div>

      {/* Cột giữa - Thông tin chính */}
      <div className="flex flex-col h-full w-full text-white space-y-3">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold uppercase">{item.title}</h2>
        </div>

        <p className="text-sm text-gray-300">{item.description}</p>
      </div>

      {/* Cột bên phải - Industry và Scope of Work */}
      <div className="flex flex-col h-full w-full text-white space-y-4">
        {/* Industry section */}
        <div className="flex items-center justify-between w-full">
          <span className="text-white text-xl uppercase font-light">INDUSTRY:</span>
          <div className="flex items-center">
            <span className="text-xl uppercase">{item.industry.join('/')}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="white w-full my-8 h-10"></div>

        {/* Scope of Work section */}
        <div className="flex items-center justify-between w-full">
          <span className="text-white text-xl uppercase font-light mb-6">SCOPE OF WORK</span>
          <div className="flex flex-col gap-2 mt-1">
            {item.scope.map((s, index) => (
              <div
                key={index}
                className="border border-white text-white text-xs px-4 py-1 rounded-full"
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
