import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronRight,
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
  BatteryCharging,
  PaintBucket,
  CircleDot,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  Wrench,
  ScrollText,
  type LucideIcon,
} from 'lucide-react'
import { getVehicleById, VEHICLES } from '../data/vehicles'
import { formatIDR, formatKm, estimateMonthlyInstallment } from '../data/constants'
import { getInspectionReport, type ZoneIcon } from '../data/inspectionReport'
import { buildVehicleWaMessage } from '../config/site'
import VehicleArt from '../components/ui/VehicleArt'
import VehicleCard from '../components/ui/VehicleCard'
import WhatsAppButton from '../components/ui/WhatsAppButton'

const SHOTS = ['profile', 'front', 'rear', 'interior'] as const

const TABS = [
  { slug: 'ringkasan', label: 'Ringkasan' },
  { slug: 'hasil-cek', label: 'Hasil Cek 120 Titik' },
  { slug: 'riwayat-servis', label: 'Riwayat Servis' },
  { slug: 'surat-pajak', label: 'Surat & Pajak' },
  { slug: 'simulasi-kredit', label: 'Simulasi Kredit' },
] as const

type TabSlug = (typeof TABS)[number]['slug']

const ZONE_ICONS: Record<ZoneIcon, LucideIcon> = {
  engine: Cog,
  suspension: Gauge,
  electrical: BatteryCharging,
  paint: PaintBucket,
  interior: CircleDot,
  legal: Sparkles,
}

export default function VehicleDetail() {
  const { id, tab } = useParams<{ id: string; tab?: string }>()
  const vehicle = id ? getVehicleById(id) : undefined

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

  if (!tab) {
    return <Navigate to={`/katalog/${vehicle.id}/ringkasan`} replace />
  }

  const activeTab: TabSlug = TABS.some((t) => t.slug === tab) ? (tab as TabSlug) : 'ringkasan'
  const activeTabLabel = TABS.find((t) => t.slug === activeTab)?.label ?? 'Ringkasan'

  return (
    <VehicleDetailContent
      vehicle={vehicle}
      activeTab={activeTab}
      activeTabLabel={activeTabLabel}
      isValidTab={TABS.some((t) => t.slug === tab)}
    />
  )
}

