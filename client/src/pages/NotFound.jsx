import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#070709] pt-36 pb-24 text-white px-4 flex flex-col items-center justify-center text-center space-y-6">
      <div className="w-20 h-20 rounded-full glass-panel-gold flex items-center justify-center text-luxury-gold shadow-glow-gold">
        <span className="text-2xl font-black">404</span>
      </div>
      <h1 className="text-4xl font-extrabold text-white uppercase tracking-tight">PAGE NOT FOUND</h1>
      <p className="text-gray-400 text-sm max-w-md">
        The luxury piece or page you are looking for has been archived or moved to our private collection.
      </p>
      <Link
        to="/"
        className="bg-luxury-gold text-black font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-glow-gold flex items-center space-x-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Atelier Home</span>
      </Link>
    </div>
  );
};
