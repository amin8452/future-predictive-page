
import { Brain, Zap, Target, Download, ChevronRight, Sparkles } from "lucide-react";

const KeyFeatures = () => {
  const features = [
    {
      icon: Brain,
      title: "IA Deepseek V3 Avancée",
      description: "Algorithmes de pointe analysant plus de 150K points de données sectorielles avec une précision inégalée",
      gradient: "from-purple-500 to-blue-500",
      color: "purple"
    },
    {
      icon: Zap,
      title: "Analyse Ultra-Rapide",
      description: "Génération de votre profil prédictif en moins de 30 secondes grâce à notre infrastructure cloud optimisée",
      gradient: "from-cyan-500 to-teal-500",
      color: "cyan"
    },
    {
      icon: Target,
      title: "Stratégie Hyper-Personnalisée",
      description: "Roadmap intelligente avec 5 actions prioritaires basées sur votre secteur, vos ambitions et les tendances du marché",
      gradient: "from-pink-500 to-rose-500",
      color: "pink"
    },
    {
      icon: Download,
      title: "Rapport Premium HD",
      description: "Document professionnel de 15-20 pages avec insights exclusifs, graphiques interactifs et design premium",
      gradient: "from-orange-500 to-red-500",
      color: "orange"
    }
  ];

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-sm font-semibold text-purple-300 mb-8">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            Powered by Deepseek V3
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Technologie{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              révolutionnaire
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Notre IA de nouvelle génération combine Deepseek V3, machine learning avancé et expertise métier
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2 hover:scale-105"
            >
              {/* Enhanced Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-15 rounded-3xl transition-opacity duration-500 blur-xl`}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 text-lg leading-relaxed mb-6 group-hover:text-slate-300 transition-colors duration-300">
                  {feature.description}
                </p>
                
                <div className="flex items-center text-white/70 group-hover:text-white transition-colors duration-300">
                  <span className="text-sm font-medium">Découvrir</span>
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>

              {/* Floating particles on hover */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
              <div className="absolute bottom-8 left-8 w-1 h-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500 delay-200"></div>
            </div>
          ))}
        </div>

        {/* New trust indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-white/10">
          {[
            { metric: "99.8%", label: "Précision IA" },
            { metric: "< 30s", label: "Temps moyen" },
            { metric: "15K+", label: "Utilisateurs" },
            { metric: "4.9/5", label: "Satisfaction" }
          ].map((stat, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="text-3xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.metric}
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
