import { Scissors, Clock, MapPin } from "lucide-react";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="w-16 h-16 rounded-full bg-[#E67E22]/10 flex items-center justify-center mb-6 mx-auto">
        <div className="text-[#E67E22]">
          {icon}
        </div>
      </div>

      <h3 className="text-[#1A1A1A] mb-4 text-center">
        {title}
      </h3>

      <p className="text-gray-600 text-center">
        {description}
      </p>
    </div>
  );
}

export function BenefitsSection() {
  return (
    <section className="bg-white pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[#1A1A1A] mb-4">
            Muito além de uma barbearia...
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Criamos uma experiência completa, do agendamento ao resultado final.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BenefitCard
            icon={<Scissors className="w-8 h-8" />}
            title="Barbeiros & Especialistas"
            description="Profissionais experientes, técnicas modernas e total atenção aos detalhes — tudo para entregar um visual impecável."
          />
          <BenefitCard
            icon={<Clock className="w-8 h-8" />}
            title="Agendamento Flexível"
            description="Sua rotina, seu tempo. Ajuste o agendamento como quiser, sem complicações."
          />
          <BenefitCard
            icon={<MapPin className="w-8 h-8" />}
            title="Boa Localização"
            description="Local central, fácil acesso e estacionamento amplo para sua total comodidade."
          />
        </div>
      </div>
    </section>
  );
}