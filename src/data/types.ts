export type BodyType = 'Sedan' | 'SUV' | 'MPV' | 'Hatchback' | 'Sports' | 'Pickup'
export type FuelType = 'Bensin' | 'Diesel' | 'Hybrid' | 'Listrik'
export type Transmission = 'Manual' | 'Automatic' | 'CVT'
export type Accent = 'blue' | 'orange'

export interface VehicleSpecs {
  engine: string
  power: string
  seats: number
  fuelTankL: number
  driveType: string
}

export interface Vehicle {
  id: string
  brand: string
  model: string
  variant: string
  year: number
  price: number
  mileageKm: number
  transmission: Transmission
  fuel: FuelType
  bodyType: BodyType
  color: string
  accent: Accent
  plat: string
  location: string
  condition: string
  tags: string[]
  specs: VehicleSpecs
  description: string
  featured: boolean
}

export interface RentalVehicle {
  id: string
  brand: string
  model: string
  bodyType: BodyType
  accent: Accent
  seats: number
  transmission: Transmission
  dailyPrice: number
  monthlyPrice: number
  withDriverDailyPrice: number
  tags: string[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  location: string
  quote: string
  rating: number
  vehicle?: string
}
