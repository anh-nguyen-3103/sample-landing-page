import RichText from '@/components/RichText'
import { Category, Media, Blog } from '@/payload-types'
import configPromise from '@payload-config'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { Suspense } from 'react'
import HorizontalItem from '../../components/HorizontalItem'

export const revalidate = 500

type PageParams = {
  params: {
    id: string
  }
}

async function fetchBlogData(id: string) {
  const sanitizedId = Number(id)

  if (!Number.isInteger(sanitizedId) || sanitizedId <= 0) {
    return null
  }

  try {
    const payload = await getPayload({ config: configPromise })

    const [blog, relatedBlogs] = await Promise.all([
      payload.findByID({
        collection: 'blogs',
        id: sanitizedId,
      }),
      payload.find({
        collection: 'blogs',
        where: { id: { not_equals: sanitizedId } },
        limit: 3,
      }),
    ])

    return { blog, relatedBlogs: relatedBlogs.docs }
  } catch (error) {
    console.error('Error fetching blog data:', error)
    return null
  }
}

function LoadingSpinner() {
  return (
    <div className="flex w-full h-[60vh] justify-center items-center">
      <Loader className="h-12 w-12 animate-spin text-orange-400" />
    </div>
  )
}

function Categories({ categories }: { categories: Category[] }) {
  if (!categories?.length) return null

  return (
    <div className="flex gap-4 flex-wrap justify-center items-center">
      {categories.map((category) => (
        <p
          key={category.id}
          className="flex w-fit px-4 py-2 text-lg rounded-full text-gray-500 cursor-pointer bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-300 hover:text-white"
        >
          {category.title}
        </p>
      ))}
    </div>
  )
}

function HeroImage({ image, title }: { image?: Media; title: string }) {
  return (
    <div className="w-full h-[500px] relative rounded-2xl overflow-hidden">
      <Image
        fill
        src={image?.url || '/api/placeholder/800/450'}
        alt={image?.filename || title}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />
    </div>
  )
}

function RelatedBlogs({ blogs }: { blogs: Blog[] }) {
  if (!blogs?.length) return null

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="flex w-full flex-col md:flex-row gap-6 lg:gap-10">
        {blogs.map((blog) => (
          <HorizontalItem blog={blog} key={blog.id} />
        ))}
      </div>
    </section>
  )
}

export default async function Page({ params }: PageParams) {
  const data = await fetchBlogData(params.id)

  if (!data) notFound()

  const { blog, relatedBlogs } = data
  const heroImage = blog.featuredImage as unknown as Media
  const categories = (blog.categories as unknown as Category[]) || []

  return (
    <main className="w-full min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-12 md:py-24 text-white">
      <Suspense fallback={<LoadingSpinner />}>
        <article className="flex w-full flex-col gap-6 lg:gap-10">
          <h1 className="font-bold text-xl md:text-4xl text-white group-hover:text-orange-300 transition-colors text-center">
            {blog.title}
          </h1>

          <Categories categories={categories} />

          <div className="w-full h-[1px] bg-gray-800" />

          <HeroImage image={heroImage} title={blog.title} />

          <div className="prose prose-invert max-w-none mt-8">
            <RichText data={blog.content} enableGutter={false} enableProse={false} />
          </div>

          <RelatedBlogs blogs={relatedBlogs} />
        </article>
      </Suspense>
    </main>
  )
}
