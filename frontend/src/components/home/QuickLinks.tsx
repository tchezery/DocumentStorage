import { Link } from 'react-router-dom'

export default function QuickLinks() {
  return (
    <div className="mb-16 text-center">
      <div className="inline-flex flex-wrap gap-4 justify-center">
        <Link
          to="/por-que-somos-melhor"
          className="px-6 py-3 bg-white rounded-xl card-shadow hover:shadow-lg transition-shadow text-gray-700 hover:text-apple-blue font-medium"
        >
          Por que somos a melhor opção?
        </Link>
        <Link
          to="/transparencia"
          className="px-6 py-3 bg-white rounded-xl card-shadow hover:shadow-lg transition-shadow text-gray-700 hover:text-apple-blue font-medium"
        >
          Transparência
        </Link>
      </div>
    </div>
  )
}
