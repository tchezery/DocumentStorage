import { Link } from 'react-router-dom'
import { LogIn } from 'lucide-react'

interface HeaderProps {
  onLoginClick?: () => void
}

export default function Header({ onLoginClick }: HeaderProps) {
  const handleScrollToTop = (e: React.MouseEvent) => {
    if (window.location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-gray-200/50 backdrop-blur-md bg-white/70">
      <div className="w-[95%] max-w-[1304px] mx-auto">
        <div className="flex items-center justify-between h-12">
          <Link to="/" onClick={handleScrollToTop} className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-900 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-lg font-semibold text-gray-900 tracking-tight">Document Storage</span>
              <Link to="/#projeto" className="text-[10px] text-gray-400 font-medium whitespace-nowrap hover:text-gray-600 transition-colors">by Tchézery Ribeiro</Link>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-gray-600">
            <Link to="/" onClick={handleScrollToTop} className="hover:text-gray-900 transition-colors">
              Início
            </Link>
            <Link to="/porque-somos-melhor" className="hover:text-gray-900 transition-colors">
              Porque Somos Melhor
            </Link>
            <Link to="/transparencia" className="hover:text-gray-900 transition-colors">
              Transparência
            </Link>
            <button
              onClick={onLoginClick}
              className="flex items-center space-x-1 px-3 py-1 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors text-xs"
            >
              <span>Login</span>
            </button>
          </nav>
          
          <button
            onClick={onLoginClick}
            className="md:hidden p-2 text-gray-900"
          >
            <LogIn size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}

