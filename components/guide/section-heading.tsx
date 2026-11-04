export function SectionHeading({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <header className="flex flex-col gap-2">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.18em] text-oak">{eyebrow}</p>}
      <h1 className="font-serif text-3xl font-medium leading-tight text-balance">{title}</h1>
      {intro && <p className="text-pretty leading-relaxed text-muted-foreground">{intro}</p>}
    </header>
  )
}
