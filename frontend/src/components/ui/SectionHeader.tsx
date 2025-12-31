import { ReactNode } from 'react'

interface SectionHeaderProps {
  title: string
  subtitle?: string | ReactNode
  className?: string
}

export default function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-4xl font-semibold text-gray-900 tracking-tight">
        {title}
        {subtitle && (
          <>
            . <span className="text-gray-500">{subtitle}</span>
          </>
        )}
      </h2>
    </div>
  )
}
