
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Shield, Sparkles, CheckCircle, Zap, Brain } from "lucide-react";

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sector: "",
    position: "",
    ambitions: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "🚀 Génération de votre Portrait Prédictif...",
        description: "Votre rapport personnalisé sera livré dans votre boîte mail en moins de 2 minutes.",
      });
      setFormData({
        name: "",
        email: "",
        sector: "",
        position: "",
        ambitions: ""
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="lead-form" className="py-32 px-4 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm border border-purple-500/30 rounded-full text-sm font-bold text-purple-300 mb-8 shadow-lg">
              <Brain className="w-5 h-5 mr-2 animate-pulse" />
              IA NEXT-GEN • GRATUIT • INSTANTANÉ
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Générez votre{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Portrait Prédictif
              </span>
            </h2>
            
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Complétez ce formulaire intelligent pour recevoir votre analyse prédictive personnalisée de{" "}
              <span className="font-bold text-purple-400">12-15 pages</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label htmlFor="name" className="text-lg font-semibold text-white">Nom complet</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Jean Dupont"
                  required
                  className="h-16 text-lg bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:border-purple-400 focus:bg-white/10 rounded-2xl transition-all duration-300"
                />
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="email" className="text-lg font-semibold text-white">Email professionnel</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="jean.dupont@entreprise.com"
                  required
                  className="h-16 text-lg bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:border-purple-400 focus:bg-white/10 rounded-2xl transition-all duration-300"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label htmlFor="sector" className="text-lg font-semibold text-white">Secteur d'activité</Label>
                <Select value={formData.sector} onValueChange={(value) => handleInputChange("sector", value)}>
                  <SelectTrigger className="h-16 text-lg bg-white/5 backdrop-blur-sm border border-white/20 text-white focus:border-purple-400 rounded-2xl">
                    <SelectValue placeholder="Sélectionnez votre secteur" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-2xl">
                    <SelectItem value="tech" className="text-white hover:bg-white/10 rounded-xl">Technologie / IA</SelectItem>
                    <SelectItem value="finance" className="text-white hover:bg-white/10 rounded-xl">Finance / FinTech</SelectItem>
                    <SelectItem value="industrie" className="text-white hover:bg-white/10 rounded-xl">Industrie 4.0</SelectItem>
                    <SelectItem value="sante" className="text-white hover:bg-white/10 rounded-xl">Santé / MedTech</SelectItem>
                    <SelectItem value="commerce" className="text-white hover:bg-white/10 rounded-xl">E-commerce / Retail</SelectItem>
                    <SelectItem value="consulting" className="text-white hover:bg-white/10 rounded-xl">Conseil / Services</SelectItem>
                    <SelectItem value="media" className="text-white hover:bg-white/10 rounded-xl">Média / Communication</SelectItem>
                    <SelectItem value="autre" className="text-white hover:bg-white/10 rounded-xl">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="position" className="text-lg font-semibold text-white">Poste actuel</Label>
                <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
                  <SelectTrigger className="h-16 text-lg bg-white/5 backdrop-blur-sm border border-white/20 text-white focus:border-purple-400 rounded-2xl">
                    <SelectValue placeholder="Sélectionnez votre poste" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-2xl">
                    <SelectItem value="ceo" className="text-white hover:bg-white/10 rounded-xl">CEO / Fondateur</SelectItem>
                    <SelectItem value="cto" className="text-white hover:bg-white/10 rounded-xl">CTO / Chief Technology Officer</SelectItem>
                    <SelectItem value="cmo" className="text-white hover:bg-white/10 rounded-xl">CMO / Chief Marketing Officer</SelectItem>
                    <SelectItem value="manager" className="text-white hover:bg-white/10 rounded-xl">VP / Director</SelectItem>
                    <SelectItem value="consultant" className="text-white hover:bg-white/10 rounded-xl">Consultant Senior</SelectItem>
                    <SelectItem value="entrepreneur" className="text-white hover:bg-white/10 rounded-xl">Entrepreneur</SelectItem>
                    <SelectItem value="autre" className="text-white hover:bg-white/10 rounded-xl">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="ambitions" className="text-lg font-semibold text-white">Vision stratégique à 3 ans</Label>
              <Textarea
                id="ambitions"
                value={formData.ambitions}
                onChange={(e) => handleInputChange("ambitions", e.target.value)}
                placeholder="Décrivez vos objectifs stratégiques, projets d'innovation, ou défis de transformation que vous souhaitez relever..."
                className="min-h-[140px] text-lg bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:border-purple-400 focus:bg-white/10 rounded-2xl transition-all duration-300"
              />
            </div>

            <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <Shield className="w-6 h-6 text-green-400 flex-shrink-0" />
              <span className="text-slate-300 font-medium">Vos données sont cryptées et protégées selon les standards RGPD les plus stricts</span>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email || !formData.sector || !formData.position}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-20 text-xl font-bold rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-purple-500/25"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <Zap className="mr-3 h-6 w-6 animate-spin" />
                  Génération par IA en cours...
                </div>
              ) : (
                <div className="flex items-center">
                  <Sparkles className="mr-3 h-6 w-6" />
                  Générer mon Portrait Prédictif IA
                  <ArrowRight className="ml-3 h-6 w-6" />
                </div>
              )}
            </Button>

            <div className="grid md:grid-cols-3 gap-6 pt-6">
              {[
                { icon: CheckCircle, text: "100% Gratuit", color: "text-green-400" },
                { icon: Zap, text: "Livraison <2min", color: "text-yellow-400" },
                { icon: Shield, text: "Données sécurisées", color: "text-blue-400" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center text-center">
                  <item.icon className={`w-5 h-5 mr-2 ${item.color}`} />
                  <span className="font-semibold text-white">{item.text}</span>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
