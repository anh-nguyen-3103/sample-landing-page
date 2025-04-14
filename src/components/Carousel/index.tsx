'use client'

import { useEffect, useRef, useState } from 'react'
import { CompanyItem } from './components/CompanyItem'
import createCarouselContext from './provider'
import { Client, Company } from '@/models/client'
import { ClientItem } from './components/ClientItem'

export enum ItemType {
  Logo = 'logo',
  Client = 'client',
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

    setExpandedData([...data, ...data])
  }, [data])

  useEffect(() => {
    if (!play || !expandedData.length || isPaused) return

    const container = containerRef.current
    const items = itemsRef.current

    if (!container || !items) return

    const originalItemsWidth = items.scrollWidth / 2
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
      case 'Client':
        return (
          <ClientItem
            item={item as unknown as Client}
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
    <div
      className={`overflow-hidden ${className}`}
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative">
        <div
          ref={itemsRef}
          className="flex gap-6 will-change-transform w-full h-full"
          style={{ transform: 'translateX(0px)' }}
        >
          {expandedData.map((item, index) => {
            return (
              <div key={index} className="flex h-full w-full">
                {renderItem(item, index)}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
