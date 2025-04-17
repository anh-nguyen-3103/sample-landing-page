'use client'

import { Job } from '@/payload-types'
import { formatJobFields } from '@/utilities/formatDescription'
import { formatJobLocation } from '@/utilities/formatLocation'
import { MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

const JOB_TYPE_STYLES = {
  'full-time': 'bg-green-100 text-green-800',
  'part-time': 'bg-blue-100 text-blue-800',
  contract: 'bg-purple-100 text-purple-800',
  freelance: 'bg-pink-100 text-pink-800',
  internship: 'bg-orange-100 text-orange-800',
}

export const JobItem: React.FC<{ job: Job }> = ({ job }) => {
  const router = useRouter()
  const jobContent = formatJobFields(job, ['description'])

  const handleClick = useCallback(() => {
    router.push(`/careers/job/${job.id}`)
  }, [router, job.id])

  const jobTypeStyle =
    JOB_TYPE_STYLES[job.jobType as keyof typeof JOB_TYPE_STYLES] || 'bg-orange-100 text-orange-800'

  return (
    <div
      className="rounded-xl p-4 flex flex-col shadow-md cursor-pointer transition-all duration-300 hover:scale-[0.98] gap-2 bg-white"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-black text-base sm:text-lg">{job.title}</h3>
        <div className="flex gap-2">
          <span
            className={`text-sm w-fit px-2 py-1 rounded font-bold ${
              job._status === 'published'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {job._status}
          </span>
          <span className={`text-sm w-fit px-2 py-1 rounded font-bold ${jobTypeStyle}`}>
            {job.jobType}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <MapPin size={14} className="text-gray-500" />
        <span className="text-sm text-gray-700">{formatJobLocation(job.location)}</span>
      </div>
      {jobContent && <p className="text-md text-black font-medium">{jobContent.description}</p>}
    </div>
  )
}
