import { Job } from '@/payload-types'

export const formatJobLocation = (location?: Job['location']) => {
  if (!location) return 'Remote/Unspecified'

  const parts = [location.city, location.state, location.country].filter(Boolean)

  return parts.length > 0 ? parts.join(', ') : 'Remote/Unspecified'
}
