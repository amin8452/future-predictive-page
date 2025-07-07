
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Shield } from "lucide-react";

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
        title: "Portrait Prédictif en cours de génération ! 🎉",
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
    <section id="lead-form" className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Obtenez votre Portrait Prédictif maintenant
            </h2>
            <p className="text-lg text-gray-600">
              Complétez ce formulaire intelligent pour recevoir votre analyse personnalisée
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Jean Dupont"
                  required
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email professionnel *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="jean.dupont@entreprise.com"
                  required
                  className="h-12"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="sector">Secteur d'activité *</Label>
                <Select value={formData.sector} onValueChange={(value) => handleInputChange("sector", value)}>
                  <SelectTrigger className="h-12">
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
              
              <div className="space-y-2">
                <Label htmlFor="position">Votre poste actuel *</Label>
                <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
                  <SelectTrigger className="h-12">
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

            <div className="space-y-2">
              <Label htmlFor="ambitions">Vos ambitions professionnelles à 3 ans</Label>
              <Textarea
                id="ambitions"
                value={formData.ambitions}
                onChange={(e) => handleInputChange("ambitions", e.target.value)}
                placeholder="Décrivez vos objectifs, projets de développement, ou défis que vous souhaitez relever..."
                className="min-h-[100px]"
              />
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>Vos données sont protégées et ne seront jamais partagées</span>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email || !formData.sector || !formData.position}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isSubmitting ? (
                "Génération en cours..."
              ) : (
                <>
                  Générer mon Portrait Prédictif
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
