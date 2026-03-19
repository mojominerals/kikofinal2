
import React from 'react';
import { motion } from 'framer-motion';

const KIKO_HEADSHOT = "https://i.ibb.co/D0nvGVC/Kiko-Head-001-01-frei-cropped-removebg-preview.png";

const AvatarMarquee: React.FC = () => {
  const heads = Array(20).fill(KIKO_HEADSHOT);

  return (
    <div className="bg-banana border-y-4 border-jet py-4 overflow-hidden whitespace-nowrap relative">
      <div className="flex animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
        {heads.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt="Kiko Head"
            className="h-16 md:h-24 mx-4 drop-shadow-sm hover:scale-125 transition-transform"
            whileHover={{ rotate: [0, -10, 10, 0] }}
          />
        ))}
        {/* Duplicate for seamless loop */}
        {heads.map((src, i) => (
          <motion.img
            key={`dup-${i}`}
            src={src}
            alt="Kiko Head"
            className="h-16 md:h-24 mx-4 drop-shadow-sm hover:scale-125 transition-transform"
            whileHover={{ rotate: [0, -10, 10, 0] }}
          />
        ))}
      </div>
    </div>
  );
};

export default AvatarMarquee;
