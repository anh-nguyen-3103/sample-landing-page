'use client'

import { useState } from 'react'
import { Category } from '@/payload-types'
import { usePathname, useRouter } from 'next/navigation'

export function Categories({
  categories,
  onClickCategory,
}: {
  categories: Category[]
  onClickCategory?: (categoryId: number) => void
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  if (!categories?.length) return null

  const handleClick = (categoryId: number) => {
    if (pathname === '/blogs') {
      setSelectedCategoryId(categoryId)
      onClickCategory?.(categoryId)
      history.pushState(null, '', `/blogs?category=${categoryId}`)
    } else {
      router.push(`/blogs?category=${categoryId}`)
    }
  }

  return (
    <div className="flex gap-4 flex-wrap justify-center items-center">
      {categories.map((category) => {
        const isSelected = category.id === selectedCategoryId

        return (
          <p
            key={category.id}
            onClick={() => handleClick(category.id)}
            className={`flex w-fit px-4 py-2 text-lg rounded-full cursor-pointer transition-colors duration-300
              ${isSelected ? 'bg-orange-500 text-white' : 'bg-gray-800/30 text-gray-500 hover:bg-gray-800/50 hover:text-white'}
            `}
          >
            {category.title}
          </p>
        )
      })}
    </div>
  )
}
