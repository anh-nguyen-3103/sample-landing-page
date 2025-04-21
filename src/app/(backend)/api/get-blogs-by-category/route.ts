import { NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload, Where } from 'payload'

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    const category = req.nextUrl.searchParams.get('category')
    const page = parseInt(req.nextUrl.searchParams.get('page') || '1')
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10')
    const query: Where = {
      status: { equals: 'published' },
      ...(category && {
        'categories.id': {
          equals: category,
        },
      }),
    }

    const result = await payload.find({
      collection: 'blogs',
      sort: '-publishedAt',
      where: query,
      limit: limit,
      page: page,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json({ error: 'An error occurred while fetching blogs' }, { status: 500 })
  }
}
