import { Link } from 'react-router-dom'
import { LogIn } from 'lucide-react'

interface HeaderProps {
  onLoginClick?: () => void
}

export default function Header({ onLoginClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-apple-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-semibold">Document Storage</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/#sobre" className="text-gray-600 hover:text-apple-blue transition-colors">
              Sobre
            </Link>
            <Link to="/por-que-somos-melhor" className="text-gray-600 hover:text-apple-blue transition-colors">
              Por que Somos Melhor
            </Link>
            <Link to="/transparencia" className="text-gray-600 hover:text-apple-blue transition-colors">
              Transparência
            </Link>
            <button
              onClick={onLoginClick}
              className="flex items-center space-x-2 px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <LogIn size={18} />
              <span>Login</span>
            </button>
          </nav>
          
          <button
            onClick={onLoginClick}
            className="md:hidden p-2 text-gray-600 hover:text-apple-blue"
          >
            <LogIn size={24} />
          </button>
        </div>
      </div>
    </header>
  )
}

