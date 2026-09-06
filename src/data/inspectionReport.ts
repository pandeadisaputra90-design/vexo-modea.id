import type { Vehicle } from './types'

/**
 * All inspection/service/document content below is derived deterministically
 * from existing Vehicle fields (id, year, mileage) via a seeded hash — never
 * from Math.random() — so the same vehicle always renders the same report
 * and nothing shifts between renders or after a rebuild.
 */
function hashSeed(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export type ZoneIcon = 'engine' | 'suspension' | 'electrical' | 'paint' | 'interior' | 'legal'
export type ZoneVerdict = 'excellent' | 'good' | 'attention'

export interface InspectionZoneResult {
  id: string
  label: string
  icon: ZoneIcon
  x: number
  y: number
  pointCount: number
  passCount: number
  verdict: ZoneVerdict
  summary: string
  detail: string
}

export interface ServiceHistoryEntry {
  id: string
  date: string
  odometerKm: number
  type: string
  workshop: string
}

export type TaxStatus = 'Aktif' | 'Segera Perpanjang'

export interface DocumentInfo {
  stnkValidUntil: string
  taxValidUntil: string
  taxStatus: TaxStatus
  bpkbStatus: 'Lengkap di Tangan Showroom'
  ownership: string
  platRegion: string
}

export interface InspectionReport {
  totalPoints: number
  zones: InspectionZoneResult[]
  serviceHistory: ServiceHistoryEntry[]
  documents: DocumentInfo
}

const ZONE_BLUEPRINT: {
  id: string
  label: string
  icon: ZoneIcon
  x: number
  y: number
  pointCount: number
  notes: { excellent: string; good: string; attention: string }
}[] = [
  {
    id: 'mesin-transmisi',
    label: 'Mesin & Transmisi',
    icon: 'engine',
    x: 22,
    y: 60,
    pointCount: 24,
    notes: {
      excellent: 'Kompresi merata, tidak ada rembes oli, perpindahan gigi halus di seluruh RPM.',
      good: 'Performa mesin & transmisi normal, ditemukan rembes oli sangat minor pada seal, tidak memengaruhi performa.',
      attention: 'Performa normal, disarankan servis berkala lebih awal untuk pengecekan seal transmisi.',
    },
  },
  {
    id: 'kaki-kaki-suspensi',
    label: 'Kaki-Kaki & Suspensi',
    icon: 'suspension',
    x: 30,
    y: 84,
    pointCount: 22,
    notes: {
      excellent: 'Shockbreaker, bushing, dan wheel alignment dalam kondisi presisi pabrikan.',
      good: 'Kaki-kaki stabil, ban masih tebal, sedikit keausan wajar pada bushing sesuai usia pakai.',
      attention: 'Kaki-kaki stabil dan aman dikendarai, bushing depan disarankan diganti dalam 6 bulan ke depan.',
    },
  },
  {
    id: 'kelistrikan',
    label: 'Kelistrikan',
    icon: 'electrical',
    x: 46,
    y: 40,
    pointCount: 16,
    notes: {
      excellent: 'Aki, alternator, AC, dan seluruh modul elektronik berfungsi 100% sesuai standar.',
      good: 'Seluruh sistem kelistrikan berfungsi normal, usia aki masih di atas 70% kapasitas.',
      attention: 'Seluruh fungsi normal, aki disarankan dicek ulang saat servis berikutnya.',
    },
  },
  {
    id: 'eksterior-cat',
    label: 'Eksterior & Cat',
    icon: 'paint',
    x: 62,
    y: 26,
    pointCount: 26,
    notes: {
      excellent: 'Ketebalan cat orisinil merata, tidak ada indikasi bekas tabrakan atau pengelasan ulang.',
      good: 'Cat orisinil pada mayoritas panel, ditemukan poles ulang wajar pada 1 panel akibat baret ringan.',
      attention: 'Struktur bodi aman, ada pengecatan ulang kosmetik pada bumper akibat gesekan ringan (bukan tabrakan).',
    },
  },
  {
    id: 'interior-kenyamanan',
    label: 'Interior & Kenyamanan',
    icon: 'interior',
    x: 70,
    y: 46,
    pointCount: 18,
    notes: {
      excellent: 'Jok, dashboard, dan seluruh panel fungsi tombol dalam kondisi seperti baru.',
      good: 'Interior bersih dan rapi, keausan wajar pada jok pengemudi sesuai jarak tempuh.',
      attention: 'Interior layak pakai, jok pengemudi disarankan treatment tambahan saat servis berikutnya.',
    },
  },
  {
    id: 'legalitas-dokumen',
    label: 'Legalitas & Dokumen',
    icon: 'legal',
    x: 88,
    y: 16,
    pointCount: 14,
    notes: {
      excellent: 'Nomor rangka & mesin sesuai BPKB, STNK dan pajak aktif tanpa catatan blokir.',
      good: 'Nomor rangka & mesin sesuai BPKB, seluruh dokumen lengkap dan sah.',
      attention: 'Dokumen lengkap dan sah, masa berlaku pajak mendekati tanggal perpanjangan.',
    },
  },
]

function verdictFromRatio(passRatio: number): ZoneVerdict {
  if (passRatio >= 0.97) return 'excellent'
  if (passRatio >= 0.9) return 'good'
  return 'attention'
}

const SERVICE_TYPES = [
  'Servis Berkala & Ganti Oli Mesin',
  'Pengecekan Rem & Rotasi Ban',
  'Servis Berkala & Filter Udara',
  'Pengecekan AC & Kelistrikan',
]

const WORKSHOPS = ['Bengkel Resmi Denpasar', 'Bengkel Resmi Bali', 'Auto2000 Denpasar', 'Bengkel Mitra Showroom']

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function getInspectionReport(vehicle: Vehicle): InspectionReport {
  const seed = hashSeed(vehicle.id)

  const zones: InspectionZoneResult[] = ZONE_BLUEPRINT.map((zone, i) => {
    const zoneSeed = hashSeed(`${vehicle.id}-${zone.id}`)
    const deficit = (zoneSeed + i) % (zone.pointCount > 20 ? 3 : 2)
    const passCount = zone.pointCount - deficit
    const verdict = verdictFromRatio(passCount / zone.pointCount)
    return {
      id: zone.id,
      label: zone.label,
      icon: zone.icon,
      x: zone.x,
      y: zone.y,
      pointCount: zone.pointCount,
      passCount,
      verdict,
      summary: `${passCount}/${zone.pointCount} titik sesuai standar`,
      detail: zone.notes[verdict],
    }
  })

  const totalPoints = ZONE_BLUEPRINT.reduce((sum, z) => sum + z.pointCount, 0)

  const monthsAgoBase = 2 + (seed % 4)
  const now = new Date(2026, 8, 1)
  const serviceHistory: ServiceHistoryEntry[] = Array.from({ length: 3 }, (_, i) => {
    const monthsAgo = monthsAgoBase + i * (4 + (hashSeed(`${vehicle.id}-gap-${i}`) % 3))
    const d = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1 + (hashSeed(`${vehicle.id}-day-${i}`) % 27))
    const kmBack = monthsAgo * (700 + (hashSeed(`${vehicle.id}-km-${i}`) % 400))
    return {
      id: `${vehicle.id}-svc-${i}`,
      date: `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`,
      odometerKm: Math.max(0, vehicle.mileageKm - kmBack),
      type: SERVICE_TYPES[(seed + i) % SERVICE_TYPES.length],
      workshop: WORKSHOPS[(seed + i * 2) % WORKSHOPS.length],
    }
  })

  const taxMonthsAhead = 1 + (seed % 11)
  const taxDate = new Date(now.getFullYear(), now.getMonth() + taxMonthsAhead, 1 + (seed % 27))
  const stnkDate = new Date(taxDate.getFullYear() + 4, taxDate.getMonth(), taxDate.getDate())
  const taxStatus: TaxStatus = taxMonthsAhead <= 2 ? 'Segera Perpanjang' : 'Aktif'

  const documents: DocumentInfo = {
    stnkValidUntil: `${pad(stnkDate.getDate())}/${pad(stnkDate.getMonth() + 1)}/${stnkDate.getFullYear()}`,
    taxValidUntil: `${pad(taxDate.getDate())}/${pad(taxDate.getMonth() + 1)}/${taxDate.getFullYear()}`,
    taxStatus,
    bpkbStatus: 'Lengkap di Tangan Showroom',
    ownership: seed % 3 === 0 ? 'Tangan Pertama' : 'Tangan Kedua',
    platRegion: vehicle.plat.split(' ')[0] ?? 'DK',
  }

  return { totalPoints, zones, serviceHistory, documents }
}
