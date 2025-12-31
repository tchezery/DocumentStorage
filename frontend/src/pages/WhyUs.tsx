import { Link } from 'react-router-dom'
import { ArrowLeft, TrendingDown, Shield, Clock, DollarSign, Users, Zap } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { formatMinPrice } from '../utils/pricing'
import CardCarousel from '../components/ui/CardCarousel'
import InfoCard from '../components/ui/InfoCard'

export default function WhyUs() {
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  const benefits = [
    {
      icon: <TrendingDown className="h-8 w-8 text-blue-500" />,
      title: "Preço que diminui",
      description: `Quanto mais você usa, mais barato fica! O preço diminui progressivamente até chegar a ${formatMinPrice()} por GB.`
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "100% Anônimo",
      description: "Você não precisa criar conta. Seus documentos são protegidos com criptografia e você tem controle total."
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      title: "Acesso Instantâneo",
      description: "Guarde e recupere seus arquivos em segundos. Use o código ou QR Code de qualquer lugar."
    },
    {
      icon: <DollarSign className="h-8 w-8 text-orange-500" />,
      title: "Flexibilidade",
      description: "Não pode pagar agora? Assista anúncios para ganhar armazenamento adicional."
    },
    {
      icon: <Users className="h-8 w-8 text-pink-500" />,
      title: "Feito para Você",
      description: "Criado pensando em quem precisa usar computadores de terceiros e não pode salvar localmente."
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Sem Complicações",
      description: "Interface simples e intuitiva. Sem termos complicados, apenas uma ferramenta que funciona."
    }
  ]

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-gray-900 font-sans">
      <Header onLoginClick={handleLoginClick} />

      <main className="w-[95%] max-w-[1304px] mx-auto py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-gray-500 hover:text-gray-900 mb-12 transition-colors font-medium text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar</span>
        </Link>

        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6 tracking-tight text-gray-900">
            Por que somos a melhor opção.
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl font-medium leading-relaxed">
            Entendemos suas necessidades e criamos uma solução que realmente funciona para você.
          </p>
        </div>

        {/* Benefits Carousel */}
        <div className="mb-24">
          <CardCarousel>
            {benefits.map((benefit, index) => (
              <InfoCard key={index} width="w-[300px] sm:w-[340px]">
                <div className="mb-6">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-xl mb-3 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {benefit.description}
                </p>
              </InfoCard>
            ))}
          </CardCarousel>
        </div>

        {/* Pricing Example */}
        <div className="bg-white rounded-3xl p-10 md:p-14 card-shadow mb-24">

          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold mb-6 tracking-tight text-gray-900">Como funciona o desconto?</h2>
            <p className="text-xl text-gray-500 font-medium mb-10 leading-relaxed">
              A cada uso, você ganha um pequeno desconto. É nossa forma de dizer obrigado por confiar em nós.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Primeira vez</p>
                <p className="text-4xl font-semibold text-gray-900 mb-1">$1 USD</p>
                <p className="text-gray-500 font-medium">por GB</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Com o tempo</p>
                <p className="text-4xl font-semibold text-gray-900 mb-1">$0.98 → $0.50</p>
                <p className="text-gray-500 font-medium">desconto progressivo</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Preço mínimo</p>
                <p className="text-4xl font-semibold text-gray-900 mb-1">{formatMinPrice()}</p>
                <p className="text-gray-500 font-medium">por GB (≈ R$ 2,00)</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-left border-t border-gray-200 pt-16">
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-[#0071e3] text-white rounded-full font-medium hover:bg-[#0077ed] transition-colors text-lg"
          >
            Começar Agora
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}