import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ParticleBackground from "@/components/ParticleBackground";
import RobotAssistant from "@/components/RobotAssistant";
import { 
  Shield, 
  ArrowLeft, 
  Send, 
  FileText, 
  Download,
  Upload
} from "lucide-react";

const AssistantChat = () => {
  const { sector, assistant } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processNumber, setProcessNumber] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [messages, setMessages] = useState<Array<{id: number, type: 'user' | 'assistant', content: string}>>([]);

  // Assistant configuration based on type
  const assistantConfig = {
    recursos: {
      name: "Assistente de Recursos",
      description: "Especialista em recursos e apelações",
      sector: "BB Réu - Defesa"
    },
    contestacao: {
      name: "Assistente de Contestação",
      description: "Especialista em contestações e defesas",
      sector: "BB Réu - Defesa"
    },
    ajuizamento: {
      name: "Assistente de Ajuizamento",
      description: "Especialista em petições iniciais",
      sector: "BB Autor - Ação"
    },
    processual: {
      name: "Assistente Processual",
      description: "Manifestações e dilação de prazo",
      sector: "BB Autor - Ação"
    },
    negocial: {
      name: "Assistente Negocial",
      description: "Acordos e negociações",
      sector: "BB Autor - Ação"
    }
  };

  const currentAssistant = assistantConfig[assistant as keyof typeof assistantConfig];

  useEffect(() => {
    // Welcome message
    setMessages([{
      id: 1,
      type: 'assistant',
      content: `Olá! Sou o ${currentAssistant?.name}. Como posso ajudá-lo hoje? Por favor, forneça o número do processo ou descreva sua necessidade.`
    }]);
  }, [currentAssistant]);

  const handleProcessSubmit = async () => {
    if (!processNumber.trim()) return;

    setIsProcessing(true);
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: `Número do processo: ${processNumber}${additionalInfo ? `\n\nInformações adicionais: ${additionalInfo}` : ''}`
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI processing
    setTimeout(() => {
      const assistantResponse = {
        id: messages.length + 2,
        type: 'assistant' as const,
        content: `Analisando o processo ${processNumber}...\n\n✅ Dados extraídos com sucesso!\n\n📋 **Resumo do Processo:**\n- Número: ${processNumber}\n- Tipo: ${getProcessType()}\n- Status: Em andamento\n\n🤖 Estou preparando os documentos necessários. Que tipo de peça você gostaria que eu gere?`
      };
      
      setMessages(prev => [...prev, assistantResponse]);
      setIsProcessing(false);
    }, 2000);
  };

  const getProcessType = () => {
    switch (assistant) {
      case 'recursos': return 'Recurso/Apelação';
      case 'contestacao': return 'Contestação';
      case 'ajuizamento': return 'Petição Inicial';
      case 'processual': return 'Manifestação Processual';
      case 'negocial': return 'Negociação/Acordo';
      default: return 'Processo Geral';
    }
  };

  const handleGenerateDocument = () => {
    const newMessage = {
      id: messages.length + 1,
      type: 'assistant' as const,
      content: `📄 **Documento Gerado!**\n\n✅ ${getProcessType()} criado com base nos dados do processo ${processNumber}\n\n🔍 **Revisão Automática Concluída:**\n- Formatação: ✅\n- Dados das partes: ✅\n- Fundamentos jurídicos: ✅\n- Pedidos: ✅\n\n💾 Documento pronto para download!`
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  if (!currentAssistant) {
    return <div>Assistente não encontrado</div>;
  }

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background-tertiary" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between p-6 glass border-b border-border/50">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="glass border-border hover:border-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {currentAssistant.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {currentAssistant.sector}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Robot Assistant Panel */}
            <div className="lg:col-span-1">
              <Card className="glass border-glow">
                <CardHeader>
                  <CardTitle className="text-center text-foreground">
                    Assistente IA
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <RobotAssistant 
                    name={currentAssistant.name}
                    type={assistant as any}
                    isActive={isProcessing}
                  />
                  <p className="text-sm text-muted-foreground mt-4">
                    {currentAssistant.description}
                  </p>
                </CardContent>
              </Card>

              {/* Process Input Panel */}
              <Card className="glass border-glow mt-6">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">
                    Dados do Processo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="process" className="text-foreground">
                      Número do Processo
                    </Label>
                    <Input
                      id="process"
                      placeholder="0000000-00.0000.0.00.0000"
                      value={processNumber}
                      onChange={(e) => setProcessNumber(e.target.value)}
                      className="glass border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="info" className="text-foreground">
                      Informações Adicionais
                    </Label>
                    <Textarea
                      id="info"
                      placeholder="Descreva detalhes específicos do caso..."
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      className="glass border-border focus:border-primary min-h-[100px]"
                    />
                  </div>

                  <Button 
                    onClick={handleProcessSubmit}
                    disabled={!processNumber.trim() || isProcessing}
                    className="w-full bg-gradient-brand hover:scale-105 transition-all duration-300"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Analisar Processo
                      </>
                    )}
                  </Button>

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 glass border-border hover:border-primary"
                      onClick={handleGenerateDocument}
                      disabled={messages.length < 3}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Gerar Peça
                    </Button>
                    <Button 
                      variant="outline"
                      className="glass border-border hover:border-primary"
                      disabled={messages.length < 4}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Panel */}
            <div className="lg:col-span-2">
              <Card className="glass border-glow h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">
                    Conversa com o Assistente
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] p-4 rounded-lg ${
                            message.type === 'user' 
                              ? 'bg-gradient-brand text-primary-foreground' 
                              : 'glass border border-border text-foreground'
                          }`}
                        >
                          <pre className="whitespace-pre-wrap text-sm font-sans">
                            {message.content}
                          </pre>
                        </div>
                      </div>
                    ))}
                    
                    {isProcessing && (
                      <div className="flex justify-start">
                        <div className="glass border border-border p-4 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                            <span className="text-foreground">Analisando dados...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantChat;