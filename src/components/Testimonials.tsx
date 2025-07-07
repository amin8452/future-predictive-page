
import { Star, Quote, Users, TrendingUp } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jean Dupont",
      role: "DG dans l'industrie tech",
      company: "TechCorp",
      content: "En moins de 2 minutes, j'ai reçu un plan d'action précis et utile. Les recommandations IA m'ont permis d'identifier 3 opportunités majeures que je n'avais pas vues. Bluffant.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
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
    <section className="py-24 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-semibold mb-6">
            <Users className="w-4 h-4 mr-2" />
            Témoignages clients
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Ce que disent nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">utilisateurs</span>
          </h2>
          <div className="flex items-center justify-center space-x-8 text-blue-200">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">Plus de 2,500 dirigeants</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-semibold">4.9/5 de satisfaction</span>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group relative bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-white" />
              </div>
              
              {/* Rating */}
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-white/90 mb-6 italic leading-relaxed group-hover:text-white transition-colors">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center space-x-4 border-t border-white/20 pt-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-white/30"
                />
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-blue-200">{testimonial.role}</p>
                  <p className="text-xs text-blue-300">{testimonial.company}</p>
                </div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
