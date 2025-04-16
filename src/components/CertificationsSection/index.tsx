'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Certification = {
  name: string
  image: string
  link: string
}

export const CertificationsSection: React.FC = () => {
  // Dữ liệu chứng chỉ (thông thường nên lấy từ API hoặc CMS)
  const certifications: Certification[] = [
    {
      name: 'Clutch Top Developers',
      image: '/assets/images/certifications/clutch.png',
      link: 'https://clutch.co',
    },
    {
      name: 'AWS Solutions Architect',
      image: '/assets/images/certifications/aws.png',
      link: 'https://aws.amazon.com/certification',
    },
    {
      name: 'Microsoft Azure Developer',
      image: '/assets/images/certifications/azure.png',
      link: 'https://learn.microsoft.com/certifications',
    },
    {
      name: 'PMI-ACP',
      image: '/assets/images/certifications/pmi.png',
      link: 'https://www.pmi.org/certifications/agile-acp',
    },
    {
      name: 'Google Cloud Engineer',
      image: '/assets/images/certifications/google.png',
      link: 'https://cloud.google.com/certification',
    },
  ]

  return (
    <section className="relative w-full flex overflow-hidden bg-white flex-col py-12 lg:py-16">
      <div className="relative w-full flex flex-col px-4 sm:px-6 lg:px-16 xl:px-32 z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-black mb-12">Certifications</h2>

        <div className="flex flex-wrap justify-start items-start gap-[30px]">
          {certifications.map((cert, index) => (
            <Link
              href={cert.link}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative transition-all duration-300"
            >
              <div className="relative w-[100px] h-[100px] flex items-start">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  width={100}
                  height={100}
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <span className="sr-only">{cert.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
