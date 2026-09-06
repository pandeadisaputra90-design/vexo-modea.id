import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  Gauge,
  Settings2,
  ShieldCheck,
  ShieldAlert,
  Cog,
  BatteryCharging,
  PaintBucket,
  CircleDot,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import VehicleArt from '../ui/VehicleArt'
import { getVehicleById } from '../../data/vehicles'
import { getInspectionReport, type ZoneIcon } from '../../data/inspectionReport'
import { formatIDR, formatKm } from '../../data/constants'

const FEATURED_VEHICLE_ID = 'toyota-fortuner-vrz-2020'

const ZONE_ICONS: Record<ZoneIcon, LucideIcon> = {
  engine: Cog,
  suspension: Gauge,
  electrical: BatteryCharging,
  paint: PaintBucket,
  interior: CircleDot,
  legal: Sparkles,
}

export default function DiagnosticHero() {
  const vehicle = getVehicleById(FEATURED_VEHICLE_ID)
  const [activeZoneId, setActiveZoneId] = useState<string | null>(null)

  if (!vehicle) return null

  const report = getInspectionReport(vehicle)
  const taxIsActive = report.documents.taxStatus === 'Aktif'

  return (
    <div className="glass-card grid grid-cols-1 overflow-hidden lg:grid-cols-[1.15fr_1fr]">
      <div className="relative order-2 aspect-[4/3] sm:aspect-[16/9] lg:order-1 lg:aspect-auto lg:min-h-[440px]">
        <VehicleArt bodyType={vehicle.bodyType} accent={vehicle.accent} className="absolute inset-0 h-full w-full" />

        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-charcoal-950/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/70 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-electric-400" aria-hidden="true" />
          Sentuh titik pemeriksaan
        </div>

        {report.zones.map((zone, i) => {
          const Icon = ZONE_ICONS[zone.icon]
          const isActive = activeZoneId === zone.id
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => setActiveZoneId(isActive ? null : zone.id)}
              aria-pressed={isActive}
              aria-label={`Hasil cek ${zone.label}: ${zone.summary}`}
              className={`animate-diagnostic-in absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 backdrop-blur-sm transition-[transform,background-color,border-color,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-400 ${
                isActive
                  ? 'scale-110 border-electric-400 bg-electric-500/30 shadow-glow-blue'
                  : 'border-white/70 bg-charcoal-950/70 hover:border-electric-400 hover:bg-electric-500/20'
              }`}
              style={{ left: `${zone.x}%`, top: `${zone.y}%`, animationDelay: `${i * 45}ms` }}
            >
              <Icon className="h-4 w-4 text-white" aria-hidden="true" />
            </button>
          )
        })}
      </div>

      <div className="order-1 flex flex-col gap-5 p-6 sm:p-8 lg:order-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-electric-400">{vehicle.brand} &middot; Unit Diagnostik</p>
          <h2 className="mt-1 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
            {vehicle.model} <span className="text-white/50">{vehicle.variant}</span>
          </h2>
          <p className="mt-3 font-display text-3xl font-black text-white sm:text-4xl">{formatIDR(vehicle.price)}</p>
        </div>

        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
          <StatChip icon={Calendar} label="Tahun" value={String(vehicle.year)} delayMs={0} />
          <StatChip icon={Gauge} label="Kilometer" value={formatKm(vehicle.mileageKm)} delayMs={35} />
          <StatChip icon={Settings2} label="Transmisi" value={vehicle.transmission} delayMs={70} />
          <StatChip
            icon={taxIsActive ? ShieldCheck : ShieldAlert}
            label="Status Pajak"
            value={report.documents.taxStatus}
            tone={taxIsActive ? 'good' : 'attention'}
            delayMs={105}
          />
        </dl>

        <div className="relative grid min-h-[128px] flex-1 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div
            className="col-start-1 row-start-1 self-center transition-opacity duration-300"
            style={{ opacity: activeZoneId === null ? 1 : 0, pointerEvents: activeZoneId === null ? 'auto' : 'none' }}
            aria-hidden={activeZoneId !== null}
          >
            <p className="text-sm text-white/45">
              Sentuh salah satu titik pada foto untuk melihat hasil cek dari {report.totalPoints} titik pemeriksaan bagian tersebut.
            </p>
          </div>
          {report.zones.map((zone) => {
            const isActive = activeZoneId === zone.id
            return (
              <div
                key={zone.id}
                className="col-start-1 row-start-1 transition-opacity duration-300"
                style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none' }}
                aria-hidden={!isActive}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-electric-400">{zone.label}</p>
                <p className="mt-1 text-sm font-semibold text-white">{zone.summary}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{zone.detail}</p>
              </div>
            )
          })}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to={`/katalog/${vehicle.id}/hasil-cek`} className="btn-primary">
            Lihat Laporan {report.totalPoints} Titik
          </Link>
          <Link to={`/katalog/${vehicle.id}`} className="btn-outline">
            Detail Unit Ini
          </Link>
        </div>
      </div>
    </div>
  )
}

function StatChip({
  icon: Icon,
  label,
  value,
  tone = 'neutral',
  delayMs,
}: {
  icon: LucideIcon
  label: string
  value: string
  tone?: 'neutral' | 'good' | 'attention'
  delayMs: number
}) {
  return (
    <div
      className="animate-diagnostic-in flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-3"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <Icon
        className={`h-5 w-5 shrink-0 ${tone === 'attention' ? 'text-ember-400' : 'text-electric-400'}`}
        aria-hidden="true"
      />
      <div>
        <dt className="text-[11px] uppercase tracking-wider text-white/40">{label}</dt>
        <dd className="text-sm font-semibold text-white">{value}</dd>
      </div>
    </div>
  )
}
