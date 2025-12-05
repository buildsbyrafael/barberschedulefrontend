import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Calendar, Clock, User, Mail, Phone } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

interface Appointment {
  id: string;
  date: string;
  time: string;
  serviceId: string;
  serviceName: string;
  duration: number;
  price: string;
  barberId: string;
  barberName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
}

function AppointmentCard({
  apt,
  mode,
  formatDateFancy,
}: {
  apt: Appointment;
  mode: "today" | "upcoming";
  formatDateFancy: (date: string, time: string) => string;
}) {
  return (
    <Card
      key={apt.id}
      className="p-4 border-neutral-200 hover:border-amber-600 transition-colors"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-neutral-900">{apt.clientName}</h3>
            <Badge
              variant="outline"
              className={
                mode === "today"
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-blue-50 text-blue-700 border-blue-200"
              }
            >
              {mode === "today" ? apt.time : formatDateFancy(apt.date, apt.time)}
            </Badge>
          </div>

          <div className="space-y-1 text-neutral-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0" />
              <span>{apt.clientEmail}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0" />
              <span>{apt.clientPhone}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 lg:gap-8">
          <div className="text-right">
            <p className="text-neutral-900 mb-1">{apt.serviceName}</p>
            <p className="text-neutral-600">{apt.duration} min</p>
          </div>
          <div className="text-right">
            <p className="text-amber-600">{apt.price}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function getToday() {
  const [d, m, y] = new Date()
    .toLocaleDateString("pt-BR")
    .split("/")
    .map((x) => x.padStart(2, "0"));

  return `${y}-${m}-${d}`;
}

export function ProfessionalDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();
  const today = getToday();

  useEffect(() => {
    const isLogged = localStorage.getItem("logged");
    if (!isLogged) {
      navigate("/login");
      return;
    }

    const stored = localStorage.getItem("appointments");
    if (stored) {
      const parsed: Appointment[] = JSON.parse(stored);
      const filtered = parsed.filter((apt) => apt.barberId === "barber1");

      const sorted = filtered.sort((a, b) =>
        (a.date + a.time).localeCompare(b.date + b.time)
      );

      setAppointments(sorted);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("logged");
    setShowLogoutModal(true);
  };

  const todaysAppointments = appointments.filter((apt) => apt.date === today);
  const upcomingAppointments = appointments.filter((apt) => apt.date > today);

  const totalEarningsToday = todaysAppointments.reduce((sum, apt) => {
    const value = Number(apt.price.replace(/\D/g, ""));
    return sum + value;
  }, 0);

  const formatDateFancy = (date: string, time: string) => {
    const [y, m, day] = date.split("-").map(Number);
    const d = new Date(y, m - 1, day);

    const weekdays = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];

    const months = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    const weekday = weekdays[d.getDay()];
    const dd = day.toString().padStart(2, "0");
    const month = months[d.getMonth()];

    return `${weekday} — ${dd} ${month} — ${time}`;
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header isDashboardPage={true} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-[#1A1A1A] mb-1">Painel do Profissional</h1>
          <p className="text-neutral-600">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card className="p-6 border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-1">Agendamentos</p>
                <p className="text-neutral-900">{todaysAppointments.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-1">Ganho Estimado</p>
                <p className="text-neutral-900">R${totalEarningsToday}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-1">Total de Clientes</p>
                <p className="text-neutral-900">{todaysAppointments.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 border-neutral-200">
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="today">Hoje</TabsTrigger>
              <TabsTrigger value="upcoming">Próximos</TabsTrigger>
            </TabsList>

            <TabsContent value="today">
              {todaysAppointments.length === 0 ? (
                <p className="text-center text-neutral-500 py-6">
                  Nenhum agendamento hoje.
                </p>
              ) : (
                <div className="space-y-4">
                  {todaysAppointments.map((apt) => (
                    <AppointmentCard
                      key={apt.id}
                      apt={apt}
                      mode="today"
                      formatDateFancy={formatDateFancy}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming">
              {upcomingAppointments.length === 0 ? (
                <p className="text-center text-neutral-500 py-6">
                  Nenhum futuro agendamento.
                </p>
              ) : (
                <div className="space-y-4">
                  {upcomingAppointments.map((apt) => (
                    <AppointmentCard
                      key={apt.id}
                      apt={apt}
                      mode="upcoming"
                      formatDateFancy={formatDateFancy}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-[#1A1A1A] text-center mb-4">
              Você saiu!
            </h2>

            <p className="text-gray-600 text-center mb-8">
              Logout realizado com sucesso.
            </p>

            <Button
              onClick={() => navigate("/")}
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