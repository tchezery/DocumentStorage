import { Github, Mail, Instagram } from 'lucide-react'

export default function About() {
  return (
    <div id="projeto" className="mb-24 scroll-mt-20">
      <div className="bg-white rounded-3xl p-8 md:p-12 card-shadow">
        <h2 className="text-4xl font-semibold mb-8 text-gray-900 tracking-tight">O Document Storage</h2>
        <div className="max-w-3xl space-y-6 text-xl text-gray-500 font-medium leading-relaxed">
          <p>
            O Document Storage foi criado para ajudar pessoas que precisam armazenar 
            documentos temporariamente, especialmente quando estão usando computadores 
            de terceiros e não podem salvar arquivos localmente.
          </p>
          <p>
            Nossa missão é fornecer uma solução simples, segura e acessível para 
            guardar seus arquivos importantes, com a opção de expandir o armazenamento 
            conforme sua necessidade.
          </p>
          <div className="pt-8 mt-8 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Criado por
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <span className="text-lg text-gray-900 font-medium">Tchézery Ribeiro</span>
              <div className="flex gap-6">
                <a
                  href="https://github.com/tchezery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="text-sm">GitHub</span>
                </a>
                <a
                  href="mailto:tchezeryribeiro@gmail.com"
                  className="flex items-center space-x-2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span className="text-sm">Email</span>
                </a>
                <a
                  href="https://instagram.com/tchesery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="text-sm">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
