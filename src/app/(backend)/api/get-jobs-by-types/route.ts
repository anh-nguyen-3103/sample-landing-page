import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload, Where } from 'payload'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  try {
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    const jobType = url.searchParams.get('jobTypes')
    const workType = url.searchParams.get('workType')

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1 || limit > 50) {
      return NextResponse.json({ error: 'Invalid page or limit parameters' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    const where: Where = {}

    if (workType) {
      where['workType.key'] = { equals: workType }
    }

    if (jobType && jobType !== 'all') {
      where['jobTypes.key'] = { in: [jobType] }
    }

    const jobs = await payload.find({
      collection: 'jobs',
      page,
      limit,
      where,
      sort: '-createdAt',
    })

    const headers = new Headers()
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    headers.set('Pragma', 'no-cache')
    headers.set('Expires', '0')

    return NextResponse.json(jobs, { headers })
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}
