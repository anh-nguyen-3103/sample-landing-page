'use client'

import { useEffect, useRef, useState } from 'react'
import { CompanyItem } from './components/CompanyItem'
import createCarouselContext from './provider'
import { Company } from '@/models/client'

export enum ItemType {
  Logo = 'logo',
}

export interface CarouselItemBase {
  id: string | number
}

interface CarouselProps<T extends CarouselItemBase> {
  className?: string
  data: T[]
  play?: boolean
  speed?: number
  type?: keyof typeof ItemType
  contextHook?: ReturnType<typeof createCarouselContext<T>>['useCarousel']
}

export function Carousel<T extends CarouselItemBase>({
  className = '',
  data,
  play = true,
  speed = 100,
  type,
  contextHook,
}: CarouselProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const [expandedData, setExpandedData] = useState<T[]>([])
  const [isPaused, setIsPaused] = useState(false)

  const carouselContext = contextHook
    ? { setHoveredItem: contextHook().setHoveredItem, hoveredItem: contextHook().hoveredItem }
    : {
        setHoveredItem: (_?: T) => {},
        hoveredItem: undefined,
      }

  const { setHoveredItem } = carouselContext

  useEffect(() => {
    if (!data.length) {
      setExpandedData([])
      return
    }

    setExpandedData([...data, ...data, ...data, ...data])
  }, [data])

  useEffect(() => {
    if (!play || !expandedData.length || isPaused) return

    const container = containerRef.current
    const items = itemsRef.current

    if (!container || !items) return

    const originalItemsWidth = items.scrollWidth / 4

    let position = 0
    let lastTimestamp = 0

    const animate = (timestamp: number) => {
      if (!container || !items) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      if (lastTimestamp === 0) {
        lastTimestamp = timestamp
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const delta = timestamp - lastTimestamp
      lastTimestamp = timestamp

      position -= (speed / 100) * (delta / 16.667)

      if (Math.abs(position) >= originalItemsWidth) {
        position = 0
      }

      items.style.transform = `translateX(${position}px)`
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [play, speed, expandedData, isPaused])

  const renderItem = (item: T, index: number) => {
    switch (type) {
      case 'Logo':
        return (
          <CompanyItem
            item={item as unknown as Company}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(undefined)}
          />
        )
      default:
        const itemName = 'name' in item ? String(item.name) : `Item ${index % data.length}`
        return (
          <div className="flex justify-center items-center rounded-lg bg-blue-500 text-white px-4 py-2">
            {`${itemName}`}
          </div>
        )
    }
  }

  return (
    <section
      className={`w-full overflow-hidden h-fit ${className}`}
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative">
        <div
          ref={itemsRef}
          className="flex gap-6 px-4 will-change-transform"
          style={{ transform: 'translateX(0px)' }}
        >
          {expandedData.map((item, index) => (
            <div
              className="flex-shrink-0 w-fit transition-transform duration-200 hover:scale-105"
              key={`item-${item.id}-${index}`}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(undefined)}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
