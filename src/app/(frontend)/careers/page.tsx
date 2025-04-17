import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({ collection: 'jobs' })

  console.log(docs)

  return <div className="w-full h-[100vh] container mx-auto"></div>
}
