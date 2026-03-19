
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Trash2, Palmtree } from 'lucide-react';
import KikoAvatar from './KikoAvatar';

const TOUR_POSTER_URL = "https://i.ibb.co/0j0dQWWs/1766828780175-hkouk2hwt7.jpg";

const StatCard: React.FC<{ number: string; label: string; icon: React.ReactNode }> = ({ number, label, icon }) => (
  <div className="bg-white p-6 border-4 border-jet shadow-flyer transform hover:-translate-y-2 transition-transform">
    <div className="flex justify-between items-start mb-4">
        <div className="text-5xl md:text-6xl font-display text-jet">{number}</div>
        <div className="text-vest">{icon}</div>
    </div>
    <div className="text-jet font-body font-black text-sm uppercase tracking-widest">{label}</div>
  </div>
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-banana text-jet relative border-t-8 border-jet overflow-hidden scroll-mt-32">
      <div className="container mx-auto px-4">
        <h2 className="text-7xl md:text-8xl font-display text-jet mb-12 text-center uppercase tracking-tighter">
          NÖD DÄ <span className="text-vest underline decoration-wavy">HELLSCHT?</span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
          <div className="flex-1 space-y-6 relative">
            <h3 className="text-4xl font-comic bg-white border-2 border-jet inline-block px-4 py-1 transform -rotate-1 shadow-sm">
              Die dümmste Comedy der Alpen
            </h3>
            <p className="text-2xl font-body font-bold leading-relaxed">
              Man sagt "Nicht der Hellste", ich sage "Hell genug, um den Weg zu deinem Geld zu finden." 
              Geboren in den Bergen, aufgezogen von Kühen und veredelt durch Fehlentscheidungen.
            </p>
            <p className="text-xl font-body leading-relaxed">
              Mein Gehirn ist eine Mischung aus Schweizer Käse (hauptsächlich Löcher) und tropischer Luftfeuchtigkeit. 
              Kiko ist nicht hier, um deine Probleme zu lösen, sondern um dich daran zu erinnern, dass seine viel schlimmer sind.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
               <div className="p-6 bg-sky border-4 border-jet shadow-flyer relative">
                <div className="absolute -top-4 -right-4 bg-vest text-white p-2 rounded-full border-4 border-jet rotate-12">
                    <Zap size={24} fill="white" />
                </div>
                <h4 className="font-display text-3xl mb-4 uppercase text-white">Intelligenzbericht:</h4>
                <ul className="space-y-4 font-comic text-jet">
                    <li className="flex items-center gap-3">
                        <Trash2 className="text-jet" /> Gehirnzellen: 4
                    </li>
                    <li className="flex items-center gap-3">
                        <Zap className="text-jet" /> Verwirrung: 99%
                    </li>
                </ul>
               </div>

               <div className="hidden sm:block border-4 border-jet shadow-flyer relative group overflow-hidden bg-white">
                  <img src={TOUR_POSTER_URL} alt="Mini Poster" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-jet/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Palmtree className="text-white" size={48} />
                  </div>
               </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <div className="mb-12">
              <KikoAvatar />
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full">
              <StatCard number="127" label="Kühe beleidigt" icon={<Zap size={40} />} />
              <StatCard number="0" label="IQ-Punkte gefunden" icon={<Brain size={40} />} />
              <StatCard number="1.2M" label="Pfund Käse" icon={<Zap size={40} />} />
              <StatCard number="∞" label="Glückliche Heckler" icon={<Zap size={40} />} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
