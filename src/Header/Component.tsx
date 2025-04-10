import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeaderClient } from './Component.client'

import { HeaderBackground } from '@/components/HeaderBackground'
import type { Header } from '@/payload-types'
export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  return (
    <div className="flex w-full h-full relative flex-col">
      <HeaderClient data={headerData} />
      <HeaderBackground />
    </div>
  )
}
