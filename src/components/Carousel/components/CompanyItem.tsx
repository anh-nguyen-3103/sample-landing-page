import Image from 'next/image'
import { Item } from '..'

export interface Company extends Item {
  url: string
  thumbnail: string
  title: string
  description: string
  industry: string[]
  scope: { name: string; href: string }
}

interface CompanyItemProps {
  item: Company
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export const CompanyItem = ({ item, onMouseEnter, onMouseLeave }: CompanyItemProps) => {
  return (
    <div
      className="flex items-center justify-center w-36 h-20 p-2 rounded-md"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Image
        src={item.url}
        alt={item.name}
        width={130}
        height={70}
        className="grayscale"
        priority={true}
        loading="eager"
      />
    </div>
  )
}
