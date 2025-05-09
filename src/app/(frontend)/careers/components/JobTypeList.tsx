'use client'

import { JobType } from '@/payload-types'
import React, { useEffect, useState } from 'react'
import { useCareers } from '../providers'

export const JobTypeList: React.FC = () => {
  const { jobType: type, setJobType } = useCareers()
  const [allJobTypes, setAllJobTypes] = useState<Array<JobType>>([])

  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await fetch(`/api/job-types?limit=10`, {
          headers: { 'Cache-Control': 'no-store' },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`)
        }

        const data = await response.json()

        const jobTypes = data.docs as Array<JobType>

        const allOption: JobType = {
          id: -1,
          title: 'All',
          key: 'all',
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        }
        setAllJobTypes([allOption, ...jobTypes])
        setJobType(jobTypes.length > 0 ? 'all' : '')
      } catch (error) {
        console.error('Error fetching job types:', error)
        setAllJobTypes([])
      }
    }

    fetchJobTypes()
  }, [setJobType])

  const setActive = (title: string) => {
    setJobType(title)
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {allJobTypes.map((jobType) => (
        <button
          key={jobType.id}
          onClick={() => setActive(jobType.key)}
          className={`px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-colors border
            ${
              jobType.jobCount! < 1
                ? 'opacity-50 cursor-not-allowed border-white'
                : jobType.key.includes(type)
                  ? 'bg-white text-black border-black'
                  : 'bg-transparent text-white border-white hover:bg-white hover:text-black'
            }
          `}
          disabled={jobType.jobCount! < 1}
        >
          {jobType.title}
        </button>
      ))}
    </div>
  )
}
