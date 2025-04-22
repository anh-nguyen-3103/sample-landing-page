import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'

import { slugField } from '@/fields/slug'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { revalidatePost, revalidateDelete } from './hooks/revalidatePost'

export const Jobs: CollectionConfig<'jobs'> = {
  slug: 'jobs',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    jobTypes: true,
    workType: true,
    location: true,
    meta: {
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'jobType', 'location', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'jobs',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'jobs',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'jobTypes',
              type: 'relationship',
              required: true,
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'job-types',
            },
            {
              name: 'workType',
              type: 'relationship',
              required: true,
              admin: {
                position: 'sidebar',
              },
              hasMany: false,
              relationTo: 'work-types',
            },
            {
              name: 'salary',
              type: 'group',
              fields: [
                {
                  name: 'negotiable',
                  type: 'checkbox',
                  label: 'Salary is negotiable',
                  defaultValue: false,
                },
                {
                  name: 'min',
                  type: 'number',
                  admin: {
                    condition: (data) => !data?.salary?.negotiable,
                  },
                },
                {
                  name: 'max',
                  type: 'number',
                  admin: {
                    condition: (data) => !data?.salary?.negotiable,
                  },
                },
                {
                  name: 'currency',
                  type: 'select',
                  defaultValue: 'USD',
                  options: [
                    { label: 'USD', value: 'USD' },
                    { label: 'EUR', value: 'EUR' },
                  ],
                  admin: {
                    condition: (data) => !data?.salary?.negotiable,
                  },
                },
                {
                  name: 'period',
                  type: 'select',
                  defaultValue: 'year',
                  options: [
                    { label: 'Per year', value: 'year' },
                    { label: 'Per month', value: 'month' },
                    { label: 'Per hour', value: 'hour' },
                  ],
                  admin: {
                    condition: (data) => !data?.salary?.negotiable,
                  },
                },
              ],
            },
            {
              name: 'experience',
              type: 'group',
              fields: [
                { name: 'min', type: 'number' },
                { name: 'max', type: 'number' },
              ],
            },
            {
              name: 'skills',
              type: 'array',
              label: 'Skills',
              fields: [
                {
                  name: 'skill',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'level',
              type: 'select',
              defaultValue: 'internship',
              options: [
                { label: 'Internship', value: 'internship' },
                { label: 'Junior', value: 'junior' },
                { label: 'Middle', value: 'middle' },
                { label: 'Senior', value: 'senior' },
              ],
            },
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: 'Job Description',
              required: true,
            },
            {
              name: 'responsibilities',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: 'Responsibilities',
            },
            {
              name: 'requirements',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: 'Requirements',
            },
            {
              name: 'others',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: 'Other personal qualities & skills',
            },
            {
              name: 'benefits',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: 'Benefits',
            },
            {
              name: 'applicationUrl',
              type: 'text',
              label: 'Application URL',
            },
          ],
          label: 'Job Details',
        },
        {
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'location',
              type: 'group',
              fields: [
                {
                  name: 'city',
                  type: 'text',
                  admin: {
                    condition: (data) => data?.location?.type !== 'remote',
                  },
                },
                {
                  name: 'state',
                  type: 'text',
                  admin: {
                    condition: (data) => data?.location?.type !== 'remote',
                  },
                },
                {
                  name: 'country',
                  type: 'text',
                  admin: {
                    condition: (data) => data?.location?.type !== 'remote',
                  },
                },
              ],
            },
            {
              name: 'authors',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: false,
              relationTo: 'users',
            },
          ],
          label: 'Additional Info',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
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
    {
      name: 'postedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'expiresAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
