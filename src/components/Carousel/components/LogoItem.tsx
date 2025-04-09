import Image from 'next/image'
import React from 'react'

export type Logo = { id: number; name: string; url: string }

interface LogoItemProps {
  item: Logo
  index: number
}

export const LogoItem = ({ item }: LogoItemProps) => {
  return (
    <div
      key={item.id}
      className="flex items-center justify-center w-[150px] h-[90px] p-2 rounded-md"
    >
      <Image
        src={item.url}
        alt={item.name}
        width={130}
        height={70}
        objectFit="contain"
        style={{
          filter: 'grayscale(100%)',
        }}
      />
    </div>
  )
}
