'use client'

import { Blog, Category, Media } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'
import { formatBlogFields } from '@/utilities/formatDescription'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  blog?: Blog
}

const HorizontalItem = ({ blog }: Props) => {
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
    if (!blog) return

    navigation.push(`/blogs/blog/${blog.id}`)
  }

  return (
    <article
      className="flex flex-col md:flex-row gap-4 md:gap-6 group h-full cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative h-24 md:h-28 aspect-square rounded-xl overflow-hidden flex-shrink-0">
        <Image
          fill
          src={heroImage?.url || '/api/placeholder/800/450'}
          alt={heroImage?.filename || blog.title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 96px, 112px"
          priority
        />
      </div>

      <div className="flex flex-col gap-2 flex-grow">
        {categories && (
          <span className="text-xs font-medium uppercase tracking-wider text-orange-400">
            {categories}
          </span>
        )}

        <h3 className="font-bold text-base md:text-lg text-white group-hover:text-orange-300 transition-colors">
          <Link href={`/blogs/${blog.slug}`} className="hover:underline">
            {blog.title}
          </Link>
        </h3>

        <div className="text-gray-400 text-sm line-clamp-2">{contents[0]}</div>

        <div className="flex items-center text-xs text-gray-500 mt-auto pt-2">
          <Calendar size={12} className="mr-1" />
          <span>{formatDateTime(blog.updatedAt)}</span>
          <span className="mx-2">•</span>
          <Clock size={12} className="mr-1" />
          <span>{readTime} min read</span>
        </div>
      </div>
    </article>
  )
}

export default HorizontalItem
