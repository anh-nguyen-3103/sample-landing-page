import { NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload, Where } from 'payload'

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    const categoryId = req.nextUrl.searchParams.get('category')

    if (!categoryId) {
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 })
    }

    const query: Where = {
      'categories.id': {
        equals: categoryId,
      },
    }

    const result = await payload.find({
      collection: 'blogs',
      sort: '-publishedDate',
      where: query,
      limit: 10,
    })

    return NextResponse.json({ blogs: result })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json({ error: 'An error occurred while fetching blogs' }, { status: 500 })
  }
}
