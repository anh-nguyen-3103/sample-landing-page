'use client'

import { useEffect, useRef } from 'react'
import { CardItem } from './components/Carditem'
import { Logo, LogoItem } from './components/LogoItem'

export enum ItemType {
  default,
  card,
  logo,
}

interface CarouselProps<T> {
  className?: string
  data: T[]
  play?: boolean
  speed?: number
  type?: keyof typeof ItemType
}

export const Carousel = <T,>({
  className,
  data,
  play = true,
  speed = 100,
  type,
}: CarouselProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const positionRef = useRef<number>(0)

  useEffect(() => {
    if (!play) return

    const container = containerRef.current
    const items = itemsRef.current

    if (!container || !items) return

    const originalItems = Array.from(items.children)
    originalItems.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement
      items.appendChild(clone)
    })

    const animate = () => {
      if (!container || !items) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      positionRef.current -= speed / 100

      const firstItemsWidth = items.scrollWidth / 2

      if (Math.abs(positionRef.current) >= firstItemsWidth) {
        positionRef.current = 0
      }

      items.style.transform = `translateX(${positionRef.current}px)`
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [play, speed])

  const RenderedItem = ({ item, index }: { item: T; index: number }) => {
    switch (type) {
      case 'logo':
        return <LogoItem item={item as Logo} index={index} />
      case 'card':
        return <CardItem item={item} index={index} />
      default:
        return (
          <div className="flex justify-center items-center rounded-lg bg-blue-500 text-white px-4 py-2">
            {`Item ${index}`}
          </div>
        )
    }
  }

  return (
    <section className={`w-full overflow-hidden h-fit py-4 ${className}`} ref={containerRef}>
      <div className="relative">
        <div className="flex gap-4 px-4" ref={itemsRef}>
          {data.map((item, index) => (
            <div className="flex-shrink-0 w-fit" key={`original-${index}`}>
              <RenderedItem item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
