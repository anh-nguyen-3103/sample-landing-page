'use client'

import { createContext, useMemo, useState, useContext } from 'react'
import { JobTypeList } from './components/JobTypeList'
import { JobList } from './components/JobList'

type CareersContextType = {
  type: string
  setType: React.Dispatch<React.SetStateAction<string>>
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
  const [type, setType] = useState<string>('all')
  const value = useMemo(() => ({ type, setType }), [type])

  return (
    <CareersContext.Provider value={value}>
      <JobTypeList />
      <div className="w-full h-[1px] bg-gray-800" />
      <JobList />
    </CareersContext.Provider>
  )
}
