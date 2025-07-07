
import { Star, Quote, Play } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Chief Innovation Officer",
      company: "TechFlow Solutions",
      content: "Cette IA a révolutionné ma vision stratégique. Les insights prédictifs m'ont permis d'anticiper les tendances de mon secteur avec 6 mois d'avance. Absolument game-changing.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
      featured: true
    },
    {
      name: "Marcus Rodriguez",
      role: "VP Digital Transformation",
      company: "Global Dynamics",
      content: "Le niveau de personnalisation est impressionnant. Chaque recommandation est pertinente et actionnable. ROI immédiat sur mes décisions stratégiques.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
    },
    {
      name: "Elena Nakamura",
      role: "Director of Strategy",
      company: "NextGen Corp",
      content: "L'analyse prédictive a identifié des opportunités que nous n'avions pas vues. Notre croissance a augmenté de 40% en suivant leurs recommandations.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
    }
  ];

  return (
    <section className="py-32 px-4 bg-slate-800">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Ils ont transformé{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              leur carrière
            </span>
          </h2>
          <div className="flex items-center justify-center space-x-8 text-slate-400">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="font-semibold">4.9/5 moyenne</span>
            </div>
            <div className="text-sm">Plus de 5,000 dirigeants</div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2 ${
                testimonial.featured ? 'md:col-span-2' : ''
              }`}
            >
              {/* Hover Play Button */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-110">
                <Play className="w-5 h-5 text-white fill-current ml-0.5" />
              </div>
              
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-white" />
              </div>
              
              {/* Content */}
              <p className="text-white text-lg leading-relaxed mb-8 italic">
                "{testimonial.content}"
              </p>
              
              {/* Rating */}
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Author */}
              <div className="flex items-center space-x-4 border-t border-white/10 pt-6">
                <div className="relative">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-2xl border-2 border-white/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-800"></div>
                </div>
                <div>
                  <p className="font-bold text-white text-lg">{testimonial.name}</p>
                  <p className="text-slate-300 text-sm">{testimonial.role}</p>
                  <p className="text-slate-400 text-xs">{testimonial.company}</p>
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
