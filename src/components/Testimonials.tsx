
import { Star, Quote, Play, ThumbsUp } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jean Dupont",
      role: "DG dans l'industrie tech",
      company: "TechCorp",
      content: "En moins de 2 minutes, j'ai reçu un plan d'action précis et utile. Les recommandations IA m'ont permis d'identifier 3 opportunités majeures que je n'avais pas vues. Absolument bluffant.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      featured: true
    },
    {
      name: "Marie Leblanc",
      role: "Directrice Marketing Digital",
      company: "InnovCorp",
      content: "Les insights sur mon secteur m'ont permis d'anticiper les changements du marché. Le rapport PDF est d'une qualité exceptionnelle, très professionnel.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Pierre Martin",
      role: "Responsable Innovation",
      company: "FutureTech",
      content: "Un outil qui va bien au-delà de mes attentes. Les recommandations sont très pertinentes et m'ont aidé à structurer ma stratégie à 3 ans.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Ce que disent nos <span className="text-red-500">utilisateurs</span>
          </h2>
          <div className="flex items-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="w-5 h-5 text-green-500" />
              <span className="font-semibold">Plus de 2,500 dirigeants</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-semibold">4.9/5 de satisfaction</span>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`group relative bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                testimonial.featured ? 'md:col-span-2 md:row-span-1' : ''
              }`}
            >
              {/* Play Button Overlay */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Play className="w-5 h-5 text-white fill-current ml-0.5" />
              </div>
              
              {/* Quote Icon */}
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Quote className="w-4 h-4 text-white" />
              </div>
              
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-white mb-6 italic leading-relaxed text-lg">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center space-x-4 border-t border-gray-700 pt-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-gray-600"
                />
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
