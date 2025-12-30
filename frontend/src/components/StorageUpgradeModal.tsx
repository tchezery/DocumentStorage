import { X, DollarSign, Video, TrendingDown, Info, AlertTriangle, Share2, UserPlus } from 'lucide-react'
import Button from './Button'
import { useState } from 'react'

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-slide-up card-shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-semibold">Atenção</h2>
          </div>
          
          <div className="space-y-4 mb-6">
            <p className="text-gray-700">
              Você já assistiu 4 anúncios e ganhou 4GB. A partir do 5º anúncio, os valores 
              de armazenamento por vídeo serão reduzidos.
            </p>
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <p className="text-sm text-yellow-800 mb-2">
                <strong>Importante:</strong> Os anúncios não pagam necessariamente o valor 
                equivalente aos GBs oferecidos. Esta é uma forma de ajudar quem não tem 
                condições financeiras de pagar no momento.
              </p>
              <p className="text-sm text-yellow-800">
                A partir de agora, cada anúncio liberará <strong>{formatStorage(storageGained)}</strong> 
                em vez de 1GB.
              </p>
            </div>
            <p className="text-sm text-gray-600">
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
              Continuar Assistindo
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (showAd) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 animate-slide-up">
          <div className="text-center">
            <Video className="h-16 w-16 text-apple-blue mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Assistindo Anúncio</h2>
            <p className="text-gray-600 mb-6">
              Por favor, aguarde enquanto o anúncio é reproduzido...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-apple-blue h-2 rounded-full animate-pulse" style={{ width: '100%' }} />
            </div>
            <p className="text-sm text-gray-500">
              Isso levará apenas alguns segundos
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto p-6 animate-slide-up card-shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Precisa de mais espaço?</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="h-5 w-5 text-apple-blue" />
              <p className="font-medium text-blue-900">Seu preço atual</p>
            </div>
            <p className="text-2xl font-bold text-apple-blue">{priceDisplay}</p>
            <p className="text-sm text-blue-700 mt-1">
              Quanto mais você usa, mais barato fica!
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700">
              Você pode escolher entre duas opções para obter mais armazenamento:
            </p>

            {/* Opção 1: Pagar */}
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-apple-blue transition-colors">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Pagar via PIX</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Rápido, seguro e direto. Você paga {priceDisplay} por GB adicional.
                  </p>
                  <Button
                    onClick={onPay}
                    variant="primary"
                    className="w-full"
                  >
                    Pagar {priceDisplay}
                  </Button>
                </div>
              </div>
            </div>

            {/* Opção 2: Assistir Ad */}
            <div className={`border-2 rounded-xl p-6 transition-colors ${
              canWatchMoreAds 
                ? 'border-gray-200 hover:border-apple-blue' 
                : 'border-gray-300 opacity-60'
            }`}>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Video className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Assistir um anúncio</h3>
                  {canWatchMoreAds ? (
                    <>
                      <p className="text-gray-600 text-sm mb-2">
                        Não pode pagar agora? Sem problemas! Assista um anúncio e ganhe{' '}
                        <strong>{formatStorage(storageGained)}</strong>.
                      </p>
                      {adsWatched > 0 && (
                        <p className="text-xs text-gray-500 mb-4">
                          Você já assistiu {adsWatched} anúncio(s) e ganhou {formatStorage(totalAdStorage)}. 
                          Restam {formatStorage(remainingAdStorage)} disponíveis via anúncios.
                        </p>
                      )}
                      {adsWatched === 0 && (
                        <p className="text-xs text-gray-500 mb-4">
                          Limite total: {MAX_AD_STORAGE}GB via anúncios
                        </p>
                      )}
                      <Button
                        onClick={handleWatchAd}
                        variant="outline"
                        className="w-full"
                      >
                        Assistir Anúncio
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600 text-sm mb-4">
                        Você atingiu o limite de {MAX_AD_STORAGE}GB via anúncios. 
                        Infelizmente não posso liberar mais que isso por anúncios.
                      </p>
                      <Button
                        disabled
                        variant="outline"
                        className="w-full opacity-50"
                      >
                        Limite Atingido
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Opções Extras */}
            {(onSubscribe || onShare) && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-semibold text-lg mb-3">Ganhe +1GB Extra</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Se inscreva ou compartilhe nosso projeto e ganhe mais 1GB de armazenamento!
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {onSubscribe && (
                    <Button
                      onClick={onSubscribe}
                      variant="outline"
                      className="flex items-center justify-center space-x-2"
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>Inscrever-se</span>
                    </Button>
                  )}
                  {onShare && (
                    <Button
                      onClick={onShare}
                      variant="outline"
                      className="flex items-center justify-center space-x-2"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Compartilhar</span>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Dica */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-start space-x-2">
              <Info className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">
                <strong>Dica:</strong> Você também pode dividir arquivos grandes em partes menores 
                e guardá-los separadamente, todos dentro do limite de 1GB. Só não esqueça de guardar 
                todos os códigos de download!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

