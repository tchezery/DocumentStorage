import { X, DollarSign, Video, TrendingDown, Info, Share2, UserPlus, HardDrive } from 'lucide-react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { useStorage } from '../context/StorageContext'

interface StorageUpgradeModalProps {
  currentPrice: number
  isUSD: boolean
  adsWatched: number
  onClose: () => void
  onPay: () => void
  onWatchAd: (storageGained: number) => void
  onSubscribe?: () => void
  onShare?: () => void
}

export default function StorageUpgradeModal({
  currentPrice,
  isUSD,
  onClose,
  onSubscribe,
  onShare
}: StorageUpgradeModalProps) {
  const { totalStorage } = useStorage()
  const navigate = useNavigate()

  const handleSubscribe = () => {
    if (onSubscribe) {
      onSubscribe()
    } else {
      onClose()
      navigate('/register')
    }
  }

  const priceDisplay = isUSD 
    ? `$${currentPrice.toFixed(2)} USD` 
    : `R$ ${currentPrice.toFixed(2)}`

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in text-gray-900 cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto animate-slide-up card-shadow-lg scrollbar-hide relative cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-8 py-6 flex items-center justify-between border-b border-gray-100 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">Armazenamento</h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        <div className="px-8 pb-8 space-y-8">
          {/* Card de Armazenamento Atual (Design Apple) */}
          <div className="bg-gradient-to-br from-[#0071e3] to-[#298ae8] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <HardDrive className="w-32 h-32" />
            </div>
            <div className="relative z-10">
               <p className="text-blue-100 font-medium mb-1 text-sm">Seu espaço total</p>
               <div className="flex items-baseline space-x-2">
                 <h3 className="text-4xl font-bold tracking-tight">{totalStorage.toFixed(1)} GB</h3>
                 <span className="text-blue-100 font-medium font-sans">disponíveis</span>
               </div>
               <div className="mt-4 flex items-center space-x-2 text-xs font-medium text-blue-50 bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm">
                 <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                 <span>Conta Ativa</span>
               </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="h-5 w-5 text-[#0071e3]" />
              <p className="font-semibold text-gray-900">Seu preço atual</p>
            </div>
            <p className="text-3xl font-bold text-gray-900 tracking-tight">{priceDisplay}</p>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              Quanto mais você usa, mais barato fica.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-900 font-semibold text-lg">
              Escolha como aumentar seu espaço:
            </p>

            {/* Opção 1: Pagar (DESABILITADO) */}
            <div className="group border border-gray-200 rounded-2xl p-6 transition-colors opacity-50 cursor-not-allowed bg-gray-50">
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 text-gray-900">Pagar via PIX</h3>
                  <p className="text-gray-500 text-sm mb-4 font-medium leading-relaxed">
                    Rápido e seguro. Pague {priceDisplay} por GB adicional.
                  </p>
                  <Button
                    disabled
                    variant="primary"
                    className="w-full text-sm opacity-50 cursor-not-allowed"
                  >
                    Pagar Agora (Indisponível)
                  </Button>
                </div>
              </div>
            </div>

            {/* Opção 2: Assistir Ad (DESABILITADO) */}
            <div className="group border border-gray-200 rounded-2xl p-6 transition-colors opacity-50 cursor-not-allowed bg-gray-50">
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors">
                  <Video className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 text-gray-900">Assistir anúncio</h3>
                  <p className="text-gray-500 text-sm mb-4 font-medium leading-relaxed">
                    Ganhe armazenamento gratuito assistindo a um vídeo curto.
                  </p>
                  <Button
                    disabled
                    variant="outline"
                    className="w-full text-sm opacity-50 cursor-not-allowed"
                  >
                    Assistir (Indisponível)
                  </Button>
                </div>
              </div>
            </div>

            {/* Opções Extras (ATIVAS) */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Ganhe +1GB Extra</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleSubscribe}
                  variant="outline"
                  className="flex items-center justify-center space-x-2 text-sm py-2.5 bg-gray-50 border-transparent hover:bg-gray-100 text-gray-900"
                >
                  <UserPlus className="h-4 w-4 text-gray-500" />
                  <span>Inscrever-se</span>
                </Button>
                {onShare && (
                  <Button
                    onClick={onShare}
                    variant="outline"
                    className="flex items-center justify-center space-x-2 text-sm py-2.5 bg-gray-50 border-transparent hover:bg-gray-100 text-gray-900"
                  >
                    <Share2 className="h-4 w-4 text-gray-500" />
                    <span>Compartilhar</span>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Dica */}
          <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100/50">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-[#0071e3] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                <strong className="text-gray-900">Dica:</strong> Você pode dividir arquivos grandes em partes menores 
                e guardá-los separadamente dentro do limite de 1GB.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}