function VehicleDetailContent({
  vehicle,
  activeTab,
  activeTabLabel,
  isValidTab,
}: {
  vehicle: NonNullable<ReturnType<typeof getVehicleById>>
  activeTab: TabSlug
  activeTabLabel: string
  isValidTab: boolean
}) {
  const report = useMemo(() => getInspectionReport(vehicle), [vehicle])
  const taxIsActive = report.documents.taxStatus === 'Aktif'

  const related = useMemo(
    () => VEHICLES.filter((v) => v.id !== vehicle.id && (v.bodyType === vehicle.bodyType || v.brand === vehicle.brand)).slice(0, 3),
    [vehicle],
  )

  const waMessage = buildVehicleWaMessage(vehicle)

  if (!isValidTab) {
    return <Navigate to={`/katalog/${vehicle.id}/ringkasan`} replace />
  }

  return (
    <section className="bg-charcoal-950 pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-white/45">
          <Link to="/katalog" className="inline-flex items-center gap-1.5 hover:text-electric-400">
            <ArrowLeft className="h-4 w-4" /> Katalog
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <Link to={`/katalog/${vehicle.id}/ringkasan`} className="hover:text-electric-400">
            {vehicle.model} {vehicle.variant}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="font-semibold text-white/70" aria-current="page">
            {activeTabLabel}
          </span>
        </nav>

        {/* Data that must be legible without waiting on any tab or animation */}
        <div className="glass-card mt-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-electric-400">{vehicle.brand}</p>
            <h1 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
              {vehicle.model} <span className="text-white/50">{vehicle.variant}</span>
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70">
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
              {taxIsActive ? (
                <ShieldCheck className="h-4 w-4 text-electric-400" />
              ) : (
                <ShieldAlert className="h-4 w-4 text-ember-400" />
              )}
              Pajak {report.documents.taxStatus}
            </span>
            <span className="font-display text-lg font-bold text-white sm:text-xl">{formatIDR(vehicle.price)}</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <div
              role="tablist"
              aria-label="Detail unit"
              className="flex flex-wrap gap-2 border-b border-white/10 pb-4"
            >
              {TABS.map((t) => (
                <Link
                  key={t.slug}
                  to={`/katalog/${vehicle.id}/${t.slug}`}
                  role="tab"
                  aria-selected={activeTab === t.slug}
                  className={`inline-flex min-h-[44px] items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    activeTab === t.slug
                      ? 'bg-electric-500/15 text-electric-300 ring-1 ring-electric-500/40'
                      : 'text-white/50 hover:bg-white/[0.04] hover:text-white/80'
                  }`}
                >
                  {t.label}
                </Link>
              ))}
            </div>

            <div className="relative mt-6 overflow-hidden">
              <div className="grid">
                <TabPanel active={activeTab === 'ringkasan'}>
                  <RingkasanPanel vehicle={vehicle} />
                </TabPanel>
                <TabPanel active={activeTab === 'hasil-cek'}>
                  <HasilCekPanel report={report} />
                </TabPanel>
                <TabPanel active={activeTab === 'riwayat-servis'}>
                  <RiwayatServisPanel report={report} />
                </TabPanel>
                <TabPanel active={activeTab === 'surat-pajak'}>
                  <SuratPajakPanel vehicle={vehicle} report={report} />
                </TabPanel>
                <TabPanel active={activeTab === 'simulasi-kredit'}>
                  <SimulasiKreditPanel vehicle={vehicle} />
                </TabPanel>
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="glass-card p-6">
              <p className="font-display text-3xl font-bold text-white">{formatIDR(vehicle.price)}</p>
              <p className="text-xs text-white/40">Harga nego di lokasi &middot; Kondisi: {vehicle.condition}</p>
              <div className="mt-5 flex flex-col gap-3">
                <WhatsAppButton message={waMessage} label="Konsultasi via WhatsApp" className="w-full" />
                <Link to="/inspeksi" className="btn-outline w-full">
                  Jadwalkan Inspeksi
                </Link>
              </div>
            </div>
          </aside>
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

function TabPanel({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      className="col-start-1 row-start-1 origin-top transition-[transform,opacity] duration-300 ease-out"
      style={{
        opacity: active ? 1 : 0.35,
        transform: active ? 'scale(1)' : 'scale(0.96)',
        pointerEvents: active ? 'auto' : 'none',
        zIndex: active ? 1 : 0,
      }}
      aria-hidden={!active}
    >
      {children}
    </div>
  )
}

function RingkasanPanel({ vehicle }: { vehicle: NonNullable<ReturnType<typeof getVehicleById>> }) {
  const [activeShot, setActiveShot] = useState<(typeof SHOTS)[number]>('profile')

  return (
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
          <SpecRow icon={Fuel} label="Bahan Bakar" value={vehicle.fuel} />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-xl font-bold text-white">Kelengkapan &amp; Keunggulan</h2>
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[...vehicle.tags, 'Bisa Cash / Kredit', 'Bantuan Proses Balik Nama'].map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-white/70">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-electric-400" /> {item}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to={`/katalog/${vehicle.id}/hasil-cek`} className="btn-outline">
            Lihat Hasil Cek 120 Titik
          </Link>
          <Link to={`/katalog/${vehicle.id}/surat-pajak`} className="btn-outline">
            Cek Surat &amp; Pajak
          </Link>
        </div>
      </div>
    </div>
  )
}

function HasilCekPanel({ report }: { report: ReturnType<typeof getInspectionReport> }) {
  const attentionCount = report.zones.filter((z) => z.verdict === 'attention').length

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-white">Hasil Cek {report.totalPoints} Titik</h2>
      <p className="mt-2 text-sm text-white/55">
        {attentionCount === 0
          ? `Seluruh ${report.totalPoints} titik pemeriksaan sesuai standar kelayakan showroom.`
          : `${attentionCount} dari 6 kategori memiliki catatan minor yang tidak memengaruhi keamanan berkendara — dirinci di bawah.`}
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {report.zones.map((zone) => {
          const Icon = ZONE_ICONS[zone.icon]
          return (
            <div key={zone.id} className="glass-card flex flex-col gap-3 p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-500/10 text-electric-400 ring-1 ring-white/10">
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                    zone.verdict === 'attention' ? 'bg-ember-500/15 text-ember-400' : 'bg-electric-500/15 text-electric-300'
                  }`}
                >
                  {zone.summary}
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-white">{zone.label}</h3>
              <p className="text-sm leading-relaxed text-white/55">{zone.detail}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function RiwayatServisPanel({ report }: { report: ReturnType<typeof getInspectionReport> }) {
  return (
    <div>
      <h2 className="font-display text-xl font-bold text-white">Riwayat Servis</h2>
      <p className="mt-2 text-sm text-white/55">Catatan servis berkala tercatat dari bengkel resmi/mitra showroom.</p>
      <ol className="mt-6 space-y-4">
        {report.serviceHistory.map((entry) => (
          <li key={entry.id} className="glass-card flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-electric-500/10 text-electric-400 ring-1 ring-white/10">
                <Wrench className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-white">{entry.type}</p>
                <p className="text-xs text-white/45">{entry.workshop}</p>
              </div>
            </div>
            <div className="text-sm text-white/60 sm:text-right">
              <p>{entry.date}</p>
              <p className="text-xs text-white/40">{formatKm(entry.odometerKm)}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function SuratPajakPanel({
  vehicle,
  report,
}: {
  vehicle: NonNullable<ReturnType<typeof getVehicleById>>
  report: ReturnType<typeof getInspectionReport>
}) {
  const taxIsActive = report.documents.taxStatus === 'Aktif'
  return (
    <div>
      <h2 className="font-display text-xl font-bold text-white">Surat &amp; Pajak</h2>
      <p className="mt-2 text-sm text-white/55">Kelengkapan legalitas kendaraan sesuai pengecekan nomor rangka &amp; mesin.</p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DocRow icon={FileBadge} label="Plat Nomor" value={vehicle.plat} />
        <DocRow icon={ScrollText} label="Kepemilikan" value={report.documents.ownership} />
        <DocRow icon={ScrollText} label="Masa Berlaku STNK" value={report.documents.stnkValidUntil} />
        <DocRow
          icon={taxIsActive ? ShieldCheck : ShieldAlert}
          label="Status Pajak"
          value={`${report.documents.taxStatus} · s/d ${report.documents.taxValidUntil}`}
          tone={taxIsActive ? 'good' : 'attention'}
        />
        <DocRow icon={CheckCircle2} label="BPKB" value={report.documents.bpkbStatus} />
      </div>
    </div>
  )
}

function SimulasiKreditPanel({ vehicle }: { vehicle: NonNullable<ReturnType<typeof getVehicleById>> }) {
  const [tenor, setTenor] = useState(36)
  const [dpPercent, setDpPercent] = useState(0.3)

  const { dp, installment } = useMemo(
    () => estimateMonthlyInstallment(vehicle.price, tenor, dpPercent),
    [vehicle, tenor, dpPercent],
  )

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-white">Simulasi Kredit</h2>
      <p className="mt-2 text-sm text-white/55">Estimasi cicilan bulanan berdasarkan uang muka dan tenor pilihan Anda.</p>
      <div className="glass-card mt-6 max-w-lg p-6">
        <div className="flex flex-col gap-4">
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
            *Estimasi menggunakan asumsi bunga flat 7%/tahun, hanya simulasi. Nilai akhir cicilan mengikuti hasil persetujuan
            mitra leasing/bank pilihan Anda.
          </p>
          <Link to="/kredit-asuransi" className="btn-secondary w-full">
            Ajukan Kredit Sekarang
          </Link>
        </div>
      </div>
    </div>
  )
}

function SpecRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
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

function DocRow({
  icon: Icon,
  label,
  value,
  tone = 'neutral',
}: {
  icon: LucideIcon
  label: string
  value: string
  tone?: 'neutral' | 'good' | 'attention'
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
      <Icon className={`h-5 w-5 ${tone === 'attention' ? 'text-ember-400' : 'text-electric-400'}`} />
      <div>
        <p className="text-[11px] uppercase tracking-wider text-white/40">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  )
}
