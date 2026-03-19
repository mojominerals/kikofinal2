
import React, { useEffect, useState } from 'react';
import { X, Instagram, Palmtree } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const KIKO_HEADSHOT = "https://i.ibb.co/D0nvGVC/Kiko-Head-001-01-frei-cropped-removebg-preview.png";
const FALLBACK_HEADSHOT = "https://i.ibb.co/STXFBKy/Whats-App-Image-2026-02-03-at-14-43-05-removebg-preview.png";

const Popup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 15000); // 15 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-jet/90 z-[70] flex items-center justify-center p-4 backdrop-blur-md"
      >
        <motion.div 
          initial={{ scale: 0.5, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          className="bg-white border-8 border-jet max-w-md w-full p-6 md:p-8 relative shadow-flyer"
        >
          {/* Palmtree Decor - Moved slightly inside for mobile safety */}
          <div className="absolute -top-6 -left-4 bg-banana p-3 md:p-4 rounded-full border-4 border-jet z-10 animate-bounce shadow-sm">
            <Palmtree size={24} className="text-jet md:w-8 md:h-8" />
          </div>

          {/* CLOSE BUTTON - Repositioned inside the modal for mobile visibility */}
          <button 
            onClick={() => setIsVisible(false)}
            aria-label="Schließen"
            className="absolute top-2 right-2 md:-top-6 md:-right-6 bg-vest text-white p-2 md:p-3 rounded-full border-4 border-jet hover:scale-110 transition-transform shadow-flyer z-50 flex items-center justify-center"
          >
            <X size={24} strokeWidth={3} />
          </button>

          <div className="text-center relative">
            <div className="bg-sky p-2 border-4 border-jet inline-block mb-4 md:mb-6 shadow-banana transform -rotate-2">
                <img 
                    src={KIKO_HEADSHOT} 
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = FALLBACK_HEADSHOT;
                    }}
                    alt="Kiko starrt dich an" 
                    className="w-32 h-32 md:w-40 md:h-40 object-cover grayscale"
                />
            </div>
            
            {/* Yellow with black lines (banana-text class) */}
            <h3 className="text-5xl md:text-6xl font-display mb-4 banana-text leading-none uppercase">
              GEHST DU SCHON?
            </h3>
            
            <p className="font-comic text-xl md:text-2xl text-jet mb-6 md:mb-8 px-2">
              Folge lieber meinen Fehlentscheidungen auf Instagram!
            </p>
            
            <a 
              href="https://www.instagram.com/kikomedy/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-jet text-banana font-display text-3xl py-4 hover:bg-vest hover:text-white transition-all border-4 border-transparent hover:border-jet shadow-flyer mb-6 uppercase"
            >
              <Instagram size={28} /> FOLGE KIKO
            </a>
            
            <button 
              onClick={() => setIsVisible(false)}
              className="text-xs md:text-sm font-bold text-gray-400 hover:text-jet underline tracking-widest uppercase transition-colors"
            >
              Nein, ich bin lieber einsam
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Popup;
