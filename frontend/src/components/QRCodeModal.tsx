import { QRCodeSVG } from 'qrcode.react'
import { X, Copy, Check, Download, Mail, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import Button from './Button'

interface QRCodeModalProps {
  code: string
  expirationDate: Date
  onClose: () => void
}

export default function QRCodeModal({ code, expirationDate, onClose }: QRCodeModalProps) {
  const [copied, setCopied] = useState(false)

  const daysRemaining = Math.ceil((expirationDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  const formattedDate = expirationDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadTxt = () => {
    const content = `Código de Download: ${code}\nData de Expiração: ${formattedDate}\nDias Restantes: ${daysRemaining}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `codigo-download-${code}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleEmail = () => {
    const subject = encodeURIComponent('Código de Download - Document Storage')
    const body = encodeURIComponent(
      `Seu código de download é: ${code}\n\n` +
      `Data de Expiração: ${formattedDate}\n` +
      `Dias Restantes: ${daysRemaining}`
    )
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Código de Download: ${code}\n` +
      `Data de Expiração: ${formattedDate}\n` +
      `Dias Restantes: ${daysRemaining}`
    )
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  const qrCodeValue = JSON.stringify({
    code,
    expirationDate: expirationDate.toISOString(),
    daysRemaining
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-slide-up card-shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Upload Concluído!</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-xl border-2 border-gray-200 mb-4">
              <QRCodeSVG value={qrCodeValue} size={200} />
            </div>
            <p className="text-sm text-gray-500 mb-2">Escaneie o QR Code para receber o código</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-2">Seu código de download:</p>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-white px-4 py-3 rounded-lg font-mono text-lg font-bold text-center border-2 border-gray-200">
                {code}
              </code>
              <button
                onClick={handleCopy}
                className="p-3 bg-apple-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="text-sm font-medium text-blue-900 mb-1">Data de Expiração</p>
            <p className="text-lg font-semibold text-blue-900">{formattedDate}</p>
            <p className="text-sm text-blue-700 mt-1">
              {daysRemaining} {daysRemaining === 1 ? 'dia restante' : 'dias restantes'}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Enviar código por:</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleDownloadTxt}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <Download className="h-6 w-6 text-gray-700 mb-2" />
                <span className="text-xs text-gray-700">TXT</span>
              </button>
              <button
                onClick={handleEmail}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <Mail className="h-6 w-6 text-gray-700 mb-2" />
                <span className="text-xs text-gray-700">Email</span>
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <MessageCircle className="h-6 w-6 text-gray-700 mb-2" />
                <span className="text-xs text-gray-700">WhatsApp</span>
              </button>
            </div>
          </div>

          <Button onClick={onClose} className="w-full">
            Entendi
          </Button>
        </div>
      </div>
    </div>
  )
}

