import type { CollectionConfig } from 'payload'

export const EventRegistrations: CollectionConfig = {
  slug: 'event-registrations',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'event', 'roomType', 'status', 'createdAt'],
    group: 'Events',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending Review', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        { name: 'firstName', type: 'text', required: true, label: 'First Name' },
        { name: 'lastName', type: 'text', required: true, label: 'Last Name' },
      ],
    },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', label: 'Phone / WhatsApp' },
    { name: 'country', type: 'text' },
    { name: 'organization', type: 'text', label: 'Salon / Organization' },
    {
      name: 'roomType',
      type: 'select',
      label: 'Accommodation Preference',
      options: [
        {
          label: 'Single Room – €810/person (3 nights + breakfast + conference)',
          value: 'single',
        },
        {
          label: 'Sharing Double Room – €640/person (3 nights + breakfast + conference)',
          value: 'sharing-double',
        },
        {
          label: 'Conference Only (no accommodation)',
          value: 'conference-only',
        },
      ],
    },
    { name: 'dietaryRequirements', type: 'textarea', label: 'Dietary Requirements' },
    { name: 'message', type: 'textarea', label: 'Additional Notes' },
  ],
  timestamps: true,
}
