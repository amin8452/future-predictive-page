
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, Zap, FileText, CheckCircle, User, Mail, Building, Target } from "lucide-react";
import { PdfService } from "@/services/PdfService";
import { useToast } from "@/hooks/use-toast";
import PdfViewer from "./PdfViewer";

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sector: "",
    position: "",
    ambitions: ""
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [pdfData, setPdfData] = useState<{
    downloadUrl: string;
    pdfBlob?: Blob;
  } | null>(null);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation rapide
    if (!formData.name || !formData.email || !formData.sector || !formData.position) {
      toast({
        title: "⚠️ Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGenerationStep("🤖 Connexion à Deepseek v3...");

    try {
      // Étape 1: Génération IA
      setGenerationStep("🧠 Analyse de votre profil...");
      await new Promise(resolve => setTimeout(resolve, 1000)); // UI feedback
      
      setGenerationStep("📊 Génération des prédictions...");
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setGenerationStep("📄 Création du PDF professionnel...");
      
      const result = await PdfService.generatePdf(formData);
      
      if (result.success && result.downloadUrl) {
        setGenerationStep("✅ Rapport généré avec succès !");
        
        setPdfData({
          downloadUrl: result.downloadUrl,
          pdfBlob: result.pdfBlob
        });
        
        // Toast de succès
        toast({
          title: "🎉 Portrait Prédictif IA généré !",
          description: result.message || "Votre rapport professionnel est prêt",
        });
        
        // Ouvrir le viewer après un court délai
        setTimeout(() => {
          setShowPdfViewer(true);
        }, 500);
        
      } else {
        throw new Error(result.error || "Erreur lors de la génération");
      }
      
    } catch (error) {
      console.error("Erreur génération:", error);
      toast({
        title: "❌ Erreur de génération",
        description: "Impossible de générer le rapport. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  };

  return (
    <>
      <section className="py-20 px-4 section-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 glass-card text-white px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Powered by Deepseek v3
            </div>
            <h2 className="text-5xl font-bold gradient-text-primary mb-6">
              Générez Votre Portrait Prédictif IA
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Obtenez une analyse personnalisée de votre avenir professionnel en quelques minutes
            </p>
          </div>

          <Card className="glass-card border-white/10 animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-sm rounded-t-3xl border-b border-white/10">
              <CardTitle className="text-2xl flex items-center gap-3 text-white">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <FileText className="w-6 h-6 text-cyan-400" />
                </div>
                Informations Professionnelles
              </CardTitle>
              <CardDescription className="text-slate-300">
                Remplissez ces informations pour une analyse IA personnalisée
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8 space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white flex items-center gap-2">
                      <User className="w-4 h-4 text-cyan-400" />
                      Nom complet *
                    </label>
                    <Input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Votre nom complet"
                      className="input-field h-12"
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white flex items-center gap-2">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      Email professionnel *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre.email@entreprise.com"
                      className="input-field h-12"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white flex items-center gap-2">
                      <Building className="w-4 h-4 text-cyan-400" />
                      Secteur d'activité *
                    </label>
                    <Input
                      name="sector"
                      type="text"
                      value={formData.sector}
                      onChange={handleInputChange}
                      placeholder="ex: Technologie, Finance, Santé..."
                      className="input-field h-12"
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white flex items-center gap-2">
                      <Target className="w-4 h-4 text-cyan-400" />
                      Poste actuel *
                    </label>
                    <Input
                      name="position"
                      type="text"
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="ex: Manager, Consultant, Entrepreneur..."
                      className="input-field h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Vos ambitions professionnelles
                  </label>
                  <Textarea
                    name="ambitions"
                    value={formData.ambitions}
                    onChange={handleInputChange}
                    placeholder="Décrivez vos objectifs, projets, et où vous vous voyez dans 3 ans..."
                    className="input-field min-h-[120px] resize-none"
                    rows={4}
                  />
                </div>

                {/* Statut de génération */}
                {isGenerating && (
                  <div className="glass-card p-6 border-cyan-400/30 animate-pulse">
                    <div className="flex items-center gap-3 mb-3">
                      <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                      <span className="font-semibold text-cyan-400">Génération en cours...</span>
                    </div>
                    <p className="text-slate-300 text-sm mb-4">{generationStep}</p>
                    <div className="bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full animate-pulse w-3/4 transition-all duration-1000"></div>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full btn-primary h-14 text-lg font-semibold"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Génération IA en cours...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Générer Mon Portrait Prédictif IA
                    </>
                  )}
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="flex items-center gap-3 glass-card p-4 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Rapport PDF professionnel</span>
                  </div>
                  <div className="flex items-center gap-3 glass-card p-4 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Prédictions IA 2025-2027</span>
                  </div>
                  <div className="flex items-center gap-3 glass-card p-4 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Plan d'action stratégique</span>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* PDF Viewer Modal */}
      {pdfData && (
        <PdfViewer
          isOpen={showPdfViewer}
          onClose={() => setShowPdfViewer(false)}
          pdfBlob={pdfData.pdfBlob}
          downloadUrl={pdfData.downloadUrl}
          userEmail={formData.email}
          userName={formData.name}
        />
      )}
    </>
  );
};

export default LeadForm;
