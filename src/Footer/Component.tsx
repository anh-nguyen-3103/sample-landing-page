import { Logo } from '@/components/Logo/Logo'
import { Backgrounds } from '@/constants/images'
import type { Footer } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import { ConnectionForm } from './Components/ConnectionForm'

// Main Footer component
export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  if (navItems.length === 0) return null

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card">
      <div className="relative">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${Backgrounds.footer})` }}
        />
        <div className="flex flex-col justify-between">
          <div className="flex flex-col lg:flex-row w-full relative bg-[#75480099]">
            <div className="flex flex-col w-full lg:w-1/2 px-4 sm:px-6 lg:px-16 xl:px-32 py-6 lg:py-8 justify-center">
              <p className="font-bold text-white text-2xl md:text-4xl lg:text-5xl xl:text-6xl tracking-wide">
                {'Deliver your best'}
                <br />
                <span>{'work with'}</span>
                <br />
                <span className="underline underline-offset-8 decoration-orange-400">
                  {'Zien Solutio'}
                </span>
                <span>{'ns'}</span>
              </p>
              <div className="w-full flex flex-col justify-center">
                <p className="text-white text-base md:text-lg mt-4 md:mt-6 mb-2">
                  Feel free to contact us!
                </p>
                <div>
                  <a
                    href="mailto:info@zien.vn"
                    className="inline-block px-4 md:px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition-colors"
                  >
                    info@zien.vn
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4 sm:px-6 lg:px-16 xl:px-32 py-6 lg:py-8 flex justify-center items-center">
              <ConnectionForm />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col lg:flex-row w-full relative">
          <div className="flex flex-col justify-between w-full lg:w-3/5 px-4 sm:px-6 lg:px-16 xl:px-32 py-6 lg:py-8">
            <div className="flex flex-row justify-between items-center mb-6">
              <Link href="/">
                <Logo loading="eager" priority="high" className="invert dark:invert-0" />
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 md:gap-8 w-full">
              <div className="flex flex-col gap-2 md:gap-3 sm:w-1/2">
                <p className="font-medium text-orange-400">
                  <span className="text-orange-400 underline underline-offset-8 decoration-orange-400">
                    {'Contac'}
                  </span>
                  {'t Us'}
                </p>
                <p className="text-gray-300">{'+84.28.3899.2882'}</p>
                <p className="text-gray-300">{'info@zien.vn'}</p>
              </div>

              <div className="flex flex-col gap-2 md:gap-3 sm:w-1/2">
                <p className="font-medium text-orange-400">
                  <span className="text-orange-400 underline underline-offset-8 decoration-orange-400">
                    {'Head'}
                  </span>
                  {' Office'}
                </p>
                <p className="text-gray-300">
                  {
                    'Bcons 2 building, 4th floor, 42/1 Ung Van Khiem St., Ward 25, Binh Thanh District, HCM City'
                  }
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center w-full text-gray-400 mt-6 md:mt-8">
              {'Copyright © 2023 Zien solutions - all rights reserved.'}
            </div>
          </div>
          <div className="w-full lg:w-2/5 px-4 sm:px-6 lg:px-16 xl:px-32 py-6 lg:py-8 flex justify-center items-center">
            <div className="grid grid-cols-2 gap-3 md:gap-4 w-full">
              {navItems.map((item, index) => (
                <Link
                  href={item.link.url ?? '/'}
                  key={index}
                  className="text-gray-300 hover:text-white hover:underline transition-colors"
                >
                  {item.link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
