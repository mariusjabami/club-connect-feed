import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trophy, Shield, User, ArrowLeft, Mail, Lock, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type AuthMode = "login" | "register";
type UserType = "club" | "player";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [userType, setUserType] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "login") {
      toast.success("Login realizado com sucesso!");
      navigate("/");
    } else {
      toast.success("Conta criada com sucesso!");
      navigate("/profile");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-dark items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/30 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center mx-auto mb-8 shadow-glow animate-pulse-glow">
            <Trophy className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold text-primary-foreground mb-4">SportLink</h1>
          <p className="text-xl text-primary-foreground/70 max-w-md">
            A rede social que conecta clubes, jogadores e apaixonados por esporte
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao feed
          </Link>

          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Trophy className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-gradient">SportLink</span>
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-2">
            {mode === "login" ? "Bem-vindo de volta!" : "Criar conta"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {mode === "login" 
              ? "Entre na sua conta para continuar" 
              : "Escolha o tipo de conta para começar"}
          </p>

          {mode === "register" && !userType && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-sm font-medium text-muted-foreground mb-4">Tipo de conta:</p>
              
              <button
                onClick={() => setUserType("club")}
                className="w-full p-6 card-interactive flex items-center gap-4 text-left group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">Clube</h3>
                  <p className="text-sm text-muted-foreground">Gerencie seu time, jogadores e eventos</p>
                </div>
              </button>

              <button
                onClick={() => setUserType("player")}
                className="w-full p-6 card-interactive flex items-center gap-4 text-left group"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <User className="w-7 h-7 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">Jogador</h3>
                  <p className="text-sm text-muted-foreground">Mostre seu talento e conecte-se com clubes</p>
                </div>
              </button>
            </div>
          )}

          {(mode === "login" || userType) && (
            <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
              {mode === "register" && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    {userType === "club" ? (
                      <Shield className="w-5 h-5 text-primary" />
                    ) : (
                      <User className="w-5 h-5 text-accent-foreground" />
                    )}
                    <span className="text-sm font-medium text-muted-foreground">
                      Cadastro de {userType === "club" ? "Clube" : "Jogador"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setUserType(null)}
                      className="text-xs text-primary hover:underline ml-auto"
                    >
                      Alterar
                    </button>
                  </div>

                  <div className="relative">
                    <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="name"
                      placeholder={userType === "club" ? "Nome do clube" : "Nome completo"}
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full input-field pl-12"
                      required
                    />
                  </div>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                    <input
                      type="text"
                      name="username"
                      placeholder="Nome de usuário"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full input-field pl-12"
                      required
                    />
                  </div>
                </>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full input-field pl-12"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  name="password"
                  placeholder="Senha"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full input-field pl-12"
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                {mode === "login" ? "Entrar" : "Criar conta"}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {mode === "login" ? "Não tem uma conta?" : "Já tem uma conta?"}
              <button
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setUserType(null);
                }}
                className="text-primary font-medium ml-2 hover:underline"
              >
                {mode === "login" ? "Cadastre-se" : "Entrar"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
