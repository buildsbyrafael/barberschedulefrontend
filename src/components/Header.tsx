import { Calendar, Scissors } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

interface HeaderProps {
  isBookingPage?: boolean;
  isLoginPage?: boolean;
}

export function Header({ isBookingPage = false, isLoginPage = false }: HeaderProps) {
  const navigate = useNavigate();

  const isLogoClickable = isBookingPage || isLoginPage;
  const showLoginButton = !isLoginPage;
  const showAgendarButton = !isBookingPage;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-[#E67E22]" />
            {isLogoClickable ? (
              <button 
                onClick={() => navigate("/")}
                className="text-[#1A1A1A] hover:text-[#E67E22] transition-colors"
              >
                BarberSchedule Lite
              </button>
            ) : (
              <span className="text-[#1A1A1A]">
                BarberSchedule Lite
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {showAgendarButton && (
              <button 
                onClick={() => navigate("/booking")}
                className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#E67E22] transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Horário</span>
              </button>
            )}
            {showLoginButton && (
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                className="border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}