
import React from 'react';
import { motion } from 'framer-motion';
import { Palmtree, ArrowDownCircle, Plane } from 'lucide-react';

// New high-energy empty poster provided by user
const TOUR_POSTER_URL = "https://i.ibb.co/0j0dQWWs/1766828780175-hkouk2hwt7.jpg";

const Hero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const isMobile = window.innerWidth < 768;
      const navbarHeight = isMobile ? 80 : 128; // Updated to match h-20 or h-32
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <section id="home" className="relative min-h-screen alpine-gradient flex flex-col items-center justify-center overflow-hidden pt-24 md:pt-32 px-4 scroll-mt-32">
      <div className="absolute top-20 left-10 text-white opacity-20 hidden md:block">
        <Plane size={100} className="rotate-45" />
      </div>
      
      <div className="absolute bottom-20 right-10 flex gap-4 opacity-50 hidden md:flex">
        <Palmtree size={64} className="text-alpine" />
        <Palmtree size={80} className="text-alpine" />
      </div>

      <div className="relative z-20 text-center max-w-6xl w-full py-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
             <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-2"
            >
              <span className="font-display text-2xl md:text-5xl text-jet tracking-widest drop-shadow-lg block uppercase">KIKO PRÄSENTIERT</span>
            </motion.div>

            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-display text-5xl md:text-9xl leading-none banana-text uppercase mb-4"
            >
              NÖD DÄ <br/> HELLSCHT
            </motion.h1>

            <p className="font-comic text-xl md:text-3xl text-jet mb-8 leading-tight max-w-md mx-auto lg:mx-0">
               "Die einzige Tour, bei der die Kühe schlauer sind als der Künstler."
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="#shows" 
                  onClick={(e) => handleScroll(e, '#shows')}
                  className="bg-vest text-white font-display text-2xl md:text-4xl px-6 py-3 md:px-10 md:py-5 border-4 border-jet shadow-flyer hover:bg-jet hover:text-banana transition-all text-center transform -rotate-2 hover:rotate-0"
                >
                    TICKETS HOLEN
                </a>
                <a 
                  href="#merch" 
                  onClick={(e) => handleScroll(e, '#merch')}
                  className="bg-white text-jet font-display text-xl md:text-3xl px-6 py-3 md:px-10 md:py-5 border-4 border-jet shadow-flyer hover:bg-banana transition-all text-center transform rotate-1 hover:rotate-0"
                >
                    ZEUG KAUFEN
                </a>
            </div>
          </div>

          <div className="flex-1 relative order-1 lg:order-2 w-full max-w-md">
            <motion.div
              initial={{ y: 50, opacity: 0, rotate: 5 }}
              animate={{ y: 0, opacity: 1, rotate: -3 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
              className="relative z-10 border-[12px] border-white shadow-[30px_30px_0px_0px_rgba(0,0,0,0.3)] overflow-hidden rounded-sm group bg-white"
            >
              <img 
                src={TOUR_POSTER_URL} 
                alt="KIKO Nöd Dä Hellscht Tour 2026 Poster" 
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </motion.div>
            
            <div className="absolute -bottom-8 -left-8 bg-banana p-4 rounded-full border-4 border-jet z-20 animate-bounce shadow-flyer hidden md:block">
              <Palmtree size={48} className="text-jet" />
              <div className="font-display text-xs text-jet text-center font-black uppercase">Offizielles<br/>Poster</div>
            </div>
          </div>

        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-jet z-30"
      >
        <ArrowDownCircle size={48} className="text-jet opacity-50" />
      </motion.div>
    </section>
  );
};

export default Hero;
