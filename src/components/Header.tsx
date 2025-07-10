
import { useState } from "react";
import { Menu, X, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Accueil", href: "#hero" },
    { name: "Fonctionnalités", href: "#features" },
    { name: "Vidéo", href: "#video" },
    { name: "Témoignages", href: "#testimonials" },
    { name: "Comment ça marche", href: "#how-it-works" },
    { name: "Formulaire", href: "#lead-form" },
    { name: "FAQ", href: "#faq" }
  ];

  const scrollToSection = (href: string) => {
    console.log('Scroll vers:', href); // Debug
    const element = document.querySelector(href);
    console.log('Élément trouvé:', element); // Debug
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback: essayer de trouver par ID sans #
      const fallbackElement = document.getElementById(href.replace('#', ''));
      if (fallbackElement) {
        fallbackElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('#hero')}>
            <div className="p-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              AI Portrait
              <span className="text-cyan-400 ml-1">Pro</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-slate-300 hover:text-white transition-colors duration-300 text-sm font-medium hover:scale-105 transform"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#lead-form');
              }}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Générer mon PDF
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white hover:text-cyan-400 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 animate-fade-in">
            <nav className="py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300 rounded-lg mx-2"
                >
                  {item.name}
                </button>
              ))}
              <div className="px-4 pt-2">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#lead-form');
                  }}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-2 rounded-lg font-semibold transform hover:scale-105 transition-all"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Générer mon PDF
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
