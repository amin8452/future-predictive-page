
import { BarChart3, Search, Rocket, FileText, Play, ChevronRight } from "lucide-react";

const KeyFeatures = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Recommandations IA 100% personnalisées",
      description: "Analyse approfondie de votre profil et secteur d'activité avec des insights exclusifs basés sur la data science",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&q=80"
    },
    {
      icon: Search,
      title: "Analyse sectorielle 2025-2027",
      description: "Tendances et opportunités futures de votre marché basées sur l'intelligence artificielle et les big data",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&q=80"
    },
    {
      icon: Rocket,
      title: "3 opportunités d'action prioritaires",
      description: "Plan d'action concret et immédiatement applicable pour booster votre carrière et maximiser votre impact",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop&q=80"
    },
    {
      icon: FileText,
      title: "PDF Premium livré par email",
      description: "Rapport professionnel de 8-12 pages personnalisé avec design premium et insights actionnables",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&q=80"
    }
  ];

  return (
    <section className="py-20 px-4 bg-black">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Pourquoi choisir notre <span className="text-red-500">analyse IA</span> ?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl">
            Une approche révolutionnaire qui combine data science, intelligence artificielle et expertise métier
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-500 cursor-pointer transform hover:scale-105"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                style={{ backgroundImage: `url(${feature.image})` }}
              ></div>
              
              {/* Content */}
              <div className="relative z-10 p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-red-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-4 h-4 mr-2 fill-current" />
                      Découvrir
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
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
