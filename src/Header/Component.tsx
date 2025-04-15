import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeaderClient } from './Component.client'
import configPromise from '@payload-config'

import { HeaderBackground } from '@/components/HeaderBackground'
import type { Header } from '@/payload-types'
import { getPayload } from 'payload'
export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()
  const payload = await getPayload({ config: configPromise })
  const clients = await payload.find({ collection: 'clients' })

  return (
    <div className="flex w-full h-full relative flex-col">
      <HeaderClient data={headerData} />
      <HeaderBackground clients={clients.docs} />
    </div>
  )
}
