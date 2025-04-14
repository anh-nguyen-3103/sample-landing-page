import { Company } from '@/models/client'
import React from 'react'

interface InfoCompanyProps {
  item?: Company
}

export const InfoCompany: React.FC<InfoCompanyProps> = ({ item }) => {
  if (!item) return <></>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-full p-4 gap-4 bg-red-500">
      <div className="flex h-full w-full bg-gray-100 relative" />
      <div className="flex h-full w-full bg-blue-100 relative" />
      <div className="flex h-full w-full bg-yellow-100 relative" />
    </div>
  )
}
