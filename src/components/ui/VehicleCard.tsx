import { Link } from 'react-router-dom'
import { Calendar, Gauge, Fuel, Settings2 } from 'lucide-react'
import type { Vehicle } from '../../data/types'
import { estimateMonthlyInstallment, formatIDR, formatKm, waLink } from '../../data/constants'
import VehicleArt from './VehicleArt'

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const { installment } = estimateMonthlyInstallment(vehicle.price, 36)

  return (
    <div className="glow-card group flex flex-col overflow-hidden">
      <Link to={`/katalog/${vehicle.id}`} className="relative block h-48 overflow-hidden">
        <VehicleArt
          bodyType={vehicle.bodyType}
          accent={vehicle.accent}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {vehicle.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-charcoal-950/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/80 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-charcoal-950/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-electric-300 backdrop-blur-sm">
          {vehicle.bodyType}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-electric-400">{vehicle.brand}</p>
          <Link to={`/katalog/${vehicle.id}`}>
            <h3 className="font-display text-lg font-bold text-white hover:text-electric-300 transition-colors">
              {vehicle.model} <span className="text-white/50 font-medium text-sm">{vehicle.variant}</span>
            </h3>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-electric-400" /> {vehicle.year}
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 text-electric-400" /> {formatKm(vehicle.mileageKm)}
          </div>
          <div className="flex items-center gap-1.5">
            <Settings2 className="h-3.5 w-3.5 text-electric-400" /> {vehicle.transmission}
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5 text-electric-400" /> {vehicle.fuel}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-3">
          <div>
            <p className="font-display text-xl font-bold text-white">{formatIDR(vehicle.price)}</p>
            <p className="text-xs text-white/45">
              Cicilan mulai {formatIDR(installment)}
              <span className="text-white/30">/bln*</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Link to={`/katalog/${vehicle.id}`} className="btn-outline flex-1 !px-3 !py-2 text-xs">
              Detail
            </Link>
            <a
              href={waLink(
                `Halo MoDeal Auto Bali, saya tertarik dengan ${vehicle.brand} ${vehicle.model} ${vehicle.variant} tahun ${vehicle.year} (${formatIDR(
                  vehicle.price,
                )}). Apakah unit masih tersedia?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 !px-3 !py-2 text-xs"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
