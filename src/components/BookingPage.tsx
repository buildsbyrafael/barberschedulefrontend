import { useState } from "react";
import { Header } from "./Header";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Check } from "lucide-react";
import { useNavigate } from "react-router";

const SERVICES = [
  { id: "service1", name: "Serviço 1", duration: "30min", price: "R$ 25" },
  { id: "service2", name: "Serviço 2", duration: "1h", price: "R$ 50" },
  { id: "service3", name: "Serviço 3", duration: "1h30min", price: "R$ 75" }
];

const BARBERS = [
  { id: "barber1", name: "Barbeiro 1", specialty: "Barbas, Cortes Clássicos" },
  { id: "barber2", name: "Barbeiro 2", specialty: "Cortes Modernos" },
  { id: "barber3", name: "Barbeiro 3", specialty: "Barbas, Cortes Clássicos, Cortes Modernos" }
];

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour < 19; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    slots.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

const EXISTING_BOOKINGS: Record<string, string[]> = {
  "2025-12-10": ["09:00", "12:30", "13:00", "17:30", "18:00", "18:30"]
};

function getDurationBlocks(service: typeof SERVICES[0] | null) {
  if (!service) return 0;
  if (service.duration === "30min") return 1;
  if (service.duration === "1h") return 2;
  if (service.duration === "1h30min") return 3;
  return 1;
}

function getTimeIndex(time: string) {
  return TIME_SLOTS.indexOf(time);
}

function isTimeAvailable(date: Date | undefined, time: string, service: typeof SERVICES[0] | null) {
  if (!date || !service) return true;
  const dayKey = date.toISOString().split("T")[0];
  const booked = EXISTING_BOOKINGS[dayKey] || [];
  const durationBlocks = getDurationBlocks(service);
  const startIndex = getTimeIndex(time);
  if (startIndex === -1) return false;
  if (startIndex + durationBlocks > TIME_SLOTS.length) return false;
  for (let i = 0; i < durationBlocks; i++) {
    const slot = TIME_SLOTS[startIndex + i];
    if (booked.includes(slot)) return false;
  }
  return true;
}

interface BookingData {
  service: typeof SERVICES[0] | null;
  barber: typeof BARBERS[0] | null;
  date: Date | undefined;
  time: string | null;
  nomeCompleto: string;
  email: string;
  celular: string;
}

