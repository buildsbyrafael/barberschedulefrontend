import { Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#1A1A1A] pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 flex justify-center">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#E67E22]"
          >
            <circle cx="25" cy="85" r="15" stroke="currentColor" strokeWidth="3" fill="none" />
            <circle cx="95" cy="85" r="15" stroke="currentColor" strokeWidth="3" fill="none" />
            <line
              x1="25"
              y1="85"
              x2="60"
              y2="40"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="95"
              y1="85"
              x2="60"
              y2="40"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="40"
              y1="60"
              x2="80"
              y2="60"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="60" cy="40" r="5" fill="currentColor" />
          </svg>
        </div>

        <h1 className="text-white mb-6">
          Onde qualidade e estilo se encontram...
        </h1>

        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Aqui, cada corte, barba e atendimento carrega nosso padrão de excelência. Escolha seu barbeiro e descubra uma experiência personalizada, criada para realçar o melhor de você.
        </p>

        <Button
          onClick={() => navigate("/booking")}
          className="bg-[#E67E22] hover:bg-[#D35400] text-white gap-2"
        >
          <Calendar className="w-5 h-5" />
          Agendar Horário
        </Button>
      </div>
    </section>
  );
}