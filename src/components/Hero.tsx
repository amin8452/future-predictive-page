
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react";

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden py-24 px-4 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/50 text-blue-700 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
            Alimenté par l'Intelligence Artificielle
            <Zap className="w-4 h-4 ml-2 text-purple-500" />
          </div>
          
          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-tight">
            Découvrez votre{" "}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 animate-pulse">
                futur professionnel
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-full"></div>
            </span>
            {" "}grâce à l'IA
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Un rapport <span className="font-bold text-blue-600">gratuit et personnalisé</span> qui analyse votre secteur, identifie vos leviers de croissance, 
            et vous propose une feuille de route stratégique en <span className="font-bold text-purple-600">moins de 60 secondes</span>.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 py-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="font-semibold">2,500+ dirigeants</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">94% de satisfaction</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Zap className="w-5 h-5 text-purple-500" />
              <span className="font-semibold">Analyse instantanée</span>
            </div>
          </div>
          
          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
            <Button 
              onClick={scrollToForm}
              size="lg" 
              className="group bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border-0"
            >
              <Sparkles className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              Obtenez votre Portrait Prédictif
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <div className="flex flex-col items-center space-y-2">
              <p className="text-sm text-gray-500 font-medium">✨ Gratuit & Instantané</p>
              <p className="text-sm text-gray-500 font-medium">📄 PDF Premium de 8-12 pages</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
