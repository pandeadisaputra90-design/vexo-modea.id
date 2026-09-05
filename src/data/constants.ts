export const BUSINESS = {
  name: 'MoDeal Auto Bali',
  tagline: 'Trusted car solution di Denpasar, Bali.',
  phone: '+62 812-3456-7890',
  whatsapp: '6281234567890',
  email: 'halo@modealautobali.id',
  address: 'Jl. Gatot Subroto Timur No. 88, Denpasar Utara, Bali 80239',
  mapsQuery: 'MoDeal Auto Bali, Jl. Gatot Subroto Timur, Denpasar, Bali',
  hours: [
    { day: 'Senin - Jumat', time: '08.30 - 20.00 WITA' },
    { day: 'Sabtu - Minggu', time: '09.00 - 18.00 WITA' },
  ],
  socials: {
    instagram: 'https://instagram.com/modealautobali',
    facebook: 'https://facebook.com/modealautobali',
    tiktok: 'https://tiktok.com/@modealautobali',
  },
}

export function waLink(message: string) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`
}

export const NAV_LINKS = [
  { label: 'Beranda', to: '/' },
  { label: 'Katalog Mobil', to: '/katalog' },
  { label: 'Sewa Mobil', to: '/sewa' },
  { label: 'Kredit & Asuransi', to: '/kredit-asuransi' },
  { label: 'Inspeksi', to: '/inspeksi' },
  { label: 'Tentang Kami', to: '/tentang' },
  { label: 'Kontak', to: '/kontak' },
]

export function formatIDR(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatKm(value: number) {
  return `${new Intl.NumberFormat('id-ID').format(value)} km`
}

export function estimateMonthlyInstallment(price: number, tenorMonths: number, dpPercent = 0.3) {
  const dp = price * dpPercent
  const principal = price - dp
  const annualRate = 0.07
  const monthlyRate = annualRate / 12
  const installment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenorMonths)) /
    (Math.pow(1 + monthlyRate, tenorMonths) - 1)
  return { dp, installment: Math.round(installment) }
}
