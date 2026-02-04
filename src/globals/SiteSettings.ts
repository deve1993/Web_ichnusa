import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'restaurantName',
      type: 'text',
      required: true,
      defaultValue: 'Ichnusa Botega & Bistro',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      defaultValue: '+420 605 375 012',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      defaultValue: 'reservations@ichnusa.restaurant',
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'street', type: 'text', defaultValue: 'Plaska 623/5' },
        { name: 'city', type: 'text', defaultValue: 'Mala Strana, Praha' },
        { name: 'postalCode', type: 'text', defaultValue: '150 00' },
        { name: 'country', type: 'text', defaultValue: 'Czech Republic' },
      ],
    },
    {
      name: 'reservationUrl',
      type: 'text',
      defaultValue: 'https://reservation.dish.co/widget/hydra-7cc98a90-5678-11ec-bb8e-d7389d5eaae1',
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      defaultValue: '420605375012',
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'facebook', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'tripadvisor', type: 'text' },
      ],
    },
  ],
}
