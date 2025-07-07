
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            Alimenté par l'Intelligence Artificielle
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Découvrez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">futur professionnel</span> grâce à l'IA
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Un rapport gratuit et personnalisé qui analyse votre secteur, identifie vos leviers de croissance, 
            et vous propose une feuille de route stratégique en moins de 60 secondes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={scrollToForm}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Obtenez votre Portrait Prédictif
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-gray-500">✨ Gratuit & Instantané • 📄 PDF Premium</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
