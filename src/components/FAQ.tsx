
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Zap, Brain, CheckCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "Comment l'IA garantit-elle la précision des analyses ?",
      answer: "Notre algorithme de machine learning analyse plus de 100,000 points de données sectorielles actualisés en temps réel, avec un taux de précision de 95% validé par plus de 5,000 dirigeants.",
      icon: Brain
    },
    {
      question: "Mes données personnelles sont-elles sécurisées ?",
      answer: "Absolument. Nous utilisons un chiffrement de niveau bancaire (AES-256) et respectons les standards RGPD les plus stricts. Vos données ne sont jamais partagées avec des tiers.",
      icon: Shield
    },
    {
      question: "Quelle est la durée de génération du rapport ?",
      answer: "Votre Portrait Prédictif est généré instantanément grâce à notre infrastructure cloud et livré dans votre boîte mail en moins de 2 minutes.",
      icon: Zap
    },
    {
      question: "Le service est-il vraiment gratuit ?",
      answer: "Oui, le Portrait Prédictif de base est 100% gratuit à vie. Nous proposons également des analyses approfondies premium pour les entreprises souhaitant aller plus loin.",
      icon: CheckCircle
    },
    {
      question: "Puis-je personnaliser davantage mon analyse ?",
      answer: "Le rapport gratuit est déjà hautement personnalisé. Pour des analyses sectorielles plus poussées ou des consultations individuelles, nous proposons des services premium sur demande.",
      icon: Brain
    },
    {
      question: "Sur quelles données se basent vos prédictions ?",
      answer: "Nos prédictions combinent vos réponses, les big data sectorielles, les tendances marché en temps réel, et notre base de connaissances de plus de 15,000 success stories analysées.",
      icon: Brain
    }
  ];

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Questions{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              fréquentes
            </span>
          </h2>
          <p className="text-xl text-slate-400">
            Tout ce que vous devez savoir sur notre technologie IA
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-6">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl hover:border-white/30 transition-all duration-300"
            >
              <AccordionTrigger className="px-8 py-6 text-left font-bold text-white hover:no-underline group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <faq.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-slate-300 text-lg leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
