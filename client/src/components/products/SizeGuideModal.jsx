import React from 'react';
import { X, Ruler, CheckCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const SizeGuideModal = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto border border-white/20">
        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full glass-panel hover:bg-white/20 text-gray-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">Men's Luxury Size Guide</h3>
            <p className="text-xs text-gray-400">Precision Italian & International Measurements</p>
          </div>
        </div>

        {/* Clothing Size Table */}
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold text-luxury-gold uppercase tracking-wider mb-3">
              Clothing & Outerwear (Hoodies, Shirts, Jackets)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-xs text-left text-gray-300">
                <thead className="bg-white/5 text-gray-400 font-semibold uppercase">
                  <tr>
                    <th className="p-3">Size</th>
                    <th className="p-3">Chest (inches)</th>
                    <th className="p-3">Waist (inches)</th>
                    <th className="p-3">Shoulder (inches)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium">
                  <tr><td className="p-3 font-bold text-white">S (36R)</td><td className="p-3">36 - 38</td><td className="p-3">30 - 31</td><td className="p-3">17.5</td></tr>
                  <tr><td className="p-3 font-bold text-white">M (38R)</td><td className="p-3">38 - 40</td><td className="p-3">32 - 33</td><td className="p-3">18.0</td></tr>
                  <tr><td className="p-3 font-bold text-white">L (40R)</td><td className="p-3">40 - 42</td><td className="p-3">34 - 35</td><td className="p-3">18.5</td></tr>
                  <tr><td className="p-3 font-bold text-white">XL (42R)</td><td className="p-3">42 - 44</td><td className="p-3">36 - 38</td><td className="p-3">19.2</td></tr>
                  <tr><td className="p-3 font-bold text-white">XXL (44R)</td><td className="p-3">44 - 46</td><td className="p-3">38 - 40</td><td className="p-3">20.0</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footwear Table */}
          <div>
            <h4 className="text-sm font-bold text-luxury-gold uppercase tracking-wider mb-3">
              Footwear & Sneakers (US / EU Conversion)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-xs text-left text-gray-300">
                <thead className="bg-white/5 text-gray-400 font-semibold uppercase">
                  <tr>
                    <th className="p-3">US Size</th>
                    <th className="p-3">EU Size</th>
                    <th className="p-3">UK Size</th>
                    <th className="p-3">Foot Length (CM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium">
                  <tr><td className="p-3 font-bold text-white">US 8</td><td className="p-3">41</td><td className="p-3">7.5</td><td className="p-3">26.0 cm</td></tr>
                  <tr><td className="p-3 font-bold text-white">US 9</td><td className="p-3">42</td><td className="p-3">8.5</td><td className="p-3">27.0 cm</td></tr>
                  <tr><td className="p-3 font-bold text-white">US 10</td><td className="p-3">43</td><td className="p-3">9.5</td><td className="p-3">28.0 cm</td></tr>
                  <tr><td className="p-3 font-bold text-white">US 11</td><td className="p-3">44</td><td className="p-3">10.5</td><td className="p-3">29.0 cm</td></tr>
                  <tr><td className="p-3 font-bold text-white">US 12</td><td className="p-3">45</td><td className="p-3">11.5</td><td className="p-3">30.0 cm</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4 text-luxury-gold" />
            <span>Complimentary Returns & Exchange on fit issues</span>
          </span>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2 rounded-xl"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
