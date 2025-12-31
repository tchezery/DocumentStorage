import { Info, Shield, Clock, DollarSign } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import CardCarousel from '../ui/CardCarousel'
import InfoCard from '../ui/InfoCard'

export default function HowItWorks() {
  const cards = [
    {
      icon: <Info className="h-8 w-8 text-gray-900" />,
      title: "Armazenamento Temporário",
      description: "Arquivos anônimos são armazenados por 7 dias. Usuários registrados têm mais opções."
    },
    {
      icon: <Shield className="h-8 w-8 text-gray-900" />,
      title: "Seguro e Anônimo",
      description: "Seus documentos são protegidos. Use sem se preocupar com privacidade."
    },
    {
      icon: <Clock className="h-8 w-8 text-gray-900" />,
      title: "Acesso Rápido",
      description: "Use o código ou QR Code para acessar seus arquivos de qualquer lugar."
    },
    {
      icon: <DollarSign className="h-8 w-8 text-gray-900" />,
      title: "Mais Espaço",
      description: "Pague $1 USD via PIX para cada GB adicional de armazenamento."
    }
  ]

  return (
    <div id="como-funciona" className="mb-24">
      <SectionHeader title="Como Funciona" subtitle="Simples assim" />
      
      <CardCarousel>
        {cards.map((card, index) => (
          <InfoCard key={index}>
            <div className="mb-6">
              {card.icon}
            </div>
            <h3 className="font-semibold text-2xl mb-3 text-gray-900">{card.title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              {card.description}
            </p>
          </InfoCard>
        ))}
      </CardCarousel>
    </div>
  )
}
