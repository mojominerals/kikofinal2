
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Flame, ThumbsUp, Zap } from 'lucide-react';

const KIKO_HEADSHOT = "https://i.ibb.co/D0nvGVC/Kiko-Head-001-01-frei-cropped-removebg-preview.png";
const FALLBACK_HEADSHOT = "https://i.ibb.co/STXFBKy/Whats-App-Image-2026-02-03-at-14-43-05-removebg-preview.png";

const KIKO_QUOTES = [
  "Ich bin nöd dä Hellscht, aber für dich reicht's noch!",
  "Hör auf mich zu drücken, ich bin kein Schwyzerörgeli!",
  "Hast du Käse dabei? Ohne Fondue läuft hier gar nichts.",
  "Bisch du au nöd dä Hellscht? Willkommen im Club!",
  "Mein Kopf ist wie ein Emmentaler: Hauptsächlich Löcher!",
  "Achtung, nukleare Comedy! Schutzbrille anziehen.",
  "Yodel-ay-hee-hopp Schwiiz! Wer hat's erfunden?",
  "Meine Frisur ist aerodynamisch für maximale Verwirrung.",
  "Ich hab mehr Kühe als Follower, aber die Kühe lachen lauter.",
  "Dini Mueter findet mich extrem glatt!",
  "Sali du! Bock auf eine Runde Berg-Comedy?",
  "Ich bin wie ein Sack Kartoffeln: Bodenständig und meistens im Dunkeln.",
  "Nukleare Energie? Ich hab nicht mal genug Saft für mein Handy!",
  "Willst du ein Autogramm? Ich kann nur mit Daumenabdruck unterschreiben.",
  "Hilfe! Ich bin in einer Website gefangen!",
  "Wer hat das Licht ausgemacht? Ach so, meine Augen sind zu.",
  "Ich bin so hell wie eine Taschenlampe ohne Batterien.",
  "Komm an meine Shows, ich brauche das Geld für Käse!"
];

