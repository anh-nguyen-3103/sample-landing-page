import configPromise from '@payload-config'
import { Loader } from 'lucide-react'
import { getPayload } from 'payload'
import { Suspense } from 'react'
import { AllBlogList } from './components/AllBlogList'
import HorizontalItem from './components/HorizontalItem'
import VerticalItem from './components/VerticalItem'

export default async function BlogsPage() {
  const payload = await getPayload({ config: configPromise })

  const [featuredResult, allBlogsResult] = await Promise.all([
    payload.find({
      collection: 'blogs',
      limit: 6,
      sort: '-publishedDate',
      where: { featured: { equals: true } },
    }),
    payload.find({ collection: 'blogs', limit: 10, sort: '-publishedDate' }),
  ])

  const mainFeature = featuredResult.docs.at(0) || allBlogsResult.docs.at(0)
  const secondaryFeatures = allBlogsResult.docs.slice(1, 6).length
    ? allBlogsResult.docs.slice(1, 6)
    : allBlogsResult.docs.slice(1, 6)

  return (
    <main className="w-full min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-12 md:py-24 text-white">
      <Suspense
        fallback={
          <div className="flex w-full h-[60vh] justify-center items-center">
            <Loader className="h-12 w-12 animate-spin text-orange-400" />
          </div>
        }
      >
        <section className="flex w-full min-h-[60vh] grid md:grid-cols-2 mt-12 md:mt-24 gap-6 lg:gap-8">
          <div className="flex items-center justify-center p-6 md:p-8 lg:p-12 bg-gray-800/30 rounded-2xl hover:bg-gray-800/50 transition-colors duration-300">
            {mainFeature && <VerticalItem blog={mainFeature} featured={true} />}
          </div>
          <div className="flex rounded-2xl flex-col p-6 md:p-8 lg:p-12 bg-gray-800/30 hover:bg-gray-800/40 transition-colors duration-300">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">
              Featured Posts
            </h2>
            <div className="flex flex-col gap-6 md:gap-8">
              {secondaryFeatures.map((blog) => (
                <HorizontalItem blog={blog} key={blog.id} />
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="flex justify-between items-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white">All Post</h2>
          </div>
          <AllBlogList blogs={allBlogsResult} />
        </section>
      </Suspense>
    </main>
  )
}
