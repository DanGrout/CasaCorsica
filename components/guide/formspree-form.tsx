'use client'

import { useId, useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { guidebook } from '@/lib/guidebook'

type FormspreeFormProps = {
  subject: string
  emailRequired?: boolean
  messagePlaceholder?: string
  defaultMessage?: string
  submitLabel?: string
  successTitle?: string
  successMessage?: string
  extraFields?: Record<string, string>
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function FormspreeForm({
  subject,
  emailRequired = false,
  messagePlaceholder = 'Your message…',
  defaultMessage,
  submitLabel = 'Send',
  successTitle = 'Thank you!',
  successMessage = 'Your message has been sent. We really appreciate it.',
  extraFields,
}: FormspreeFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const id = useId()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('submitting')
    try {
      const response = await fetch(guidebook.suggestions.formspreeEndpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error('Request failed')
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col items-center gap-3 rounded-2xl border bg-card px-6 py-10 text-center">
        <CheckCircle2 className="size-12 text-oak" aria-hidden />
        <h3 className="font-serif text-2xl font-medium">{successTitle}</h3>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{successMessage}</p>
        <Button variant="outline" className="mt-2 h-11 rounded-xl px-5" onClick={() => setStatus('idle')}>
          Send another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="hidden" name="_subject" value={subject} />
      {extraFields &&
        Object.entries(extraFields).map(([name, value]) => <input key={name} type="hidden" name={name} value={value} />)}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-name`} className="text-sm">
          Name <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Input id={`${id}-name`} name="name" autoComplete="name" className="h-12 rounded-xl bg-card px-4 text-base" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-email`} className="text-sm">
          Email {!emailRequired && <span className="font-normal text-muted-foreground">(optional)</span>}
        </Label>
        <Input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required={emailRequired}
          className="h-12 rounded-xl bg-card px-4 text-base"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-message`} className="text-sm">
          Message
        </Label>
        <Textarea
          id={`${id}-message`}
          name="message"
          required
          rows={5}
          defaultValue={defaultMessage}
          placeholder={messagePlaceholder}
          className="min-h-32 rounded-xl bg-card px-4 py-3 text-base"
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Something went wrong sending your message. Please check your connection and try again.
        </p>
      )}

      <Button type="submit" disabled={status === 'submitting'} className="h-12 rounded-xl text-base">
        {status === 'submitting' ? <Loader2 className="animate-spin" aria-hidden /> : <Send aria-hidden />}
        {status === 'submitting' ? 'Sending…' : submitLabel}
      </Button>
    </form>
  )
}
