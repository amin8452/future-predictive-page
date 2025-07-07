
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Mes données personnelles sont-elles sécurisées ?",
      answer: "Absolument. Nous respectons le RGPD et ne partageons jamais vos données avec des tiers. Toutes les informations sont chiffrées et stockées de manière sécurisée."
    },
    {
      question: "Quelle est la précision des analyses IA ?",
      answer: "Notre algorithme s'appuie sur plus de 50 000 données sectorielles actualisées en temps réel. Le taux de satisfaction de nos recommandations dépasse 94%."
    },
    {
      question: "Combien de temps pour recevoir mon portrait ?",
      answer: "Votre Portrait Prédictif est généré instantanément et envoyé par email dans les 2-3 minutes suivant la soumission du formulaire."
    },
    {
      question: "Le service est-il vraiment gratuit ?",
      answer: "Oui, le Portrait Prédictif de base est 100% gratuit. Nous proposons également des analyses approfondies premium pour les entreprises."
    },
    {
      question: "Puis-je partager mon portrait avec mon équipe ?",
      answer: "Bien sûr ! Le PDF généré vous appartient entièrement. Vous pouvez le partager et l'utiliser comme bon vous semble."
    },
    {
      question: "Sur quoi se basent vos recommandations ?",
      answer: "Nos analyses combinent vos réponses, les données de votre secteur, les tendances marché, et notre base de connaissances de plus de 10 000 success stories."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Questions fréquentes
          </h2>
          <p className="text-xl text-gray-600">
            Tout ce que vous devez savoir sur notre Portrait Prédictif
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white rounded-lg border shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
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
