import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { NAV_LINKS, BUSINESS } from '../../data/constants'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-charcoal-950/85 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500 to-ember-500 font-display text-lg font-black text-charcoal-950 shadow-glow-blue">
            M
          </span>
          <span className="font-display text-lg font-bold leading-none tracking-wide text-white">
            MoDeal<span className="text-electric-400"> Auto</span>
            <span className="block text-[10px] font-medium tracking-[0.3em] text-white/50">BALI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-white/10 text-electric-300' : 'text-white/70 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${BUSINESS.phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <Phone className="h-4 w-4 text-electric-400" />
            {BUSINESS.phone}
          </a>
          <Link to="/katalog" className="btn-primary !px-5 !py-2.5 text-xs">
            Lihat Koleksi Mobil
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-white/10 p-2 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-charcoal-950/98 px-4 pb-6 pt-2 backdrop-blur-lg lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium ${
                    isActive ? 'bg-white/10 text-electric-300' : 'text-white/70'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Link to="/katalog" className="btn-primary mt-4 w-full">
            Lihat Koleksi Mobil
          </Link>
        </div>
      )}
    </header>
  )
}
