import { formatJobFields } from '@/utilities/formatDescription'
import { formatJobSalary } from '@/utilities/formatSalary'
import configPromise from '@payload-config'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { JobItem } from '../../components/JobItem'

export const revalidate = 600

type Args = {
  params: Promise<{
    id: string
  }>
}

const JOB_TYPE_STYLES = {
  'full-time': 'bg-green-100 text-green-800',
  'part-time': 'bg-blue-100 text-blue-800',
  contract: 'bg-purple-100 text-purple-800',
  freelance: 'bg-pink-100 text-pink-800',
  internship: 'bg-orange-100 text-orange-800',
}

export default async function Page({ params: paramsPromise }: Args) {
  const { id } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedId = Number(id)

  if (!Number.isInteger(sanitizedId)) notFound()

  const job = await payload.findByID({ collection: 'jobs', id: sanitizedId })
  const jobs = await payload.find({
    collection: 'jobs',
    where: { id: { equals: job.id } },
  })

  const jobTypeStyle =
    JOB_TYPE_STYLES[job.jobType as keyof typeof JOB_TYPE_STYLES] || 'bg-orange-100 text-orange-800'

  const jobContent = formatJobFields(job, [
    'responsibilities',
    'requirements',
    'others',
    'description',
  ])

  return (
    <div className="flex flex-col w-full h-full px-4 sm:px-8 md:px-12 py-32 gap-6 md:gap-8 justify-center items-center bg-white">
      <div className="flex justify-center items-center w-full flex-col gap-4">
        <span className={`text-md w-fit px-4 py-2 font-bold rounded-full ${jobTypeStyle}`}>
          {job.jobType}
        </span>
        <h1 className="text-3xl text-black font-bold">{job.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
          <span className="text-black font-bold text-xl">Job Description:</span>
          <p className="text-black font-medium text-md">{jobContent.description}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
          <span className="text-black font-bold text-xl">Required Skills:</span>
          <p className="text-black font-medium text-md">
            {job.skills?.map((e) => e.skill)?.join(', ')}
          </p>
          <span className="font-bold text-xl">Salary:</span>
          <p className="font-medium text-md">{formatJobSalary(job.salary)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
          <span className="text-black font-bold text-xl">Responsibilities:</span>
          <ul className="text-black font-medium text-md list-disc pl-5 space-y-2">
            {(jobContent.responsibilities as string[]).map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
          <span className="text-black font-bold text-xl">Experience and Qualifications: </span>
          <ul className="text-black font-medium text-md list-disc pl-5 space-y-2">
            {(jobContent.requirements as string[]).map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
          <span className="text-black font-bold text-xl">Other personal qualities & skills: </span>
          <ul className="text-black font-medium text-md list-disc pl-5 space-y-2">
            {(jobContent.others as string[]).map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        href={'/apply/' + sanitizedId}
        className="group relative inline-flex items-center gap-2 rounded-full border border-[#3D4BFC] px-4 py-2 transition-all duration-300 hover:bg-[#3D4BFC] w-fit"
      >
        <div className="absolute right-2 h-5 w-5 rounded-full bg-[#3D4BFC] group-hover:bg-white opacity-25 z-0 blur-sm" />
        <span className="relative z-10 text-[#3D4BFC] transition-colors group-hover:text-white">
          Apply for this job
        </span>
        <MoveRight
          className="relative z-10 text-[#3D4BFC] transition-colors group-hover:text-white"
          size={18}
        />
      </Link>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-black text-3xl font-bold">Reference Job</h1>
      </div>
      {jobs.docs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </div>
  )
}
