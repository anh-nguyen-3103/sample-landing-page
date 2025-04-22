'use client'

import { JobType } from '@/payload-types'
import React, { useEffect, useState } from 'react'
import { useCareers } from '../providers'

export const WorkTypeList: React.FC = () => {
  const { workType: type, setWorkType } = useCareers()
  const [allJobTypes, setAllJobTypes] = useState<Array<JobType>>([])

  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await fetch(`/api/work-types?limit=10`, {
          headers: { 'Cache-Control': 'no-store' },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`)
        }

        const data = await response.json()
        const jobTypes = data.docs || []

        setAllJobTypes(jobTypes)
        setWorkType(jobTypes.length > 0 ? 'full-time' : '')
      } catch (error) {
        console.error('Error fetching job types:', error)
        setAllJobTypes([])
      }
    }

    fetchJobTypes()
  }, [setWorkType])

  const setActive = (title: string) => {
    setWorkType(title)
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {allJobTypes.map((workType) => (
        <button
          key={workType.id}
          onClick={() => setActive(workType.key)}
          className={`px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-colors border
            ${
              workType.jobCount! < 1
                ? 'opacity-50 cursor-not-allowed border-white'
                : workType.key.includes(type)
                  ? 'bg-white text-black border-black'
                  : 'bg-transparent text-white border-white hover:bg-white hover:text-black'
            }
          `}
          disabled={workType.jobCount! < 1}
        >
          {workType.title}
        </button>
      ))}
    </div>
  )
}
