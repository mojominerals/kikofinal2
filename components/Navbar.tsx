
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ÜBER MICH', href: '#about' },
    { name: 'VIDEOS', href: '#videos' },
    { name: 'TICKETS', href: '#shows' },
    { name: 'MERCH', href: '#merch' },
    { name: 'ROAST', href: '#roast' },
    { name: 'BOOKING', href: '#contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const isMobile = window.innerWidth < 768;
      const navbarHeight = isMobile ? 80 : 128; // Updated to match h-20 (80px) or h-32 (128px)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsOpen(false);
      window.history.pushState(null, '', href);
    }
  };

  const INSTAGRAM_URL = "https://www.instagram.com/kikomedy/";
  const LOGO_URL = "https://i.ibb.co/STXFBKy/Whats-App-Image-2026-02-03-at-14-43-05-removebg-preview.png";

  return (
    <nav className="fixed top-0 w-full z-50 bg-sky/95 backdrop-blur-sm border-b-4 border-jet">
      {/* Ticker - SIGNIFICANTLY BIGGER */}
      <a 
        href={INSTAGRAM_URL} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block bg-vest text-white text-xl md:text-5xl font-bold py-2 md:py-4 overflow-hidden whitespace-nowrap border-b-4 border-jet hover:bg-banana hover:text-jet transition-colors group cursor-pointer"
      >
        <div className="animate-[marquee_20s_linear_infinite] group-hover:[animation-play-state:paused] inline-block font-display tracking-tighter uppercase">
          NÖD DÄ HELLSCHT TOUR 2026 | TICKETS VERKAUFEN SICH SCHNELL | FOLGE KIKO AUF INSTAGRAM @KIKOMEDY | MEHR KÜHE ALS GEHIRNZELLEN | JETZT FOLGEN FÜR TÄGLICHE ROASTS | KÄSE MITBRINGEN | FOLGE KIKO AUF INSTAGRAM @KIKOMEDY | TÄGLICHE ROASTS | KÄSE MITBRINGEN |
        </div>
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-24">
          <div className="flex-shrink-0 flex items-center">
            <motion.a 
              href="#home" 
              onClick={(e) => handleScroll(e, '#home')}
              whileHover={{ 
                y: -5,
                scale: 1.15,
                rotate: [0, -3, 3, 0]
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 10,
                rotate: { duration: 0.3 }
              }}
              className="block h-12 md:h-20 active:scale-95 py-1 cursor-pointer"
            >
              <img 
                src={LOGO_URL} 
                alt="KIKOMEDY" 
                className="h-full w-auto object-contain drop-shadow-lg"
              />
            </motion.a>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navLinks.map((link) => {
                const isTickets = link.name === 'TICKETS';
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className={`font-display text-2xl px-4 py-2 transition-all uppercase ${
                      isTickets 
                        ? 'bg-banana text-jet border-4 border-jet shadow-flyer -rotate-2 hover:rotate-0 hover:scale-110 mx-2' 
                        : 'text-jet hover:bg-banana hover:shadow-banana border-2 border-transparent hover:border-jet'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-banana text-jet p-2 border-2 border-jet shadow-banana hover:bg-white focus:outline-none"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-sky border-b-4 border-jet">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const isTickets = link.name === 'TICKETS';
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={`font-display text-2xl text-jet block px-3 py-2 uppercase text-center ${
                    isTickets 
                      ? 'bg-banana border-4 border-jet shadow-flyer my-2' 
                      : 'border-b-2 border-jet/10 hover:bg-banana'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
