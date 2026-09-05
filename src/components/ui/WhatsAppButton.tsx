import { MessageCircle } from 'lucide-react'
import { SITE, waLink } from '../../config/site'

interface Props {
  message?: string
  className?: string
  variant?: 'primary' | 'outline' | 'floating'
  label?: string
}

export default function WhatsAppButton({ message, className = '', variant = 'primary', label = 'Konsultasi via WhatsApp' }: Props) {
  if (variant === 'floating') {
    return (
      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat via WhatsApp dengan ${SITE.brand}`}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-transform hover:scale-110 ${className}`}
      >
        <MessageCircle className="h-7 w-7" fill="currentColor" strokeWidth={0} />
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
      </a>
    )
  }

  const base = variant === 'primary' ? 'btn-primary' : 'btn-outline'

  return (
    <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className={`${base} ${className}`}>
      <MessageCircle className="h-4 w-4" />
      {label}
    </a>
  )
}
