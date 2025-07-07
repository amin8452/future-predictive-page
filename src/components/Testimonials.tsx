
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jean Dupont",
      role: "DG dans l'industrie tech",
      content: "En moins de 2 minutes, j'ai reçu un plan d'action précis et utile. Bluffant.",
      rating: 5
    },
    {
      name: "Marie Leblanc",
      role: "Directrice Marketing Digital",
      content: "Les insights sur mon secteur m'ont permis d'identifier 3 opportunités majeures.",
      rating: 5
    },
    {
      name: "Pierre Martin",
      role: "Responsable Innovation",
      content: "Un outil qui va bien au-delà de mes attentes. Recommandations très pertinentes.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-xl text-gray-600">
            Plus de 2,500 dirigeants nous font confiance
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
