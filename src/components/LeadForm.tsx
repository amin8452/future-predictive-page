
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Shield, Sparkles, Zap, Gift } from "lucide-react";

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
    <section id="lead-form" className="py-24 px-4 bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-white/5 to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
              <Gift className="w-4 h-4 mr-2" />
              Offre gratuite limitée
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              Obtenez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Portrait Prédictif</span> maintenant
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Complétez ce formulaire intelligent pour recevoir votre analyse personnalisée de <span className="font-bold text-blue-600">8-12 pages</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-lg font-semibold text-gray-800">Nom complet *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Jean Dupont"
                  required
                  className="h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="email" className="text-lg font-semibold text-gray-800">Email professionnel *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="jean.dupont@entreprise.com"
                  required
                  className="h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="sector" className="text-lg font-semibold text-gray-800">Secteur d'activité *</Label>
                <Select value={formData.sector} onValueChange={(value) => handleInputChange("sector", value)}>
                  <SelectTrigger className="h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                    <SelectValue placeholder="Sélectionnez votre secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technologie / IT</SelectItem>
                    <SelectItem value="finance">Finance / Banque</SelectItem>
                    <SelectItem value="industrie">Industrie / Manufacturing</SelectItem>
                    <SelectItem value="sante">Santé / Médical</SelectItem>
                    <SelectItem value="commerce">Commerce / Retail</SelectItem>
                    <SelectItem value="consulting">Conseil / Services</SelectItem>
                    <SelectItem value="media">Média / Communication</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="position" className="text-lg font-semibold text-gray-800">Votre poste actuel *</Label>
                <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
                  <SelectTrigger className="h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                    <SelectValue placeholder="Sélectionnez votre poste" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ceo">CEO / Dirigeant</SelectItem>
                    <SelectItem value="cto">CTO / Directeur Technique</SelectItem>
                    <SelectItem value="cmo">CMO / Directeur Marketing</SelectItem>
                    <SelectItem value="manager">Manager / Chef d'équipe</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                    <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="ambitions" className="text-lg font-semibold text-gray-800">Vos ambitions professionnelles à 3 ans</Label>
              <Textarea
                id="ambitions"
                value={formData.ambitions}
                onChange={(e) => handleInputChange("ambitions", e.target.value)}
                placeholder="Décrivez vos objectifs, projets de développement, ou défis que vous souhaitez relever..."
                className="min-h-[120px] text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
              />
            </div>

            <div className="flex items-center space-x-3 text-gray-600 bg-gray-50 p-4 rounded-xl">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="font-medium">Vos données sont protégées et ne seront jamais partagées (RGPD)</span>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email || !formData.sector || !formData.position}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white h-16 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <Zap className="mr-3 h-6 w-6 animate-spin" />
                  Génération en cours...
                </div>
              ) : (
                <div className="flex items-center">
                  <Sparkles className="mr-3 h-6 w-6" />
                  Générer mon Portrait Prédictif
                  <ArrowRight className="ml-3 h-6 w-6" />
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
