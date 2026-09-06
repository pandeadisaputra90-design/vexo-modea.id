import { Users, Settings2 } from 'lucide-react'
import type { RentalVehicle } from '../../data/types'
import { formatIDR } from '../../data/constants'
import { SITE, waLink } from '../../config/site'
import VehicleArt from './VehicleArt'

export default function RentalCard({ rental }: { rental: RentalVehicle }) {
  return (
    <div className="glow-card group flex flex-col overflow-hidden">
      <div className="relative h-40 overflow-hidden">
        <VehicleArt
          bodyType={rental.bodyType}
          accent={rental.accent}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {rental.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-charcoal-950/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/80 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ember-400">{rental.brand}</p>
          <h3 className="font-display text-lg font-bold text-white">{rental.model}</h3>
        </div>
        <div className="flex gap-4 text-xs text-white/60">
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-ember-400" /> {rental.seats} Kursi
          </div>
          <div className="flex items-center gap-1.5">
            <Settings2 className="h-3.5 w-3.5 text-ember-400" /> {rental.transmission}
          </div>
        </div>
        <div className="mt-auto space-y-2 border-t border-white/10 pt-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-white/50">Harian (lepas kunci)</span>
            <span className="font-display font-bold text-white">{formatIDR(rental.dailyPrice)}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-white/50">Harian + Supir</span>
            <span className="font-semibold text-white/80">{formatIDR(rental.withDriverDailyPrice)}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-white/50">Bulanan</span>
            <span className="font-semibold text-white/80">{formatIDR(rental.monthlyPrice)}</span>
          </div>
          <a
            href={waLink(
              `Halo ${SITE.brand}, saya ingin sewa ${rental.brand} ${rental.model}. Mohon info ketersediaan dan cara pemesanannya ya.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-2 w-full !py-2.5 text-xs"
          >
            Sewa Mobil Sekarang
          </a>
        </div>
      </div>
    </div>
  )
}
