import { Info, Shield, Clock, DollarSign } from 'lucide-react'

export default function HowItWorks() {
  return (
    <div id="como-funciona" className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 card-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Info className="h-6 w-6 text-apple-blue" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Armazenamento Temporário</h3>
          <p className="text-gray-600 text-sm">
            Arquivos anônimos são armazenados por 7 dias. Usuários registrados têm mais opções.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 card-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Seguro e Anônimo</h3>
          <p className="text-gray-600 text-sm">
            Seus documentos são protegidos. Use sem se preocupar com privacidade.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 card-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Clock className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Acesso Rápido</h3>
          <p className="text-gray-600 text-sm">
            Use o código ou QR Code para acessar seus arquivos de qualquer lugar.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 card-shadow">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="h-6 w-6 text-orange-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Mais Espaço</h3>
          <p className="text-gray-600 text-sm">
            Pague $1 USD via PIX para cada GB adicional de armazenamento.
          </p>
        </div>
      </div>
    </div>
  )
}
