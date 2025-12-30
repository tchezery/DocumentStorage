import FileUpload from '../FileUpload'
import DownloadCodeInput from '../DownloadCodeInput'
import Button from '../Button'

interface ActionGridProps {
  onUploadComplete: (files: File[], code: string) => void
  onDownload: (code: string) => void
  onUpgradeClick: () => void
}

export default function ActionGrid({ onUploadComplete, onDownload, onUpgradeClick }: ActionGridProps) {
  return (
    <div className="mb-16 grid md:grid-cols-2 gap-6 lg:gap-8">
      {/* Upload Section */}
      <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 card-shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Adicionar Arquivo
        </h2>
        <FileUpload maxSizeGB={1} onUploadComplete={onUploadComplete} />
        
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-sm text-yellow-800 mb-3">
            <strong>Usuário Anônimo:</strong> Você pode armazenar arquivos de até 1GB por 7 dias.
          </p>
          <Button
            onClick={onUpgradeClick}
            variant="outline"
            className="w-full text-sm"
          >
            Precisa de mais espaço? Clique aqui
          </Button>
        </div>
      </div>

      {/* Download Section */}
      <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 card-shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Baixar Arquivo
        </h2>
        <DownloadCodeInput onDownload={onDownload} />
      </div>
    </div>
  )
}
