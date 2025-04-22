'use client'

import { useEffect, useState } from 'react'
import { Categories } from '@/components/Categories'
import { Blog, Category } from '@/payload-types'
import { AllBlogList } from '@/app/(frontend)/blogs/components/AllBlogList'
import { PaginatedDocs } from 'payload'
import { useSearchParams } from 'next/navigation'

interface Props {
  categories: Category[]
  initialBlogs: PaginatedDocs<Blog>
}

export default function ClientBlogSection({ categories, initialBlogs }: Props) {
  const searchParams = useSearchParams()
  const [blogs, setBlogs] = useState(initialBlogs)

  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      const el = document.getElementById('blog-section')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [searchParams])

  const handleCategoryClick = async (categoryId: number) => {
    try {
      const res = await fetch(`/api/get-blogs-by-category?category=${categoryId}`)
      if (!res.ok) {
        console.error('Failed to fetch blogs:', res.statusText)
        throw new Error('Failed to fetch blogs')
      }
      const data = await res.json()
      setBlogs(data)
    } catch (err) {
      console.error('Failed to fetch blogs:', err)
    }
  }

  return (
    <section id="blog-section" className="w-full py-12 md:py-24">
      <div className="flex justify-between items-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white">All Post</h2>
      </div>

      <Categories categories={categories} onClickCategory={handleCategoryClick} />
      <div className="w-full h-[1px] bg-gray-800 my-4" />
      <AllBlogList blogs={blogs} />
    </section>
  )
}
