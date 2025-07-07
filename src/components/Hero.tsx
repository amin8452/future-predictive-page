
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, TrendingUp } from "lucide-react";

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-40 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Grain Effect */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\"0 0 400 400\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.4\"/%3E%3C/svg%3E')] opacity-30"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 flex items-center min-h-screen">
        <div className="max-w-5xl space-y-12">
          {/* Floating Badge */}
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-full text-sm font-bold text-blue-300 shadow-2xl">
            <Sparkles className="w-5 h-5 mr-3 animate-pulse" />
            POWERED BY NEXT-GEN AI
          </div>
          
          {/* Main Title */}
          <h1 className="text-7xl md:text-9xl font-black text-white leading-tight tracking-tight">
            Découvrez votre{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              futur professionnel
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl md:text-4xl text-gray-300 leading-relaxed font-light max-w-4xl">
            Intelligence artificielle de pointe • Analyse prédictive • Stratégie personnalisée
            <br />
            <span className="text-xl text-gray-400 font-normal">
              Transformez votre carrière en moins de 60 secondes
            </span>
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
            {[
              { label: "Satisfaction", value: "98%", icon: TrendingUp },
              { label: "Dirigeants", value: "5K+", icon: TrendingUp },
              { label: "Précision IA", value: "95%", icon: TrendingUp },
              { label: "Temps", value: "<60s", icon: TrendingUp }
            ].map((stat, index) => (
              <div key={index} className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                <stat.icon className="w-10 h-10 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8 pt-12">
            <Button 
              onClick={scrollToForm}
              size="lg" 
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-8 text-2xl font-black rounded-3xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/25 border-2 border-white/20"
            >
              <Play className="mr-4 h-8 w-8 fill-current group-hover:scale-110 transition-transform" />
              Générer mon rapport IA
              <ArrowRight className="ml-4 h-8 w-8 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="text-center sm:text-left space-y-3">
              <div className="text-lg text-gray-300 font-semibold">Entièrement gratuit</div>
              <div className="flex items-center justify-center sm:justify-start space-x-6 text-sm text-gray-400">
                <span className="flex items-center">✨ Rapport PDF Premium</span>
                <span className="flex items-center">🚀 Livraison instantanée</span>
                <span className="flex items-center">🔒 Données sécurisées</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
