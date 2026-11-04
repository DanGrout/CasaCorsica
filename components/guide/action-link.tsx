import type { ComponentProps } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ActionLinkProps = ComponentProps<'a'> & {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  external?: boolean
}

export function ActionLink({ variant = 'default', external, className, ...props }: ActionLinkProps) {
  return (
    <a
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(buttonVariants({ variant }), 'h-11 gap-2 rounded-xl px-4 text-sm', className)}
      {...props}
    />
  )
}
