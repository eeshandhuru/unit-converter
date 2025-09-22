interface SineWaveIconProps {
  className?: string
}

export function SineWaveIcon({ className = "w-8 h-8" }: SineWaveIconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M2 16C2 16 4 8 8 8C12 8 14 24 18 24C22 24 24 8 28 8C30 8 30 16 30 16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M2 16C2 16 4 24 8 24C12 24 14 8 18 8C22 8 24 24 28 24C30 24 30 16 30 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  )
}
