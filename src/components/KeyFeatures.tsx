
import { Brain, Zap, Target, Download, ChevronRight } from "lucide-react";

const KeyFeatures = () => {
  const features = [
    {
      icon: Brain,
      title: "IA Prédictive Avancée",
      description: "Algorithmes d'apprentissage automatique analysant plus de 100K points de données sectorielles",
      gradient: "from-purple-500 to-blue-500",
      color: "purple"
    },
    {
      icon: Zap,
      title: "Analyse Instantanée",
      description: "Génération de votre profil prédictif en temps réel grâce à notre infrastructure cloud",
      gradient: "from-cyan-500 to-teal-500",
      color: "cyan"
    },
    {
      icon: Target,
      title: "Stratégie Personnalisée",
      description: "Roadmap sur-mesure avec 3 actions prioritaires basées sur votre secteur et vos ambitions",
      gradient: "from-pink-500 to-rose-500",
      color: "pink"
    },
    {
      icon: Download,
      title: "Rapport Premium",
      description: "Document professionnel de 12-15 pages avec insights exclusifs et design premium",
      gradient: "from-orange-500 to-red-500",
      color: "orange"
    }
  ];

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Technologie{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              révolutionnaire
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Notre IA de nouvelle génération combine machine learning, big data et expertise métier
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 shadow-lg`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 text-lg leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                <div className="flex items-center text-white/70 group-hover:text-white transition-colors duration-300">
                  <span className="text-sm font-medium">Découvrir</span>
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
