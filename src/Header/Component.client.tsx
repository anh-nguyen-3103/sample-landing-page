'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Drawer } from '@/components/Drawer'
import { Logo } from '@/components/Logo/Logo'
import { Menu } from 'lucide-react'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="absolute z-20 w-full left-0 right-0 top-0"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="p-8 flex justify-between gap-8 items-center h-full w-full bg-gradient-to-b from-black from-50% to-transparent to-100% blur-xs">
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <HeaderNav data={data} />
        <div className="hidden md:flex" />
        <div
          className="flex h-6 w-6 items-end md:hidden cursor-pointer"
          onClick={() => setOpenMenu(true)}
        >
          <Menu />
        </div>
        <Drawer open={isOpenMenu} onClose={() => setOpenMenu(false)} data={data} />
      </div>
    </header>
  )
}
