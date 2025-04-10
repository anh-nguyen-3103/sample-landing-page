'use client'

import { createContext, FC, ReactNode, useContext, useState } from 'react'
import { Item } from '.'

// Create a context creator function with proper generics
const createCarouselContext = <T extends Item>() => {
  const CarouselContext = createContext<
    | {
        hoveredItem?: T
        setHoveredItem: (item?: T) => void
      }
    | undefined
  >(undefined)

  const CarouselProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [hoveredItem, setHoveredItem] = useState<T | undefined>(undefined)

    return (
      <CarouselContext.Provider value={{ hoveredItem, setHoveredItem }}>
        {children}
      </CarouselContext.Provider>
    )
  }

  const useCarousel = (): {
    hoveredItem?: T
    setHoveredItem: (item?: T) => void
  } => {
    const context = useContext(CarouselContext)

    if (!context) {
      throw new Error('useCarousel must be used within a CarouselProvider')
    }

    return context
  }

  return { CarouselProvider, useCarousel }
}

// Export the context creator as the default export
export default createCarouselContext

// Create a default generic hook for components that don't use a specific context instance
export const useCarousel = () => {
  try {
    // This is a fallback implementation that will warn but not crash
    // It should be used only by components that are outside a provider
    console.warn(
      'Using default carousel context - make sure to use the specific context from createCarouselContext',
    )
    return {
      hoveredItem: undefined,
      setHoveredItem: () => {
        console.warn('CarouselProvider not found. Hover state will not be tracked.')
      },
    }
  } catch {
    return {
      hoveredItem: undefined,
      setHoveredItem: () => {},
    }
  }
}
