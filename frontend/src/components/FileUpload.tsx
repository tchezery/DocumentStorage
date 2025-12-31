import { useState, useRef, useCallback } from 'react'
import { Upload, X, CheckCircle2 } from 'lucide-react'
import Button from './Button'
import { fileService } from '../services/fileService'

interface FileWithProgress {
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
  id: string
}

interface FileUploadProps {
  maxSizeGB: number
  onUploadComplete: (files: File[], code: string) => void
}

const MAX_SIZE_BYTES = 1024 * 1024 * 1024 // 1GB

export default function FileUpload({ maxSizeGB, onUploadComplete }: FileUploadProps) {
  const [files, setFiles] = useState<FileWithProgress[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_SIZE_BYTES) {
      return `Arquivo "${file.name}" excede o limite de ${maxSizeGB}GB`
    }
    return null
  }

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return

    const newFiles: FileWithProgress[] = []
    const totalSize = files.reduce((sum, f) => sum + f.file.size, 0)

    Array.from(fileList).forEach((file) => {
      const error = validateFile(file)
      if (error) {
        alert(error)
        return
      }

      if (totalSize + file.size > MAX_SIZE_BYTES) {
        alert(`O tamanho total dos arquivos não pode exceder ${maxSizeGB}GB`)
        return
      }

      newFiles.push({
        file,
        progress: 0,
        status: 'pending',
        id: Math.random().toString(36).substring(7)
      })
    })

    setFiles(prev => [...prev, ...newFiles])
  }, [files, maxSizeGB])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setIsUploading(true)
    
    // Marcar todos como fazendo upload
    setFiles(prev => prev.map(f => 
      ({ ...f, status: 'uploading', progress: 0 })
    ))

    try {
      const filesToUpload = files.map(f => f.file)
      
      const response = await fileService.uploadFiles(filesToUpload, (progress) => {
        // Atualizar progresso de todos os arquivos
        setFiles(prev => prev.map(f => 
          ({ ...f, progress })
        ))
      })

      // Marcar como concluído
      setFiles(prev => prev.map(f => 
        ({ ...f, status: 'completed', progress: 100 })
      ))

      // Aguardar um momento para o usuário ver o 100%
      setTimeout(() => {
        onUploadComplete(filesToUpload, response.code)
        setIsUploading(false)
      }, 500)

    } catch (error) {
      console.error(error)
      setFiles(prev => prev.map(f => 
        ({ ...f, status: 'error', progress: 0 })
      ))
      alert('Falha no upload dos arquivos. Tente novamente.')
      setIsUploading(false)
    }
  }

  const totalSize = files.reduce((sum, f) => sum + f.file.size, 0)
  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2)
  const maxSizeMB = (maxSizeGB * 1024).toFixed(0)

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-2xl p-8 text-center transition-all
          ${isDragging ? 'border-apple-blue bg-blue-50' : 'border-gray-300'}
          ${isUploading ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          disabled={isUploading}
        />

        {files.length === 0 ? (
          <>
            <Upload className="mx-auto h-12 w-12 text-gray-300 mb-6" />
            <p className="text-xl font-semibold mb-2 text-gray-900 tracking-tight">
              Arraste arquivos aqui
            </p>
            <p className="text-sm text-gray-500 mb-8 font-medium">
              Ou clique para selecionar. Máximo {maxSizeGB}GB por arquivo.
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="secondary"
              className="mx-auto"
            >
              Selecionar Arquivos
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="text-left">
              <p className="font-medium mb-2">
                {files.length} arquivo(s) selecionado(s)
              </p>
              <p className="text-sm text-gray-500">
                {totalSizeMB} MB / {maxSizeMB} MB
              </p>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {files.map((fileWithProgress) => (
                <div
                  key={fileWithProgress.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      {fileWithProgress.status === 'completed' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <div className="h-5 w-5 flex-shrink-0" />
                      )}
                      <span className="text-sm font-medium truncate">
                        {fileWithProgress.file.name}
                      </span>
                    </div>
                    {!isUploading && (
                      <button
                        onClick={() => removeFile(fileWithProgress.id)}
                        className="ml-2 p-1 hover:bg-gray-200 rounded"
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </button>
                    )}
                  </div>

                  {fileWithProgress.status === 'uploading' && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-apple-blue h-2 rounded-full transition-all duration-300"
                        style={{ width: `${fileWithProgress.progress}%` }}
                      />
                    </div>
                  )}

                  {fileWithProgress.status === 'pending' && (
                    <p className="text-xs text-gray-500 mt-1">
                      Aguardando upload...
                    </p>
                  )}

                  {fileWithProgress.status === 'completed' && (
                    <p className="text-xs text-green-600 mt-1">
                      Upload concluído
                    </p>
                  )}
                </div>
              ))}
            </div>

            {!isUploading && (
              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="flex-1"
                >
                  Adicionar Mais
                </Button>
                <Button
                  onClick={handleUpload}
                  className="flex-1"
                >
                  Fazer Upload
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}