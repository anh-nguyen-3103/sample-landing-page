export type Client = {
  id: number
  notes?: string
  company?: Company
  project?: project
  author?: Author
}

export type Author = { id: number; name?: string; avatar?: string; title?: string }

export type project = { id: number; name?: string; href?: string }

export type Company = {
  id: number
  name?: string
  info?: Info
  image?: Image
  thumbnail?: Image
  industry?: string[]
  scope?: Array<Scope>
  href?: string
}

export type Info = {
  title?: string
  description?: string
}

export type Image = { url?: string; alt?: string }

export type Scope = { name?: string; href?: string }
