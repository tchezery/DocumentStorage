import { useState, useEffect } from 'react'
import { X, Folder, File as FileIcon, Download, ChevronRight, Home as HomeIcon, ArrowLeft } from 'lucide-react'
import { FileNode } from '../types/dtos'
import { fileService } from '../services/fileService'
import Button from './Button'

interface FileBrowserModalProps {
  code: string
  onClose: () => void
}

export default function FileBrowserModal({ code, onClose }: FileBrowserModalProps) {
  const [structure, setStructure] = useState<FileNode[]>([])
  const [currentPath, setCurrentPath] = useState<FileNode[]>([]) // Stack of folders
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        const data = await fileService.getFileStructure(code)
        setStructure(data)
      } catch (error) {
        console.error('Failed to fetch file structure', error)
        alert('Erro ao carregar arquivos.')
        onClose()
      } finally {
        setLoading(false)
      }
    }
    fetchStructure()
  }, [code, onClose])

  // Get current folder contents
  const currentFiles = currentPath.length === 0 
    ? structure 
    : currentPath[currentPath.length - 1].children || []

  const handleNavigate = (folder: FileNode) => {
    setCurrentPath([...currentPath, folder])
  }

  const handleNavigateUp = () => {
    if (currentPath.length === 0) return
    setCurrentPath(currentPath.slice(0, -1))
  }

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      setCurrentPath([])
    } else {
      setCurrentPath(currentPath.slice(0, index + 1))
    }
  }

  const handleDownloadFile = (file: FileNode) => {
    // In a real app, this would use the path to generate a specific download URL
    // For now, we simulate downloading the file
    // const url = fileService.getDownloadUrl(code, file.path) 
    // window.open(url, '_blank')
    alert(`Iniciando download de: ${file.name}`)
  }

  const handleDownloadAll = () => {
    const url = fileService.getDownloadUrl(code)
    window.location.href = url
  }

  const formatSize = (bytes?: number) => {
    if (bytes === undefined) return '-'
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0071e3] mx-auto"></div>
          <p className="mt-4 text-gray-500 font-medium">Carregando arquivos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl animate-slide-up overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Folder className="h-5 w-5 text-[#0071e3]" />
             </div>
             <div>
               <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Arquivos do Código: {code}</h2>
               <p className="text-sm text-gray-500">Navegue e baixe o que precisar</p>
             </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Toolbar & Breadcrumbs */}
        <div className="px-6 py-4 bg-gray-50 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center space-x-2 text-sm text-gray-600 overflow-x-auto no-scrollbar">
            <button 
              onClick={() => handleBreadcrumbClick(-1)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <HomeIcon className="h-4 w-4" />
            </button>
            {currentPath.map((folder, index) => (
              <div key={folder.path} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
                <button
                  onClick={() => handleBreadcrumbClick(index)}
                  className="hover:text-[#0071e3] font-medium hover:underline px-1 rounded transition-colors whitespace-nowrap"
                >
                  {folder.name}
                </button>
              </div>
            ))}
          </div>

          <div className="flex space-x-3 ml-4">
             {currentPath.length > 0 && (
                <button 
                  onClick={handleNavigateUp}
                  className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 text-sm flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
                </button>
             )}
             <Button onClick={handleDownloadAll} className="py-2 px-4 text-sm h-10">
               <Download className="h-4 w-4 mr-2" /> Baixar Tudo (ZIP)
             </Button>
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-y-auto">
          {currentFiles.length === 0 ? (
             <div className="h-64 flex flex-col items-center justify-center text-gray-500">
                <Folder className="h-12 w-12 mb-3 opacity-20" />
                <p>Pasta vazia</p>
             </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 text-sm">
                  <th className="px-6 py-3 font-medium w-1/2">Nome</th>
                  <th className="px-6 py-3 font-medium">Tamanho</th>
                  <th className="px-6 py-3 font-medium">Data</th>
                  <th className="px-6 py-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {currentFiles.map((node) => (
                  <tr 
                    key={node.path} 
                    className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors group cursor-pointer"
                    onClick={() => node.type === 'folder' ? handleNavigate(node) : handleDownloadFile(node)}
                  >
                    <td className="px-6 py-4 flex items-center space-x-3">
                      {node.type === 'folder' ? (
                        <Folder className="h-5 w-5 text-blue-400 fill-blue-50" />
                      ) : (
                        <FileIcon className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="font-medium text-gray-700 group-hover:text-[#0071e3] transition-colors">
                        {node.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                      {formatSize(node.size)}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {node.date}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {node.type === 'file' && (
                         <button 
                            onClick={(e) => { e.stopPropagation(); handleDownloadFile(node); }}
                            className="p-2 text-gray-400 hover:text-[#0071e3] hover:bg-blue-100 rounded-lg transition-colors"
                            title="Baixar arquivo"
                         >
                           <Download className="h-4 w-4" />
                         </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Footer info */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 text-center">
           {currentFiles.filter(f => f.type === 'file').length} arquivos, {currentFiles.filter(f => f.type === 'folder').length} pastas
        </div>
      </div>
    </div>
  )
}
