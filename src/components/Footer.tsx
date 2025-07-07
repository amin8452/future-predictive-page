
import { Shield, Mail, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Portrait Prédictif IA
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              L'outil de référence pour anticiper votre futur professionnel grâce à l'intelligence artificielle. 
              Plus de 2,500 dirigeants nous font confiance.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-sm text-gray-400">
                <Shield className="w-4 h-4 mr-2" />
                Données sécurisées RGPD
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens utiles</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CGU</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>support@portraitpredictif.ai</span>
              </div>
              <div className="flex items-center">
                <Linkedin className="w-4 h-4 mr-2" />
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Portrait Prédictif IA. Tous droits réservés. | Propulsé par l'Intelligence Artificielle
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
