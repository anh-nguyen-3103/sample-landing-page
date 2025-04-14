import { Company } from '@/models/client'

const industryOptions = [
  ['AI', 'Crowdsourcing'],
  ['Media', 'News'],
  ['Media', 'AI', 'Productivity'],
  ['Finance', 'Banking'],
  ['Fintech', 'Crypto'],
  ['Transportation', 'IoT'],
]

const companyNames = [
  'bobidi',
  'joongang',
  'simonSays',
  'techcombank',
  'timelessWallet',
  'windDriver',
]

const companyImages = [
  'bobidi',
  'joongang',
  'simon-says',
  'techcombank',
  'timeless-wallet',
  'wind-driver',
]

const titles = [
  'Bobidi AI Crowdtesting Platform',
  'Joongang Media Group',
  'Simon Says Transcription',
  'Techcombank Mobile Banking',
  'Timeless Wallet',
  'WindDriver E-Mobility',
]

const scopes = [
  {
    name: 'Full Product Design & Development',
    href: 'https://bobidi.com',
  },
  {
    name: 'UI/UX Overhaul & Frontend Development',
    href: 'https://joongang.co.kr',
  },
  {
    name: 'AI Integration & Web App Optimization',
    href: 'https://simonsays.ai',
  },
  {
    name: 'Mobile App Design & Security Consulting',
    href: 'https://techcombank.com.vn',
  },
  {
    name: 'Branding, Design & App Development',
    href: 'https://timelesswallet.io',
  },
  {
    name: 'IoT Integration & Dashboard Development',
    href: 'https://winddriver.io',
  },
]

export const companies: Company[] = Array.from({ length: 6 }).map((_, index) => {
  const name = companyNames[index]
  const image = companyImages[index]
  const hex = Array.from({ length: 6 }, () =>
    '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16)),
  ).join('')

  return {
    id: index,
    name,
    image: {
      url: `/assets/images/${image}-logo.png`,
      alt: `${name} logo`,
    },
    thumbnail: {
      url: `https://fakeimg.pl/500x300/${hex}/?text=${name}`,
      alt: `${name} thumbnail`,
    },
    info: {
      title: titles[index],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    },
    industry: industryOptions[index],
    scope: scopes[index],
  }
})
