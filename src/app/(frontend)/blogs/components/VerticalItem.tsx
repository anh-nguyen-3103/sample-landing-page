'use client'

import { Blog, Category, Media } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'
import { formatBlogFields } from '@/utilities/formatDescription'
import { Calendar, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
  blog?: Blog
  featured?: boolean
}

const VerticalItem: React.FC<Props> = ({ blog, featured = false }) => {
  const navigation = useRouter()
  if (!blog) return <></>

  const heroImage = blog.featuredImage as unknown as Media
  const contents = formatBlogFields(blog, ['content']).content as string[]

  const wordCount = contents.join(' ').split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  const categories = blog.categories
    ? (blog.categories as unknown as Category[]).map((category) => category.title).join(', ')
    : ''

  const handleClick = () => {
    navigation.push(`/blogs/blog/${blog.id}`)
  }

  return (
    <article className="w-full flex flex-col h-full group cursor-pointer" onClick={handleClick}>
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <Image
          fill
          src={heroImage?.url || '/api/placeholder/800/450'}
          alt={heroImage?.filename || blog.title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={featured}
        />
        {featured && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 mt-4 flex-grow">
        {categories && (
          <span className="text-xs font-medium uppercase tracking-wider text-orange-400">
            {categories}
          </span>
        )}

        <h3
          className={`font-bold ${featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'} text-white group-hover:text-orange-300 transition-colors`}
        >
          <Link href={`/blogs/${blog.slug}`} className="hover:underline">
            {blog.title}
          </Link>
        </h3>

        <div
          className={`text-gray-400 text-sm md:text-base ${featured ? 'line-clamp-6' : 'line-clamp-3'}`}
        >
          {contents}
        </div>

        <div className="flex items-center text-xs md:text-sm text-gray-500 mt-auto pt-3">
          <Calendar size={14} className="mr-1" />
          <span>{formatDateTime(blog.updatedAt)}</span>
          <span className="mx-2">•</span>
          <Clock size={14} className="mr-1" />
          <span>{readTime} min read</span>
        </div>

        {featured && (
          <Link
            href={`/blogs/${blog.slug}`}
            className="mt-4 inline-flex items-center text-orange-400 hover:text-orange-300 font-medium transition-colors"
          >
            Read article <span className="ml-1">→</span>
          </Link>
        )}
      </div>
    </article>
  )
}
export default VerticalItem
