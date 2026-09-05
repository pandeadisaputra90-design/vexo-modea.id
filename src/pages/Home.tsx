import Hero from '../components/home/Hero'
import ServicesOverview from '../components/home/ServicesOverview'
import FeaturedVehicles from '../components/home/FeaturedVehicles'
import TestimonialsSection from '../components/home/TestimonialsSection'
import CtaBanner from '../components/home/CtaBanner'

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <FeaturedVehicles />
      <TestimonialsSection />
      <CtaBanner />
    </>
  )
}
