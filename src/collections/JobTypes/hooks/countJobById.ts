import { JobType } from '@/payload-types'
import { CollectionAfterChangeHook } from 'payload'

export const countJobById: CollectionAfterChangeHook<JobType> = async ({
  doc,
  req: { payload },
}) => {
  try {
    if (!doc.key) return doc // Optional safeguard

    const jobsCount = await payload.find({
      collection: 'jobs',
      where: {
        'jobTypes.key': {
          in: doc.key,
        },
      },
      limit: 0,
    })

    if (doc.jobCount !== jobsCount.totalDocs) {
      await payload.update({
        collection: 'job-types',
        id: doc.id,
        data: {
          jobCount: jobsCount.totalDocs,
        },
      })

      console.log(`Updated job count for type ${doc.key} to ${jobsCount.totalDocs}`)
    }
  } catch (error) {
    console.error(`Error updating job count for job type ${doc.key}:`, error)
  }

  return doc
}