export function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState<BookingData>({
    service: null,
    barber: null,
    date: undefined,
    time: null,
    nomeCompleto: "",
    email: "",
    celular: ""
  });

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;
    if (date.getDay() === 0) return true;
    return false;
  };

  const handleServiceSelect = (service: typeof SERVICES[0]) =>
    setBookingData({ ...bookingData, service });

  const handleBarberSelect = (barber: typeof BARBERS[0]) =>
    setBookingData({ ...bookingData, barber });

  const handleDateSelect = (date: Date | undefined) =>
    setBookingData({ ...bookingData, date, time: null });

  const handleTimeSelect = (time: string) =>
    setBookingData({ ...bookingData, time });

  const handleNext = () => setCurrentStep(currentStep + 1);

  const handleBack = () => setCurrentStep(currentStep - 1);

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const canProceedStep1 = bookingData.service !== null;
  const canProceedStep2 = bookingData.barber !== null;
  const canProceedStep3 =
    bookingData.date !== undefined && bookingData.time !== null;
  const canProceedStep4 =
    bookingData.nomeCompleto && bookingData.email && bookingData.celular;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isBookingPage={true} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 relative">
          <div className="absolute top-5 left-0 w-full h-1 bg-gray-300 -translate-y-1/2 z-0" />
          <div
            className="absolute top-5 left-0 h-1 bg-[#E67E22] -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />
          <div className="relative z-10 flex justify-between w-full">
            {[
              { step: 1, label: "Serviço" },
              { step: 2, label: "Barbeiro" },
              { step: 3, label: "Data/Hora" },
              { step: 4, label: "Confirmar" }
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    item.step <= currentStep
                      ? "bg-[#E67E22] border-[#E67E22] text-white"
                      : "bg-gray-300 border-gray-300 text-gray-600"
                  }`}
                >
                  {item.step < currentStep ? <Check className="w-5 h-5" /> : item.step}
                </div>
                <span className="text-sm text-gray-600 mt-2 text-center">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          {currentStep === 1 && (
            <div>
              <p className="text-[#1A1A1A] mb-4 text-lg font-normal">
                E aí, o que vai ser?
              </p>
              <div className="space-y-4">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className={`w-full p-6 rounded-lg border-2 text-left transition-all ${
                      bookingData.service?.id === service.id
                        ? "border-[#E67E22] bg-[#E67E22]/5"
                        : "border-gray-200 hover:border-[#E67E22]/50"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-[#1A1A1A] mb-2">{service.name}</h3>
                        <p className="text-gray-600">{service.duration}</p>
                      </div>
                      <p className="text-[#E67E22] font-bold">{service.price}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={!canProceedStep1}
                  className="bg-[#E67E22] hover:bg-[#D35400] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <p className="text-[#1A1A1A] mb-4 text-lg font-normal">
                E quem você escolhe?
              </p>
              <div className="space-y-4">
                {BARBERS.map((barber) => (
                  <button
                    key={barber.id}
                    onClick={() => handleBarberSelect(barber)}
                    className={`w-full p-6 rounded-lg border-2 text-left transition-all ${
                      bookingData.barber?.id === barber.id
                        ? "border-[#E67E22] bg-[#E67E22]/5"
                        : "border-gray-200 hover:border-[#E67E22]/50"
                    }`}
                  >
                    <h3 className="text-[#1A1A1A] mb-2">{barber.name}</h3>
                    <p className="text-gray-600">{barber.specialty}</p>
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-between">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceedStep2}
                  className="bg-[#E67E22] hover:bg-[#D35400] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <p className="text-[#1A1A1A] mb-4 text-lg font-normal">Beleza!</p>

              <div className="mb-2">
                <p className="text-[#1A1A1A] mb-4 text-base font-normal">Que dia fica bom pra você?</p>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={bookingData.date}
                    onSelect={handleDateSelect}
                    disabled={isDateDisabled}
                    className="rounded-md border"
                  />
                </div>
              </div>

              {bookingData.date && bookingData.service && (
                <div>
                  <p className="text-[#1A1A1A] mb-4 text-base font-normal">
                    E o horário, qual funciona melhor?
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {TIME_SLOTS.map((time) => {
                      const available = isTimeAvailable(
                        bookingData.date,
                        time,
                        bookingData.service
                      );

                      return (
                        <button
                          key={time}
                          onClick={() => available && handleTimeSelect(time)}
                          disabled={!available}
                          className={`
                            p-3 rounded-lg border-2 transition-all
                            ${
                              !available
                                ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                                : bookingData.time === time
                                ? "border-[#E67E22] bg-[#E67E22] text-white"
                                : "border-gray-200 hover:border-[#E67E22]/50"
                            }
                          `}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceedStep3}
                  className="bg-[#E67E22] hover:bg-[#D35400] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <p className="text-[#1A1A1A] mb-4 text-lg font-normal">
                Tudo certo?
              </p>

              <p className="text-[#1A1A1A] mb-4 text-base font-normal">Confere aí rapidinho...</p>

              <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-gray-700">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Serviço:</p>
                    <p className="text-base text-[#1A1A1A]">
                      {bookingData.service?.name} — {bookingData.service?.duration} —{" "}
                      {bookingData.service?.price}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Barbeiro:</p>
                    <p className="text-base text-[#1A1A1A]">
                      {bookingData.barber?.name}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Especialidade:</p>
                    <p className="text-base text-[#1A1A1A]">
                      {bookingData.barber?.specialty}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Data:</p>
                    <p className="text-base text-[#1A1A1A]">
                      {bookingData.date?.toLocaleDateString("pt-BR")}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Horário:</p>
                    <p className="text-base text-[#1A1A1A]">{bookingData.time}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleConfirmBooking}>
                <p className="text-[#1A1A1A] mb-4 text-base font-normal">Agora, preenche os campos abaixo, beleza? Assim, manteremos contato!</p>

                <div className="space-y-5">
                  <div>
                    <Label htmlFor="nomeCompleto">Nome:</Label>
                    <Input
                      id="nomeCompleto"
                      type="text"
                      value={bookingData.nomeCompleto}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, nomeCompleto: e.target.value })
                      }
                      required
                      className="mt-1"
                      placeholder="Francisco Victor da Silva Pinheiro"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail:</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingData.email}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, email: e.target.value })
                      }
                      required
                      className="mt-1"
                      placeholder="exemple@exemple.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="celular">Celular/WhatsApp:</Label>
                    <Input
                      id="celular"
                      type="tel"
                      value={bookingData.celular}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, celular: e.target.value })
                      }
                      required
                      className="mt-1"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    className="border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
                  >
                    Voltar
                  </Button>

                  <Button
                    type="submit"
                    disabled={!canProceedStep4}
                    className="bg-[#E67E22] hover:bg-[#D35400] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirmar
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-[#1A1A1A] text-center mb-4">
              Confirmado!
            </h2>

            <p className="text-gray-600 text-center mb-8">
              Por aqui, deu tudo certo! Dá uma conferida no e-mail, ok?
            </p>

            <Button
              onClick={() => {
                setShowModal(false);
                navigate("/");
              }}
              className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white text-lg py-6 rounded-xl"
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}