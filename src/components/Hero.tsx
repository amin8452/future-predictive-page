
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Info, Star } from "lucide-react";

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Video Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-10"></div>
      
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop&q=80')`,
          filter: 'brightness(0.3) saturate(1.2)'
        }}
      ></div>
      
      <div className="relative z-20 container mx-auto px-4 flex items-center min-h-screen">
        <div className="max-w-2xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded text-sm font-bold">
            <Star className="w-4 h-4 mr-2 fill-current" />
            NOUVEAU : ALIMENTÉ PAR L'IA
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
            Découvrez votre{" "}
            <span className="text-red-500">
              futur professionnel
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-medium">
            Un rapport gratuit et personnalisé qui analyse votre secteur, identifie vos leviers de croissance, 
            et vous propose une stratégie en moins de 60 secondes.
          </p>
          
          {/* Stats */}
          <div className="flex items-center space-x-6 text-gray-400">
            <span className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
              94% satisfaction
            </span>
            <span>•</span>
            <span>2,500+ dirigeants</span>
            <span>•</span>
            <span className="text-green-400 font-semibold">Analyse instantanée</span>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex items-center space-x-4 pt-4">
            <Button 
              onClick={scrollToForm}
              size="lg" 
              className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-bold rounded-md transition-all duration-300 transform hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5 fill-current" />
              Commencer l'analyse
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="border-2 border-gray-600 text-white hover:border-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-md transition-all duration-300"
            >
              <Info className="mr-2 h-5 w-5" />
              Plus d'infos
            </Button>
          </div>
          
          <div className="text-sm text-gray-500">
            ✨ Gratuit • 📄 PDF Premium • 🚀 Instantané
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
