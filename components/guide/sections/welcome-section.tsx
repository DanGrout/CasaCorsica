import Image from 'next/image'
import {
  Car,
  ChevronRight,
  Compass,
  House,
  KeyRound,
  LogIn,
  LogOut,
  MessageSquareHeart,
  Palette,
  Phone,
  Utensils,
  Wifi,
  type LucideIcon,
} from 'lucide-react'
import { CopyButton } from '@/components/guide/copy-button'
import { guidebook } from '@/lib/guidebook'
import type { Section } from '@/hooks/use-section'

const tiles: { section: Section; label: string; description: string; icon: LucideIcon }[] = [
  { section: 'explore', label: 'Things to Do', description: 'Beaches, whales & day trips', icon: Compass },
  { section: 'eat', label: 'Eat & Drink', description: 'Seafood, coffee & sundowners', icon: Utensils },
  { section: 'house', label: 'House Guide', description: 'Appliances, rules & FAQs', icon: House },
  { section: 'contacts', label: 'Emergency', description: 'Tap-to-call contacts', icon: Phone },
  { section: 'art', label: 'The Art', description: `Works by ${guidebook.art.artist}`, icon: Palette },
  { section: 'suggest', label: 'Suggestions', description: 'Leave us a note', icon: MessageSquareHeart },
]

export function WelcomeSection({ onNavigate }: { onNavigate: (section: Section) => void }) {
  const { property, welcome } = guidebook

  return (
    <div className="flex flex-col gap-8">
      <section className="relative -mx-4 -mt-4 overflow-hidden" aria-labelledby="welcome-title">
        <div className="relative aspect-[4/5] max-h-[70svh] w-full sm:aspect-[16/10]">
          <Image
            src={property.heroImage || '/placeholder.svg'}
            alt={`Living room at ${property.name}`}
            fill
            priority
            sizes="(min-width: 640px) 640px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">{property.location}</p>
            <h1 id="welcome-title" className="font-serif text-5xl font-medium leading-none">
              {property.name}
            </h1>
            <p className="font-serif text-lg italic text-white/90">{property.tagline}</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="host-title">
        <p className="text-pretty leading-relaxed">{welcome.greeting}</p>
      </section>

      <section className="grid grid-cols-2 gap-3" aria-label="Check-in and check-out">
        {/*<TimeCard icon={LogIn} label="Check-in" time={welcome.checkIn} note="from" />
        <TimeCard icon={LogOut} label="Check-out" time={welcome.checkOut} note="by" />*/}
        <p className="col-span-2 flex gap-3 rounded-2xl bg-secondary p-4 text-sm leading-relaxed text-secondary-foreground">
          <KeyRound className="mt-0.5 size-5 shrink-0 text-oak" aria-hidden />
          {welcome.checkInNotes}
        </p>
      </section>
      <section className="flex flex-col gap-3 rounded-2xl border bg-card p-4" aria-labelledby="wifi-title">
        <h2 id="wifi-title" className="flex items-center gap-2 font-serif text-xl font-medium">
          <Wifi className="size-5 text-oak" aria-hidden />
          Wi-Fi
        </h2>
        <CopyButton label="Network" value={welcome.wifi.network} />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Password and QR code can be found on the fridge.
        </p>
      </section>

      <section className="flex flex-col gap-2 rounded-2xl border bg-card p-4" aria-labelledby="parking-title">
        <h2 id="parking-title" className="flex items-center gap-2 font-serif text-xl font-medium">
          <Car className="size-5 text-oak" aria-hidden />
          Parking
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{welcome.parking}</p>
      </section>

      <nav aria-labelledby="guide-nav-title" className="flex flex-col gap-3">
        <h2 id="guide-nav-title" className="font-serif text-2xl font-medium">
          Explore the guide
        </h2>
        <ul className="grid grid-cols-2 gap-3">
          {tiles.map(({ section, label, description, icon: Icon }) => (
            <li key={section}>
              <button
                type="button"
                onClick={() => onNavigate(section)}
                className="group flex h-full min-h-32 w-full flex-col justify-between gap-3 rounded-2xl border bg-card p-4 text-left transition-colors hover:bg-muted active:scale-[0.98]"
              >
                <span className="flex w-full items-start justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-medium leading-tight">{label}</span>
                  <span className="text-xs leading-snug text-muted-foreground">{description}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

function TimeCard({ icon: Icon, label, time, note }: { icon: LucideIcon; label: string; time: string; note: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border bg-card p-4">
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="size-4 text-oak" aria-hidden />
        {label}
      </span>
      <span className="font-serif text-3xl font-medium">
        <span className="sr-only">{note} </span>
        {time}
      </span>
    </div>
  )
}
