import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Générateur de Notices de Sécurité Incendie et Accessibilité',
  description: 'Outil professionnel pour architectes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
