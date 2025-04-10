import Image from 'next/image'
import React from 'react'
import { Company } from '../Carousel/components/CompanyItem'

interface InfoCompanyProps {
  item?: Company
}

export const InfoCompany: React.FC<InfoCompanyProps> = ({ item }) => {
  if (!item) return <></>
  console.log(item)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-full p-4 gap-4 bg-red-100">
      <div className="flex justify-center items-center relative w-full h-full">
        <Image src={item.thumbnail} alt={item.name} fill priority={true} className="rounded-2xl" />
      </div>
      <div className="flex bg-blue-100 relative"></div>
      <div className="flex bg-yellow-100 relative"></div>
    </div>
  )
}
