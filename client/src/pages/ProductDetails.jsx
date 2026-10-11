import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, Check, ArrowRight, Ruler, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/products/ProductCard';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist, setIsSizeGuideOpen, addToast } = useShop();

  const product = products.find((p) => p.id === id) || products[0];

  const [activeImg, setActiveImg] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'reviews', 'shipping'

  // New review form state
  const [newRating, setNewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [userReviews, setUserReviews] = useState([
    {
      name: 'Evelyn Vance',
      date: '2 weeks ago',
      rating: 5,
      comment: 'Exceptional craftsmanship. The leather is supple and smells authentic Italian tan. Fits perfectly.',
    },
    {
      name: 'Harrison K.',
      date: '1 month ago',
      rating: 5,
      comment: 'Remarkable luxury quality. Worth every dollar for executive wardrobe.',
    }
  ]);

  const isSaved = isInWishlist(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, qty);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, qty);
    navigate('/checkout');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    setUserReviews([
      { name: 'You (Verified Buyer)', date: 'Just now', rating: newRating, comment: newReviewText },
      ...userReviews
    ]);
    setNewReviewText('');
    addToast('Thank you! Your verified review has been published.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#070709] pt-32 pb-24 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7 space-y-4 sticky top-28">
          <div className="aspect-[4/4] sm:aspect-[4/3] w-full rounded-3xl overflow-hidden glass-panel border border-white/10 relative group bg-black/60">
            <img
              src={activeImg}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            {product.isFlashSale && (
              <span className="absolute top-4 left-4 bg-luxury-gold text-black font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-glow-gold uppercase">
                Save {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(img)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ₹{
                  activeImg === img ? 'border-luxury-gold shadow-glow-gold scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Configuration & Purchase */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-luxury-gold font-bold uppercase tracking-widest">
              <span>{product.category} &bull; {product.subCategory}</span>
              <div className="flex items-center space-x-1 text-white">
                <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-gray-400">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Price Box */}
            <div className="flex items-baseline space-x-4 pt-2">
              <span className="text-4xl font-black text-white">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                In Stock ({product.stockCount} left)
              </span>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed pt-2">
              {product.description}
            </p>
          </div>

          {/* Color Selection */}
          <div className="space-y-2 border-t border-white/10 pt-6">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
              Selected Color: <span className="text-white">{selectedColor.name}</span>
            </label>
            <div className="flex space-x-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ₹{
                    selectedColor.name === c.name ? 'border-luxury-gold scale-110 shadow-glow-gold' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor.name === c.name && (
                    <Check className={`w-4 h-4 ₹{c.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3 border-t border-white/10 pt-6">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Select Size
              </label>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs text-luxury-gold underline flex items-center space-x-1 hover:text-white"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ₹{
                    selectedSize === s
                      ? 'bg-luxury-gold text-black border-luxury-gold shadow-glow-gold'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 border-t border-white/10 pt-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center glass-panel rounded-xl px-4 py-3 border border-white/10 space-x-4">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="text-gray-400 hover:text-white font-bold text-lg"
                >
                  -
                </button>
                <span className="text-white font-bold text-base">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="text-gray-400 hover:text-white font-bold text-lg"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-luxury-gold/10 hover:bg-luxury-gold text-luxury-gold hover:text-black border border-luxury-gold/40 font-extrabold text-sm py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-glow-gold"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-xl glass-panel transition-all ₹{
                  isSaved ? 'text-rose-500 border-rose-500/50 bg-rose-500/10' : 'text-gray-300 hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ₹{isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full bg-gradient-to-r from-luxury-goldDark via-luxury-gold to-luxury-goldLight text-black font-black text-sm py-4 rounded-xl flex items-center justify-center space-x-2 shadow-glow-gold hover:opacity-95 transition-all"
            >
              <span>Instant Luxury Checkout &bull; ₹{(product.price * qty).toFixed(0)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-4 text-xs text-gray-300">
            <div className="glass-panel p-3 rounded-xl border border-white/5 flex items-center space-x-2">
              <Truck className="w-4 h-4 text-luxury-gold" />
              <span>Free Express Delivery</span>
            </div>
            <div className="glass-panel p-3 rounded-xl border border-white/5 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-luxury-gold" />
              <span>Authenticity Certified</span>
            </div>
          </div>

        </div>
      </div>

      {/* Specifications & Reviews Tabs */}
      <div className="glass-panel rounded-3xl p-8 border border-white/10 space-y-8">
        <div className="flex border-b border-white/10 space-x-8 text-sm font-bold">
          {[
            { id: 'specs', label: 'Specifications & Care' },
            { id: 'reviews', label: `Reviews (₹{userReviews.length})` },
            { id: 'shipping', label: 'Shipping & Returns' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 transition-all relative ₹{
                activeTab === tab.id ? 'text-luxury-gold' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-300">
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase text-xs tracking-wider text-luxury-gold">Craftsmanship Specs</h4>
              <ul className="space-y-2 font-medium">
                <li><strong className="text-white">Material:</strong> {product.specifications?.material || '100% Premium Organic Blend'}</li>
                <li><strong className="text-white">Fit:</strong> {product.specifications?.fit || 'Modern Tailored Fit'}</li>
                <li><strong className="text-white">Origin:</strong> {product.specifications?.origin || 'Made in Italy'}</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase text-xs tracking-wider text-luxury-gold">Care Instructions</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Hand wash cold or specialty eco-dry clean. Do not tumble dry. Iron on low temperature using damp cloth barrier. Preserve shape on padded cedarwood hangers.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-8">
            {/* Submit Review Form */}
            <form onSubmit={handleReviewSubmit} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 max-w-xl">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Leave a Verified Review</h4>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">Rating:</span>
                <div className="flex space-x-1 text-luxury-gold cursor-pointer">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <Star
                      key={r}
                      onClick={() => setNewRating(r)}
                      className={`w-5 h-5 ₹{r <= newRating ? 'fill-current' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
              </div>
              <textarea
                placeholder="Share your luxury experience with fit, comfort, and fabric..."
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                rows={3}
                className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold"
              />
              <button
                type="submit"
                className="bg-luxury-gold text-black font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-glow-gold"
              >
                Publish Review
              </button>
            </form>

            {/* List */}
            <div className="space-y-4">
              {userReviews.map((rev, idx) => (
                <div key={idx} className="glass-panel p-4 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{rev.name}</span>
                    <span className="text-gray-500">{rev.date}</span>
                  </div>
                  <div className="flex space-x-1 text-luxury-gold">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-300">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4 text-xs text-gray-300 leading-relaxed max-w-2xl">
            <p>
              All orders are dispatched in custom water-resistant obsidian boxes with satin dust bags via DHL Express or FedEx Priority.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-400">
              <li>North America & Europe: 1 - 2 Business Days</li>
              <li>Asia Pacific & Middle East: 2 - 3 Business Days</li>
              <li>Complimentary 30-day global returns & size exchange</li>
            </ul>
          </div>
        )}
      </div>

      {/* Related Products */}
      <div className="space-y-8">
        <h3 className="text-2xl font-extrabold text-white tracking-tight">
          YOU MAY ALSO ADMIRE
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

    </div>
  );
};
