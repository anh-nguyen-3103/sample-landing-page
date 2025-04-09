import { X } from 'lucide-react'
import React from 'react'
import { Logo } from '../Logo/Logo'
import Link from 'next/link'
import type { Header as HeaderType } from '@/payload-types'

interface DrawerProps {
  open: boolean
  onClose: () => void
  data: HeaderType
}
type NavItem = NonNullable<HeaderType['navItems']>[number]

const DrawerItem: React.FC<{ item: NavItem; onClick: () => void }> = ({ item, onClick }) => (
  <Link
    href={item.link.url || '/'}
    onClick={onClick}
    className="flex w-full h-[50px] justify-start items-center hover:opacity-50"
  >
    {item.link.label}
  </Link>
)

export const Drawer: React.FC<DrawerProps> = ({ open, onClose, data }) => {
  const navItems = data?.navItems || []

  if (navItems.length === 0) return null

  return (
    <div
      className={`fixed right-0 top-0 h-screen w-full overflow-y-hidden bg-black duration-500 ease-in-out lg:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="sticky top-0 w-full flex items-center justify-between container mx-auto p-8">
        <Link href="/" className="whitespace-nowrap text-[1.25rem]" onClick={onClose}>
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <div className="mt-[-3px] h-6 w-6 cursor-pointer" onClick={onClose}>
          <X />
        </div>
      </div>

      <div className="container mx-auto gap-4 px-8">
        {navItems.slice(0, -1).map((item, index) => (
          <DrawerItem key={`drawer-item-${index}`} item={item} onClick={onClose} />
        ))}
      </div>
    </div>
  )
}
