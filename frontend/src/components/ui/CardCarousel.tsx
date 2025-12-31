import { ReactNode } from 'react'

interface CardCarouselProps {
  children: ReactNode
  className?: string
}

export default function CardCarousel({ children, className = '' }: CardCarouselProps) {
  return (
    // Break out of container to full screen width
    <div className={`relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] ${className}`}>
      <div 
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory 
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] 
        px-[max(2.5vw,calc((100vw-1304px)/2))]" 
      >
        {children}
      </div>
    </div>
  )
}
