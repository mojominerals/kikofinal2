
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, Variants } from 'framer-motion';
import { Instagram, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { initMetaPixel } from './services/metaPixel';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Videos from './components/Videos';
import Shows from './components/Shows';
import Merch from './components/Merch';
import Roast from './components/Roast';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Popup from './components/Popup';

const KIKO_HEADSHOT = "https://kikomedy.com/img/Kiko_Head_001-01-frei_cropped.png";
const FALLBACK_HEADSHOT = "https://i.ibb.co/STXFBKy/Whats-App-Image-2026-02-03-at-14-43-05-removebg-preview.png"; // Using the logo as fallback

// Comedic typewriter effect component
const TypewriterText: React.FC<{ text: string, className?: string }> = ({ text, className }) => {
  const characters = Array.from(text);
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 * i },
    }),
  };

  // Fixed: Added explicit Variants type and used 'as const' for the transition type to resolve AnimationGeneratorType error
  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.div
      style={{ display: "flex", overflow: "hidden", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {characters.map((char, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ display: "inline-block", marginRight: char === " " ? "0.3em" : "0" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Comedic transition wrapper for sections
const ComedicSection: React.FC<{ children: React.ReactNode, id: string }> = ({ children, id }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
      whileInView={{ 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        transition: { 
          type: "spring" as const, 
          stiffness: 100, 
          damping: 15,
          duration: 0.8
        } 
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
};

// Main App Component for KIKO Comedy Empire
const App: React.FC = () => {
  const [konamiInput, setKonamiInput] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  
  // Enhanced Parallax: Kiko peeks, moves vertically, and rotates based on scroll
  // Adjusted range to appear sooner (0.01) and stay longer (0.95)
  const kikoX = useTransform(scrollYProgress, [0.01, 0.05, 0.95, 0.99], [-150, 0, 0, -150]);
  const kikoY = useTransform(scrollYProgress, [0, 1], [-100, 100]); // Subtle vertical shift
  const kikoRotate = useTransform(scrollYProgress, [0, 1], [-10, 40]);

  const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  const viralAlerts = [
    "Ein Reel von @kikomedy hat gerade 1 Mio. Views erreicht!",
    "Jemand in Basel hat gerade deinen letzten Roast geteilt.",
    "Neuer Follower aus den Schweizer Alpen! 🐄",
    "Ticketverkäufe für Zürich EXPLODIEREN!",
    "Warnung: Hohes Level an Comedy erkannt.",
    "User @swiss_cow_king folgt dir jetzt.",
  ];

  useEffect(() => {
    initMetaPixel();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = [...konamiInput, e.key];
      if (newInput.length > KONAMI_CODE.length) {
        newInput.shift();
      }
      setKonamiInput(newInput);

      if (JSON.stringify(newInput) === JSON.stringify(KONAMI_CODE)) {
        triggerEasterEgg();
        setKonamiInput([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    const notificationInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setNotification(viralAlerts[Math.floor(Math.random() * viralAlerts.length)]);
        setTimeout(() => setNotification(null), 4000);
      }
    }, 12000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(notificationInterval);
    };
  }, [konamiInput]);

  const triggerEasterEgg = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#f8e434', '#c62828', '#64b5f6']
      });
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#f8e434', '#c62828', '#64b5f6']
      });
    }, 250);

    setNotification("BANANA-MODUS AKTIVIERT! 🍌");
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="font-body bg-sky text-jet min-h-screen selection:bg-banana selection:text-jet overflow-x-hidden">
      <Navbar />
      
      {/* Scroll-based typing reveal for the Hero sub-headline */}
      <Hero />

      <ComedicSection id="about">
        <About />
      </ComedicSection>

      <div className="py-12 bg-jet overflow-hidden border-y-8 border-white">
        <TypewriterText 
          text="NUKLEARE COMEDY EXPLOSION" 
          className="text-6xl md:text-8xl font-display text-banana uppercase text-center"
        />
      </div>

      <ComedicSection id="videos">
        <Videos />
      </ComedicSection>

      <ComedicSection id="shows">
        <Shows />
      </ComedicSection>

      <ComedicSection id="merch">
        <Merch />
      </ComedicSection>

      <div className="bg-banana py-20 text-center border-y-8 border-jet">
          <TypewriterText 
            text="WIRST DU MICH BELEIDIGEN?" 
            className="text-5xl md:text-7xl font-display text-jet mb-4"
          />
      </div>

      <ComedicSection id="roast">
        <Roast />
      </ComedicSection>

      <ComedicSection id="contact">
        <Contact />
      </ComedicSection>

      <Footer />
      <Popup />

      {/* Enhanced Parallax Peeking Kiko */}
      <motion.div
        style={{ x: kikoX, y: kikoY, rotate: kikoRotate }}
        className="fixed top-1/2 left-0 -translate-y-1/2 z-[40] pointer-events-none"
      >
        <div className="relative group pointer-events-auto cursor-help">
          <motion.img 
            src={KIKO_HEADSHOT} 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = FALLBACK_HEADSHOT;
            }}
            alt="Peeking Kiko" 
            className="w-24 md:w-48 h-auto drop-shadow-flyer origin-left scale-x-[-1]"
            animate={{ 
              scale: [1, 1.05, 1],
              x: [0, 5, 0] 
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute -top-16 left-full ml-4 bg-white border-4 border-jet p-4 font-comic text-xs md:text-lg shadow-flyer whitespace-nowrap rotate-[5deg]"
          >
            "Du scrollst so schnell wie meine Ex weggerannt ist!"
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ x: -300, opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
            exit={{ x: -300, opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 20 }}
            className="fixed bottom-10 left-10 z-[100] bg-jet text-white border-4 border-banana p-4 shadow-flyer flex items-center gap-4 max-w-xs pointer-events-none"
          >
            <div className="bg-vest p-2 rounded-full border-2 border-white">
              <Instagram size={24} className="text-white" />
            </div>
            <div>
              <p className="font-display text-2xl leading-none mb-1 text-banana">BOOM!</p>
              <p className="font-comic text-sm text-white">{notification}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
