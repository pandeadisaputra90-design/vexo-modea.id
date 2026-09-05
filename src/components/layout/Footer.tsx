import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { BUSINESS, NAV_LINKS, waLink } from '../../data/constants'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-charcoal-950 pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500 to-ember-500 font-display text-lg font-black text-charcoal-950">
                M
              </span>
              <span className="font-display text-lg font-bold text-white">
                MoDeal<span className="text-electric-400"> Auto Bali</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/50">{BUSINESS.tagline}</p>
            <div className="mt-5 flex gap-3">
              <a
                href={BUSINESS.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 hover:border-electric-400 hover:text-electric-400"
              >
                <InstagramIcon />
              </a>
              <a
                href={BUSINESS.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 hover:border-electric-400 hover:text-electric-400"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Navigasi</h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/50 hover:text-electric-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Layanan</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/50">
              <li>Jual Beli Mobil Bekas</li>
              <li>Rental Mobil</li>
              <li>Kredit &amp; Pinjaman Dana</li>
              <li>Asuransi &amp; Garansi</li>
              <li>Inspeksi Mobil Profesional</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Kontak</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/50">
              <li className="flex gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-electric-400" /> {BUSINESS.address}
              </li>
              <li className="flex gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-electric-400" />
                <a href={waLink('Halo MoDeal Auto Bali, saya ingin bertanya-tanya.')} className="hover:text-electric-400">
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-electric-400" /> {BUSINESS.email}
              </li>
              <li className="flex gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-electric-400" />
                <span>
                  {BUSINESS.hours.map((h) => (
                    <span key={h.day} className="block">
                      {h.day}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} MoDeal Auto Bali. Seluruh hak cipta dilindungi.</p>
          <p>Trusted car solution di Denpasar, Bali.</p>
        </div>
      </div>
    </footer>
  )
}
