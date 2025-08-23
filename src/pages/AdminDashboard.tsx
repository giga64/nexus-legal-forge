import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import ParticleBackground from "@/components/ParticleBackground";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const adminModules = [
    {
      id: "users",
      name: "Gestão de Usuários",
      description: "Gerenciar usuários, permissões e acessos do sistema",
      icon: "👥",
      stats: "1,847 usuários"
    },
    {
      id: "ai",
      name: "Sistema de IA",
      description: "Monitorar e configurar assistentes de inteligência artificial",
      icon: "🤖",
      stats: "12 modelos ativos"
    },
    {
      id: "analytics",
      name: "Analytics",
      description: "Relatórios e análises de performance do sistema",
      icon: "📊",
      stats: "98.5% uptime"
    },
    {
      id: "security",
      name: "Segurança",
      description: "Logs, auditoria e configurações de segurança",
      icon: "🔒",
      stats: "0 incidentes"
    },
    {
      id: "integrations",
      name: "Integrações",
      description: "Gerenciar APIs e integrações com sistemas externos",
      icon: "🔌",
      stats: "8 conexões"
    },
    {
      id: "maintenance",
      name: "Manutenção",
      description: "Backup, atualizações e manutenção do sistema",
      icon: "⚙️",
      stats: "Última: hoje"
    }
  ];

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      
      {/* Background Gradient Overlay - Admin Theme (Red/Orange) */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-red-950/20 to-orange-950/20" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <h1 className="text-4xl font-bold">
            <span className="text-red-400">👑</span>
            <span className="logo-gradient ml-2">JusNexus Admin</span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">
              Administrador: {user?.name}
            </span>
            <Button 
              variant="outline" 
              onClick={handleLogout} 
              className="glass border-border hover:bg-white/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 pb-6">
          <div className="space-y-8">
            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <StatsCard
                icon="👥"
                title="Usuários Ativos"
                value="1,847"
                subtitle="Online agora: 234"
                className="border-red-500/20"
              />
              <StatsCard
                icon="🤖"
                title="Precisão IA"
                value="98.5%"
                subtitle="Média dos modelos"
                className="border-orange-500/20"
              />
              <StatsCard
                icon="⚡"
                title="Uptime"
                value="99.9%"
                subtitle="Últimos 30 dias"
                className="border-red-500/20"
              />
              <StatsCard
                icon="📈"
                title="Performance"
                value="2.3s"
                subtitle="Tempo médio resposta"
                className="border-orange-500/20"
              />
            </div>

            {/* Admin Modules */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                Painel de Administração
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Gerencie todos os aspectos do sistema JusNexus
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {adminModules.map((module) => (
                <Card key={module.id} className="glass border-glow hover-scale cursor-pointer transition-all duration-300 border-red-500/20 hover:border-red-400/40">
                  <CardHeader>
                    <div className="text-4xl text-center mb-4">{module.icon}</div>
                    <CardTitle className="text-center text-foreground">{module.name}</CardTitle>
                    <CardDescription className="text-center text-muted-foreground">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <span className="text-sm text-red-400 font-semibold">{module.stats}</span>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 transition-all duration-300 text-white font-semibold"
                      onClick={() => console.log(`Opening ${module.id} module`)}
                    >
                      Acessar Módulo
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;