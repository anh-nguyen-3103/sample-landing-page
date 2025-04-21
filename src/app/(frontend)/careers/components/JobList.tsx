'use client'

import { Job, JobType } from '@/payload-types'
import { formatJobFields } from '@/utilities/formatDescription'
import { formatJobLocation } from '@/utilities/formatLocation'
import { formatJobSalary } from '@/utilities/formatSalary'
import { Banknote, Loader, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PaginatedDocs } from 'payload'
import React, { useCallback, useEffect, useRef, useState } from 'react'

interface Props {
  jobs: PaginatedDocs<Job>
}

const LIMIT_ITEMS = 10

export const JobList: React.FC<Props> = ({ jobs }) => {
  const [data, setData] = useState<PaginatedDocs<Job>>(jobs)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const loaderRef = useRef<HTMLDivElement>(null)

  const hasMoreItems = data.totalDocs > data.docs.length

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

      const newJobs = await response.json()

      setData((prev) => ({
        ...prev,
        docs: [...prev.docs, ...newJobs.docs],
        page: newJobs.page,
        hasNextPage: newJobs.hasNextPage,
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

  if (!jobs || data.docs.length === 0) {
    return (
      <section className="flex flex-col w-full gap-6 md:gap-10">
        <div className="flex w-full justify-center items-center py-10 text-gray-500">
          No jobs found
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col w-full gap-6 md:gap-10">
      {data.docs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}

      {error && <div className="text-red-500 text-center py-4">{error}</div>}

      {hasMoreItems && (
        <div ref={loaderRef} className="mt-4 flex justify-center py-4">
          {loading && <Loader className="h-8 w-8 animate-spin text-black" />}
        </div>
      )}
    </section>
  )
}

const JobItem = ({ job }: { job: Job }) => {
  const navigation = useRouter()
  const jobContent = formatJobFields(job, ['description'])
  const jobTypes = job.jobType
    ? (job.jobType as unknown as JobType[]).map((type) => type.title).join(', ')
    : ''

  const handleClickItem = useCallback(() => {
    navigation.push(`/careers/job/${job.id}`)
  }, [job.id, navigation])

  return (
    <div
      className="flex rounded-lg flex-col cursor-pointer transition-all duration-500 hover:scale-[0.95] gap-2"
      onClick={handleClickItem}
    >
      {jobTypes && (
        <span className="text-xs font-medium uppercase tracking-wider text-orange-400">
          {jobTypes}
        </span>
      )}
      <h3 className="font-semibold text-lg">{job.title}</h3>
      {jobContent && <p className="text-md text-gray-500 font-medium">{jobContent.description}</p>}
      <div className="flex flex-wrap gap-2">
        <div
          className={`flex w-fit px-2 py-1 text-gray-500 rounded-full text-xs font-medium whitespace-nowrap border border-gray-500 gap-1 items-center`}
        >
          <MapPin size={14} />
          <span>{formatJobLocation(job.location)}</span>
        </div>
        <div
          className={`flex w-fit px-2 py-1 text-gray-500 rounded-full text-xs font-medium whitespace-nowrap border border-gray-500 gap-1 items-center`}
        >
          <Banknote size={14} />
          <span>{formatJobSalary(job.salary)}</span>
        </div>
      </div>
    </div>
  )
}
