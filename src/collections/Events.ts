import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location', 'status', 'showOnHomepage'],
    group: 'Events',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier. e.g. beauty-wellness-miracles-of-asia-2026',
        position: 'sidebar',
      },
    },
    {
      name: 'tag',
      type: 'text',
      admin: {
        description: 'Badge shown on the event card, e.g. "ICD Asia Event"',
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'upcoming',
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Past', value: 'past' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'showOnHomepage',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show on Homepage Banner',
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true,
          admin: { date: { pickerAppearance: 'dayAndTime' } },
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            date: { pickerAppearance: 'dayAndTime' },
            description: 'Leave blank for single-day events',
          },
        },
      ],
    },
    {
      name: 'location',
      type: 'text',
      admin: { description: 'e.g. Cinnamon Grand Hotel, Colombo, Sri Lanka' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: { description: 'Short summary shown on event listing cards.' },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'registrationDeadline',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
        description: 'Optional deadline for online registration',
      },
    },
    {
      type: 'row',
      fields: [
        { name: 'contactName', type: 'text', label: 'Contact Person' },
        { name: 'contactEmail', type: 'email', label: 'Contact Email' },
        { name: 'contactPhone', type: 'text', label: 'Contact Phone' },
      ],
    },
    {
      name: 'pricingTiers',
      type: 'array',
      label: 'Pricing Tiers',
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Package Name' },
        { name: 'price', type: 'text', required: true, label: 'Price Label (display only — e.g. €810 / person)' },
        {
          name: 'priceAmount',
          type: 'number',
          label: 'Price Amount (numeric)',
          admin: { description: 'Numeric value for payment processing, no symbol — e.g. 810' },
        },
        {
          name: 'currency',
          type: 'select',
          label: 'Currency',
          defaultValue: 'EUR',
          options: [
            { label: 'EUR — Euro', value: 'EUR' },
            { label: 'LKR — Sri Lankan Rupee', value: 'LKR' },
            { label: 'USD — US Dollar', value: 'USD' },
          ],
        },
        {
          name: 'packageKey',
          type: 'select',
          label: 'Package Key (SKU)',
          admin: { description: 'Links this tier to the registration form package option.' },
          options: [
            { label: 'Single Room', value: 'single' },
            { label: 'Sharing Double Room', value: 'sharing-double' },
            { label: 'Conference Only', value: 'conference-only' },
          ],
        },
        { name: 'includes', type: 'textarea', label: "What's Included" },
      ],
    },
    {
      name: 'program',
      type: 'array',
      label: 'Event Program / Schedule',
      fields: [
        {
          name: 'dayTitle',
          type: 'text',
          required: true,
          label: 'Day Title (e.g. Day 1 – Arrival & Welcome)',
        },
        {
          name: 'dayDate',
          type: 'date',
          label: 'Date',
          admin: { date: { pickerAppearance: 'dayOnly' } },
        },
        {
          name: 'activities',
          type: 'array',
          label: 'Activities',
          fields: [
            { name: 'time', type: 'text', label: 'Time (e.g. 7:00 PM – 10:00 PM)' },
            { name: 'title', type: 'text', required: true, label: 'Activity Name' },
            { name: 'description', type: 'textarea', label: 'Details' },
          ],
        },
      ],
    },
    {
      name: 'registrationLink',
      type: 'text',
      admin: { description: 'External registration URL (optional, overrides the built-in form)' },
    },
  ],
}
