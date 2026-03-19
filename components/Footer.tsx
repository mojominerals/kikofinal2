
import React from 'react';

const Footer: React.FC = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Du bist jetzt im Empire! Willkommen auf der dunklen Seite (wir haben Käse).");
  };

  return (
    <footer className="bg-sky text-jet py-12 border-t-8 border-jet">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-12">
          <h3 className="font-display text-5xl md:text-7xl mb-4 text-white banana-text">TRITT DEM EMPIRE BEI</h3>
          <p className="text-jet font-comic text-2xl mb-2">Kein Spam, nur Witze und Kuh-Updates.</p>
          <p className="text-white font-bold text-sm mb-8 uppercase tracking-widest">BOOKING: kikomedy@gmail.com</p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row max-w-lg mx-auto gap-2">
            <input 
              type="email" 
              required
              placeholder="DEINE DUMME MAIL..." 
              className="flex-1 bg-white border-4 border-jet p-4 font-black focus:outline-none focus:bg-banana/20 uppercase" 
            />
            <button type="submit" className="bg-vest text-white font-display text-3xl px-8 py-4 border-4 border-jet shadow-flyer hover:bg-jet hover:text-banana transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
              ABSCHICKEN
            </button>
          </form>
        </div>
        
        <div className="border-t-4 border-jet/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-bold uppercase tracking-widest">
          <p>&copy; 2026 KIKO NÖD DÄ HELLSCHT TOUR.</p>
          <div className="mt-4 md:mt-0 text-center md:text-right">
            <p className="font-comic normal-case tracking-normal text-lg">
              Witze klauen führt zu einer einstündigen Solo-Roast-Session.
            </p>
            <p className="text-[10px] opacity-50">Offizieller Empire Hub: kikomedy@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
