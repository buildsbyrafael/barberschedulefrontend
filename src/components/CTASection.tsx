import { Button } from "./ui/button";
import { useNavigate } from "react-router";

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#1A1A1A] pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-white mb-4">
          E então? Vamos transformar seu estilo?
        </h2>

        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Confie em quem entrega qualidade de verdade, todos os dias.
        </p>

        <Button 
          onClick={() => navigate("/booking")}
          className="bg-[#E67E22] hover:bg-[#D35400] text-white"
        >
          Comece Agora!
        </Button>
      </div>
    </section>
  );
}