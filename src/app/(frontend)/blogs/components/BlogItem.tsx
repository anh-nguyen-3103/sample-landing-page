'use client'

import { Blog, Media, User } from '@/payload-types'
import { formatBlogFields, formatJobFields } from '@/utilities/formatDescription'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  blog: Blog
}

export const BlogItem = ({ blog }: Props) => {
  const heroImage = blog.featuredImage as unknown as Media
  const publishDate = new Date(blog.createdAt ?? new Date()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const blogContent = formatBlogFields(blog, ['content'])

  return (
    <div className="flex flex-col space-y-4 hover:scale-105 transform transition-transform duration-300 cursor-pointer">
      <div className="relative aspect-video w-full overflow-hidden rounded-md">
        <Image
          src={heroImage.url ?? ''}
          alt={heroImage.filename ?? ''}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col space-y-3 flex-1">
        <h2 className="font-semibold text-3xl leading-tight tracking-tight text-gray-900">
          <Link href={`/item/${blog.slug}`}>{blog.title}</Link>
        </h2>

        <div className="text-gray-600 text-md leading-relaxed">
          <ul className="text-black font-medium space-y-2">
            {(blogContent.content as string[]).map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>

        <div className="flex items-center mt-auto pt-2 text-sm text-gray-500">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={'https://fakeimg.pl/500x300/'}
              alt={(blog.author as unknown as User).name ?? ''}
              className="object-cover"
              fill
              loading="lazy"
            />
          </div>

          <div className="pl-3 text-[18px] font-medium text-blue-600">
            {(blog.author as unknown as User).name}
            <div className="text-gray-500 mt-0.5">
              <span>{publishDate}</span>
              <span className="mx-1">•</span>
              <span>{0} min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
