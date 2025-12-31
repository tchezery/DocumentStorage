import { Plus } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function FloatingUploadButton() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(false)

  // Show button only when scrolled down a bit on Home, or always on other pages
  useEffect(() => {
    const toggleVisibility = () => {
      if (location.pathname !== '/') {
        setIsVisible(true)
      } else {
        if (window.scrollY > 400) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    // Initial check
    toggleVisibility() 

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [location])

  const handleClick = () => {
    if (location.pathname !== '/') {
      navigate('/')
      // Small delay to allow navigation to happen then scroll
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (!isVisible) return null

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 p-4 bg-[#0071e3] text-white rounded-full shadow-lg hover:bg-[#0077ed] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
      aria-label="Adicionar Arquivo"
    >
      <Plus className="h-6 w-6" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap group-hover:ml-2">
        Adicionar Arquivo
      </span>
    </button>
  )
}
