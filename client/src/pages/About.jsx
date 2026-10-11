import React from 'react';
import { Award, Sparkles, ShieldCheck, Heart } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-[#070709] pt-32 pb-24 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold">
          The Manifesto
        </span>
        <h1 className="text-5xl font-black uppercase tracking-tight text-white">
          THE ART OF UNCOMPROMISING MENSWEAR
        </h1>
        <p className="text-gray-300 text-base leading-relaxed">
          Founded at the intersection of Milanese tailoring, Japanese minimalist ergonomics, and Apple-inspired sleek aesthetics. AURA & NOIR crafts wardrobe essentials for the modern gentleman who demands quiet power.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: Sparkles,
            title: "Rare Materials",
            text: "Mongolian Cashmere, Super 150s Merino Wool, 14.5oz Kurabo Selvedge Denim, and Goodyear welted oak-tanned leather."
          },
          {
            icon: ShieldCheck,
            title: "Italian Craftsmanship",
            text: "Hand-finished by third-generation master artisans in Florence and Milan with precision double-stitching."
          },
          {
            icon: Award,
            title: "Dribbble & Figma Design",
            text: "Engineered with 60fps canvas particle physics, soft glassmorphism, and minimal Apple-inspired UI."
          }
        ].map((item, idx) => (
          <div key={idx} className="glass-panel rounded-3xl p-8 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">{item.title}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

    </div>
  );
};
