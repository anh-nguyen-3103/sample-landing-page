'use client'

import { createContext, useMemo, useState, useContext } from 'react'
import { JobTypeList } from './components/JobTypeList'
import { JobList } from './components/JobList'
import { WorkTypeList } from './components/WorkTypeList'

type CareersContextType = {
  jobType: string
  setJobType: React.Dispatch<React.SetStateAction<string>>
  workType: string
  setWorkType: React.Dispatch<React.SetStateAction<string>>
}

export const CareersContext = createContext<CareersContextType | undefined>(undefined)

export const useCareers = (): CareersContextType => {
  const context = useContext(CareersContext)
  if (context === undefined) {
    throw new Error('useCareers must be used within a CareersProvider')
  }
  return context
}

export const CareersProvider = () => {
  const [jobType, setJobType] = useState<string>('all')
  const [workType, setWorkType] = useState<string>('full-time')
  const value = useMemo(() => ({ jobType, setJobType, workType, setWorkType }), [jobType, workType])

  return (
    <CareersContext.Provider value={value}>
      <div className="flex flex-col gap-3 flex-wrap">
        <JobTypeList />
        <WorkTypeList />
      </div>
      <div className="w-full h-[1px] bg-gray-800" />
      <JobList />
    </CareersContext.Provider>
  )
}
