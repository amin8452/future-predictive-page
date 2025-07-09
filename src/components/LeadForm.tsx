
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, Zap, FileText, CheckCircle } from "lucide-react";
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
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-cyan-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Powered by Deepseek v3
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Générez Votre Portrait Prédictif IA
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Obtenez une analyse personnalisée de votre avenir professionnel en quelques minutes
            </p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Informations Professionnelles
              </CardTitle>
              <CardDescription className="text-cyan-100">
                Remplissez ces informations pour une analyse IA personnalisée
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                      Nom complet *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Votre nom complet"
                      className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                      Email professionnel *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre.email@entreprise.com"
                      className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="sector" className="text-sm font-semibold text-slate-700">
                      Secteur d'activité *
                    </label>
                    <Input
                      id="sector"
                      name="sector"
                      type="text"
                      value={formData.sector}
                      onChange={handleInputChange}
                      placeholder="ex: Technologie, Finance, Santé..."
                      className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="position" className="text-sm font-semibold text-slate-700">
                      Poste actuel *
                    </label>
                    <Input
                      id="position"
                      name="position"
                      type="text"
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="ex: Manager, Consultant, Entrepreneur..."
                      className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="ambitions" className="text-sm font-semibold text-slate-700">
                    Vos ambitions professionnelles
                  </label>
                  <Textarea
                    id="ambitions"
                    name="ambitions"
                    value={formData.ambitions}
                    onChange={handleInputChange}
                    placeholder="Décrivez vos objectifs, projets, et où vous vous voyez dans 3 ans..."
                    className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 min-h-[120px]"
                    rows={4}
                  />
                </div>

                {/* Statut de génération */}
                {isGenerating && (
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Loader2 className="w-5 h-5 animate-spin text-cyan-600" />
                      <span className="font-semibold text-cyan-800">Génération en cours...</span>
                    </div>
                    <p className="text-cyan-700 text-sm">{generationStep}</p>
                    <div className="mt-3 bg-cyan-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
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

                <div className="text-center text-sm text-slate-500 space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Rapport PDF professionnel personnalisé</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Prédictions IA pour 2025-2027</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Plan d'action stratégique détaillé</span>
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
