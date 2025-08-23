import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { SectorCard } from "@/components/ui/sector-card";
import ParticleBackground from "@/components/ParticleBackground";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSectorSelect = (sector: string) => {
    setSelectedSector(sector);
  };

  const handleAssistantSelect = (sector: string, assistant: string) => {
    navigate(`/assistant/${sector}/${assistant}`);
  };

  const sectors = {
    reu: {
      title: "BB Réu",
      description: "Setor especializado em defesa jurídica, recursos e contestações processuais",
      icon: "🛡️",
      assistants: [
        {
          id: "recursos",
          name: "Assistente de Recursos",
          description: "Especialista em análise e geração de recursos judiciais",
          icon: "📋"
        },
        {
          id: "contestacao",
          name: "Assistente de Contestação",
          description: "Especialista em defesas e contestações processuais",
          icon: "⚖️"
        }
      ]
    },
    autor: {
      title: "BB Autor",
      description: "Setor especializado em ações judiciais, ajuizamentos e negociações",
      icon: "⚔️",
      assistants: [
        {
          id: "ajuizamento",
          name: "Assistente de Ajuizamento",
          description: "Especialista em petições iniciais e ações judiciais",
          icon: "🏛️"
        },
        {
          id: "processual",
          name: "Assistente Processual",
          description: "Especialista em manifestações e peças processuais",
          icon: "📄"
        },
        {
          id: "negocial",
          name: "Assistente Negocial",
          description: "Especialista em acordos e negociações",
          icon: "🤝"
        }
      ]
    }
  };

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background-tertiary" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {selectedSector && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSelectedSector(null)} 
                className="hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-4xl font-bold logo-gradient">
              ⚖️ JusNexus
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">
              Bem-vindo, {user?.name}
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
          {!selectedSector ? (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <StatsCard
                  icon="📊"
                  title="Processos"
                  value="1,247"
                  subtitle="Total em andamento"
                />
                <StatsCard
                  icon="🤖"
                  title="IA Ativa"
                  value="98.5%"
                  subtitle="Precisão média"
                />
                <StatsCard
                  icon="⚡"
                  title="Eficiência"
                  value="2.3x"
                  subtitle="Mais rápido"
                />
                <StatsCard
                  icon="🎯"
                  title="Sucesso"
                  value="94%"
                  subtitle="Taxa de aprovação"
                />
              </div>

              {/* Welcome Section */}
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-foreground">
                  Sistema Jurídico Inteligente
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Selecione o setor jurídico para acessar os assistentes especializados em IA
                </p>
              </div>

              {/* Sector Selection */}
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <SectorCard
                  icon={sectors.reu.icon}
                  title={sectors.reu.title}
                  description={sectors.reu.description}
                  onClick={() => handleSectorSelect('reu')}
                  variant="reu"
                />
                <SectorCard
                  icon={sectors.autor.icon}
                  title={sectors.autor.title}
                  description={sectors.autor.description}
                  onClick={() => handleSectorSelect('autor')}
                  variant="autor"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Sector Header */}
              <div className="text-center space-y-4">
                <div className="text-6xl">{sectors[selectedSector as keyof typeof sectors].icon}</div>
                <h2 className="text-3xl font-bold text-foreground">
                  {sectors[selectedSector as keyof typeof sectors].title}
                </h2>
                <p className="text-xl text-muted-foreground">
                  {sectors[selectedSector as keyof typeof sectors].description}
                </p>
              </div>

              {/* Assistants Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {sectors[selectedSector as keyof typeof sectors].assistants.map((assistant) => (
                  <Card key={assistant.id} className="glass border-glow hover-scale cursor-pointer transition-all duration-300">
                    <CardHeader>
                      <div className="text-4xl text-center mb-4">{assistant.icon}</div>
                      <CardTitle className="text-center text-foreground">{assistant.name}</CardTitle>
                      <CardDescription className="text-center text-muted-foreground">
                        {assistant.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        onClick={() => handleAssistantSelect(selectedSector, assistant.id)} 
                        className="w-full bg-gradient-brand hover:scale-105 transition-all duration-300 text-primary-foreground font-semibold"
                      >
                        Iniciar Atendimento
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;