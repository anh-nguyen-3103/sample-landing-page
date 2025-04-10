'use client'

import React from 'react'
import Link from 'next/link'
import type { Header as HeaderType } from '@/payload-types'

type NavItem = NonNullable<HeaderType['navItems']>[number]

const HeaderNavItem: React.FC<{ item: NavItem }> = ({ item }) => (
  <Link
    href={item.link.url || '/'}
    className="flex gap-2 group relative mr-5 sm:mr-[30px] lg:mr-2 xl:mr-[30px] after:absolute after:bottom-0 after:left-0 after:top-[27px] after:h-[3px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-gradient-to-r after:from-gray-500 after:to-white after:duration-300 hover:text-transparent hover:bg-gradient-to-l hover:from-white hover:to-gray-500 hover:bg-clip-text hover:after:origin-bottom-left hover:after:scale-x-[100%]"
  >
    {item.link.label}
  </Link>
)

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  if (navItems.length === 0) return null

  return (
    <nav className="hidden md:flex flex-1 justify-center items-center w-full h-full gap-8 w-full container mx-auto">
      {navItems.map((item, index) => (
        <HeaderNavItem key={`nav-item-${index}`} item={item} />
      ))}
    </nav>
  )
}
