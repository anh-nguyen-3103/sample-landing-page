import { Company } from '@/models/client'
import Image from 'next/image'

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
        src={item.image?.url ?? ''}
        alt={item.image?.alt ?? ''}
        width={130}
        height={70}
        className="grayscale"
        priority={true}
        loading="eager"
      />
    </div>
  )
}
