import { Link } from 'react-router-dom'
import { ArrowLeft, TrendingDown, Shield, Clock, DollarSign, Users, Zap } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { formatMinPrice } from '../utils/pricing'

export default function WhyUs() {
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header onLoginClick={handleLoginClick} />

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-apple-blue mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar</span>
          </Link>

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 pb-4 bg-gradient-to-r from-apple-blue to-blue-600 bg-clip-text text-transparent leading-normal">
              Por que somos a melhor opção?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Entendemos suas necessidades e criamos uma solução que realmente funciona para você
            </p>
          </div>

          {/* Main Benefits */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 card-shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
                <TrendingDown className="h-8 w-8 text-apple-blue" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Preço que diminui com o uso</h2>
              <p className="text-gray-600 mb-4">
                Quanto mais você usa nosso serviço, mais barato fica! Começando em $1 USD por GB, 
                o preço vai diminuindo progressivamente até chegar a apenas {formatMinPrice()} por GB 
                (equivalente a R$ 2,00 baseado na cotação atual do dólar).
              </p>
              <p className="text-sm text-gray-500">
                É nossa forma de recompensar sua fidelidade e uso contínuo.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 card-shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">100% Anônimo e Seguro</h2>
              <p className="text-gray-600 mb-4">
                Você não precisa criar conta para usar. Seus documentos são protegidos com 
                criptografia e você tem controle total sobre quem acessa.
              </p>
              <p className="text-sm text-gray-500">
                Privacidade é um direito, não um privilégio.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 card-shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Acesso Instantâneo</h2>
              <p className="text-gray-600 mb-4">
                Guarde e recupere seus arquivos em segundos. Use o código ou QR Code de 
                qualquer dispositivo, de qualquer lugar.
              </p>
              <p className="text-sm text-gray-500">
                Simples, rápido e eficiente.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 card-shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-6">
                <DollarSign className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Flexibilidade de Pagamento</h2>
              <p className="text-gray-600 mb-4">
                Não pode pagar agora? Sem problemas! Você pode assistir anúncios para ganhar 
                armazenamento adicional. Escolha a opção que funciona melhor para você.
              </p>
              <p className="text-sm text-gray-500">
                Acreditamos em dar opções, não em criar barreiras.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 card-shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-pink-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Feito para Você</h2>
              <p className="text-gray-600 mb-4">
                Criado pensando em pessoas que precisam usar computadores de terceiros e 
                não podem salvar arquivos localmente. Entendemos sua situação.
              </p>
              <p className="text-sm text-gray-500">
                Por pessoas reais, para pessoas reais.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 card-shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Sem Complicações</h2>
              <p className="text-gray-600 mb-4">
                Interface simples e intuitiva. Sem termos complicados, sem pegadinhas. 
                Apenas uma ferramenta que funciona.
              </p>
              <p className="text-sm text-gray-500">
                Tecnologia acessível para todos.
              </p>
            </div>
          </div>

          {/* Pricing Example */}
          <div className="bg-gradient-to-br from-apple-blue to-blue-600 rounded-2xl p-8 md:p-12 text-white mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Como funciona o desconto progressivo?</h2>
              <p className="text-lg mb-8 opacity-90">
                A cada uso, você ganha um pequeno desconto. É nossa forma de dizer obrigado por confiar em nós!
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <p className="text-sm opacity-80 mb-2">Primeira vez</p>
                  <p className="text-3xl font-bold mb-2">$1 USD</p>
                  <p className="text-sm opacity-80">por GB</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <p className="text-sm opacity-80 mb-2">Com o tempo</p>
                  <p className="text-3xl font-bold mb-2">$0.98 → $0.50</p>
                  <p className="text-sm opacity-80">desconto progressivo</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <p className="text-sm opacity-80 mb-2">Preço mínimo</p>
                  <p className="text-3xl font-bold mb-2">{formatMinPrice()}</p>
                  <p className="text-sm opacity-80">por GB (≈ R$ 2,00)</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/"
              className="inline-block px-8 py-4 bg-apple-blue text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors text-lg"
            >
              Começar Agora
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}