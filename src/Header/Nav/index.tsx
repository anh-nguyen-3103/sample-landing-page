'use client'

import React from 'react'
import Link from 'next/link'
import type { Header as HeaderType } from '@/payload-types'

type NavItem = NonNullable<HeaderType['navItems']>[number]

const HeaderNavItem: React.FC<{ item: NavItem }> = ({ item }) => (
  <Link
    href={item.link.url || '/'}
    className="text-sm text-gray-300 hover:text-white hover:underline transition-colors"
  >
    {item.link.label}
  </Link>
)

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  if (navItems.length === 0) return null

  return (
    <nav className="hidden md:flex flex-1 justify-center items-center w-full h-full gap-8">
      {navItems.map((item, index) => (
        <HeaderNavItem key={`nav-item-${index}`} item={item} />
      ))}
    </nav>
  )
}
