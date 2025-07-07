
import { UserCheck, Brain, Mail, Target } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserCheck,
      title: "Remplissez le formulaire",
      description: "Quelques questions sur votre profil et vos ambitions",
      step: "01"
    },
    {
      icon: Brain,
      title: "Analyse par IA en temps réel",
      description: "Notre algorithme traite vos données et analyse votre secteur",
      step: "02"
    },
    {
      icon: Mail,
      title: "Recevez votre PDF",
      description: "Rapport personnalisé livré dans votre boîte mail",
      step: "03"
    },
    {
      icon: Target,
      title: "Lancez votre stratégie",
      description: "Implémentez les 3 actions prioritaires recommandées",
      step: "04"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-gray-600">
            4 étapes simples pour transformer votre avenir professionnel
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 transform -translate-x-1/2"></div>
              )}
              
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {step.step}
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
                  <step.icon className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
