import type { GlobalConfig } from 'payload'

export const OpeningHours: GlobalConfig = {
  slug: 'opening-hours',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'schedule',
      type: 'array',
      fields: [
        {
          name: 'dayOfWeek',
          type: 'select',
          required: true,
          options: [
            { label: 'Lunedì', value: 'monday' },
            { label: 'Martedì', value: 'tuesday' },
            { label: 'Mercoledì', value: 'wednesday' },
            { label: 'Giovedì', value: 'thursday' },
            { label: 'Venerdì', value: 'friday' },
            { label: 'Sabato', value: 'saturday' },
            { label: 'Domenica', value: 'sunday' },
          ],
        },
        {
          name: 'isClosed',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'openTime',
          type: 'text',
          admin: {
            condition: (_, siblingData) => !siblingData?.isClosed,
          },
        },
        {
          name: 'closeTime',
          type: 'text',
          admin: {
            condition: (_, siblingData) => !siblingData?.isClosed,
          },
        },
      ],
    },
    {
      name: 'specialNotice',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Messaggio speciale (es. "Chiuso per ferie dal...")',
      },
    },
  ],
}
