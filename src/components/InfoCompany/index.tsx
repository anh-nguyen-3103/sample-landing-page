import { Client, Project } from '@/payload-types'
import Image from 'next/image'
import React from 'react'

interface InfoCompanyProps {
  item?: Client
  updateHoveredItem: (item?: Client) => void
  relatedProject?: Project
}

export const InfoCompany: React.FC<InfoCompanyProps> = ({
  item,
  updateHoveredItem,
  relatedProject,
}) => {
  if (!item || !relatedProject) return <></>

  // Safely extract scope values
  const scopeValues = relatedProject.scope?.map((s) => s.value).filter(Boolean) || []

  // Safely get industry names
  const industryNames = Array.isArray(relatedProject.industry)
    ? relatedProject.industry
        .map((ind) => (typeof ind === 'object' ? ind.name : ''))
        .filter(Boolean)
        .join(' / ')
    : ''

  // Choose the image source carefully
  const heroImage = relatedProject.thumbnail || relatedProject.heroImage
  const imageUrl = typeof heroImage === 'object' && heroImage?.url ? heroImage.url : ''
  const imageAlt =
    typeof heroImage === 'object' && heroImage?.filename
      ? heroImage.filename
      : relatedProject.title || 'Project image'

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 gap-6 md:gap-8"
      onMouseEnter={() => updateHoveredItem(item)}
      onMouseLeave={() => updateHoveredItem(undefined)}
    >
      <div className="flex h-64 sm:h-72 md:h-full w-full relative overflow-hidden rounded-lg">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center w-full text-white space-y-3 md:space-y-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase">
            {relatedProject.title}
          </h2>
        </div>

        <p className="text-sm text-gray-300 line-clamp-6 lg:line-clamp-none">
          {relatedProject.description}
        </p>
      </div>

      <div className="flex flex-col justify-center w-full text-white space-y-4 md:pl-0 lg:pl-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
          <span className="text-sm lg:text-base uppercase font-thin mb-1 sm:mb-0">INDUSTRY</span>
          <div className="flex items-center">
            <span className="text-sm lg:text-base uppercase">{industryNames}</span>
          </div>
        </div>

        <div className="border-t border-gray-600 my-3" />

        <div className="flex flex-col sm:flex-row sm:justify-between w-full">
          <span className="text-sm lg:text-base uppercase font-thin mb-2 sm:mb-0">
            SCOPE OF WORK
          </span>
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 sm:justify-end">
            {scopeValues.map((scopeValue, index) => (
              <div
                key={index}
                className="border border-white text-white text-xs md:text-sm uppercase px-3 py-1 rounded-full whitespace-nowrap"
              >
                {scopeValue}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
