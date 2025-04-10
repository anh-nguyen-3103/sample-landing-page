'use client'

import { useEffect, useRef, useState } from 'react'
import { Company, CompanyItem } from './components/CompanyItem'
import createCarouselContext from './provider'

export enum ItemType {
  Logo = 'logo',
}

export type Item = {
  id: number
  name: string
}

interface CarouselProps<T extends Item> {
  className?: string
  data: T[]
  play?: boolean
  speed?: number
  type?: keyof typeof ItemType
  contextHook?: ReturnType<typeof createCarouselContext<T>>['useCarousel']
}

export const Carousel = <T extends Item>({
  className = '',
  data,
  play = true,
  speed = 100,
  type,
  contextHook,
}: CarouselProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  // Create a state to keep track of the expanded data array (original + clones)
  const [expandedData, setExpandedData] = useState<T[]>(data)

  const carouselContext = contextHook
    ? { setHoveredItem: contextHook().setHoveredItem, hoveredItem: contextHook().hoveredItem }
    : {
        setHoveredItem: (_?: T) => {},
        hoveredItem: undefined,
      }

  const { setHoveredItem } = carouselContext

  // Update expandedData when data changes
  useEffect(() => {
    if (!data.length) {
      setExpandedData([])
      return
    }

    // Create expanded data that includes both original and cloned items
    setExpandedData([...data, ...data])
  }, [data])

  useEffect(() => {
    if (!play || !expandedData.length) return

    const container = containerRef.current
    const items = itemsRef.current

    if (!container || !items) return

    // Calculate the width of the original items (half of the expandedData)
    const originalItemsWidth = items.scrollWidth / 2

    let position = 0

    const animate = () => {
      if (!container || !items) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      position -= speed / 100

      // Reset position when we've scrolled through the original items
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
  }, [play, speed, expandedData])

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
        return (
          <div className="flex justify-center items-center rounded-lg bg-blue-500 text-white px-4 py-2">
            {`Item ${index % data.length} - ${item.name}`}
          </div>
        )
    }
  }

  return (
    <section className={`w-full overflow-hidden h-fit ${className}`} ref={containerRef}>
      <div className="relative">
        <div ref={itemsRef} className="flex gap-6 px-4 will-change-transform">
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
