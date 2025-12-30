import { useState } from 'react'
import { Download, Search } from 'lucide-react'
import Button from './Button'
import { fileService } from '../services/fileService'

interface DownloadCodeInputProps {
  onDownload: (code: string) => void
}

export default function DownloadCodeInput({ onDownload }: DownloadCodeInputProps) {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return

    setIsLoading(true)
    
    try {
      // Verificar se o código existe
      await fileService.checkCode(code.trim().toUpperCase())
      onDownload(code.trim().toUpperCase())
    } catch (error) {
      console.error(error)
      alert('Código inválido ou arquivo expirado.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Digite o código de download"
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-apple-blue focus:outline-none text-center font-mono text-lg"
            maxLength={10}
          />
        </div>
        <Button
          type="submit"
          disabled={!code.trim() || isLoading}
          className="w-full flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Buscando...</span>
            </>
          ) : (
            <>
              <Download className="h-5 w-5" />
              <span>Baixar Arquivo</span>
            </>
          )}
        </Button>
      </form>
    </div>
  )
}

