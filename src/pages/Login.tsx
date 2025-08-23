import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ParticleBackground from "@/components/ParticleBackground";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAdmin } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(credentials.email, credentials.password);
      if (success) {
        toast.success("Login realizado com sucesso!");
        
        // Check if user is admin after successful login
        if (credentials.email === 'admin@jusnexus.com') {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error("Credenciais inválidas. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen relative flex items-center justify-center p-6">
      <ParticleBackground />
      
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background-tertiary" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              
              
            </div>
          </div>
          <h1 className="text-5xl font-bold logo-gradient mb-2">
            <span className="text-primary">Jus</span>
            <span className="text-accent">Nexus</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Sistema Jurídico Inteligente
          </p>
        </div>

        {/* Login Card */}
        <Card className="glass border-glow">
          <CardHeader>
            <CardTitle className="text-center text-xl text-foreground">
              Acesso MDR
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Entre com suas credenciais do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email/Usuário MDR
                </Label>
                <Input id="email" type="email" placeholder="usuario@mdr.sistema" value={credentials.email} onChange={e => setCredentials(prev => ({
                ...prev,
                email: e.target.value
              }))} className="glass border-border focus:border-primary focus:ring-primary" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Senha
                </Label>
                <Input id="password" type="password" placeholder="••••••••" value={credentials.password} onChange={e => setCredentials(prev => ({
                ...prev,
                password: e.target.value
              }))} className="glass border-border focus:border-primary focus:ring-primary" required />
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-brand hover:scale-105 transition-all duration-300 text-primary-foreground font-semibold py-3 border-glow disabled:opacity-50"
              >
                {isLoading ? "Entrando..." : "Entrar no Sistema"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            © 2024 JusNexus - Tecnologia Jurídica Avançada
          </p>
        </div>
      </div>
    </div>;
};
export default Login;