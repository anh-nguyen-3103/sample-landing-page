'use client'
import { Blog } from '@/payload-types'
import { Loader } from 'lucide-react'
import { PaginatedDocs } from 'payload'
import { useCallback, useEffect, useRef, useState } from 'react'
import VerticalItem from './VerticalItem'

interface AllBlogListProps {
  blogs: PaginatedDocs<Blog>
}

const LIMIT_BLOGS = 10

export const AllBlogList: React.FC<AllBlogListProps> = ({ blogs }) => {
  const [data, setData] = useState<PaginatedDocs<Blog>>(blogs)
  const loaderRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)

  // Calculate if there are more items to load based on current data
  const hasMoreItems = data.hasNextPage

  const handleLoadMore = useCallback(async () => {
    if (loading || !hasMoreItems) return
    try {
      setLoading(true)

      const nextPage = page + 1
      const response = await fetch(`/api/blogs?page=${nextPage}&limit=${LIMIT_BLOGS}`, {
        headers: { 'Cache-Control': 'no-store' },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`)
      }

      const newData = await response.json()

      setData((prev) => ({
        ...prev,
        docs: [...prev.docs, ...newData.docs],
        page: newData.page,
        hasNextPage: newData.hasNextPage,
        totalPages: newData.totalPages,
      }))

      setPage(nextPage)
    } catch (error) {
      console.error('[AllBlogList/HandleLoadMore/Error]', error)
    } finally {
      setLoading(false)
    }
  }, [hasMoreItems, loading, page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMoreItems && !loading) {
          handleLoadMore()
        }
      },
      { threshold: 0.1, rootMargin: '200px' },
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
  }, [handleLoadMore, hasMoreItems, loading])

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.docs.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-800/30 rounded-2xl p-4 hover:bg-gray-800/50 transition-colors duration-300"
          >
            <VerticalItem blog={blog} />
          </div>
        ))}
      </div>
      {loading && (
        <div ref={loaderRef} className="flex justify-center h-16 items-center">
          <Loader className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      )}
    </div>
  )
}
