import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Suspense } from 'react'

import { Loader } from 'lucide-react'
import { BlogListWrapper } from './components/BlogListWrapper'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })
  const blogs = await payload.find({ collection: 'blogs' })

  return (
    <div className="w-full min-h-screen bg-white py-24">
      <Suspense
        fallback={
          <div className="flex w-full h-[100vh] justify-center items-center">
            <Loader className="h-8 w-8 animate-spin text-orange-400" />
          </div>
        }
      >
        <BlogListWrapper initialBlogs={blogs} />
      </Suspense>
    </div>
  )
}
