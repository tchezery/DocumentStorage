import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import QRCodeModal from '../components/QRCodeModal'
import StorageUpgradeModal from '../components/StorageUpgradeModal'
import { fileService } from '../services/fileService'

import Hero from '../components/home/Hero'
import ActionGrid from '../components/home/ActionGrid'
import QuickLinks from '../components/home/QuickLinks'
import HowItWorks from '../components/home/HowItWorks'
import About from '../components/home/About'
import Footer from '../components/Footer'

export default function Home() {
  const navigate = useNavigate()
  const [showQRModal, setShowQRModal] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [uploadCode, setUploadCode] = useState<string | null>(null)
  const [expirationDate, setExpirationDate] = useState<Date | null>(null)
  const [adsWatched, setAdsWatched] = useState(0) // Rastrear anúncios assistidos
  
  // Simular preço atual (será calculado pelo backend baseado no uso)
  const [currentPrice] = useState(1.0) // $1 USD inicial
  const [isUSD] = useState(true) // Começa em USD, depois muda para BRL

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleUploadComplete = (_files: File[], code: string) => {
    const expiration = new Date()
    expiration.setDate(expiration.getDate() + 7) // 7 dias
    setExpirationDate(expiration)
    setUploadCode(code)
    setShowQRModal(true)
  }

  const handleDownload = (code: string) => {
    // Redirecionar para URL de download
    // Como o código já foi verificado no componente DownloadCodeInput, podemos prosseguir
    const url = fileService.getDownloadUrl(code)
    window.location.href = url
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header onLoginClick={handleLoginClick} />

      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <Hero />

          {/* Upload and Download Sections - Side by Side */}
          <ActionGrid 
            onUploadComplete={handleUploadComplete}
            onDownload={handleDownload}
            onUpgradeClick={() => setShowUpgradeModal(true)}
          />

          {/* Quick Links */}
          <QuickLinks />

          {/* Info Sections */}
          <HowItWorks />

          {/* About Section */}
          <About />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* QR Code Modal */}
      {showQRModal && uploadCode && expirationDate && (
        <QRCodeModal
          code={uploadCode}
          expirationDate={expirationDate}
          onClose={() => {
            setShowQRModal(false)
            setUploadCode(null)
            setExpirationDate(null)
          }}
        />
      )}

      {/* Storage Upgrade Modal */}
      {showUpgradeModal && (
        <StorageUpgradeModal
          currentPrice={currentPrice}
          isUSD={isUSD}
          adsWatched={adsWatched}
          onClose={() => setShowUpgradeModal(false)}
          onPay={() => {
            // Aqui você implementaria a lógica de pagamento
            alert('Redirecionando para pagamento PIX...')
            setShowUpgradeModal(false)
          }}
          onWatchAd={(storageGained) => {
            // Aqui você implementaria a lógica de anúncio
            setAdsWatched(prev => prev + 1)
            alert(`Anúncio assistido! Você ganhou ${storageGained >= 1 ? storageGained.toFixed(1) + 'GB' : (storageGained * 1024).toFixed(0) + 'MB'} adicional.`)
            setShowUpgradeModal(false)
          }}
          onSubscribe={() => {
            // Aqui você implementaria a lógica de inscrição
            alert('Obrigado por se inscrever! Você ganhou +1GB.')
            setShowUpgradeModal(false)
          }}
          onShare={() => {
            // Aqui você implementaria a lógica de compartilhamento
            if (navigator.share) {
              navigator.share({
                title: 'Document Storage',
                text: 'Conheça o Document Storage - Guarde seus documentos com segurança!',
                url: window.location.href
              }).then(() => {
                alert('Obrigado por compartilhar! Você ganhou +1GB.')
                setShowUpgradeModal(false)
              })
            } else {
              // Fallback: copiar link
              navigator.clipboard.writeText(window.location.href)
              alert('Link copiado! Obrigado por compartilhar. Você ganhou +1GB.')
              setShowUpgradeModal(false)
            }
          }}
        />
      )}
    </div>
  )
}

