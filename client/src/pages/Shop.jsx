
import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Grid, Filter, RotateCcw, Check, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/products/ProductCard';
import { SUB_CATEGORIES } from '../data/mockProducts';

export const Shop = () => {
  const { products } = useShop();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1200);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter Sub-category toggle
  const toggleSubCategory = (sub) => {
    setSelectedSubCategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  // Reset Filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSubCategories([]);
    setMaxPrice(1200);
    setInStockOnly(false);
    setSortBy('featured');
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (
          selectedCategory !== 'all' &&
          p.category.toLowerCase() !== selectedCategory.toLowerCase()
        ) {
          return false;
        }

        if (
          selectedSubCategories.length > 0 &&
          !selectedSubCategories.includes(p.subCategory)
        ) {
          return false;
        }

        if (p.price > maxPrice) return false;
        if (inStockOnly && !p.inStock) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0;
      });
  }, [
    products,
    selectedCategory,
    selectedSubCategories,
    maxPrice,
    inStockOnly,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-[#070709] pt-32 pb-24 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-8 mb-10 border border-white/10 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold">
            Haute Couture Collection
          </span>

          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
            MEN'S LUXURY ATELIER
          </h1>

          <p className="text-gray-400 text-sm max-w-xl">
            Explore 17 strict men's categories, from Italian tailoring and cashmere hoodies to kinetic running sneakers and Goodyear derby shoes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center space-x-2 font-bold text-sm text-white">
                <Filter className="w-4 h-4 text-luxury-gold" />
                <span>Filter Store</span>
              </div>

              <button
                onClick={resetFilters}
                className="text-xs text-gray-400 hover:text-luxury-gold flex items-center space-x-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Category Groups */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-luxury-gold block">
                Primary Category
              </label>

              {[
                { id: 'all', name: "All Men's Products" },
                { id: 'Clothing', name: 'Clothing & Outerwear' },
                { id: 'Footwear', name: 'Footwear & Boots' },
                { id: 'Sportswear', name: 'Sportswear' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-luxury-gold text-black shadow-glow-gold'
                      : 'text-white hover:bg-white/5'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sub-Category Checkboxes */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <label className="text-xs font-bold uppercase tracking-wider text-luxury-gold block">
                Sub-Categories ({SUB_CATEGORIES.length})
              </label>

              <div className="max-h-60 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
                {SUB_CATEGORIES.map((sub) => {
                  const isChecked = selectedSubCategories.includes(sub);

                  return (
                    <button
                      key={sub}
                      onClick={() => toggleSubCategory(sub)}
                      className="w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-lg hover:bg-white/5 text-white hover:text-white transition-colors"
                    >
                      <span>{sub}</span>

                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-luxury-gold border-luxury-gold text-black'
                            : 'border-white/20'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Max Price Slider */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex justify-between text-xs">
                <label className="font-bold uppercase tracking-wider text-luxury-gold">
                  Max Price
                </label>
                <span className="font-bold text-white">₹{maxPrice}</span>
              </div>

              <input
                type="range"
                min="50"
                max="1200"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-luxury-gold bg-black/60 rounded-lg cursor-pointer"
              />
            </div>

            {/* In Stock Toggle */}
            <div className="pt-4 border-t border-white/10">
              <label className="flex items-center space-x-2 text-xs font-bold text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded accent-luxury-gold"
                />
                <span>Show In-Stock Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Main Product Grid Column */}
        <div className="lg:col-span-9 space-y-6">
          {/* Top Control Bar */}
          <div className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-xs text-gray-400">
              <span className="font-bold text-white">
                {filteredProducts.length}
              </span>
              <span>Items Found</span>

              {selectedSubCategories.length > 0 && (
                <span className="bg-luxury-gold/20 text-luxury-gold px-2 py-0.5 rounded-full border border-luxury-gold/40 text-[10px] font-bold">
                  {selectedSubCategories.length} Filters Active
                </span>
              )}
            </div>

            {/* Sorting */}
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-400 font-bold uppercase">
                Sort By:
              </span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black/60 border border-white/20 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-luxury-gold"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Drop</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="glass-panel rounded-3xl p-12 text-center text-gray-400 space-y-4">
              <Sparkles className="w-10 h-10 text-luxury-gold mx-auto" />

              <h3 className="text-lg font-bold text-white">
                No items match your active filters
              </h3>

              <button
                onClick={resetFilters}
                className="bg-luxury-gold text-black font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-glow-gold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
