'use client'

import React from 'react'

import { Project } from '@/payload-types'
import { Loader } from 'lucide-react'
import { PaginatedDocs } from 'payload'
import { useEffect, useRef, useState } from 'react'
import { ContentCard } from './ContentCard'

const LIMIT_ITEMS = 30
interface ContentListProps {
  projects: PaginatedDocs<Project>
}
export const ContentList: React.FC<ContentListProps> = ({ projects }) => {
  const [loading, setLoading] = useState(false)
  const loaderRef = useRef<HTMLDivElement>(null)
  const hasMoreItems = LIMIT_ITEMS + 1 < projects.totalDocs

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry?.isIntersecting && hasMoreItems && !loading) {
          loadMoreItems()
        }
      },
      { threshold: 0.5 },
    )

    const currentRef = loaderRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [hasMoreItems, loading])

  const loadMoreItems = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 800)
  }

  return (
    <div className="px-8 py-12 lg:px-24 lg:py-16">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.docs.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>

      {hasMoreItems && (
        <div ref={loaderRef} className="mt-10 flex justify-center py-6">
          <Loader className="h-8 w-8 animate-spin text-orange-400" />
        </div>
      )}
    </div>
  )
}
