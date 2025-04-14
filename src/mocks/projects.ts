import { Project } from '@/models/project'

const projectTypes = ['MOBILE APP', 'WEB APP', 'FINTECH', 'AI TOOL']
const projectNames = [
  'Celeb Confirmed Web Mobile App',
  'Timeless Wallet',
  'SimonSays',
  'F@stMobile Banking for Techcombank',
]
const projectDescriptions = [
  'Development Web, Mobile apps for JoongAngDaily - leading newspaper in Korean',
  'Development of cryptocurrency wallet Mobile apps for venture fund start up in Mountain View, California',
  'Development of AI tool for editing, transcription video',
  'Development of features banking App for one of most biggest bank in Vietnam',
]

const projectNotes = [
  'PUBLISH/ENTERTAINMENT',
  'BLOCKCHAIN, FINTECH',
  'ARTIFICIAL INTELLIGENT',
  'FINTECH',
]

const projectCategories = [
  ['UI/UX', 'Mobile', 'Web', 'CMS'],
  ['UI/UX', 'Mobile', 'Web'],
  ['UI/UX', 'Web', 'Custom Development'],
  ['UI/UX', 'Mobile', 'Custom Development'],
]

export const projects: Project[] = Array.from({ length: 4 }).map((_, index) => {
  return {
    id: index,
    href: '/',
    name: projectNames[index],
    categories: projectCategories[index],
    type: projectTypes[index],
    description: projectDescriptions[index],
    notes: projectNotes[index],
    image: {
      alt: `${projectNames[index]}`,
      url: `https://fakeimg.pl/700x500/FFFFFF/?text=${`${projectNames[index]?.toLowerCase().replace(/\s+/g, '-').replace(/@/g, 'a')}`}&font_size=32`,
    },
  }
})
