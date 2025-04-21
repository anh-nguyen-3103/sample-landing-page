'use client'

import { Job, JobType } from '@/payload-types'
import { formatJobFields } from '@/utilities/formatDescription'
import { formatJobLocation } from '@/utilities/formatLocation'
import { formatJobSalary } from '@/utilities/formatSalary'
import { Banknote, Loader, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useCareers } from '../providers'

const LIMIT_ITEMS = 10

export const JobList: React.FC = () => {
  const { type } = useCareers()

  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [error, setError] = useState<string | null>(null)
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const loaderRef = useRef<HTMLDivElement>(null)

  const fetchJobs = useCallback(
    async (pageNumber: number) => {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          page: pageNumber.toString(),
          limit: LIMIT_ITEMS.toString(),
        })

        if (type !== 'all') {
          params.append('jobTypes', type)
        }

        const response = await fetch(`/api/get-jobs-by-types?${params.toString()}`, {
          headers: { 'Cache-Control': 'no-store' },
        })

        console.log(response.url)

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`)
        }

        const data = await response.json()

        if (pageNumber === 1) {
          setJobs(data.docs)
        } else {
          setJobs((prev) => [...prev, ...data.docs])
        }

        setHasNextPage(data.hasNextPage)
        setPage(data.page)
      } catch (err) {
        console.error('Error fetching jobs:', err)
        setError('Failed to load jobs. Please try again later.')
      } finally {
        setLoading(false)
      }
    },
    [type],
  )

  useEffect(() => {
    setPage(1)
    fetchJobs(1)
  }, [fetchJobs, type])

  useEffect(() => {
    if (!hasNextPage || loading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchJobs(page + 1)
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
  }, [fetchJobs, hasNextPage, loading, page])

  if (loading && jobs.length === 0) {
    return (
      <section className="flex flex-col w-full gap-6 md:gap-10">
        <div className="flex w-full justify-center items-center py-10">
          <Loader className="h-8 w-8 animate-spin text-black" />
        </div>
      </section>
    )
  }

  if (error && jobs.length === 0) {
    return (
      <section className="flex flex-col w-full gap-6 md:gap-10">
        <div className="flex w-full justify-center items-center py-10 text-red-500">{error}</div>
      </section>
    )
  }

  if (jobs.length === 0) {
    return (
      <section className="flex flex-col w-full gap-6 md:gap-10">
        <div className="flex w-full justify-center items-center py-10 text-gray-500">
          {type !== 'all' ? `No jobs found for type: ${type}` : 'No jobs found'}
        </div>
      </section>
    )
  }

  return (
    <div className="flex flex-col w-full gap-6 md:gap-10">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}

      {error && <div className="text-red-500 text-center py-4">{error}</div>}

      <div ref={loaderRef} className="mt-4 flex justify-center py-4">
        {loading && <Loader className="h-8 w-8 animate-spin text-black" />}
      </div>
    </div>
  )
}

const JobItem = ({ job }: { job: Job }) => {
  const router = useRouter()
  const jobContent = formatJobFields(job, ['description'])
  const jobTypes = job.jobTypes
    ? (job.jobTypes as unknown as JobType[]).map((type) => type.title).join(', ')
    : ''

  const handleClickItem = useCallback(() => {
    router.push(`/careers/job/${job.id}`)
  }, [job.id, router])

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
        <div className="flex w-fit px-2 py-1 text-gray-500 rounded-full text-xs font-medium whitespace-nowrap border border-gray-500 gap-1 items-center">
          <MapPin size={14} />
          <span>{formatJobLocation(job.location)}</span>
        </div>
        <div className="flex w-fit px-2 py-1 text-gray-500 rounded-full text-xs font-medium whitespace-nowrap border border-gray-500 gap-1 items-center">
          <Banknote size={14} />
          <span>{formatJobSalary(job.salary)}</span>
        </div>
      </div>
    </div>
  )
}
