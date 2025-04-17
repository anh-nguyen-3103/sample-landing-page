'use client'

import { Blog } from '@/payload-types'
import { Loader } from 'lucide-react'
import { PaginatedDocs } from 'payload'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BlogItem } from './BlogItem'

const LIMIT_ITEMS = 10

interface BlogListWrapperProps {
  initialBlogs: PaginatedDocs<Blog>
}

export function BlogListWrapper({ initialBlogs }: BlogListWrapperProps) {
  return <BlogList blogs={initialBlogs} />
}

function BlogList({ blogs }: { blogs: PaginatedDocs<Blog> }) {
  const [data, setData] = useState<PaginatedDocs<Blog>>(blogs)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const loaderRef = useRef<HTMLDivElement>(null)
  const hasMoreItems = data.totalDocs > data.docs.length
  const [error, setError] = useState<string | null>(null)

  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMoreItems) return

    setLoading(true)

    try {
      const response = await fetch(`/api/jobs?page=${page + 1}&limit=${LIMIT_ITEMS}`, {
        headers: { 'Cache-Control': 'no-store' },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`)
      }

      const newBlogs = await response.json()

      setData((prev) => ({
        ...prev,
        docs: [...prev.docs, ...newBlogs.docs],
        page: newBlogs.page,
        hasNextPage: newBlogs.hasNextPage,
      }))

      setPage((p) => p + 1)
    } catch (error) {
      console.error('Error loading more jobs:', error)
      setError('Failed to load more jobs. Please try again later.')
    } finally {
      setLoading(false)
    }
  }, [hasMoreItems, loading, page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMoreItems && !loading) {
          loadMoreItems()
        }
      },
      { threshold: 0.5, rootMargin: '100px' },
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
  }, [hasMoreItems, loading, loadMoreItems])

  if (!data || data.docs.length === 0) {
    return (
      <div className="flex w-full justify-center items-center py-10 text-gray-500">
        No jobs found
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full h-full px-4 sm:px-8 md:px-12 py-8 md:py-12 gap-6 md:gap-8">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-black text-3xl font-bold">List Blog</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data.docs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>

      {error && <div className="text-red-500 text-center py-4">{error}</div>}

      {hasMoreItems && (
        <div ref={loaderRef} className="mt-4 flex justify-center py-4">
          {loading && <Loader className="h-8 w-8 animate-spin text-black" />}
        </div>
      )}
    </div>
  )
}
