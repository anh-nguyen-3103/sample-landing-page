import { Blog, Job } from '@/payload-types'

export function extractTextFromRichText(richTextField: any): string[] {
  if (!richTextField || !richTextField.root || !richTextField.root.children) {
    return []
  }

  return richTextField.root.children
    .map((node: any) => {
      if (node.children && Array.isArray(node.children)) {
        return node.children
          .filter((child: any) => child.type === 'text')
          .map((textNode: any) => textNode.text || '')
          .join('')
      }
      return ''
    })
    .filter((text: string) => text !== '')
}

export function formatJobFields(
  job: Job,
  fields: (keyof Job)[],
): Record<string, string | string[]> {
  const result: Record<string, string | string[]> = {}

  fields.forEach((field) => {
    const value = job[field]
    if (value && typeof value === 'object' && 'root' in value) {
      result[field as string] = extractTextFromRichText(value)
    } else if (value !== undefined && value !== null) {
      result[field as string] = String(value)
    } else {
      result[field as string] = ''
    }
  })

  return result
}

export function formatBlogFields(
  job: Blog,
  fields: (keyof Blog)[],
): Record<string, string | string[]> {
  const result: Record<string, string | string[]> = {}

  fields.forEach((field) => {
    const value = job[field]
    if (value && typeof value === 'object' && 'root' in value) {
      result[field as string] = extractTextFromRichText(value)
    } else if (value !== undefined && value !== null) {
      result[field as string] = String(value)
    } else {
      result[field as string] = ''
    }
  })

  return result
}