const KikoAvatar: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSquinting, setIsSquinting] = useState(false);
  const [isWinking, setIsWinking] = useState(false);
  const [quote, setQuote] = useState("");
  const [showSticker, setShowSticker] = useState(false);

  const handleClick = () => {
    if (isClicked) return; // Prevent spamming while active

    // Ensure we pick a random quote that isn't the current one to avoid perceived cycles/repeats
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * KIKO_QUOTES.length);
    } while (KIKO_QUOTES[nextIndex] === quote && KIKO_QUOTES.length > 1);

    const randomQuote = KIKO_QUOTES[nextIndex];
    setQuote(randomQuote);
    setIsClicked(true);
    setShowSticker(true);
    
    // SEQUENCE: Squint/Grimace -> Wink
    setIsSquinting(true);
    
    setTimeout(() => {
      setIsSquinting(false);
      setIsWinking(true);
      
      setTimeout(() => {
        setIsWinking(false);
      }, 400); // Wink duration
    }, 300); // Squint/Grimace duration

    // Sticker and bubble duration
    setTimeout(() => {
      setIsClicked(false);
      setShowSticker(false);
    }, 3000);
  };

  // Variants for individual eyelids
  const eyelidVariants: Variants = {
    open: { scaleY: 0, opacity: 0 },
    blink: {
      scaleY: [0, 1, 0, 1, 0], // Subtle double-flicker blink
      opacity: 1,
      transition: {
        duration: 0.4,
        times: [0, 0.2, 0.4, 0.6, 1],
        repeat: Infinity,
        repeatDelay: 2.5
      }
    },
    squint: {
      scaleY: 0.65, // Partially closed for grimace
      opacity: 1,
      transition: { duration: 0.1, ease: "easeOut" as const }
    },
    wink: {
      scaleY: 1, // Fully closed
      opacity: 1,
      transition: { duration: 0.05 }
    }
  };

  return (
    <div className="relative inline-block select-none">
      {/* Speech Bubble */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, y: -120, rotate: -5 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="absolute left-1/2 -translate-x-1/2 z-50 w-72 bg-white text-jet p-6 rounded-3xl border-4 border-jet shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] pointer-events-none"
          >
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-b-4 border-r-4 border-jet rotate-45" />
            <p className="font-comic text-xl text-center leading-tight uppercase font-black italic">
              "{quote}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thumbs Up Sticker Animation */}
      <AnimatePresence>
        {showSticker && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -45, x: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: 12, x: -140, y: -20 }}
            exit={{ opacity: 0, scale: 2, rotate: 45 }}
            className="absolute top-1/4 left-0 z-40"
          >
            <div className="bg-banana p-4 rounded-full border-4 border-jet shadow-flyer flex items-center justify-center">
              <ThumbsUp size={50} fill="black" className="text-jet" />
              <div className="absolute -bottom-4 bg-vest text-white text-[10px] font-black px-2 py-0.5 border-2 border-jet uppercase tracking-widest whitespace-nowrap rotate-[-5deg]">
                SUPER GLATT!
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95, rotate: -3 }}
        onClick={handleClick}
        className="cursor-pointer relative group"
      >
        {/* Glow behind head */}
        <div className="absolute inset-0 bg-white blur-3xl opacity-0 group-hover:opacity-20 transition-opacity rounded-full"></div>
        
        <div className="w-56 h-56 md:w-72 md:h-72 relative z-10">
          <motion.img 
            src={KIKO_HEADSHOT} 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = FALLBACK_HEADSHOT;
            }}
            alt="Kiko Headshot" 
            animate={isClicked ? { 
              rotate: isSquinting ? [0, -2, 2, -2, 0] : [0, -5, 5, -5, 0],
              y: isSquinting ? [0, -2, 0] : [0, -10, 0],
              scale: isSquinting ? 1.02 : 1
            } : {}}
            transition={{ 
              rotate: isSquinting ? { duration: 0.1, repeat: 2 } : { type: "spring", stiffness: 300, damping: 10 }
            }}
            className="w-full h-full object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_40px_rgba(248,228,52,0.4)]"
          />

          {/* EYE CONTROL SYSTEM */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Left Eye Eyelid (Squints on grimace, Blinks on hover) */}
            <motion.div 
              variants={eyelidVariants}
              initial="open"
              animate={isSquinting || isWinking ? "squint" : (isHovered ? "blink" : "open")}
              style={{ 
                top: '32.5%', 
                left: '38.5%', 
                width: '11.5%', 
                height: '7%', 
                originY: 0 
              }}
              className="absolute bg-jet rounded-b-full z-20"
            />
            {/* Right Eye Eyelid (Winks on click, Squints on grimace, Blinks on hover) */}
            <motion.div 
              variants={eyelidVariants}
              initial="open"
              animate={isWinking ? "wink" : (isSquinting ? "squint" : (isHovered ? "blink" : "open"))}
              style={{ 
                top: '32.5%', 
                left: '55%', 
                width: '11.5%', 
                height: '7%', 
                originY: 0 
              }}
              className="absolute bg-jet rounded-b-full z-20"
            />
          </div>
        </div>
        
        {/* Floating Zap Icon */}
        <motion.div 
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 15, -15, 0]
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute -bottom-2 -right-2 bg-vest text-white p-5 rounded-full border-4 border-jet shadow-flyer z-20"
        >
          <Zap size={32} fill="white" />
        </motion.div>

        {/* Call to Action Tag */}
        <div className="absolute -top-8 -left-8 bg-banana text-jet text-sm font-black px-5 py-2 border-4 border-jet rounded-full uppercase tracking-tighter shadow-flyer opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-2 rotate-[-15deg]">
          Nuklear Drücken!
        </div>
      </motion.div>
    </div>
  );
};

export default KikoAvatar;
