import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { slugField } from '@/fields/slug'
import {
  OverviewField,
  MetaTitleField,
  MetaImageField,
  MetaDescriptionField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Clients: CollectionConfig<'clients'> = {
  slug: 'clients',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },

  defaultPopulate: {
    name: true,
    slug: true,
    logo: true,
  },
  admin: {
    defaultColumns: ['name', 'testimonial.author.name'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'clients',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'clients',
        req,
      }),
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Client company name',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Client company logo',
      },
    },
    {
      name: 'testimonial',
      type: 'group',
      admin: {
        description: 'Client testimonial about your services',
      },
      fields: [
        {
          name: 'content',
          type: 'textarea',
          admin: {
            description: 'Testimonial content/review from the client',
          },
        },
        {
          name: 'author',
          type: 'group',
          fields: [
            {
              name: 'name',
              type: 'text',
              admin: {
                description: 'Name of the client representative',
              },
            },
            {
              name: 'position',
              type: 'text',
              admin: {
                description: 'Position/title of the representative',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: {
        description: 'Projects completed for this client',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [],
    afterRead: [],
    afterDelete: [],
  },
  versions: { drafts: { autosave: { interval: 100 }, schedulePublish: true }, maxPerDoc: 50 },
}
