import { Client } from '@/payload-types'
import Image from 'next/image'

interface CompanyItemProps {
  item: Client
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
        src={typeof item.logo === 'object' && item.logo?.url ? item.logo.url : ''}
        alt={
          typeof item.logo === 'object' && item.logo?.filename
            ? item.logo.filename
            : item.name || ''
        }
        width={130}
        height={70}
        className="grayscale"
        priority={true}
        loading="eager"
      />
    </div>
  )
}
