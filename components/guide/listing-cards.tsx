import Image from 'next/image'
import { Clock, ExternalLink as ExternalLinkIcon, MapPin, Star } from 'lucide-react'
import { ActionLink } from '@/components/guide/action-link'
import { type Activity, type AdditionalLink, type Venue, mapsUrl, priceLabel } from '@/lib/guidebook'

export function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <article className="overflow-hidden rounded-2xl border bg-card text-card-foreground">
      <div className="relative aspect-[16/10] bg-muted">
        <Image
          src={activity.image || '/placeholder.svg'}
          alt={activity.name}
          fill
          sizes="(min-width: 640px) 600px, 100vw"
          className="object-cover"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur">
          <Clock className="size-3.5" aria-hidden />
          {activity.time}
        </span>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-serif text-xl font-medium leading-tight text-balance">{activity.name}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{activity.description}</p>
        </div>
        <ul className="flex flex-wrap gap-1.5" aria-label="Categories">
          {activity.categories.map((category) => (
            <li key={category} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium capitalize text-secondary-foreground">
              {category}
            </li>
          ))}
        </ul>
        <PlaceActions name={activity.name} mapsQuery={activity.mapsQuery} additionalLinks={activity.additionalLinks} tripadvisor={activity.tripadvisor} />
      </div>
    </article>
  )
}

export function VenueCard({ venue }: { venue: Venue }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border bg-card p-4 text-card-foreground">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          {venue.hostPick && (
            <span className="flex w-fit items-center gap-1 rounded-full bg-oak px-2.5 py-0.5 text-xs font-semibold text-oak-foreground">
              <Star className="size-3 fill-current" aria-hidden />
              {"Host's pick"}
            </span>
          )}
          <h3 className="font-serif text-lg font-medium leading-tight text-balance">{venue.name}</h3>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden />
            {venue.area}
          </p>
        </div>
        <span
          className="shrink-0 rounded-lg bg-secondary px-2 py-1 font-mono text-sm font-semibold tracking-wider text-secondary-foreground"
          aria-label={`Price level ${venue.price} of 4`}
        >
          {priceLabel(venue.price)}
          <span className="text-muted-foreground/50" aria-hidden>
            {'R'.repeat(4 - venue.price)}
          </span>
        </span>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{venue.description}</p>
      <PlaceActions name={venue.name} mapsQuery={venue.mapsQuery} additionalLinks={venue.additionalLinks} tripadvisor={venue.tripadvisor} />
    </article>
  )
}

function PlaceActions({
  name,
  mapsQuery,
  additionalLinks,
  tripadvisor,
}: {
  name: string
  mapsQuery: string
  additionalLinks?: AdditionalLink[]
  tripadvisor?: string
}) {
  return (
    <div className="grid grid-cols-1 gap-2">
      <ActionLink href={mapsUrl(mapsQuery)} external aria-label={`Open ${name} in Google Maps`}>
        <MapPin aria-hidden />
        Open in Google Maps
      </ActionLink>
      {additionalLinks?.map((link) => (
        <ActionLink key={`${link.title}-${link.url}`} href={link.url} external variant="outline" aria-label={`Open ${name} ${link.title}`}>
          {link.title}
          <ExternalLinkIcon aria-hidden />
        </ActionLink>
      ))}
      {tripadvisor && (
        <ActionLink href={tripadvisor} external variant="outline" aria-label={`View ${name} on TripAdvisor`}>
          TripAdvisor
          <ExternalLinkIcon aria-hidden />
        </ActionLink>
      )}
    </div>
  )
}
