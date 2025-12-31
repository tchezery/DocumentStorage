import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/Button'
import { useState } from 'react'
import { authService } from '../services/authService'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await authService.login(email, password)
      
      // Armazenar token (temporariamente na sessão)
      sessionStorage.setItem('token', response.token)
      sessionStorage.setItem('user', JSON.stringify(response.user))
      
      navigate('/')
    } catch (error) {
      console.error(error)
      alert('Falha no login. Verifique suas credenciais.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center p-4">
      <div className="w-full max-w-[440px]">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar para início</span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-10 card-shadow">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-semibold mb-3 text-gray-900 tracking-tight">Login</h1>
            <p className="text-gray-500 font-medium">
              Entre com sua conta para acessar mais recursos
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                placeholder="Email"
              />
            </div>

            <div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                placeholder="Senha"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 text-base"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-[#0071e3] hover:underline font-semibold">
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

