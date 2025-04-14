import { Client } from './client'

export type Image = { url?: string; alt?: string }

export interface Project extends Client {
  id: number
  href?: string
  name?: string
  categories?: string[]
  type?: string
  description?: string
  image?: Image
}
