import { Author, Client, Scope } from '@/models/client'

const categoryOptions = ['Tech', 'Finance', 'Health', 'Education']
const projectTypes = ['Web App', 'Mobile App', 'SaaS', 'Platform']
const projectNames = ['Nova', 'Pulse', 'Orbit', 'Zenith']
const authors: Author[] = [
  {
    id: 1,
    name: 'Theodore Blizzard',
    avatar: '/avatars/theodore.png',
    title: 'Former CTO of Hoan My',
  },
  {
    id: 2,
    name: 'Hochung Nam',
    avatar: '/avatars/hochung.png',
    title: 'Co-Founder/COO/Product, Timeless Space Inc.',
  },
  {
    id: 3,
    name: 'Shamir Alibhai',
    avatar: '/avatars/shamir.png',
    title: 'Founder/CEO, Simon Says Inc.',
  },
  {
    id: 4,
    name: 'James Flynn',
    avatar: '/avatars/james.png',
    title: 'Director Digital Banking, Techcombank',
  },
]

export const clients: Client[] = Array.from({ length: 4 }).map((_, index) => {
  const hex = Array.from({ length: 6 }, () =>
    '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16)),
  ).join('')

  const shuffled = [...categoryOptions].sort(() => 0.5 - Math.random())
  const selectedCategories = shuffled.slice(0, Math.floor(Math.random() * 2) + 2)

  const safeIndex = index % projectTypes.length
  const projectType = projectTypes[safeIndex]
  const projectName = projectNames[safeIndex]
  const author = authors[safeIndex]

  const companyImages = ['hoan-my', 'timeless-wallet', 'simon-says', 'techcombank']

  const notesList = [
    `I feel confident that Zien Solutions will be a reliable and successful partner. The Zien Team is extremely conscientious and dedicated to quality deliverables... I strongly recommend Zien Solutions for any IT project they are seeking in the future.`,
    `Timeless is a venture-funded start-up... The team is collectively result-driven, and the team has the mental fortitude, acumen, and patience to navigate through ambiguity and pressure-packed deadlines with grace.`,
    `They listened to my thoughts and suggestions and far surpassed my expectations... I am looking forward to developing my next project with the wonderful team at Zien Solutions.`,
    `Zien Solutions far exceeded my expectations for professionalism, speed, and quality of work... They delivered quality service, and at several points contributed insights that markedly improved the product.`,
  ]

  const companyNames = [
    'Hoan My Medical Corporation',
    'Timeless Wallet',
    'Simon Says Inc.',
    'Techcombank',
  ]
  const descriptions = [
    'A major medical corporation focused on innovation in healthcare.',
    'A startup building blockchain-integrated digital solutions.',
    'A video transcription and subtitle generation platform.',
    "One of Vietnam's largest banks, leading innovation in fintech.",
  ]

  const infoTitles = ['Healthcare', 'Blockchain Startup', 'AI Transcription', 'Banking & Fintech']

  // Create an array of scopes instead of a single scope object
  const scopes: Scope[] = [
    {
      name: projectType,
      href: `/scopes/${projectType?.toLowerCase().replace(/\s/g, '-')}`,
    },
  ]

  return {
    id: index + 1,
    notes: notesList[index],
    author,
    project: {
      id: index + 1,
      name: projectName,
      href: `/projects/${projectName?.toLowerCase()}`,
    },
    company: {
      id: index + 1,
      name: companyNames[index],
      info: {
        title: infoTitles[index],
        description: descriptions[index],
      },
      image: {
        alt: `${companyNames[index]} Logo`,
        url: `/assets/images/${companyImages[index]}-logo.png`,
      },
      thumbnail: {
        alt: `Thumb ${index + 1}`,
        url: `https://fakeimg.pl/100x100/${hex}/?text=C${index + 1}`,
      },
      description: descriptions[index],
      industry: selectedCategories,
      scope: scopes, // Changed from a single object to an array of Scope objects
      href: `/companies/company-${index + 1}`,
    },
  }
})
