import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  children: ReactNode
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
  
  const variants = {
    primary: 'bg-[#0071e3] text-white hover:bg-[#0077ed] active:scale-95 shadow-sm',
    secondary: 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] active:scale-95',
    outline: 'border border-[#d2d2d7] text-[#0071e3] hover:border-[#0071e3] active:scale-95 bg-transparent',
    ghost: 'bg-transparent text-[#0071e3] hover:underline p-0 h-auto w-auto active:opacity-70'
  }
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

