import { ReactNode } from 'react'

interface InfoCardProps {
  children: ReactNode
  className?: string
  width?: string
}

export default function InfoCard({ 
  children, 
  className = '', 
  width = 'w-[320px] sm:w-[380px]' 
}: InfoCardProps) {
  return (
    <div 
      className={`flex-none ${width} bg-white rounded-3xl p-8 card-shadow 
      snap-center border border-gray-100/50 transition-transform hover:scale-[1.01] duration-300 ${className}`}
    >
      {children}
    </div>
  )
}
