import { Github, Mail, Instagram } from 'lucide-react'

export default function About() {
  return (
    <div id="sobre" className="mb-16">
      <div className="bg-white rounded-2xl p-8 md:p-12 card-shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Sobre o Projeto</h2>
        <div className="max-w-3xl mx-auto space-y-4 text-gray-700">
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
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-4">
              <strong>Criado por:</strong> Tchézery Ribeiro
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="https://github.com/tchezery"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-apple-blue transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="text-sm">github.com/tchezery</span>
              </a>
              <a
                href="mailto:tchezeryribeiro@gmail.com"
                className="flex items-center space-x-2 text-gray-600 hover:text-apple-blue transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm">tchezeryribeiro@gmail.com</span>
              </a>
              <a
                href="https://instagram.com/tchesery"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-apple-blue transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="text-sm">instagram/tchesery</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
