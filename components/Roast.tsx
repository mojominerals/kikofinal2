
import React, { useState } from 'react';
import { HecklerInteraction } from '../types';
import { Skull, Zap, Send, Loader2, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Fixed: Using correct imports and Type enum from @google/genai as per guidelines
import { GoogleGenAI, Type } from "@google/genai";

const initialHecklers: HecklerInteraction[] = [
  { id: '1', hecklerQuote: "Du bist nicht lustig!", kikoComeback: "Deine Frau fand mich gestern Nacht extrem lustig. Sie hat über meine Witze UND deine Performance gelacht.", damageRating: 5 },
  { id: '2', hecklerQuote: "Mein Hund ist lustiger als du.", kikoComeback: "Bring ihn hoch, vielleicht kann er mir erklären, warum du immer noch Single bist.", damageRating: 4 },
  { id: '3', hecklerQuote: "Booooo!", kikoComeback: "Bist du ein Geist oder einfach nur innerlich tot?", damageRating: 3 },
];

const Roast: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [aiRoast, setAiRoast] = useState<{ quote: string; response: string; rating: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateAIRoast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsLoading(true);
    try {
      // Fixed: Using process.env.GEMINI_API_KEY as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `User says: "${userInput}"`,
        config: {
          systemInstruction: "Du bist KIKO, ein energiegeladener Schweizer Komiker auf deiner 'Nöd Dä Hellscht' Tour. Du bist selbstironisch, hast aber messerscharfe, nukleare Konter für Leute parat, die dich herausfordern. Dein Stil ist frech, lustig und referenziert gelegentlich Schweizer Dinge wie Kühe, Käse oder die Alpen. ANTWORTETE IMMER AUF DEUTSCH (gerne mit Schweizer Einschlag). Fass dich kurz (unter 30 Wörter). Gib außerdem eine 'Zerstörungs-Bewertung' von 1 bis 5 an.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              comeback: { type: Type.STRING },
              rating: { type: Type.NUMBER, description: "Zerstörungsgrad von 1 bis 5" }
            },
            required: ["comeback", "rating"]
          }
        },
      });

      // Fixed: response.text is a property, and we trim it before parsing
      const jsonStr = response.text?.trim() || "{}";
      const data = JSON.parse(jsonStr);
      setAiRoast({
        quote: userInput,
        response: data.comeback || "Mein Gehirn hat gerade einen Kurzschluss, versuch's nochmal!",
        rating: data.rating || 1
      });
      setUserInput("");
    } catch (error) {
      console.error("Roast failed:", error);
      alert("Der Server ist gerade so hell wie Kiko – also gar nicht. Probier's gleich nochmal!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="roast" className="py-20 bg-vest text-white relative border-t-8 border-jet scroll-mt-32">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-16">
            <span className="block text-3xl font-comic text-banana mb-2 uppercase italic tracking-widest">SIE HABEN ES VERSUCHT. SIE SIND GESCHEITERT.</span>
            <span className="text-7xl md:text-9xl font-display text-white banana-text uppercase">
              ROAST ME
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {initialHecklers.map((item) => (
              <div key={item.id} className="bg-white border-4 border-jet p-8 hover:rotate-1 transition-transform group relative shadow-flyer">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity text-jet">
                  <Skull size={64} />
                </div>
                
                <div className="mb-6 relative">
                   <div className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest flex items-center gap-1">
                      <Zap size={14} /> Opfer laberte:
                   </div>
                   <div className="bg-sky/10 border-l-4 border-sky p-4 italic text-2xl text-jet font-body font-medium">
                     "{item.hecklerQuote}"
                   </div>
                </div>

                <div className="relative">
                   <div className="text-xs font-bold text-vest uppercase mb-2 text-right tracking-widest flex items-center gap-1 justify-end">
                      Kikos atomarer Roast <Zap size={14} />
                   </div>
                   <div className="bg-banana border-4 border-jet p-4 text-2xl font-black text-jet text-right shadow-flyer transform translate-x-2">
                     "{item.kikoComeback}"
                   </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t-2 border-jet/10 pt-4">
                  <span className="text-sm font-bold text-jet uppercase tracking-tighter">FATALITY-BEWERTUNG:</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Skull 
                        key={i} 
                        size={20} 
                        className={`${i < item.damageRating ? 'text-vest fill-vest' : 'text-gray-200'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI ROAST GENERATOR SECTION */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-jet border-8 border-banana shadow-[20px_20px_0px_0px_rgba(248,228,52,0.3)] p-8 md:p-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 opacity-10 -rotate-12 pointer-events-none">
                  <Zap size={200} fill="white" />
               </div>

               <div className="relative z-10 text-center mb-10">
                  <h3 className="font-display text-5xl md:text-7xl text-banana mb-2 uppercase italic">NUKLEARER ROAST GENERATOR</h3>
                  <p className="font-comic text-xl text-white/70 italic">"Trau dich, mich zu beleidigen. Ich hab nichts zu verlieren (außer meine letzte Gehirnzelle)."</p>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  <form onSubmit={generateAIRoast} className="space-y-4">
                    <div className="relative">
                      <textarea 
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Schreib deinen schlechtesten Heckle..."
                        className="w-full bg-white border-4 border-jet p-6 text-jet font-bold text-xl h-40 focus:outline-none focus:ring-4 ring-banana/50 placeholder:text-gray-300"
                        required
                      />
                      <div className="absolute -bottom-4 -left-4 bg-vest text-white p-2 border-2 border-jet font-display text-sm rotate-3">
                        INPUT: GEFÄHRLICH
                      </div>
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-banana text-jet font-display text-4xl py-6 border-4 border-white shadow-flyer hover:bg-white hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50 uppercase"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={32} className="animate-spin" /> KIKO SUCHT WÖRTER...
                        </>
                      ) : (
                        <>
                          <Send size={32} /> MICH ZERSTÖREN
                        </>
                      )}
                    </button>
                  </form>

                  <div className="min-h-[300px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                      {aiRoast ? (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white border-4 border-jet p-6 shadow-flyer relative"
                        >
                          <button 
                            onClick={() => setAiRoast(null)}
                            className="absolute -top-4 -right-4 bg-jet text-white p-2 rounded-full border-2 border-white hover:bg-vest transition-colors"
                          >
                            <RefreshCcw size={20} />
                          </button>
                          
                          <div className="mb-4">
                             <p className="text-gray-400 font-bold text-xs uppercase mb-1">Deine Schwäche:</p>
                             <p className="text-jet italic font-medium border-l-2 border-sky pl-3">"{aiRoast.quote}"</p>
                          </div>

                          <div className="bg-banana border-4 border-jet p-4 mb-6">
                             <p className="text-jet font-black text-2xl leading-tight">
                               "{aiRoast.response}"
                             </p>
                          </div>

                          <div className="flex items-center justify-between bg-jet/5 p-3">
                             <span className="text-jet font-display text-lg uppercase">Zerstörungsgrad:</span>
                             <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Skull 
                                    key={i} 
                                    size={24} 
                                    className={`${i < aiRoast.rating ? 'text-vest fill-vest' : 'text-jet/10'}`} 
                                  />
                                ))}
                             </div>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="border-4 border-dashed border-white/20 p-12 text-center">
                           <Skull size={80} className="mx-auto text-white/10 mb-6 animate-pulse" />
                           <p className="font-display text-2xl text-white/30 uppercase tracking-widest">Warte auf Einschlag...</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="mt-20 text-center">
             <p className="font-comic text-banana text-2xl mb-4 italic rotate-1">
                "Willst du wirklich von Kiko zerstört werden?"
             </p>
             <p className="text-white/50 text-sm font-bold uppercase tracking-[0.3em]">
                Powered by Nuclear Intelligence & Gemini 3
             </p>
          </div>
        </div>
    </section>
  );
};

export default Roast;
