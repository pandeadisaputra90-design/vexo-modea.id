export const NAV_LINKS = [
  { label: 'Beranda', to: '/' },
  { label: 'Katalog Mobil', to: '/katalog' },
  { label: 'Showroom 4D', to: '/showroom-4d' },
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
