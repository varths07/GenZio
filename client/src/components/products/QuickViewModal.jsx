import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, ArrowRight, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist, setIsSizeGuideOpen } = useShop();

  if (!quickViewProduct) return null;

  const [selectedImage, setSelectedImage] = useState(quickViewProduct.images[0]);
  const [selectedColor, setSelectedColor] = useState(quickViewProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState(quickViewProduct.sizes[0]);
  const [qty, setQty] = useState(1);

  const isSaved = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedColor, selectedSize, qty);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-4xl glass-panel rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-6 right-6 p-2 rounded-full glass-panel hover:bg-white/20 text-gray-300 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Gallery Column */}
          <div className="space-y-4">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-black/60 border border-white/10 relative">
              <img
                src={selectedImage}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center"
              />
              {quickViewProduct.isFlashSale && (
                <span className="absolute top-4 left-4 bg-luxury-gold text-black font-extrabold text-xs px-3 py-1 rounded-md shadow-glow-gold">
                  Flash Sale -{quickViewProduct.discountPercent}%
                </span>
              )}
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ₹{
                    selectedImage === img ? 'border-luxury-gold shadow-glow-gold' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Column */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-luxury-gold font-semibold uppercase tracking-widest">
                <span>{quickViewProduct.category} &bull; {quickViewProduct.subCategory}</span>
                <div className="flex items-center space-x-1 text-white">
                  <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                  <span>{quickViewProduct.rating} ({quickViewProduct.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
                {quickViewProduct.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-black text-white">₹{quickViewProduct.price}</span>
                {quickViewProduct.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">₹{quickViewProduct.originalPrice}</span>
                )}
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  In Stock ({quickViewProduct.stockCount} left)
                </span>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed border-t border-b border-white/10 py-3">
                {quickViewProduct.description}
              </p>

              {/* Color Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  Select Color: <span className="text-white">{selectedColor.name}</span>
                </label>
                <div className="flex space-x-3">
                  {quickViewProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ₹{
                        selectedColor.name === c.name ? 'border-luxury-gold scale-110 shadow-glow-gold' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor.name === c.name && (
                        <Check className={`w-3.5 h-3.5 ₹{c.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Select Size
                  </label>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-luxury-gold underline hover:text-white transition-colors"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedSize === s
                          ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                          : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30"
                      }`}
                      
                      
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center space-x-4">
                {/* Quantity */}
                <div className="flex items-center glass-panel rounded-xl px-3 py-2 border border-white/10 space-x-3">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="text-gray-400 hover:text-white font-bold text-base px-1"
                  >
                    -
                  </button>
                  <span className="text-white font-bold text-sm">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="text-gray-400 hover:text-white font-bold text-base px-1"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-luxury-goldDark via-luxury-gold to-luxury-goldLight text-black font-extrabold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 shadow-glow-gold hover:opacity-95 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag &bull; ₹{(quickViewProduct.price * qty).toFixed(0)}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`p-3.5 rounded-xl glass-panel transition-all ₹{
                    isSaved ? 'text-rose-500 border-rose-500/50 bg-rose-500/10' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ₹{isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
                <span className="flex items-center space-x-1">
                  <Truck className="w-3.5 h-3.5 text-luxury-gold" />
                  <span>Free Express Global Shipping</span>
                </span>
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
                  <span>Authenticity Guaranteed</span>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
