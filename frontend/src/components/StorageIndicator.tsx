import { HardDrive } from 'lucide-react'
import { useStorage } from '../context/StorageContext'

export default function StorageIndicator() {
  const { totalStorage } = useStorage()
  
  const isUpgraded = totalStorage > 1.0

  return (
    <div 
      className={`
        flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all cursor-help group
        ${isUpgraded 
          ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
        }
      `} 
      title="Armazenamento Disponível"
    >
      <HardDrive 
        className={`
          w-3.5 h-3.5 transition-colors
          ${isUpgraded ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-900'}
        `} 
      />
      <span 
        className={`
          text-xs font-semibold transition-colors
          ${isUpgraded ? 'text-blue-700' : 'text-gray-600 group-hover:text-gray-900'}
        `}
      >
        {totalStorage.toFixed(1)} GB
      </span>
    </div>
  )
}