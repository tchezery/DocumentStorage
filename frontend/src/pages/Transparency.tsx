import { Link } from 'react-router-dom'
import { ArrowLeft, Eye, Lock, FileText, Heart, Code } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { formatMinPrice } from '../utils/pricing'

export default function Transparency() {
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header onLoginClick={handleLoginClick} />

      <main>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-apple-blue mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar</span>
          </Link>

          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-gradient-to-br from-apple-blue to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Eye className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 pb-4 bg-gradient-to-r from-apple-blue to-blue-600 bg-clip-text text-transparent leading-normal">
              Transparência
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Acreditamos que você merece saber como seu serviço funciona
            </p>
          </div>

          <div className="space-y-8">
            {/* Sobre o Projeto */}
            <div className="bg-white rounded-2xl p-8 card-shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-apple-blue" />
                </div>
                <h2 className="text-2xl font-bold">Sobre o Projeto</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  O Document Storage foi criado para resolver um problema real: pessoas que precisam 
                  guardar documentos temporariamente, especialmente quando estão usando computadores 
                  de terceiros e não podem salvar arquivos localmente.
                </p>
                <p>
                  Nossa missão é fornecer uma solução simples, segura e acessível, sem complicações 
                  desnecessárias. Acreditamos que tecnologia deve ser para todos, não apenas para 
                  quem pode pagar muito.
                </p>
              </div>
            </div>

            {/* Como Funciona */}
            <div className="bg-white rounded-2xl p-8 card-shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Code className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Como Funciona</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  Quando você faz upload de um arquivo, ele é armazenado de forma segura em nossos 
                  servidores. Você recebe um código único e um QR Code que pode usar para acessar 
                  seus arquivos depois.
                </p>
                <p>
                  <strong>Usuários anônimos:</strong> Podem armazenar até 1GB por 7 dias gratuitamente.
                </p>
                <p>
                  <strong>Armazenamento adicional:</strong> Você pode pagar via PIX ou assistir 
                  anúncios para ganhar mais espaço.
                </p>
                <p>
                  <strong>Sistema de desconto:</strong> Quanto mais você usa, mais barato fica. 
                  Começando em $1 USD por GB, o preço diminui progressivamente até chegar a {formatMinPrice()} 
                  por GB (equivalente a R$ 2,00 baseado na cotação atual do dólar).
                </p>
              </div>
            </div>

            {/* Privacidade e Segurança */}
            <div className="bg-white rounded-2xl p-8 card-shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Lock className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold">Privacidade e Segurança</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  Seus arquivos são armazenados com criptografia. Apenas quem tem o código de acesso 
                  pode baixar os arquivos. Não compartilhamos seus dados com terceiros.
                </p>
                <p>
                  <strong>Arquivos anônimos:</strong> São automaticamente deletados após 7 dias. 
                  Não guardamos informações pessoais.
                </p>
                <p>
                  <strong>Arquivos de usuários registrados:</strong> Seguem as configurações da sua conta, 
                  com opções de armazenamento mais longas.
                </p>
              </div>
            </div>

            {/* Pagamentos */}
            <div className="bg-white rounded-2xl p-8 card-shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Heart className="h-6 w-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold">Pagamentos e Anúncios</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  Oferecemos duas formas de obter armazenamento adicional:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Pagamento via PIX:</strong> Rápido, seguro e direto. O preço diminui 
                    conforme você usa mais o serviço.
                  </li>
                  <li>
                    <strong>Assistir anúncios:</strong> Uma forma alternativa para quem não pode 
                    pagar no momento. Cada anúncio assistido gera armazenamento adicional.
                  </li>
                </ul>
                <p className="pt-4 border-t border-gray-200">
                  Acreditamos que todos devem ter acesso, independente da situação financeira. 
                  Por isso oferecemos ambas as opções.
                </p>
              </div>
            </div>

            {/* Futuro */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">O que vem por aí?</h2>
              <p className="text-gray-700">
                Estamos constantemente trabalhando para melhorar o serviço. O backend ainda está 
                em desenvolvimento, então algumas funcionalidades podem mudar ou ser adicionadas 
                conforme avançamos.
              </p>
              <p className="text-gray-700 mt-4">
                Nossa prioridade é criar uma experiência simples, segura e acessível para todos.
              </p>
            </div>

            {/* Criador */}
            <div className="bg-white rounded-2xl p-8 card-shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Criado por</h2>
              <p className="text-gray-700 mb-4">
                <strong>Tchézery Ribeiro</strong>
              </p>
              <p className="text-sm text-gray-500">
                Este projeto foi criado com dedicação e atenção aos detalhes. Se você tiver 
                dúvidas, sugestões ou feedback, não hesite em entrar em contato através dos 
                canais disponíveis na página inicial.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-block px-8 py-4 bg-apple-blue text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors text-lg"
            >
              Voltar para Início
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}