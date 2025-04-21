import { NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload, Where } from 'payload'

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })
  const category = req.nextUrl.searchParams.get('category')
  const query: Where = {
    'categories.id': {
      equals: category,
    },
  }
  const result = await payload.find({
    collection: 'blogs',
    where: query,
    limit: 100,
    sort: '-publishedDate',
  })

  return NextResponse.json({ blogs: result })
}
