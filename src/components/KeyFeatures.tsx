
import { BarChart3, Search, Rocket, FileText } from "lucide-react";

const KeyFeatures = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Recommandations IA 100% personnalisées",
      description: "Analyse approfondie de votre profil et secteur d'activité"
    },
    {
      icon: Search,
      title: "Analyse sectorielle 2025-2027",
      description: "Tendances et opportunités futures de votre marché"
    },
    {
      icon: Rocket,
      title: "3 opportunités d'action prioritaires",
      description: "Plan d'action concret et immédiatement applicable"
    },
    {
      icon: FileText,
      title: "PDF Premium livré par email",
      description: "Rapport professionnel de 8-12 pages personnalisé"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir notre Portrait Prédictif ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une approche innovante qui combine data science et expertise métier
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:shadow-lg transition-shadow">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
