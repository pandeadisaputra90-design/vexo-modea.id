import type { Accent, BodyType } from '../../data/types'

type Shot = 'profile' | 'front' | 'rear' | 'interior'

interface Props {
  bodyType: BodyType
  accent: Accent
  shot?: Shot
  className?: string
  glow?: boolean
}

interface ProfileArt {
  body: string
  windows: string
  wheels: [number, number, number][]
}

const PROFILE_PATHS: Record<BodyType, ProfileArt> = {
  Sedan: {
    body: 'M20,95 L20,80 C20,68 28,62 40,60 L70,60 C78,45 92,35 110,34 L150,34 C168,35 178,45 182,58 L200,60 C212,62 220,68 220,80 L220,95 Z',
    windows: 'M78,58 L92,40 L148,40 L172,58 Z',
    wheels: [
      [55, 95, 15],
      [185, 95, 15],
    ],
  },
  SUV: {
    body: 'M15,95 L15,72 C15,58 25,50 40,48 L65,48 C72,32 88,24 108,24 L155,24 C172,24 185,32 190,46 L205,48 C215,50 225,58 225,72 L225,95 Z',
    windows: 'M75,46 L90,28 L150,28 L185,46 Z',
    wheels: [
      [52, 95, 17],
      [188, 95, 17],
    ],
  },
  MPV: {
    body: 'M15,95 L15,55 C15,36 26,22 46,20 L194,20 C209,22 220,36 220,55 L220,95 Z',
    windows: 'M35,50 L35,26 L205,26 L205,50 Z',
    wheels: [
      [50, 95, 16],
      [190, 95, 16],
    ],
  },
  Hatchback: {
    body: 'M25,95 L25,75 C25,62 33,55 45,53 L68,53 C76,38 90,30 108,29 L150,29 C162,30 170,38 174,50 L188,53 C198,55 205,62 205,75 L205,95 Z',
    windows: 'M80,51 L94,33 L146,33 L172,53 Z',
    wheels: [
      [58, 95, 15],
      [172, 95, 15],
    ],
  },
  Sports: {
    body: 'M15,95 L15,85 C15,75 22,68 35,66 L85,66 C95,48 110,40 130,40 L165,42 C180,44 190,52 196,64 L205,66 C213,68 222,75 222,85 L222,95 Z',
    windows: 'M100,64 L112,46 L152,46 L178,64 Z',
    wheels: [
      [48, 95, 17],
      [190, 95, 17],
    ],
  },
  Pickup: {
    body: 'M15,95 L15,75 C15,62 23,55 35,53 L55,53 C63,38 76,30 95,30 L118,30 C128,31 136,40 138,53 L138,68 L215,68 L215,95 Z',
    windows: 'M62,52 L74,36 L112,36 L133,52 Z',
    wheels: [
      [45, 95, 15],
      [193, 95, 15],
    ],
  },
}

function Wheel({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#05070a" stroke={color} strokeWidth={2.5} />
      <circle cx={cx} cy={cy} r={r * 0.42} fill="none" stroke={color} strokeWidth={1.5} opacity={0.8} />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const x2 = cx + Math.cos(rad) * r * 0.4
        const y2 = cy + Math.sin(rad) * r * 0.4
        return <line key={deg} x1={cx} y1={cy} x2={x2} y2={y2} stroke={color} strokeWidth={1} opacity={0.6} />
      })}
    </g>
  )
}

function ProfileShot({ bodyType, color, colorSoft, gradId }: { bodyType: BodyType; color: string; colorSoft: string; gradId: string }) {
  const art = PROFILE_PATHS[bodyType]
  return (
    <svg viewBox="0 0 240 120" className="relative h-full w-full">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colorSoft} stopOpacity={0.9} />
          <stop offset="100%" stopColor={color} stopOpacity={0.25} />
        </linearGradient>
        <radialGradient id={`${gradId}-floor`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity={0.35} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx="120" cy="102" rx="95" ry="8" fill={`url(#${gradId}-floor)`} />
      <line x1="8" y1="95" x2="232" y2="95" stroke={color} strokeOpacity={0.25} strokeWidth={1} />
      <path d={art.body} fill={`url(#${gradId})`} fillOpacity={0.12} stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <path d={art.windows} fill={color} fillOpacity={0.18} stroke={colorSoft} strokeWidth={1.5} strokeLinejoin="round" />
      {art.wheels.map((w, i) => (
        <Wheel key={i} cx={w[0]} cy={w[1]} r={w[2]} color={color} />
      ))}
      <circle cx={art.wheels[0][0] - art.wheels[0][2] - 4} cy={art.wheels[0][1] - art.wheels[0][2] - 2} r="2.5" fill={colorSoft} />
      <circle cx={art.wheels[1][0] + art.wheels[1][2] + 4} cy={art.wheels[1][1] - art.wheels[1][2] - 2} r="2.5" fill="#ff4d4d" opacity={0.85} />
    </svg>
  )
}

