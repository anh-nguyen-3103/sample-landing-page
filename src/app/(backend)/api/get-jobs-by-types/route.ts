import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload, Where } from 'payload'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const payload = await getPayload({ config: configPromise })

  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = parseInt(url.searchParams.get('limit') || '10', 10)
  const jobType = url.searchParams.get('jobTypes')
  let where: Where = {}

  if (jobType && jobType !== 'all') {
    where = {
      'jobTypes.key': {
        in: jobType,
      },
    }
  }

  try {
    const jobs = await payload.find({ collection: 'jobs', page, limit, where })
    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}
