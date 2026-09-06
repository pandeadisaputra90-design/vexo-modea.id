import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Fuel,
  Gauge,
  Settings2,
  MapPin,
  CheckCircle2,
  Users,
  Droplet,
  Cog,
  FileBadge,
} from 'lucide-react'
import { getVehicleById, VEHICLES } from '../data/vehicles'
import { formatIDR, formatKm, estimateMonthlyInstallment } from '../data/constants'
import { buildVehicleWaMessage } from '../config/site'
import VehicleArt from '../components/ui/VehicleArt'
import VehicleCard from '../components/ui/VehicleCard'
import WhatsAppButton from '../components/ui/WhatsAppButton'

const SHOTS = ['profile', 'front', 'rear', 'interior'] as const

export default function VehicleDetail() {
  const { id } = useParams<{ id: string }>()
  const vehicle = id ? getVehicleById(id) : undefined
  const [activeShot, setActiveShot] = useState<(typeof SHOTS)[number]>('profile')
  const [tenor, setTenor] = useState(36)
  const [dpPercent, setDpPercent] = useState(0.3)

  const { dp, installment } = useMemo(
    () => (vehicle ? estimateMonthlyInstallment(vehicle.price, tenor, dpPercent) : { dp: 0, installment: 0 }),
    [vehicle, tenor, dpPercent],
  )

  const related = useMemo(
    () =>
      vehicle
        ? VEHICLES.filter((v) => v.id !== vehicle.id && (v.bodyType === vehicle.bodyType || v.brand === vehicle.brand)).slice(0, 3)
        : [],
    [vehicle],
  )

  if (!vehicle) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-charcoal-950 px-4 text-center">
        <p className="font-display text-2xl font-bold text-white">Mobil tidak ditemukan</p>
        <Link to="/katalog" className="btn-primary">
          Kembali ke Katalog
        </Link>
      </section>
    )
  }

  const waMessage = buildVehicleWaMessage(vehicle)

  return (
    <section className="bg-charcoal-950 pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/katalog" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-electric-400">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Katalog
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="glass-card overflow-hidden">
              <VehicleArt bodyType={vehicle.bodyType} accent={vehicle.accent} shot={activeShot} className="h-72 w-full sm:h-96" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {SHOTS.map((shot) => (
                <button
                  key={shot}
                  type="button"
                  onClick={() => setActiveShot(shot)}
                  className={`overflow-hidden rounded-xl border transition ${
                    activeShot === shot ? 'border-electric-400 shadow-glow-blue' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <VehicleArt bodyType={vehicle.bodyType} accent={vehicle.accent} shot={shot} className="h-16 w-full sm:h-20" glow={false} />
                </button>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="font-display text-xl font-bold text-white">Deskripsi</h2>
              <p className="mt-3 leading-relaxed text-white/60">{vehicle.description}</p>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-xl font-bold text-white">Spesifikasi</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SpecRow icon={Cog} label="Mesin" value={vehicle.specs.engine} />
                <SpecRow icon={Gauge} label="Tenaga" value={vehicle.specs.power} />
                <SpecRow icon={Users} label="Kapasitas" value={`${vehicle.specs.seats} Kursi`} />
                <SpecRow icon={Droplet} label="Tangki BBM" value={`${vehicle.specs.fuelTankL} Liter`} />
                <SpecRow icon={Settings2} label="Penggerak" value={vehicle.specs.driveType} />
                <SpecRow icon={MapPin} label="Lokasi" value={vehicle.location} />
                <SpecRow icon={FileBadge} label="Plat Nomor" value={vehicle.plat} />
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-xl font-bold text-white">Kelengkapan &amp; Keunggulan</h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[...vehicle.tags, 'Sudah Diinspeksi 150+ Titik', 'STNK & Pajak Aktif', 'Bisa Cash / Kredit', 'Bantuan Proses Balik Nama'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-electric-400" /> {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-electric-400">{vehicle.brand}</p>
              <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                {vehicle.model} <span className="text-white/50">{vehicle.variant}</span>
              </h1>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-electric-400" /> {vehicle.year}
                </span>
                <span className="flex items-center gap-1.5">
                  <Gauge className="h-4 w-4 text-electric-400" /> {formatKm(vehicle.mileageKm)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Settings2 className="h-4 w-4 text-electric-400" /> {vehicle.transmission}
                </span>
                <span className="flex items-center gap-1.5">
                  <Fuel className="h-4 w-4 text-electric-400" /> {vehicle.fuel}
                </span>
              </div>
              <p className="mt-6 font-display text-3xl font-bold text-white">{formatIDR(vehicle.price)}</p>
              <p className="text-xs text-white/40">Harga nego di lokasi &middot; Kondisi: {vehicle.condition}</p>

              <div className="mt-6 flex flex-col gap-3">
                <WhatsAppButton message={waMessage} label="Konsultasi via WhatsApp" className="w-full" />
                <Link to="/inspeksi" className="btn-outline w-full">
                  Jadwalkan Inspeksi
                </Link>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Estimasi Kredit</h3>
              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <div className="flex justify-between text-xs text-white/50">
                    <span>Uang Muka (DP)</span>
                    <span>{Math.round(dpPercent * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={0.6}
                    step={0.05}
                    value={dpPercent}
                    onChange={(e) => setDpPercent(Number(e.target.value))}
                    className="mt-1 w-full accent-electric-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-white/50">
                    <span>Tenor</span>
                    <span>{tenor} Bulan</span>
                  </div>
                  <input
                    type="range"
                    min={12}
                    max={60}
                    step={12}
                    value={tenor}
                    onChange={(e) => setTenor(Number(e.target.value))}
                    className="mt-1 w-full accent-electric-500"
                  />
                </div>
                <div className="rounded-xl border border-electric-500/20 bg-electric-500/5 p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Uang Muka</span>
                    <span className="font-semibold text-white">{formatIDR(dp)}</span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-white/60">Cicilan / Bulan</span>
                    <span className="font-display text-lg font-bold text-electric-300">{formatIDR(installment)}</span>
                  </div>
                </div>
                <p className="text-[11px] leading-relaxed text-white/35">
                  *Estimasi menggunakan asumsi bunga flat 7%/tahun, hanya simulasi. Nilai akhir cicilan mengikuti hasil
                  persetujuan mitra leasing/bank pilihan Anda.
                </p>
                <Link to="/kredit-asuransi" className="btn-secondary w-full">
                  Ajukan Kredit Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold text-white">Mobil Serupa Lainnya</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function SpecRow({ icon: Icon, label, value }: { icon: typeof Cog; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
      <Icon className="h-5 w-5 text-electric-400" />
      <div>
        <p className="text-[11px] uppercase tracking-wider text-white/40">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  )
}
