import { Suspense } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ContentList } from './components/ContentList'
import { Loader } from 'lucide-react'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })
  const projects = await payload.find({ collection: 'projects' })

  return (
    <div className="w-full min-h-[100vh] flex flex-col bg-white">
      <Suspense
        fallback={
          <div className="flex w-full h-[100vh] justify-center items-center">
            <Loader className="h-8 w-8 animate-spin text-orange-400" />
          </div>
        }
      >
        <ContentList projects={projects} />
      </Suspense>
    </div>
  )
}
