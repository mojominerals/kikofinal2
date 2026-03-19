
import React from 'react';
import { MerchItem } from '../types';
import { ShoppingBag, Palmtree, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackEvent } from '../services/metaPixel';

const KIKO_HEADSHOT = "https://kikomedy.com/img/Kiko_Head_001-01-frei_cropped.png";

const items: MerchItem[] = [
  { id: '1', name: 'KIKO "Glückssocken"', price: '19 CHF', tagline: 'Riechen nach Erfolg und Käse.', image: 'https://images.unsplash.com/photo-1582966239100-80c71488a573?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: '2', name: 'KIKO Schlüsselanhänger', price: '12 CHF', tagline: 'Damit du deine Schlüssel (und Verstand) nicht verlierst.', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: '3', name: 'Nöd Dä Hellscht Hoodie', price: '55 CHF', tagline: 'Hält warm, wenn das Hirn versagt.', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: '4', name: 'Die Rote Weste (Replica)', price: '89 CHF', tagline: '100% Nukleare Energie. 0% Geschmack.', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400&h=400' },
];

const Merch: React.FC = () => {
  const addToCart = (item: MerchItem) => {
    trackEvent('AddToCart', {
      content_name: item.name,
      content_ids: [item.id],
      content_type: 'product',
      value: parseFloat(item.price.replace(' CHF', '')),
      currency: 'CHF'
    });
    alert(`${item.name} wurde in deinen Warenkorb geworfen. Gute Wahl, du Mode-Gott!`);
  };

  return (
    <section id="merch" className="py-20 bg-white border-t-8 border-jet relative overflow-hidden scroll-mt-32">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="grid grid-cols-6 gap-20 transform -rotate-12 translate-y-20">
            {[...Array(24)].map((_, i) => (
                <img key={i} src={KIKO_HEADSHOT} className="w-24 grayscale" alt="decor" />
            ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="relative mb-6"
          >
            <div className="absolute -top-10 -right-10 bg-banana p-4 rounded-full border-4 border-jet rotate-12 z-20 shadow-flyer hidden md:block">
               <Star size={40} className="text-jet fill-jet" />
            </div>
            <img 
              src={KIKO_HEADSHOT} 
              alt="Shop Mascot" 
              className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-flyer"
            />
          </motion.div>
          
          <h2 className="text-7xl md:text-9xl font-display text-jet leading-none text-center mb-4">
            KIKOMEDY <span className="text-vest">SHOP</span>
          </h2>
          <div className="bg-jet text-white font-comic text-xl px-6 py-2 transform -rotate-1 border-4 border-white shadow-flyer">
             "Qualität ist uns egal, solange es rot und gelb ist!"
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border-4 border-jet shadow-flyer p-4 flex flex-col group"
            >
              <div className="aspect-square bg-sky/10 border-2 border-jet mb-4 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 bg-vest text-white font-display text-xl px-2 border-2 border-jet shadow-sm">
                  {item.price}
                </div>
              </div>
              <h3 className="font-display text-2xl text-jet mb-1 leading-none uppercase">{item.name}</h3>
              <p className="font-comic text-xs text-gray-500 mb-4 flex-grow">{item.tagline}</p>
              <button 
                onClick={() => addToCart(item)}
                className="w-full bg-jet text-banana font-display text-xl py-3 border-2 border-jet shadow-sm hover:bg-vest hover:text-white transition-all flex items-center justify-center gap-2 uppercase"
              >
                <ShoppingBag size={18} /> IN DEN WARENKORB
              </button>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            className="bg-jet p-12 md:p-20 border-8 border-banana shadow-flyer relative overflow-hidden text-center"
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full animate-pulse">
                <Zap size={400} className="text-white absolute -top-20 -left-20" />
                <Star size={300} className="text-white absolute -bottom-20 -right-20" />
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-6xl md:text-9xl font-display text-banana mb-8 uppercase leading-none tracking-tighter italic">
                SHOP <span className="text-white">INFO</span>
              </h3>
              
              <div className="space-y-8">
                <p className="font-comic text-2xl md:text-4xl text-white leading-tight">
                  "Der volle Shop kommt später... Kiko hat die Socken gegessen und die Hoodies als Decken für seine Kühe benutzt."
                </p>
                
                <div className="inline-block bg-vest text-white font-display text-3xl md:text-5xl px-10 py-4 border-4 border-white shadow-flyer transform -rotate-2 uppercase">
                  Wartezeit: Unbekannt
                </div>

                <p className="font-comic text-lg text-banana/60 italic">
                  (Wahrscheinlich erst, wenn er wieder Geld für Käse braucht)
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Shop Guarantee */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t-4 border-jet/10 pt-12">
            <div>
              <div className="bg-sky w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-jet shadow-sm">
                <Star className="text-white" />
              </div>
              <h4 className="font-display text-2xl uppercase">Handverpackt</h4>
              <p className="font-comic text-sm text-gray-400">Wahrscheinlich von Kiko selbst (keine Garantie auf Sauberkeit).</p>
            </div>
            <div>
              <div className="bg-vest w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-jet shadow-sm">
                <Zap className="text-white" />
              </div>
              <h4 className="font-display text-2xl uppercase">Turbo Versand</h4>
              <p className="font-comic text-sm text-gray-400">Schneller als ein Berggewitter, langsamer als eine Schnecke.</p>
            </div>
            <div>
              <div className="bg-banana w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-jet shadow-sm">
                <Palmtree className="text-jet" />
              </div>
              <h4 className="font-display text-2xl uppercase">Insel-Vibes</h4>
              <p className="font-comic text-sm text-gray-400">Jede Bestellung enthält eine imaginäre Palme.</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Merch;
