import configPromise from '@payload-config'
import { Loader } from 'lucide-react'
import { getPayload } from 'payload'
import { Suspense } from 'react'
import HorizontalItem from './components/HorizontalItem'
import VerticalItem from './components/VerticalItem'
import ClientBlogSection from '@/components/BlogSession'

async function fetchCategories() {
  try {
    const payload = await getPayload({ config: configPromise })

    const categories = await payload.find({
      collection: 'categories',
      limit: 100,
      overrideAccess: false,
      pagination: false,
    })
    return categories.docs || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return null
  }
}

export default async function BlogsPage({ searchParams }: { searchParams: { category?: string } }) {
  const payload = await getPayload({ config: configPromise })
  const categories = await fetchCategories()
  const { category } = await searchParams

  const [featuredResult, allBlogsResult] = await Promise.all([
    payload.find({
      collection: 'blogs',
      limit: 6,
      sort: '-publishedAt',
      where: { featured: { equals: true }, status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'blogs',
      limit: 10,
      sort: '-publishedAt',
      where: {
        status: { equals: 'published' },
        ...(category && {
          'categories.id': {
            equals: category,
          },
        }),
      },
    }),
  ])

  const mainFeature = featuredResult.docs.at(0) || allBlogsResult.docs.at(0)
  const secondaryFeatures =
    featuredResult.docs.slice(1, 6).length > 1
      ? featuredResult.docs.slice(1, 6)
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
        <section className="flex w-full min-h-[60vh] grid md:grid-cols-2 gap-6 lg:gap-8">
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

        {allBlogsResult && categories && (
          <ClientBlogSection categories={categories} initialBlogs={allBlogsResult} />
        )}
      </Suspense>
    </main>
  )
}
