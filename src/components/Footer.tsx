
import { Shield, Mail, Linkedin, Twitter, Instagram, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-800 to-slate-900 text-white py-20 px-4 border-t border-white/10">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <h3 className="text-3xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Portrait Prédictif IA
              </span>
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed text-lg">
              La plateforme de référence pour anticiper votre futur professionnel grâce à l'intelligence artificielle de nouvelle génération. 
              Plus de 5,000 dirigeants nous font confiance.
            </p>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center text-sm text-slate-400 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2">
                <Shield className="w-4 h-4 mr-2 text-green-400" />
                Données sécurisées RGPD
              </div>
              <div className="flex items-center text-sm text-slate-400 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
                IA Next-Gen
              </div>
            </div>
            <div className="flex space-x-4">
              {[
                { icon: Linkedin, href: "#", color: "hover:text-blue-400" },
                { icon: Twitter, href: "#", color: "hover:text-cyan-400" },
                { icon: Instagram, href: "#", color: "hover:text-pink-400" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-12 h-12 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center text-slate-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-white/10`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Ressources</h4>
            <ul className="space-y-4 text-slate-300">
              {[
                "Guide d'utilisation",
                "Cas d'usage sectoriels",
                "Méthologie IA",
                "Centre d'aide",
                "API & Intégrations"
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white transition-colors duration-300 hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Légal & Contact</h4>
            <ul className="space-y-4 text-slate-300 mb-6">
              {[
                "Politique de confidentialité",
                "Mentions légales",
                "CGU",
                "Cookies"
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white transition-colors duration-300 hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="space-y-3 text-slate-300">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-purple-400" />
                <span>support@portraitpredictif.ai</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 mb-4 md:mb-0">
              © 2024 Portrait Prédictif IA. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4 text-sm text-slate-400">
              <span>Propulsé par l'IA Next-Gen</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Serveurs 100% verts</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
