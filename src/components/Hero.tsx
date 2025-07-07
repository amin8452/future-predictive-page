
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, TrendingUp } from "lucide-react";

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-40 w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Glass Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      <div className="relative z-10 container mx-auto px-4 flex items-center min-h-screen">
        <div className="max-w-6xl space-y-12">
          {/* Floating Status Badge */}
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-cyan-400/30 rounded-full text-sm font-bold text-cyan-300 shadow-2xl animate-pulse">
            <Sparkles className="w-5 h-5 mr-3" />
            IA NEXT-GEN • ANALYSE PRÉDICTIVE • GRATUIT
          </div>
          
          {/* Hero Title */}
          <h1 className="text-7xl md:text-9xl font-black text-transparent bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text leading-tight tracking-tight">
            Révélez votre{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              potentiel IA
            </span>
          </h1>
          
          {/* Dynamic Subtitle */}
          <div className="space-y-6">
            <p className="text-3xl md:text-5xl text-slate-200 leading-relaxed font-light max-w-5xl">
              Intelligence artificielle • Analyse prédictive • Stratégie sur-mesure
            </p>
            <p className="text-xl md:text-2xl text-slate-400 font-normal max-w-4xl">
              Transformez votre vision professionnelle en{" "}
              <span className="text-cyan-400 font-semibold">moins de 60 secondes</span>
            </p>
          </div>
          
          {/* Performance Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
            {[
              { label: "Précision IA", value: "98%", icon: TrendingUp, color: "from-cyan-500 to-blue-500" },
              { label: "Dirigeants", value: "12K+", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
              { label: "Analyses", value: "50K+", icon: TrendingUp, color: "from-emerald-500 to-teal-500" },
              { label: "Génération", value: "<45s", icon: TrendingUp, color: "from-orange-500 to-red-500" }
            ].map((stat, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-500 blur-xl"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center space-y-8 sm:space-y-0 sm:space-x-8 pt-12">
            <Button 
              onClick={scrollToForm}
              size="lg" 
              className="group relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 text-white px-16 py-8 text-2xl font-black rounded-3xl shadow-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-cyan-500/25 border-2 border-cyan-400/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Play className="mr-4 h-8 w-8 fill-current group-hover:scale-110 transition-transform relative z-10" />
              <span className="relative z-10">Générer mon Rapport IA</span>
              <ArrowRight className="ml-4 h-8 w-8 group-hover:translate-x-1 transition-transform relative z-10" />
            </Button>
            
            <div className="text-center sm:text-left space-y-4">
              <div className="text-2xl text-cyan-300 font-bold tracking-wide">100% GRATUIT</div>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-slate-400">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  <span>Rapport PDF Premium</span>
                </span>
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></span>
                  <span>Livraison instantanée</span>
                </span>
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-700"></span>
                  <span>Données sécurisées</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
