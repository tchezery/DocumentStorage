import { X, DollarSign, Video, TrendingDown, Info, AlertTriangle, Share2, UserPlus } from 'lucide-react'
import Button from './Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

// Função para calcular armazenamento baseado no número de anúncios
const calculateAdStorage = (adNumber: number): number => {
  if (adNumber <= 4) return 1.0 // 1GB para os primeiros 4
  if (adNumber <= 8) return 0.5 // 500MB para anúncios 5-8
  if (adNumber <= 12) return 0.25 // 250MB para anúncios 9-12
  return 0.1 // 100MB para anúncios 13+
}

// Função para calcular total de armazenamento ganho até agora
const calculateTotalAdStorage = (adsWatched: number): number => {
  let total = 0
  for (let i = 1; i <= adsWatched; i++) {
    total += calculateAdStorage(i)
  }
  return total
}

const MAX_AD_STORAGE = 8 // 8GB máximo via anúncios

export default function StorageUpgradeModal({
  currentPrice,
  isUSD,
  adsWatched,
  onClose,
  onPay,
  onWatchAd,
  onSubscribe,
  onShare
}: StorageUpgradeModalProps) {
  const [showAd, setShowAd] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const navigate = useNavigate()

  const nextAdNumber = adsWatched + 1
  const storageGained = calculateAdStorage(nextAdNumber)
  const totalAdStorage = calculateTotalAdStorage(adsWatched)
  const remainingAdStorage = MAX_AD_STORAGE - totalAdStorage
  const canWatchMoreAds = remainingAdStorage > 0

  const handleWatchAd = () => {
    // Mostrar aviso antes do 5º anúncio
    if (nextAdNumber === 5) {
      setShowWarning(true)
      return
    }

    startAd()
  }

  const startAd = () => {
    setShowWarning(false)
    setShowAd(true)
    // Simular anúncio
    setTimeout(() => {
      setShowAd(false)
      onWatchAd(storageGained)
    }, 5000) // 5 segundos de anúncio simulado
  }

  const handleSubscribe = () => {
    onClose()
    navigate('/register')
  }

  const formatStorage = (gb: number): string => {
    if (gb >= 1) return `${gb.toFixed(1)} GB`
    return `${(gb * 1024).toFixed(0)} MB`
  }

  const priceDisplay = isUSD 
    ? `$${currentPrice.toFixed(2)} USD` 
    : `R$ ${currentPrice.toFixed(2)}`

  // Modal de aviso antes do 5º anúncio
  if (showWarning) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 animate-slide-up card-shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">Atenção</h2>
          </div>
          
          <div className="space-y-4 mb-8">
            <p className="text-gray-500 font-medium">
              Você já assistiu 4 anúncios e ganhou 4GB. A partir do 5º anúncio, os valores 
              de armazenamento por vídeo serão reduzidos.
            </p>
            <div className="bg-yellow-50/50 rounded-2xl p-5 border border-yellow-100">
              <p className="text-sm text-yellow-800 mb-2 font-medium">
                <strong>Importante:</strong> Os anúncios não pagam necessariamente o valor 
                equivalente aos GBs oferecidos. Esta é uma forma de ajudar quem não tem 
                condições financeiras de pagar no momento.
              </p>
              <p className="text-sm text-yellow-800 font-medium">
                A partir de agora, cada anúncio liberará <strong>{formatStorage(storageGained)}</strong> 
                em vez de 1GB.
              </p>
            </div>
            <p className="text-sm text-gray-500 font-medium">
              Você ainda pode ganhar até <strong>{formatStorage(remainingAdStorage)}</strong> 
              assistindo mais anúncios (limite total de {MAX_AD_STORAGE}GB via anúncios).
            </p>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={() => setShowWarning(false)}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={startAd}
              className="flex-1"
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (showAd) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
        <div className="bg-white rounded-3xl max-w-md w-full p-10 animate-slide-up">
          <div className="text-center">
            <Video className="h-16 w-16 text-[#0071e3] mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Assistindo Anúncio</h2>
            <p className="text-gray-500 font-medium mb-8">
              Por favor, aguarde enquanto o anúncio é reproduzido...
            </p>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
              <div className="bg-[#0071e3] h-2 rounded-full animate-pulse" style={{ width: '100%' }} />
            </div>
            <p className="text-sm text-gray-400 font-medium">
              Isso levará apenas alguns segundos
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-8 animate-slide-up card-shadow-lg scrollbar-hide">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">Mais espaço</h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        <div className="space-y-8">
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

            {/* Opção 1: Pagar */}
            <div className="group border border-gray-200 rounded-2xl p-6 hover:border-[#0071e3] transition-colors cursor-pointer" onClick={onPay}>
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 text-gray-900">Pagar via PIX</h3>
                  <p className="text-gray-500 text-sm mb-4 font-medium leading-relaxed">
                    Rápido e seguro. Pague {priceDisplay} por GB adicional.
                  </p>
                  <Button
                    onClick={(e) => { e.stopPropagation(); onPay(); }}
                    variant="primary"
                    className="w-full text-sm"
                  >
                    Pagar Agora
                  </Button>
                </div>
              </div>
            </div>

            {/* Opção 2: Assistir Ad */}
            <div className={`group border rounded-2xl p-6 transition-colors ${
              canWatchMoreAds 
                ? 'border-gray-200 hover:border-[#0071e3] cursor-pointer' 
                : 'border-gray-200 opacity-60 pointer-events-none bg-gray-50'
            }`} onClick={canWatchMoreAds ? handleWatchAd : undefined}>
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-100 transition-colors">
                  <Video className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 text-gray-900">Assistir anúncio</h3>
                  {canWatchMoreAds ? (
                    <>
                      <p className="text-gray-500 text-sm mb-2 font-medium leading-relaxed">
                        Ganhe <strong>{formatStorage(storageGained)}</strong> gratuitamente.
                      </p>
                      {adsWatched > 0 ? (
                        <p className="text-xs text-gray-400 mb-4 font-medium">
                          Restam {formatStorage(remainingAdStorage)} disponíveis.
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400 mb-4 font-medium">
                          Até {MAX_AD_STORAGE}GB gratuitos.
                        </p>
                      )}
                      <Button
                        onClick={(e) => { e.stopPropagation(); handleWatchAd(); }}
                        variant="outline"
                        className="w-full text-sm"
                      >
                        Assistir
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-500 text-sm mb-4 font-medium">
                        Você atingiu o limite de {MAX_AD_STORAGE}GB via anúncios.
                      </p>
                      <Button
                        disabled
                        variant="outline"
                        className="w-full opacity-50 text-sm"
                      >
                        Limite Atingido
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Opções Extras */}
            {(onSubscribe || true) && (
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
            )}
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

