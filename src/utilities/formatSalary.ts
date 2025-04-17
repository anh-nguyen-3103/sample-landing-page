import { Job } from '@/payload-types'

export const formatJobSalary = (salary?: Job['salary']) => {
  if (!salary) return 'Salary not specified'

  if (salary.negotiable) return 'Negotiable'

  const currency = salary.currency || 'USD'
  const period = salary.period ? `/${salary.period}` : ''

  if (salary.min && salary.max) {
    return `${currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}${period}`
  } else if (salary.min) {
    return `${currency} ${salary.min.toLocaleString()}+${period}`
  } else if (salary.max) {
    return `Up to ${currency} ${salary.max.toLocaleString()}${period}`
  }

  return 'Salary not specified'
}
