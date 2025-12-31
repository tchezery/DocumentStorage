import FileUpload from '../FileUpload'
import DownloadCodeInput from '../DownloadCodeInput'
import Button from '../Button'
import CardCarousel from '../ui/CardCarousel'

interface ActionGridProps {
  onUploadComplete: (files: File[], code: string) => void
  onDownload: (code: string) => Promise<void>
  onUpgradeClick: () => void
}

export default function ActionGrid({ onUploadComplete, onDownload, onUpgradeClick }: ActionGridProps) {
  return (
    <div className="mb-24">
      <CardCarousel>
        {/* Upload Section */}
        <div className="flex-none w-[340px] md:w-[460px] bg-white rounded-3xl p-8 md:p-10 card-shadow transition-transform hover:scale-[1.01] duration-300 snap-center border border-gray-100/50">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 tracking-tight">
            Adicionar Arquivo
          </h2>
          <FileUpload maxSizeGB={1} onUploadComplete={onUploadComplete} />
          
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-2 font-medium">
              <span className="text-gray-900 font-semibold">Grátis:</span> Até 1GB por 7 dias.
            </p>
            <Button
              onClick={onUpgradeClick}
              variant="ghost"
              className="text-sm justify-start pl-0 text-[#0071e3] font-medium"
            >
              Precisa de mais espaço? &rarr;
            </Button>
          </div>
        </div>

        {/* Download Section */}
        <div className="flex-none w-[340px] md:w-[460px] bg-white rounded-3xl p-8 md:p-10 card-shadow transition-transform hover:scale-[1.01] duration-300 snap-center border border-gray-100/50">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 tracking-tight">
            Baixar Arquivo
          </h2>
          <DownloadCodeInput onDownload={onDownload} />
          
          <div className="mt-8 pt-6 border-t border-gray-100">
             <p className="text-sm text-gray-500 font-medium">
              Use o código ou escaneie o QR Code recebido.
            </p>
          </div>
        </div>
      </CardCarousel>
    </div>
  )
}
