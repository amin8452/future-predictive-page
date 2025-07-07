
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Shield, Play, CheckCircle, Zap } from "lucide-react";

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
    
    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "🎉 Portrait Prédictif en cours de génération !",
        description: "Vous recevrez votre rapport personnalisé par email dans les 2-3 minutes.",
      });
      // Reset form
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
    <section id="lead-form" className="py-20 px-4 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-800 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-full text-sm font-bold mb-6">
              <Zap className="w-4 h-4 mr-2" />
              OFFRE GRATUITE LIMITÉE
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Obtenez votre <span className="text-red-500">Portrait Prédictif</span> maintenant
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Complétez ce formulaire intelligent pour recevoir votre analyse personnalisée de <span className="font-bold text-red-400">8-12 pages</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-lg font-semibold text-white">Nom complet *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Jean Dupont"
                  required
                  className="h-14 text-lg bg-gray-800 border-gray-700 text-white focus:border-red-500 rounded-lg transition-all duration-300"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="email" className="text-lg font-semibold text-white">Email professionnel *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="jean.dupont@entreprise.com"
                  required
                  className="h-14 text-lg bg-gray-800 border-gray-700 text-white focus:border-red-500 rounded-lg transition-all duration-300"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="sector" className="text-lg font-semibold text-white">Secteur d'activité *</Label>
                <Select value={formData.sector} onValueChange={(value) => handleInputChange("sector", value)}>
                  <SelectTrigger className="h-14 text-lg bg-gray-800 border-gray-700 text-white focus:border-red-500 rounded-lg">
                    <SelectValue placeholder="Sélectionnez votre secteur" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="tech" className="text-white hover:bg-gray-700">Technologie / IT</SelectItem>
                    <SelectItem value="finance" className="text-white hover:bg-gray-700">Finance / Banque</SelectItem>
                    <SelectItem value="industrie" className="text-white hover:bg-gray-700">Industrie / Manufacturing</SelectItem>
                    <SelectItem value="sante" className="text-white hover:bg-gray-700">Santé / Médical</SelectItem>
                    <SelectItem value="commerce" className="text-white hover:bg-gray-700">Commerce / Retail</SelectItem>
                    <SelectItem value="consulting" className="text-white hover:bg-gray-700">Conseil / Services</SelectItem>
                    <SelectItem value="media" className="text-white hover:bg-gray-700">Média / Communication</SelectItem>
                    <SelectItem value="autre" className="text-white hover:bg-gray-700">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="position" className="text-lg font-semibold text-white">Votre poste actuel *</Label>
                <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
                  <SelectTrigger className="h-14 text-lg bg-gray-800 border-gray-700 text-white focus:border-red-500 rounded-lg">
                    <SelectValue placeholder="Sélectionnez votre poste" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="ceo" className="text-white hover:bg-gray-700">CEO / Dirigeant</SelectItem>
                    <SelectItem value="cto" className="text-white hover:bg-gray-700">CTO / Directeur Technique</SelectItem>
                    <SelectItem value="cmo" className="text-white hover:bg-gray-700">CMO / Directeur Marketing</SelectItem>
                    <SelectItem value="manager" className="text-white hover:bg-gray-700">Manager / Chef d'équipe</SelectItem>
                    <SelectItem value="consultant" className="text-white hover:bg-gray-700">Consultant</SelectItem>
                    <SelectItem value="entrepreneur" className="text-white hover:bg-gray-700">Entrepreneur</SelectItem>
                    <SelectItem value="autre" className="text-white hover:bg-gray-700">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="ambitions" className="text-lg font-semibold text-white">Vos ambitions professionnelles à 3 ans</Label>
              <Textarea
                id="ambitions"
                value={formData.ambitions}
                onChange={(e) => handleInputChange("ambitions", e.target.value)}
                placeholder="Décrivez vos objectifs, projets de développement, ou défis que vous souhaitez relever..."
                className="min-h-[120px] text-lg bg-gray-800 border-gray-700 text-white focus:border-red-500 rounded-lg transition-all duration-300"
              />
            </div>

            <div className="flex items-center space-x-3 text-gray-400 bg-gray-800 p-4 rounded-lg">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="font-medium">Vos données sont protégées et ne seront jamais partagées (RGPD)</span>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email || !formData.sector || !formData.position}
              className="w-full bg-red-600 hover:bg-red-700 text-white h-16 text-xl font-bold rounded-lg transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <Zap className="mr-3 h-6 w-6 animate-spin" />
                  Génération de votre rapport...
                </div>
              ) : (
                <div className="flex items-center">
                  <Play className="mr-3 h-6 w-6 fill-current" />
                  Générer mon Portrait Prédictif
                  <ArrowRight className="ml-3 h-6 w-6" />
                </div>
              )}
            </Button>

            <div className="grid md:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center text-green-400">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-semibold">100% Gratuit</span>
              </div>
              <div className="flex items-center text-green-400">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-semibold">Livraison instantanée</span>
              </div>
              <div className="flex items-center text-green-400">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-semibold">Rapport premium</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
