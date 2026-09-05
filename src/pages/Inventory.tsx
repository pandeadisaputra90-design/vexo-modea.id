import { useMemo, useState, type ReactNode } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import VehicleCard from '../components/ui/VehicleCard'
import { BODY_TYPES, BRANDS, FUEL_TYPES, TRANSMISSIONS, VEHICLES, YEARS } from '../data/vehicles'
import { formatIDR } from '../data/constants'

const MAX_PRICE = Math.max(...VEHICLES.map((v) => v.price))
const MIN_PRICE = Math.min(...VEHICLES.map((v) => v.price))

const SORT_OPTIONS = [
  { value: 'default', label: 'Rekomendasi' },
  { value: 'price-asc', label: 'Harga Terendah' },
  { value: 'price-desc', label: 'Harga Tertinggi' },
  { value: 'year-desc', label: 'Tahun Terbaru' },
  { value: 'mileage-asc', label: 'KM Terendah' },
] as const

export default function Inventory() {
  const [query, setQuery] = useState('')
  const [brand, setBrand] = useState<string>('Semua')
  const [bodyType, setBodyType] = useState<string>('Semua')
  const [transmission, setTransmission] = useState<string>('Semua')
  const [fuel, setFuel] = useState<string>('Semua')
  const [year, setYear] = useState<string>('Semua')
  const [maxPrice, setMaxPrice] = useState<number>(MAX_PRICE)
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]['value']>('default')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = VEHICLES.filter((v) => {
      const matchesQuery =
        query.trim() === '' ||
        `${v.brand} ${v.model} ${v.variant}`.toLowerCase().includes(query.trim().toLowerCase())
      const matchesBrand = brand === 'Semua' || v.brand === brand
      const matchesBody = bodyType === 'Semua' || v.bodyType === bodyType
      const matchesTransmission = transmission === 'Semua' || v.transmission === transmission
      const matchesFuel = fuel === 'Semua' || v.fuel === fuel
      const matchesYear = year === 'Semua' || v.year === Number(year)
      const matchesPrice = v.price <= maxPrice
      return matchesQuery && matchesBrand && matchesBody && matchesTransmission && matchesFuel && matchesYear && matchesPrice
    })

    switch (sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'year-desc':
        result = [...result].sort((a, b) => b.year - a.year)
        break
      case 'mileage-asc':
        result = [...result].sort((a, b) => a.mileageKm - b.mileageKm)
        break
      default:
        result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured))
    }

    return result
  }, [query, brand, bodyType, transmission, fuel, year, maxPrice, sort])

  const resetFilters = () => {
    setQuery('')
    setBrand('Semua')
    setBodyType('Semua')
    setTransmission('Semua')
    setFuel('Semua')
    setYear('Semua')
    setMaxPrice(MAX_PRICE)
    setSort('default')
  }

  const activeFilterCount = [brand, bodyType, transmission, fuel, year].filter((v) => v !== 'Semua').length + (maxPrice < MAX_PRICE ? 1 : 0)

  return (
    <>
      <PageHero
        eyebrow="Katalog Mobil"
        title="Cari Mobil Bekas Impianmu"
        description="Gunakan filter di bawah untuk menemukan mobil yang paling sesuai dengan kebutuhan dan budget Anda."
      />

      <section className="relative bg-charcoal-950 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card mb-8 flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari merek atau model, contoh: Avanza, Fortuner..."
                className="input-field !pl-11"
              />
            </div>
            <div className="flex gap-3">
              <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="input-field w-auto">
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-charcoal-900">
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setFiltersOpen((v) => !v)}
                className="btn-outline !px-4 !py-2.5 text-xs lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
            <aside className={`${filtersOpen ? 'block' : 'hidden'} lg:block`}>
              <div className="glass-card sticky top-24 flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Filter Pencarian</h3>
                  <button onClick={resetFilters} type="button" className="text-xs text-electric-400 hover:underline">
                    Reset
                  </button>
                  <button onClick={() => setFiltersOpen(false)} type="button" className="text-white/50 lg:hidden">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <FilterGroup label="Merek">
                  <select value={brand} onChange={(e) => setBrand(e.target.value)} className="input-field">
                    <option className="bg-charcoal-900">Semua</option>
                    {BRANDS.map((b) => (
                      <option key={b} value={b} className="bg-charcoal-900">
                        {b}
                      </option>
                    ))}
                  </select>
                </FilterGroup>

                <FilterGroup label="Tipe Body">
                  <select value={bodyType} onChange={(e) => setBodyType(e.target.value)} className="input-field">
                    <option className="bg-charcoal-900">Semua</option>
                    {BODY_TYPES.map((b) => (
                      <option key={b} value={b} className="bg-charcoal-900">
                        {b}
                      </option>
                    ))}
                  </select>
                </FilterGroup>

                <FilterGroup label="Transmisi">
                  <select value={transmission} onChange={(e) => setTransmission(e.target.value)} className="input-field">
                    <option className="bg-charcoal-900">Semua</option>
                    {TRANSMISSIONS.map((t) => (
                      <option key={t} value={t} className="bg-charcoal-900">
                        {t}
                      </option>
                    ))}
                  </select>
                </FilterGroup>

                <FilterGroup label="Bahan Bakar">
                  <select value={fuel} onChange={(e) => setFuel(e.target.value)} className="input-field">
                    <option className="bg-charcoal-900">Semua</option>
                    {FUEL_TYPES.map((f) => (
                      <option key={f} value={f} className="bg-charcoal-900">
                        {f}
                      </option>
                    ))}
                  </select>
                </FilterGroup>

                <FilterGroup label="Tahun">
                  <select value={year} onChange={(e) => setYear(e.target.value)} className="input-field">
                    <option className="bg-charcoal-900">Semua</option>
                    {YEARS.map((y) => (
                      <option key={y} value={y} className="bg-charcoal-900">
                        {y}
                      </option>
                    ))}
                  </select>
                </FilterGroup>

                <FilterGroup label={`Harga Maksimal: ${formatIDR(maxPrice)}`}>
                  <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={5_000_000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-electric-500"
                  />
                  <div className="flex justify-between text-[10px] text-white/40">
                    <span>{formatIDR(MIN_PRICE)}</span>
                    <span>{formatIDR(MAX_PRICE)}</span>
                  </div>
                </FilterGroup>
              </div>
            </aside>

            <div>
              <p className="mb-6 text-sm text-white/50">
                Menampilkan <span className="font-semibold text-white">{filtered.length}</span> dari {VEHICLES.length} unit mobil
              </p>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
              ) : (
                <div className="glass-card flex flex-col items-center gap-3 p-12 text-center">
                  <p className="font-display text-lg font-bold text-white">Tidak ada mobil ditemukan</p>
                  <p className="text-sm text-white/50">Coba ubah atau reset filter pencarian Anda.</p>
                  <button onClick={resetFilters} type="button" className="btn-outline mt-2">
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-white/50">{label}</label>
      {children}
    </div>
  )
}
