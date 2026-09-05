import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import VehicleCard from '../ui/VehicleCard'
import { VEHICLES } from '../../data/vehicles'

export default function FeaturedVehicles() {
  const featured = VEHICLES.filter((v) => v.featured)

  return (
    <section className="relative bg-charcoal-900 py-20 sm:py-28">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Unit Pilihan"
          title="Mobil"
          highlight="Unggulan"
          description="Pilihan terbaik dari koleksi kami minggu ini — sudah diinspeksi menyeluruh dan siap serah terima."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/katalog" className="btn-outline">
            Lihat Semua Koleksi Mobil <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
