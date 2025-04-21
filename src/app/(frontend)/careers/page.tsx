import configPromise from '@payload-config'
import { Loader } from 'lucide-react'
import { getPayload } from 'payload'
import { Suspense } from 'react'
import { JobTypeList } from './components/JobTypeList'
import { JobList } from './components/JobList'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })
  const jobTypes = await payload.find({ collection: 'job-types' })

  return (
    <main className="w-full min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-32 text-white">
      <Suspense
        fallback={
          <div className="flex w-full h-screen justify-center items-center">
            <Loader className="h-8 w-8 animate-spin text-orange-400" />
          </div>
        }
      >
        <section className="flex flex-col w-full gap-6 md:gap-10">
          <div className="flex w-fit px-4 py-2 border border-white rounded-full">
            We&#39;re hiring
          </div>
          <h2 className="text-xl md:text-5xl font-bold text-white">Be part of our mission</h2>
          <h2 className="text-md md:text-xl font-medium text-white">
            We&#39;are looking for passionate people to join us on our mission. We value first
            hierarchies, clear communication, and full ownership and responsibility.
          </h2>
          <JobTypeList jobTypes={jobTypes.docs} />
          <div className="w-full h-[1px] bg-gray-800" />
          <JobList />
        </section>
      </Suspense>
    </main>
  )
}
