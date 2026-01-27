import type { CollectionConfig } from 'payload'

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  admin: {
    useAsTitle: 'name',
    group: 'Menu',
    defaultColumns: ['name', 'category', 'price', 'isAvailable'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        step: 0.5,
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'menu-categories',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'allergens',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Glutine', value: 'gluten' },
        { label: 'Lattosio', value: 'lactose' },
        { label: 'Uova', value: 'eggs' },
        { label: 'Pesce', value: 'fish' },
        { label: 'Crostacei', value: 'shellfish' },
        { label: 'Frutta a guscio', value: 'nuts' },
        { label: 'Arachidi', value: 'peanuts' },
        { label: 'Soia', value: 'soy' },
        { label: 'Sedano', value: 'celery' },
        { label: 'Senape', value: 'mustard' },
        { label: 'Sesamo', value: 'sesame' },
        { label: 'Solfiti', value: 'sulfites' },
        { label: 'Lupini', value: 'lupin' },
        { label: 'Molluschi', value: 'molluscs' },
      ],
    },
    {
      name: 'isAvailable',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isSpecial',
      type: 'checkbox',
      defaultValue: false,
      label: 'Piatto del Giorno',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
