'use client'

import { JobType } from '@/payload-types'
import React, { useState, useEffect } from 'react'

interface Props {
  jobTypes: Array<JobType>
}

export const JobTypeList: React.FC<Props> = ({ jobTypes }) => {
  const [active, setActive] = useState<string>('')
  const [allJobTypes, setAllJobTypes] = useState<Array<JobType>>([])

  useEffect(() => {
    const allOption: JobType = {
      id: -1,
      title: 'All',
      key: 'all',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    setAllJobTypes([allOption, ...jobTypes])

    setActive(jobTypes.length > 0 ? 'All' : '')
  }, [jobTypes])

  return (
    <div className="flex gap-3 flex-wrap">
      {allJobTypes.map((jobType) => (
        <button
          key={jobType.id}
          onClick={() => setActive(jobType.title)}
          className={`px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
            jobType.title === active
              ? 'bg-white text-black border-black'
              : 'bg-transparent text-white border-white hover:bg-white hover:text-black'
          }`}
        >
          {jobType.title}
        </button>
      ))}
    </div>
  )
}
