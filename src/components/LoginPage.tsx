import { useState } from "react";
import { Header } from "./Header";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router";

export function LoginPage() {
  const [userType, setUserType] = useState<"profissional" | "admin">("profissional");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null);

  const navigate = useNavigate();

  const VALID_EMAIL = "barbeiro1@barbearia.com.br";
  const VALID_PASSWORD = "871374";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const success =
      userType === "profissional" &&
      email === VALID_EMAIL &&
      senha === VALID_PASSWORD;

    if (success) {
      localStorage.setItem("logged", "profissional");
    }

    setLoginSuccess(success);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Header isLoginPage={true} />

      <main className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#E67E22]/10 flex items-center justify-center">
                <Lock className="w-10 h-10 text-[#E67E22]" />
              </div>
            </div>

            <h1 className="text-[#1A1A1A] text-center mb-2">Bem-vindo!</h1>

            <p className="text-gray-600 text-center mb-8">
              A partir daqui, o acesso é restrito.
            </p>

            <div className="flex rounded-lg bg-gray-200 p-1 mb-6">
              <button
                type="button"
                onClick={() => setUserType("profissional")}
                className={`flex-1 py-2 px-4 rounded-md transition-all ${
                  userType === "profissional"
                    ? "bg-white text-[#1A1A1A] shadow-sm"
                    : "bg-transparent text-gray-600"
                }`}
              >
                Profissional
              </button>
              <button
                type="button"
                onClick={() => setUserType("admin")}
                className={`flex-1 py-2 px-4 rounded-md transition-all ${
                  userType === "admin"
                    ? "bg-white text-[#1A1A1A] shadow-sm"
                    : "bg-transparent text-gray-600"
                }`}
              >
                Admin
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-[#1A1A1A] mb-2 block">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemple@exemple.com"
                  className="bg-[#F3F3F5] border-[#F3F3F5] focus:border-[#E67E22] focus:ring-[#E67E22]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="senha" className="text-[#1A1A1A] mb-2 block">
                  Senha
                </Label>
                <Input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  className="bg-[#F3F3F5] border-[#F3F3F5] focus:border-[#E67E22] focus:ring-[#E67E22]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white mt-6"
              >
                Entrar
              </Button>
            </form>
          </div>

          <p className="text-center text-gray-500 text-sm mt-4">Beta</p>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 animate-fadeIn">
            <h2
              className={`text-2xl font-semibold text-center mb-4 ${
                loginSuccess ? "text-[#1A1A1A]" : "text-red-600"
              }`}
            >
              {loginSuccess ? "Acesso Liberado!" : "Acesso Negado!"}
            </h2>

            <p className="text-gray-600 text-center mb-8">
              {loginSuccess
                ? "Logado com sucesso. Bem-vindo de volta!"
                : "Seus dados são inválidos, ou o tipo de acesso é incorreto."}
            </p>

            <Button
              onClick={() => {
                setShowModal(false);
                if (loginSuccess) navigate("/profissional/dashboard");
              }}
              className={`w-full text-white text-lg py-6 rounded-xl ${
                loginSuccess
                  ? "bg-[#E67E22] hover:bg-[#D35400]"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}