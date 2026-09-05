import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { VEHICLES } from '../../data/vehicles'
import { formatIDR } from '../../data/constants'
import VehicleArt from '../ui/VehicleArt'

const SHOWCASE_VEHICLES = VEHICLES.filter((v) => v.featured).slice(0, 6)

export default function RotatingShowcase() {
  const [active, setActive] = useState(0)
  const [radius, setRadius] = useState(320)
  const [dragDelta, setDragDelta] = useState(0)
  const dragging = useRef(false)
  const startX = useRef(0)
  const pausedRef = useRef(false)

  const count = SHOWCASE_VEHICLES.length
  const step = 360 / count

  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth
      setRadius(w < 480 ? 130 : w < 768 ? 200 : w < 1024 ? 260 : 340)
    }
    updateRadius()
    window.addEventListener('resize', updateRadius)
    return () => window.removeEventListener('resize', updateRadius)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % count)
    }, 3200)
    return () => clearInterval(id)
  }, [count])

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    pausedRef.current = true
    startX.current = e.clientX
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    setDragDelta((e.clientX - startX.current) * 0.35)
  }

  const finishDrag = () => {
    if (!dragging.current) return
    dragging.current = false
    setActive((a) => {
      const shift = Math.round(-dragDelta / step)
      const next = (((a + shift) % count) + count) % count
      return next
    })
    setDragDelta(0)
    setTimeout(() => (pausedRef.current = false), 2000)
  }

  const rotation = -active * step + dragDelta
  const activeVehicle = SHOWCASE_VEHICLES[active]

  return (
    <div className="flex flex-col items-center gap-10">
      <div
        className="perspective-1000 relative h-[220px] w-full max-w-4xl select-none sm:h-[280px] lg:h-[340px]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerLeave={finishDrag}
      >
        <div
          className="preserve-3d relative mx-auto h-full w-[180px] cursor-grab active:cursor-grabbing sm:w-[220px] lg:w-[260px]"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transition: dragging.current ? 'none' : 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {SHOWCASE_VEHICLES.map((vehicle, i) => {
            const isActive = i === active
            return (
              <button
                key={vehicle.id}
                type="button"
                onClick={() => i !== active && setActive(i)}
                className="preserve-3d absolute inset-0 rounded-2xl border transition-opacity duration-500"
                style={{
                  transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
                  opacity: isActive ? 1 : 0.35,
                  borderColor: isActive ? 'rgba(0,194,255,0.5)' : 'rgba(255,255,255,0.08)',
                  boxShadow: isActive ? '0 0 40px rgba(0,194,255,0.35)' : 'none',
                }}
              >
                <VehicleArt bodyType={vehicle.bodyType} accent={vehicle.accent} className="h-full w-full rounded-2xl" glow={isActive} />
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Sebelumnya"
          onClick={() => setActive((a) => (a - 1 + count) % count)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-electric-400 hover:text-electric-400"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {SHOWCASE_VEHICLES.map((v, i) => (
            <button
              key={v.id}
              aria-label={`Pilih ${v.model}`}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${i === active ? 'w-6 bg-electric-400' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Selanjutnya"
          onClick={() => setActive((a) => (a + 1) % count)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-electric-400 hover:text-electric-400"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {activeVehicle && (
        <div className="glass-card flex flex-col items-center gap-3 px-8 py-5 text-center sm:flex-row sm:gap-6 sm:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-electric-400">{activeVehicle.brand}</p>
            <p className="font-display text-xl font-bold text-white">
              {activeVehicle.model} <span className="text-white/50">{activeVehicle.variant}</span>
            </p>
            <p className="mt-1 text-sm text-white/50">
              {activeVehicle.year} &middot; {formatIDR(activeVehicle.price)}
            </p>
          </div>
          <Link to={`/katalog/${activeVehicle.id}`} className="btn-outline whitespace-nowrap !px-5 !py-2.5 text-xs">
            Lihat Detail
          </Link>
        </div>
      )}
    </div>
  )
}
