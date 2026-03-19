import React, { useState } from 'react';
import { Play, Instagram, X, Zap, Heart, MessageCircle, Share2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoPost {
  id: string;
  postId: string;
  platform: 'instagram' | 'youtube';
  title: string;
  views: string;
  thumbnail: string;
  category: string;
}

const viralReels: VideoPost[] = [
  { 
    id: '1', 
    postId: '469GLXtTmx0',
    platform: 'youtube',
    title: "DUNKLE STGALLER", 
    views: "1.5M", 
    category: "LIVE ROAST",
    thumbnail: "https://img.youtube.com/vi/469GLXtTmx0/maxresdefault.jpg"
  },
  { 
    id: '2', 
    postId: 'vL8hjf_mL8I',
    platform: 'youtube',
    title: "SCOPOFEN", 
    views: "2.1M", 
    category: "STAND UP",
    thumbnail: "https://img.youtube.com/vi/vL8hjf_mL8I/maxresdefault.jpg"
  },
  { 
    id: '3', 
    postId: 'PqYryQcxsf4',
    platform: 'youtube',
    title: "SWISS COMEDY GOLD", 
    views: "1.8M", 
    category: "VIRAL CLIP",
    thumbnail: "https://img.youtube.com/vi/PqYryQcxsf4/maxresdefault.jpg"
  },
];

const INSTAGRAM_URL = "https://www.instagram.com/kikomedy/";

const Videos: React.FC = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);

  return (
    <section id="videos" className="py-20 bg-sky relative border-t-8 border-jet overflow-hidden scroll-mt-32">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 animate-spin-slow">
           <Zap size={400} fill="white" className="text-white" />
        </div>
        <div className="absolute -bottom-20 -right-20 animate-pulse">
           <Instagram size={300} className="text-white" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-20">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="bg-vest text-white font-display text-2xl md:text-3xl px-6 py-2 border-4 border-jet shadow-flyer -rotate-2 inline-block uppercase italic">
              Nuklearer Video Hub
            </span>
          </motion.div>
          
          <h2 className="text-7xl md:text-9xl font-display text-white mb-6 text-center banana-text uppercase leading-none tracking-tighter">
            MOST <span className="text-jet">WANTED</span>
          </h2>

          <p className="font-comic text-2xl text-jet max-w-2xl text-center mb-10 leading-tight">
             "Hier sind die Clips, für die meine Anwälte am meisten Überstunden machen mussten."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {viralReels.map((video, idx) => {
            const isActive = activePostId === video.postId;
            
            return (
              <motion.div 
                key={video.id} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={!isActive ? { y: -15, scale: 1.02 } : {}}
                className="group relative bg-jet border-4 border-jet shadow-flyer overflow-hidden rounded-xl aspect-[9/16]"
              >
                {!isActive ? (
                  <div 
                    className="absolute inset-0 z-10 w-full h-full cursor-pointer group"
                    onClick={() => setActivePostId(video.postId)}
                  >
                    {/* Thumbnail with overlay */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-70 group-hover:opacity-100" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-jet via-transparent to-black/40 group-hover:from-vest/40 transition-colors duration-500"></div>
                    </div>
                    
                    {/* UI Elements */}
                    <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                         <div className="bg-banana text-jet font-display text-lg px-3 py-1 border-2 border-jet shadow-sm transform -rotate-2">
                           {video.category}
                         </div>
                         <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/40">
                            <Share2 size={16} className="text-white" />
                         </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-display text-4xl text-white leading-none uppercase group-hover:text-banana transition-colors">
                          {video.title}
                        </h3>
                        
                        <div className="flex items-center gap-4 text-white/90 font-bold text-sm">
                          <span className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded border border-white/10">
                            <Heart size={16} fill="currentColor" className="text-vest" /> {video.views}
                          </span>
                          <span className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded border border-white/10">
                            <MessageCircle size={16} fill="currentColor" /> VIRAL
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Central Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-jet shadow-[0_0_30px_rgba(255,255,255,0.5)] group-hover:bg-banana transition-colors"
                      >
                        <Play fill="black" size={48} className="ml-1" />
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 z-20 bg-black">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-banana border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <iframe
                      src={`https://www.youtube.com/embed/${video.postId}?autoplay=1&mute=0&rel=0&playsinline=1&enablejsapi=1`}
                      className="w-full h-full border-0 relative z-10"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title={video.title}
                    ></iframe>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActivePostId(null); }}
                      className="absolute top-2 right-2 bg-vest text-white p-2 rounded-full border-2 border-jet shadow-flyer z-30 hover:scale-110 transition-transform"
                    >
                      <X size={16} strokeWidth={3} />
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Big CTA */}
        <div className="mt-24 text-center">
          <motion.a 
            href={INSTAGRAM_URL} 
            target="_self" 
            rel="noreferrer" 
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex flex-col md:flex-row items-center gap-6 px-16 py-8 bg-jet text-white font-display text-4xl md:text-6xl uppercase border-8 border-banana shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] hover:bg-vest transition-all transform -rotate-1 group"
          >
            <div className="relative">
              <Instagram size={80} className="group-hover:animate-bounce" />
              <div className="absolute -top-4 -right-4 bg-banana text-jet text-xs font-black p-2 rounded-full border-2 border-jet">100K+</div>
            </div>
            <div className="text-left">
              <div className="leading-none mb-1">KOMPLETTES EMPIRE</div>
              <div className="text-2xl font-comic text-banana group-hover:text-white transition-colors">FOLGE @KIKOMEDY AUF INSTAGRAM</div>
            </div>
          </motion.a>
        </div>
      </div>
      
      {/* Bottom Marquee Speed Strip */}
      <div className="bg-jet border-y-8 border-white py-6 mt-24 overflow-hidden whitespace-nowrap group relative">
        <div className="absolute inset-0 bg-banana opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="animate-marquee inline-block font-display text-5xl md:text-7xl text-white group-hover:text-jet tracking-tighter uppercase italic px-4">
          NUKLEARE COMEDY | SCHWEIZER PRÄZISIONS-DUMMHEIT | MEHR REELS AUF INSTAGRAM | KIKO NÖD DÄ HELLSCHT | JETZT TICKETS SICHERN | NUKLEARE COMEDY | SCHWEIZER PRÄZISIONS-DUMMHEIT | MEHR REELS AUF INSTAGRAM | KIKO NÖD DÄ HELLSCHT | JETZT TICKETS SICHERN |
        </div>
        <div className="animate-marquee inline-block font-display text-5xl md:text-7xl text-white group-hover:text-jet tracking-tighter uppercase italic px-4">
          NUKLEARE COMEDY | SCHWEIZER PRÄZISIONS-DUMMHEIT | MEHR REELS AUF INSTAGRAM | KIKO NÖD DÄ HELLSCHT | JETZT TICKETS SICHERN | NUKLEARE COMEDY | SCHWEIZER PRÄZISIONS-DUMMHEIT | MEHR REELS AUF INSTAGRAM | KIKO NÖD DÄ HELLSCHT | JETZT TICKETS SICHERN |
        </div>
      </div>
    </section>
  );
};

export default Videos;