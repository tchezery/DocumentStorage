import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import CardCarousel from '../ui/CardCarousel'
import InfoCard from '../ui/InfoCard'

export default function QuickLinks() {
  const links = [
    {
      to: "/porque-somos-melhor",
      title: "Porque somos a melhor opção?",
      description: "Entenda o que nos torna diferentes das demais plataformas e por que sua segurança é nossa prioridade.",
      bgClass: "bg-blue-50"
    },
    {
      to: "/transparencia",
      title: "Transparência",
      description: "Acesse nossos relatórios e saiba exatamente como tratamos seus dados e mantemos nossa operação.",
      bgClass: "bg-gray-50"
    }
  ]

  return (
    <div className="mb-24">
      <SectionHeader title="Saiba Mais" />
      
      <CardCarousel>
        {links.map((link, index) => (
          <Link key={index} to={link.to} className="group">
            <InfoCard 
              width="w-[320px] sm:w-[400px]" 
              className={`${link.bgClass} h-full border-none`}
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-2xl mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </h4>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    {link.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Ler mais <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </InfoCard>
          </Link>
        ))}
      </CardCarousel>
    </div>
  )
}
