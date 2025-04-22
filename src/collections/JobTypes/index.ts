import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { slugField } from '@/fields/slug'
import { countJobById } from './hooks/countJobById'

export const JobTypes: CollectionConfig = {
  slug: 'job-types',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'key',
      type: 'text',
      required: true,
      label: 'Key',
    },
    {
      name: 'jobCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Number of jobs with this job type',
      },
    },

    ...slugField(),
  ],
  hooks: {
    afterChange: [countJobById],
  },
}
