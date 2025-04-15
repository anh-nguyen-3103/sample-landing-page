'use client'

import { Media, Project, User } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ContentCardProps {
  item: Project
}

export const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  const heroImage = item.heroImage as unknown as Media
  const publishDate = new Date(item.createdAt ?? new Date()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const readTime = Math.max(Math.ceil((item.description?.split(' ') ?? '').length / 200), 1)

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
          <Link href={`/item/${item.slug}`}>{item.title}</Link>
        </h2>

        <div className="text-gray-600 text-md leading-relaxed">
          <Link href={`/item/${item.slug}`}>
            <p className="line-clamp-3">{item.description}</p>
          </Link>
        </div>

        <div className="flex items-center mt-auto pt-2 text-sm text-gray-500">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={'https://fakeimg.pl/500x300/'}
              alt={(item.authors?.[0] as unknown as User).name ?? ''}
              className="object-cover"
              fill
              loading="lazy"
            />
          </div>

          <div className="pl-3 text-[18px] font-medium text-blue-600">
            {(item.authors?.[0] as unknown as User).name}
            <div className="text-gray-500 mt-0.5">
              <span>{publishDate}</span>
              <span className="mx-1">•</span>
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
