import data from '@/data/guidebook.json'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

function withBasePath(url: string | undefined) {
  if (!url) return url
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url
  if (url.startsWith('/')) return `${basePath}${url}`
  return url
}

function normalizeAssetPaths<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeAssetPaths(item)) as T
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => {
        if (typeof nestedValue === 'string' && (key === 'image' || key === 'heroImage' || key === 'hostPhoto' || nestedValue.startsWith('/'))) {
          return [key, withBasePath(nestedValue)]
        }

        return [key, normalizeAssetPaths(nestedValue)]
      }),
    ) as T
  }

  return value
}

export type AdditionalLink = {
  title: string
  url: string
}

export type Activity = {
  id: string
  name: string
  description: string
  image: string
  time: string
  categories: string[]
  mapsQuery: string
  additionalLinks?: AdditionalLink[]
  tripadvisor?: string
}

export type Venue = {
  id: string
  name: string
  description: string
  area: string
  price: number
  hostPick: boolean
  mapsQuery: string
  additionalLinks?: AdditionalLink[]
  tripadvisor?: string
}

export type VenueGroup = { type: string; items: Venue[] }

export type GuideEntry = { id: string; title: string; body: string }

export type ArtPiece = {
  id: string
  title: string
  medium: string
  size: string
  location: string
  image: string
  available: boolean
}

export type Contact = {
  label: string
  description?: string
  phone: string
  mapsQuery?: string
}

export type Guidebook = {
  property: {
    name: string
    tagline: string
    location: string
    address: string
    heroImage: string
  }
  welcome: {
    greeting: string
    checkIn: string
    checkOut: string
    checkInNotes: string
    wifi: { network: string; password: string }
    parking: string
  }
  thingsToDo: {
    categories: string[]
    local: Activity[]
    townOver: Activity[]
    dayTrip: Activity[]
  }
  eatDrink: { groups: VenueGroup[] }
  houseGuide: GuideEntry[]
  contacts: {
    host: { label: string; phone: string; whatsapp?: string }
    emergency: Contact[]
    local: Contact[]
  }
  suggestions: { formspreeEndpoint: string; intro: string }
  art: { artist: string; intro: string; pieces: ArtPiece[] }
}

export const guidebook = normalizeAssetPaths(data as Guidebook) as Guidebook

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function priceLabel(level: number) {
  return 'R'.repeat(Math.max(1, Math.min(4, level)))
}

export const distanceTabs = [
  { key: 'local', label: 'Local', hint: 'Walk or under 30 min' },
  { key: 'townOver', label: 'Town Over', hint: '30–45 min away' },
  { key: 'dayTrip', label: 'Day Trip', hint: '1 hour or more' },
] as const

export type DistanceKey = (typeof distanceTabs)[number]['key']
