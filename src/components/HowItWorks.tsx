
import { UserCheck, Brain, Mail, Target, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserCheck,
      title: "Formulaire intelligent",
      description: "Renseignez vos informations professionnelles et vos ambitions stratégiques",
      step: "01",
      gradient: "from-purple-600 to-blue-600"
    },
    {
      icon: Brain,
      title: "Analyse IA en temps réel",
      description: "Notre algorithme de machine learning traite instantanément vos données",
      step: "02",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: Mail,
      title: "Livraison instantanée",
      description: "Recevez votre rapport premium personnalisé dans les 2 minutes",
      step: "03",
      gradient: "from-cyan-600 to-teal-600"
    },
    {
      icon: Target,
      title: "Implémentation stratégique",
      description: "Suivez votre roadmap personnalisée et transformez votre carrière",
      step: "04",
      gradient: "from-teal-600 to-green-600"
    }
  ];

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Comment ça{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              fonctionne
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            4 étapes simples pour révolutionner votre avenir professionnel
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-white/10 transform -translate-x-1/2 z-0">
                  <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/30" />
                </div>
              )}
              
              <div className="relative z-10 text-center">
                {/* Step Circle */}
                <div className={`relative mx-auto w-24 h-24 bg-gradient-to-r ${step.gradient} rounded-3xl mb-6 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-3xl"></div>
                  <span className="text-2xl font-black text-white z-10">{step.step}</span>
                  
                  {/* Icon Badge */}
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <step.icon className={`w-6 h-6 bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`} />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
                  {step.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-sm font-semibold text-purple-300">
            <Target className="w-4 h-4 mr-2" />
            Processus 100% automatisé • Résultats garantis
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
