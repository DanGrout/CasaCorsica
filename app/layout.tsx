import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { ServiceWorkerRegister } from '@/components/guide/service-worker-register'
import { ThemeSync } from '@/components/guide/theme-sync'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' })

export const metadata: Metadata = {
  title: 'Casa Corsica — Guest Guidebook',
  description:
    'Your digital welcome book for Casa Corsica in Shelley Point, St Helena Bay: Wi-Fi, house guide, local tips, restaurants and emergency contacts.',
  applicationName: 'Casa Corsica',
  appleWebApp: { capable: true, title: 'Casa Corsica', statusBarStyle: 'default' },
  formatDetection: { telephone: false },
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f5ef' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1a18' },
  ],
}

const preferenceScript = `(function(){try{var p=JSON.parse(localStorage.getItem('cc-prefs')||'{}');var d=document.documentElement;var t=p.theme||'system';var dark=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);d.classList.toggle('dark',dark);d.classList.toggle('hc',!!p.contrast);if(p.text&&p.text!=='md')d.dataset.text=p.text;}catch(e){}})();`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferenceScript }} />
      </head>
      <body className="antialiased">
        {children}
        <ServiceWorkerRegister />
        <ThemeSync />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