function FrontShot({ color, colorSoft }: { color: string; colorSoft: string }) {
  return (
    <svg viewBox="0 0 240 140" className="h-full w-full">
      <ellipse cx="120" cy="118" rx="80" ry="8" fill={color} opacity={0.15} />
      <path
        d="M55,120 L55,80 C55,55 78,38 120,38 C162,38 185,55 185,80 L185,120 Z"
        fill="none"
        stroke={color}
        strokeWidth={2}
      />
      <rect x="70" y="86" width="34" height="14" rx="4" fill={colorSoft} opacity={0.8} />
      <rect x="136" y="86" width="34" height="14" rx="4" fill={colorSoft} opacity={0.8} />
      <rect x="95" y="106" width="50" height="10" rx="3" fill="none" stroke={color} strokeWidth={1.5} />
      <line x1="70" y1="120" x2="170" y2="120" stroke={color} strokeWidth={1} opacity={0.4} />
      <path d="M75,60 C90,50 150,50 165,60" fill="none" stroke={color} strokeWidth={1.5} opacity={0.6} />
    </svg>
  )
}

function RearShot({ color, colorSoft }: { color: string; colorSoft: string }) {
  return (
    <svg viewBox="0 0 240 140" className="h-full w-full">
      <ellipse cx="120" cy="118" rx="80" ry="8" fill={color} opacity={0.15} />
      <path
        d="M55,120 L55,80 C55,55 78,38 120,38 C162,38 185,55 185,80 L185,120 Z"
        fill="none"
        stroke={color}
        strokeWidth={2}
      />
      <rect x="65" y="82" width="26" height="10" rx="4" fill="#ff4d4d" opacity={0.85} />
      <rect x="149" y="82" width="26" height="10" rx="4" fill="#ff4d4d" opacity={0.85} />
      <rect x="95" y="104" width="50" height="8" rx="3" fill="none" stroke={color} strokeWidth={1.5} />
      <path d="M85,45 L155,45" stroke={colorSoft} strokeWidth={3} opacity={0.7} />
      <line x1="70" y1="120" x2="170" y2="120" stroke={color} strokeWidth={1} opacity={0.4} />
    </svg>
  )
}

function InteriorShot({ color, colorSoft }: { color: string; colorSoft: string }) {
  return (
    <svg viewBox="0 0 240 140" className="h-full w-full">
      <path d="M10,110 C60,70 180,70 230,110" fill="none" stroke={color} strokeWidth={2} />
      <circle cx="60" cy="95" r="24" fill="none" stroke={colorSoft} strokeWidth={3} />
      <circle cx="60" cy="95" r="6" fill={colorSoft} />
      <line x1="60" y1="95" x2="60" y2="75" stroke={colorSoft} strokeWidth={2} />
      <line x1="60" y1="95" x2="44" y2="107" stroke={colorSoft} strokeWidth={2} />
      <line x1="60" y1="95" x2="76" y2="107" stroke={colorSoft} strokeWidth={2} />
      <rect x="105" y="60" width="70" height="22" rx="4" fill="none" stroke={color} strokeWidth={1.5} />
      <rect x="112" y="66" width="22" height="10" rx="2" fill={color} opacity={0.5} />
      <rect x="140" y="66" width="28" height="10" rx="2" fill={colorSoft} opacity={0.5} />
      <rect x="95" y="90" width="90" height="28" rx="6" fill="none" stroke={color} strokeWidth={1.5} opacity={0.6} />
    </svg>
  )
}

export default function VehicleArt({ bodyType, accent, shot = 'profile', className = '', glow = true }: Props) {
  const color = accent === 'orange' ? '#ff7a1a' : '#00c2ff'
  const colorSoft = accent === 'orange' ? '#ffb37a' : '#7fe0ff'
  const gradId = `grad-${bodyType}-${accent}-${shot}`.replace(/\s+/g, '')

  return (
    <div className={`relative overflow-hidden bg-charcoal-900 ${className}`}>
      <div className="absolute inset-0 bg-grid opacity-30" />
      {glow && (
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 30%, ${color}26, transparent 65%)` }}
        />
      )}
      <div className="relative h-full w-full p-4">
        {shot === 'profile' && <ProfileShot bodyType={bodyType} color={color} colorSoft={colorSoft} gradId={gradId} />}
        {shot === 'front' && <FrontShot color={color} colorSoft={colorSoft} />}
        {shot === 'rear' && <RearShot color={color} colorSoft={colorSoft} />}
        {shot === 'interior' && <InteriorShot color={color} colorSoft={colorSoft} />}
      </div>
      {glow && (
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background: `linear-gradient(115deg, transparent 30%, ${color}1f 48%, transparent 66%)`,
            backgroundSize: '260% 260%',
            animation: 'shimmer 4s linear infinite',
          }}
        />
      )}
    </div>
  )
}
