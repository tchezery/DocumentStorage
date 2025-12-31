import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/Button'
import { useState } from 'react'
import { authService } from '../services/authService'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert('As senhas não conferem.')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await authService.register({ name, email, password })
      
      // Armazenar token (login automático após cadastro, temporariamente na sessão)
      sessionStorage.setItem('token', response.token)
      sessionStorage.setItem('user', JSON.stringify(response.user))
      
      navigate('/')
    } catch (error) {
      console.error(error)
      alert('Falha no cadastro. Tente novamente.')
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
            <h1 className="text-3xl font-semibold mb-3 text-gray-900 tracking-tight">Criar Conta</h1>
            <p className="text-gray-500 font-medium">
              Preencha os dados abaixo para se cadastrar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                placeholder="Nome completo"
              />
            </div>

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

            <div>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                placeholder="Confirmar Senha"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 text-base"
            >
              {isLoading ? 'Cadastrando...' : 'Criar Conta'}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-[#0071e3] hover:underline font-semibold">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
