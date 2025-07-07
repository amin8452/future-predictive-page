
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, TrendingUp } from "lucide-react";

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-40 w-80 h-80 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>
      
      {/* Grain Effect */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.4"/%3E%3C/svg%3E')] opacity-30"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 flex items-center min-h-screen">
        <div className="max-w-4xl space-y-10">
          {/* Floating Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-sm font-semibold text-purple-300 shadow-2xl">
            <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
            POWERED BY NEXT-GEN AI
          </div>
          
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-black text-white leading-tight">
            Découvrez votre{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              futur professionnel
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-slate-300 leading-relaxed font-light max-w-4xl">
            Intelligence artificielle de pointe • Analyse prédictive • Stratégie personnalisée
            <br />
            <span className="text-xl text-slate-400 font-normal">
              Transformez votre carrière en moins de 60 secondes
            </span>
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
            {[
              { label: "Satisfaction", value: "98%", icon: TrendingUp },
              { label: "Dirigeants", value: "5K+", icon: TrendingUp },
              { label: "Précision IA", value: "95%", icon: TrendingUp },
              { label: "Temps", value: "<60s", icon: TrendingUp }
            ].map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-500">
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8">
            <Button 
              onClick={scrollToForm}
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500/25"
            >
              <Play className="mr-3 h-6 w-6 fill-current" />
              Générer mon rapport IA
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            
            <div className="text-center sm:text-left">
              <div className="text-sm text-slate-400 mb-2">Entièrement gratuit</div>
              <div className="flex items-center justify-center sm:justify-start space-x-4 text-xs text-slate-500">
                <span>✨ Rapport PDF Premium</span>
                <span>🚀 Livraison instantanée</span>
                <span>🔒 Données sécurisées</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
