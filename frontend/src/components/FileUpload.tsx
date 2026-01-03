import { useState, useRef, useCallback } from 'react'
import { Upload, X, CheckCircle2, FolderUp } from 'lucide-react'
import Button from './Button'
import { fileService } from '../services/fileService'

interface FileWithProgress {
  file: File
  path: string
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
  id: string
}

interface FileUploadProps {
  maxSizeGB: number
  onUploadComplete: (files: File[], code: string) => void
}

export default function FileUpload({ maxSizeGB, onUploadComplete }: FileUploadProps) {
  const [files, setFiles] = useState<FileWithProgress[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)

  const maxSizeBytes = maxSizeGB * 1024 * 1024 * 1024

  const validateFile = (file: File): string | null => {
    if (file.size > maxSizeBytes) {
      return `Arquivo "${file.name}" excede o limite de ${maxSizeGB}GB`
    }
    return null
  }

  // Helper to normalize paths
  const normalizePath = (path: string): string => {
    return path.replace(/\\/g, '/').replace(/^\/+/, '');
  }

  const handleFiles = useCallback((fileList: File[] | FileList | null, isFolderInput = false) => {
    if (!fileList || fileList.length === 0) return

    const newFilesCandidates: FileWithProgress[] = []
    
    // Convert FileList to Array if needed
    const filesArray = Array.isArray(fileList) ? fileList : Array.from(fileList)

    for (const file of filesArray) {
      const error = validateFile(file)
      if (error) {
        console.warn(error) // Log error but maybe skip file instead of halting all
        continue
      }
      
      // Determine path
      let path = file.name
      if (isFolderInput && file.webkitRelativePath) {
        path = file.webkitRelativePath
      } else if ((file as any).fullPath) { // Custom property from traversal
         path = (file as any).fullPath
      }

      path = normalizePath(path)

      newFilesCandidates.push({
        file,
        path,
        progress: 0,
        status: 'pending',
        id: Math.random().toString(36).substring(7) + Date.now() + path
      })
    }

    if (newFilesCandidates.length > 0) {
      setFiles(prev => {
        // Create a Set of existing file signatures to prevent duplicates
        // Signature: path + size + lastModified
        const existingSignatures = new Set(prev.map(f => `${f.path}-${f.file.size}-${f.file.lastModified}`))
        
        const uniqueNewFiles: FileWithProgress[] = []
        const newBatchSignatures = new Set<string>()

        for (const candidate of newFilesCandidates) {
           const signature = `${candidate.path}-${candidate.file.size}-${candidate.file.lastModified}`
           
           // Check against existing files AND duplicates within the current batch
           if (!existingSignatures.has(signature) && !newBatchSignatures.has(signature)) {
             uniqueNewFiles.push(candidate)
             newBatchSignatures.add(signature)
           }
        }

        return [...prev, ...uniqueNewFiles]
      })
    }
    
    // Reset inputs to allow selecting the same file/folder again if needed
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (folderInputRef.current) folderInputRef.current.value = ''

  }, [maxSizeGB, maxSizeBytes])

  // Recursive directory traversal
  const traverseFileTree = async (item: any, path: string = '') => {
    if (item.isFile) {
      return new Promise<File[]>((resolve) => {
        item.file((file: File) => {
          // Store full path on the file object temporarily
          const fullPath = path + file.name;
          (file as any).fullPath = fullPath; 
          resolve([file]);
        });
      });
    } else if (item.isDirectory) {
      const dirReader = item.createReader();
      const entries: any[] = [];
      
      const readEntries = async () => {
        const result = await new Promise<any[]>((resolve) => {
          dirReader.readEntries((res: any[]) => resolve(res));
        });
        
        if (result.length > 0) {
          entries.push(...result);
          await readEntries();
        }
      }
      
      await readEntries();
      
      const files: File[] = [];
      for (const entry of entries) {
        files.push(...await traverseFileTree(entry, path + item.name + '/'));
      }
      return files;
    }
    return [];
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const items = e.dataTransfer.items
    const droppedFiles: File[] = []

    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i].webkitGetAsEntry();
        if (item) {
          const files = await traverseFileTree(item);
          droppedFiles.push(...files);
        }
      }
    }

    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    } else {
        // Fallback for browsers not supporting webkitGetAsEntry
       handleFiles(e.dataTransfer.files);
    }
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
    
    // Marcar como fazendo upload
    setFiles(prev => prev.map(f => 
      ({ ...f, status: 'uploading', progress: 0 })
    ))

    try {
      const filesToUpload = files.map(f => f.file)
      const pathsToUpload = files.map(f => f.path)
      
      const response = await fileService.uploadFolder(filesToUpload, pathsToUpload, (progress) => {
        // Atualizar progresso
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
        setFiles([]) // Limpar após sucesso
      }, 500)

    } catch (error) {
      console.error(error)
      setFiles(prev => prev.map(f => 
        ({ ...f, status: 'error', progress: 0 })
      ))
      alert('Falha no upload do arquivo. Tente novamente.')
      setIsUploading(false)
    }
  }

  const totalSize = files.reduce((acc, f) => acc + f.file.size, 0)
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
          accept="*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          disabled={isUploading}
        />
         <input
          ref={folderInputRef}
          type="file"
          {...{ webkitdirectory: "", directory: "" } as any}
          onChange={(e) => handleFiles(e.target.files, true)}
          className="hidden"
          disabled={isUploading}
        />

        {files.length === 0 ? (
          <>
            <Upload className="mx-auto h-12 w-12 text-gray-300 mb-6" />
            <p className="text-xl font-semibold mb-2 text-gray-900 tracking-tight">
              Arraste arquivos ou pastas aqui
            </p>
            <p className="text-sm text-gray-500 mb-8 font-medium">
              Todos os tipos são suportados. Máximo {maxSizeGB}GB.
            </p>
            <div className="flex justify-center gap-4">
                <Button
                onClick={() => fileInputRef.current?.click()}
                variant="secondary"
                >
                Selecionar Arquivos
                </Button>
                <Button
                onClick={() => folderInputRef.current?.click()}
                variant="outline"
                className="flex items-center gap-2"
                >
                <FolderUp size={18} />
                Selecionar Pasta
                </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="text-left">
              <p className="font-medium mb-2">
                Arquivos selecionados ({files.length})
              </p>
              <p className="text-sm text-gray-500">
                {totalSizeMB} MB / {maxSizeMB} MB
              </p>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
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
                      <div className="min-w-0 flex-1">
                          <span className="text-sm font-medium truncate block">
                            {fileWithProgress.path}
                          </span>
                      </div>
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
                  onClick={() => setFiles([])}
                  variant="outline"
                  className="flex-1"
                >
                  Limpar
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