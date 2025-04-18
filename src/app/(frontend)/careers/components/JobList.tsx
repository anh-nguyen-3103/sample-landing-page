'use client'

import { Job } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import React from 'react'

interface Props {
  jobs: PaginatedDocs<Job>
}

export const JobList: React.FC<Props> = ({ jobs }) => {
  return <></>
}
