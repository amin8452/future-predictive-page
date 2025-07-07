
import { BarChart3, Search, Rocket, FileText, Sparkles, Zap } from "lucide-react";

const KeyFeatures = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Recommandations IA 100% personnalisées",
      description: "Analyse approfondie de votre profil et secteur d'activité avec des insights exclusifs",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: Search,
      title: "Analyse sectorielle 2025-2027",
      description: "Tendances et opportunités futures de votre marché basées sur la data science",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      icon: Rocket,
      title: "3 opportunités d'action prioritaires",
      description: "Plan d'action concret et immédiatement applicable pour booster votre carrière",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      icon: FileText,
      title: "PDF Premium livré par email",
      description: "Rapport professionnel de 8-12 pages personnalisé avec design premium",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50"
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Pourquoi nous choisir ?
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Une approche <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">révolutionnaire</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Qui combine data science, intelligence artificielle et expertise métier pour créer votre avenir professionnel
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group relative p-8 rounded-3xl bg-gradient-to-br ${feature.bgGradient} border border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2`}
            >
              {/* Floating Icon */}
              <div className={`relative bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-6`}>
                <feature.icon className="w-8 h-8 text-white" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Zap className="w-3 h-3 text-yellow-800" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700 transition-colors">
                {feature.description}
              </p>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
