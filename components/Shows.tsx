import React, { useState } from 'react';
import { Ticket, Zap, X, List, Radiation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../services/metaPixel';

// Redefining interface locally to ensure the Vercel compiler sees it immediately
interface Show {
  id: string;
  date: string;
  venue: string;
  city: string;
  status: 'available' | 'sold-out' | 'last-chance';
  price: string;
  ticketUrl: string;
}

const shows: Show[] = [
  { id: '1', date: '10.04.26', venue: 'Kino Stüssihof', city: 'Zürich', status: 'available', price: '45 CHF', ticketUrl: 'https://eventfrog.ch/de/p/theater-buehne/comedy-kabarett/kiko-noed-dae-hellscht-zuerich-7415053850250360982.html' },
  { id: '2', date: '11.04.26', venue: 'Kino Stüssihof', city: 'Zürich', status: 'available', price: '45 CHF', ticketUrl: 'https://eventfrog.ch/de/p/theater-buehne/comedy-kabarett/kiko-noed-dae-hellscht-zuerich-7415059045936046291.html' },
  { id: '3', date: '16.04.26', venue: 'Fauteuil', city: 'Basel', status: 'last-chance', price: '42 CHF', ticketUrl: 'https://tickets.fauteuil.ch/webshop/webticket/eventlist?production=115' },
  { id: '4', date: '17.04.26', venue: 'Mood 12', city: 'Amriswil', status: 'available', price: '38 CHF', ticketUrl: 'https://eventfrog.ch/de/p/theater-buehne/comedy-kabarett/kiko-noed-dae-hellscht-amriswil-7410644825186286214.html' },
  { id: '5', date: '18.04.26', venue: 'ROK Klub', city: 'Luzern', status: 'available', price: '40 CHF', ticketUrl: 'https://eventfrog.ch/de/p/theater-buehne/comedy-kabarett/kiko-noed-dae-hellscht-luzern-7411346272320241984.html' },
  { id: '6', date: '21.04.26', venue: 'Oxil', city: 'Zofingen', status: 'available', price: '35 CHF', ticketUrl: 'https://eventfrog.ch/de/p/theater-buehne/comedy-kabarett/kiko-noed-dae-hellscht-zofingen-7420762565083404558.html' },
  { id: '7', date: '24.04.26', venue: "Let's Fetz", city: 'Einsiedeln', status: 'available', price: '35 CHF', ticketUrl: 'https://eventfrog.ch/de/p/theater-kabarett/kabarett-comedy/kiko-noed-dae-hellscht-7288627885368305891.html' },
  { id: '8', date: '25.04.26', venue: 'Harley Davidson', city: 'Rümlang', status: 'available', price: '45 CHF', ticketUrl: 'https://eventfrog.ch/de/p/theater-buehne/comedy-kabarett/kiko-noed-dae-hellscht-x-harley-davidson-ruemlang-7420767330131544712.html' },
  { id: '9', date: '30.04.26', venue: 'AP Café', city: 'Aadorf', status: 'available', price: '30 CHF', ticketUrl: 'https://eventfrog.ch/de/p/theater-buehne/comedy-kabarett/kiko-noed-dae-hellscht-aadorf-7416516113431810489.html' },
  { id: '15', date: '02.05.26', venue: 'Le Portier', city: 'Bern', status: 'available', price: '40 CHF', ticketUrl: 'https://eventfrog.ch/de/p/theater-buehne/comedy-kabarett/kiko-noed-dae-hellscht-bern-7423271039776342403.html' },
  { id: '10', date: '08.05.26', venue: 'Nordportal', city: 'Baden', status: 'available', price: '45 CHF', ticketUrl: 'https://eventfrog.ch/de/p/theater-buehne/comedy-kabarett/kiko-noed-dae-hellscht-baden-7414989730788426596.html' },
  { id: '16', date: '09.05.26', venue: 'QUARTIER Klub', city: 'Schaffhausen', status: 'available', price: '40 CHF', ticketUrl: 'https://eventfrog.ch/de/p/theater-buehne/comedy-kabarett/kiko-noed-dae-hellscht-schaffhausen-7423269413929920693.html' },
  { id: '11', date: '13.06.26', venue: 'Weid Am Berg', city: 'Heiden', status: 'available', price: '38 CHF', ticketUrl: 'https://eventfrog.ch/de/p/theater-kabarett/kabarett-comedy/kiko-noed-dae-hellscht-7288627885368305895.html' },
  { id: '12', date: '02.09.26', venue: 'Madlen', city: 'Heerbrugg', status: 'available', price: '40 CHF', ticketUrl: 'https://kinomadlen.ch/programmuebersicht/movie/kiko-noed-dae-hellscht/' },
  { id: '13', date: '03.09.26', venue: 'Caverno', city: 'Bülach', status: 'available', price: '38 CHF', ticketUrl: 'https://eventfrog.ch/de/p/theater-buehne/comedy-kabarett/kiko-noed-dae-hellscht-7415044026284408384.html' },
  { id: '14', date: '11.09.26', venue: 'Plaza Klub', city: 'Zürich', status: 'last-chance', price: '50 CHF', ticketUrl: 'https://eventfrog.ch/de/p/theater-buehne/comedy-kabarett/kiko-noed-dae-hellscht-zuerich-7420476829704705780.html' },
];

const EVENTFROG_LOGO = "https://static.eventfrog.ch/img/branding/eventfrog-logo-pos.svg";
const SPONSOR_LOGO = "https://iust.ai/images/iust.ai-logo.svg";

const Shows: React.FC = () => {
  const [isRedirecting, setIsRedirecting] = useState<{ url: string; venue: string } | null>(null);
  const [activeEmbed, setActiveEmbed] = useState<{ url: string; venue: string } | null>(null);

  const handleTicketClick = (show: Show) => {
    const { ticketUrl: url, venue, price, city } = show;
    
    // Track InitiateCheckout as they are heading to the ticket provider
    trackEvent('InitiateCheckout', {
      content_name: `Ticket: ${venue} - ${city}`,
      content_ids: [show.id],
      content_type: 'product',
      value: parseFloat(price.replace(' CHF', '')),
      currency: 'CHF'
    });

    // Special case for Basel & Heerbrugg: Direct external link in new tab
    const isExternal = 
      venue.toLowerCase().includes('fauteuil') || 
      url.includes('fauteuil.ch') ||
      venue.toLowerCase().includes('madlen') ||
      url.includes('kinomadlen.ch');

    if (isExternal) {
      window.open(url, '_blank');
      return;
    }

    if (url.includes('eventfrog.ch')) {
      const embedUrl = url.replace('eventfrog.ch', 'embed.eventfrog.ch') + 
        (url.includes('?') ? '&' : '?') + 
        'color=60BF00&infobox=1&description=1&location=1&organisator=1&sponsors=1';
      
      setActiveEmbed({ url: embedUrl, venue });
      // Track ViewContent as the ticket shop is now visible
      trackEvent('ViewContent', {
        content_name: `Ticket Shop: ${venue}`,
        content_type: 'product_group'
      });
      return;
    }
    
    setIsRedirecting({ url, venue });
    window.location.href = url;
  };

  return (
    <section id="shows" className="py-20 bg-sky relative overflow-hidden border-t-8 border-jet scroll-mt-32">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstripe-dark.png')]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <motion.div initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="mb-10 flex flex-col items-center group">
            <span className="font-display text-lg md:text-3xl text-jet bg-banana px-6 py-2 border-4 border-jet shadow-flyer transform -rotate-1 mb-4 z-10 uppercase tracking-tighter font-black">OFFIZIELLER SPONSORING PARTNER</span>
            <a 
              href="https://iust.ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-3 border-4 border-jet shadow-flyer transform rotate-1 group-hover:rotate-0 transition-transform duration-300 block"
            >
              <img src={SPONSOR_LOGO} alt="iust.ai" className="h-14 md:h-28 w-auto object-contain" />
            </a>
          </motion.div>

          <h2 className="text-5xl md:text-9xl font-display text-white mb-6 text-center uppercase tracking-tighter banana-text">TOUR <span className="text-vest">TICKETS</span></h2>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="bg-white border-4 md:border-8 border-jet shadow-flyer max-w-5xl mx-auto">
             <div className="divide-y-4 divide-jet">
                {shows.map((show) => (
                  <div key={show.id} className="p-4 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 hover:bg-banana/10 transition-colors">
                     <div className="flex items-center gap-4 md:gap-6">
                        <div className="text-center bg-sky border-2 md:border-4 border-jet p-2 md:p-4 shadow-sm transform -rotate-2 min-w-[80px] md:min-w-[100px]">
                           <div className="font-display text-2xl md:text-4xl text-white leading-none">{show.date.split('.')[0]}</div>
                           <div className="font-display text-lg md:text-xl text-jet">{show.date.split('.')[1]}</div>
                        </div>
                        <div>
                           <h4 className="font-display text-2xl md:text-4xl text-jet uppercase leading-none mb-1">{show.venue}</h4>
                           <p className="font-display text-xl md:text-2xl text-vest uppercase tracking-widest">{show.city}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        {show.status === 'last-chance' && <span className="hidden lg:block bg-vest text-white px-3 py-1 font-bold text-xs animate-pulse border-2 border-jet rotate-3">FAST AUSVERKAUFT!</span>}
                        <button onClick={() => handleTicketClick(show)} className="w-full md:w-auto bg-jet text-banana px-6 py-3 md:px-8 md:py-4 font-display text-2xl md:text-3xl hover:bg-vest hover:text-white transition-all shadow-flyer flex items-center justify-center gap-3 uppercase"><Ticket size={20} className="md:w-6 md:h-6" /> TICKETS</button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Nuclear Redirect Portal Overlay */}
      <AnimatePresence>
        {activeEmbed && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[250] flex items-center justify-center bg-jet/95 backdrop-blur-xl p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              className="bg-white border-4 md:border-8 border-jet p-4 md:p-8 max-w-4xl w-full shadow-flyer relative overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setActiveEmbed(null)} 
                className="absolute top-2 right-2 md:-top-6 md:-right-6 bg-vest text-white p-2 md:p-3 border-2 md:border-4 border-jet shadow-flyer hover:bg-jet transition-colors z-50 flex items-center gap-2"
              >
                <X size={24} className="md:w-8 md:h-8" />
                <span className="md:hidden font-display text-sm">SCHLIESSEN</span>
              </button>

              <div className="mb-4 md:mb-6 text-center mt-8 md:mt-0">
                <h3 className="text-2xl md:text-6xl font-display text-jet uppercase leading-none mb-1 md:mb-2 px-4">DIREKT-TICKETS: {activeEmbed.venue}</h3>
                <p className="font-comic text-vest italic text-lg md:text-xl">"Keine Umwege, direkt ins Vergnügen!"</p>
              </div>

              <div className="bg-jet p-1 md:p-2 border-2 md:border-4 border-jet">
                <iframe 
                  width="100%" 
                  height="450" 
                  src={activeEmbed.url}
                  title={`Eventfrog ${activeEmbed.venue} Tickets`}
                  className="bg-white h-[400px] md:h-[500px]"
                ></iframe>
              </div>

              <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={EVENTFROG_LOGO} alt="Eventfrog" className="h-8" />
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sicherer Checkout via Eventfrog</p>
                </div>
                <button 
                  onClick={() => setActiveEmbed(null)}
                  className="w-full md:w-auto bg-jet text-white px-6 py-3 font-display text-xl border-2 border-jet hover:bg-vest transition-colors uppercase"
                >
                  ZURÜCK ZUR SEITE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nuclear Redirect Portal Overlay */}
      <AnimatePresence>
        {isRedirecting && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[200] flex items-center justify-center bg-jet/98 backdrop-blur-3xl p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, rotate: -10, y: 50 }} 
              animate={{ scale: 1, rotate: 0, y: 0 }} 
              className="bg-white border-4 md:border-8 border-jet p-4 md:p-16 max-w-2xl w-full text-center shadow-[0_0_100px_rgba(248,228,52,0.4)] relative overflow-hidden"
            >
              {/* Animated Danger Strip */}
              <div className="absolute top-0 left-0 w-full h-3 md:h-4 bg-banana flex overflow-hidden">
                <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-1/2 h-full bg-jet transform skew-x-12"></motion.div>
              </div>

              <div className="relative z-10">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} 
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block mb-4 md:mb-8 text-vest"
                >
                  <Radiation size={80} className="md:w-[120px] md:h-[120px]" fill="currentColor" />
                </motion.div>

                <h3 className="text-3xl md:text-8xl font-display text-jet leading-none mb-4 md:mb-6 banana-text uppercase">ATOMARER START!</h3>
                
                <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                  <p className="font-comic text-lg md:text-3xl text-jet leading-tight italic">
                    "Bereite den Comedy-Beam vor!"
                  </p>
                  <div className="p-4 md:p-6 bg-jet text-banana border-2 md:border-4 border-jet font-display text-xl md:text-4xl shadow-sm uppercase">
                    ZIEL: {isRedirecting.venue}
                  </div>
                </div>

                {/* Simulated Loading Bar */}
                <div className="w-full h-8 md:h-12 bg-gray-200 border-2 md:border-4 border-jet relative overflow-hidden mb-6 md:mb-10">
                   <motion.div 
                     initial={{ width: "0%" }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 2, ease: "easeIn" }}
                     className="h-full bg-banana flex items-center justify-center"
                   >
                     <span className="font-display text-lg md:text-2xl text-jet whitespace-nowrap">INITIERE QUANTEN-CHECKOUT...</span>
                   </motion.div>
                </div>

                <div className="flex flex-col items-center gap-4">
                   <img src={EVENTFROG_LOGO} alt="Eventfrog" className="h-10 opacity-50 grayscale" />
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sicherer Transfer via Eventfrog</p>
                </div>
              </div>

              {/* Safety Link for UI */}
              <button onClick={() => setIsRedirecting(null)} className="absolute bottom-4 right-4 text-xs font-bold text-gray-300 hover:text-vest transition-colors uppercase underline">Abbruch</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Shows;