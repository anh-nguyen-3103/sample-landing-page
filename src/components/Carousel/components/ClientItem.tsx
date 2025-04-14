import { Client } from '@/models/client'
import { Quote } from 'lucide-react'
import Image from 'next/image'

interface ClientItemProps {
  item: Client
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export const ClientItem = ({ item, onMouseEnter, onMouseLeave }: ClientItemProps) => {
  return (
    <div
      className="flex min-w-[800px] h-full bg-[#F7F7FA] p-6 min-h-[300px] shadow-md rounded-xl overflow-hidden flex-col justify-between"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-col gap-4">
        <Quote fill="#7488E233" className="rotate-180 -rotate-z-90" />
        <p className="text-xl font-medium text-gray-500">{item.notes}</p>
      </div>

      <div className="flex flex w-full h-fit justify-between items-center">
        <div className="flex flex-col">
          <p className="text-sm font-bold text-black">{item.author?.name}</p>
          <p className="text-xs font-whin text-gray-500 max-w-[200px]">{item.author?.title}</p>
        </div>

        <div className="w-[100px] h-[50px] relative">
          <Image
            src={item.company?.image?.url ?? ''}
            alt={item.company?.image?.alt ?? ''}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}
