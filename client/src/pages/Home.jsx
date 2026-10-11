import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Flame, Star, Clock, Zap, Award, ChevronRight } from 'lucide-react';
import { FigmaMotionBackground } from '../components/home/FigmaMotionBackground';
import { ProductCard } from '../components/products/ProductCard';
import { useShop } from '../context/ShopContext';

export const Home = () => {
  const { products } = useShop();

  // Filter specific showcases
  const trendingProducts = products.filter((p) => p.isTrending);
  const newArrivals = products.filter((p) => p.isNew);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const flashSaleProducts = products.filter((p) => p.isFlashSale);
  const sneakersShowcase = products.filter((p) => p.subCategory === 'Sneakers' || p.subCategory === 'Running Shoes');
  const formalShoesShowcase = products.filter((p) => p.subCategory === 'Formal Shoes' || p.subCategory === 'Boots');

  // Flash Sale Countdown Timer (Hours, Mins, Secs)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070709] text-white overflow-hidden">
      
      {/* Figma Motion Background */}
      <FigmaMotionBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel-gold border border-luxury-gold/40 text-luxury-gold text-xs font-bold uppercase tracking-widest shadow-glow-gold animate-pulse-slow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Couture 2026 Collection</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-none">
              <span className="text-white block">ELEVATE</span>
              <span className="text-gold-gradient block mt-1">YOUR STYLE</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Discover premium men's fashion designed for confidence, comfort, and everyday luxury.
              Architectural tailoring, rare Italian cashmere, and kinetic footwear aesthetics.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/shop"
                className="w-full sm:w-auto bg-gradient-to-r from-luxury-goldDark via-luxury-gold to-luxury-goldLight text-black font-extrabold text-sm px-9 py-4 rounded-2xl flex items-center justify-center space-x-3 shadow-glow-gold hover:scale-105 transition-all duration-300"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/clothing"
                className="w-full sm:w-auto glass-panel hover:bg-white/10 text-white font-extrabold text-sm px-9 py-4 rounded-2xl flex items-center justify-center space-x-2 border border-white/20 hover:border-luxury-gold/50 transition-all duration-300"
              >
                <span>Explore Collection</span>
              </Link>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white block">100%</span>
                <span className="text-xs text-gray-400 font-medium">Italian Leather</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-luxury-gold block">24H</span>
                <span className="text-xs text-gray-400 font-medium">Express Dispatch</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white block">4.9★</span>
                <span className="text-xs text-gray-400 font-medium">Verified Buyers</span>
              </div>
            </div>
          </div>

          {/* Right Floating Fashion Model & Sneaker Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-luxury-gold/30 to-sky-500/20 rounded-3xl blur-2xl opacity-60 animate-pulse-slow" />
              
              {/* Main Model Image Card */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=80"
                  alt="Men's Fashion Model"
                  className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-80" />

                {/* Overlaid Floating Sneaker Widget */}
                <div className="absolute bottom-6 left-6 right-6 glass-panel-gold rounded-2xl p-4 border border-luxury-gold/40 flex items-center space-x-4 shadow-luxury animate-float">
                  <img
                    src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=300&q=80"
                    alt="AURA VORTEX 900"
                    className="w-16 h-16 object-cover rounded-xl bg-black/60 border border-luxury-gold/30"
                  />
                  <div className="flex-1">
                    <span className="text-[10px] uppercase font-bold text-luxury-gold tracking-widest block">Featured Luxury Footwear</span>
                    <h4 className="text-xs font-extrabold text-white">AURA VORTEX 900 MATRIX</h4>
                    <span className="text-sm font-black text-white">₹340</span>
                  </div>
                  <Link
                    to="/sneakers"
                    className="p-2.5 rounded-xl bg-luxury-gold text-black hover:bg-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Featured Collections Showcase */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold">
            Curated Categories
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            FEATURED COLLECTIONS
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            From cashmere hoodies to Italian leather boots, explore our signature menswear ranges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Luxury Outerwear",
              subtitle: "Jackets & Blazers",
              img: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=800&q=80",
              link: "/clothing"
            },
            {
              title: "High-Street Hoodies",
              subtitle: "Mongolian Cashmere",
              img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
              link: "/clothing"
            },
            {
              title: "Kinetic Footwear",
              subtitle: "Sneakers & Runners",
              img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
              link: "/sneakers"
            },
            {
              title: "Heritage Boots",
              subtitle: "Italian Suede & Leather",
              img: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80",
              link: "/footwear"
            }
          ].map((col, i) => (
            <Link
              key={i}
              to={col.link}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-luxury-gold/40 transition-all duration-500 hover:-translate-y-2 shadow-luxury"
            >
              <img
                src={col.img}
                alt={col.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <span className="text-[10px] uppercase font-bold text-luxury-gold tracking-widest block">{col.subtitle}</span>
                <h3 className="text-xl font-bold text-white group-hover:text-luxury-gold transition-colors">{col.title}</h3>
                <div className="flex items-center space-x-1 text-xs text-gray-300 font-semibold pt-1">
                  <span>Explore Now</span>
                  <ChevronRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-luxury-gold text-xs font-bold uppercase tracking-widest mb-2">
              <Flame className="w-4 h-4 fill-luxury-gold" />
              <span>High Demand</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              TRENDING NOW
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 text-xs font-extrabold text-luxury-gold hover:text-white uppercase tracking-wider transition-colors"
          >
            <span>View All Trending</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Flash Sale Banner Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-panel-gold rounded-3xl p-8 sm:p-12 border border-luxury-gold/40 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-luxury-gold text-black font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-glow-gold">
                <Zap className="w-3.5 h-3.5 fill-black" />
                <span>Limited Time Offer</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                FLASH SALE <span className="text-luxury-gold">&bull; UP TO 40% OFF</span>
              </h2>
              <p className="text-gray-300 text-sm max-w-lg">
                Exclusive discounts on selected cashmere hoodies, leather biker jackets, and performance running sneakers. Claim your piece before stock expires.
              </p>

              {/* Countdown Timer */}
              <div className="flex items-center space-x-4 pt-2">
                {[
                  { label: "Hours", val: timeLeft.hours },
                  { label: "Minutes", val: timeLeft.minutes },
                  { label: "Seconds", val: timeLeft.seconds }
                ].map((t, idx) => (
                  <div key={idx} className="glass-panel rounded-2xl p-3 w-20 text-center border border-luxury-gold/30">
                    <span className="text-2xl font-black text-white block">{String(t.val).padStart(2, '0')}</span>
                    <span className="text-[10px] text-luxury-gold uppercase font-bold tracking-wider">{t.label}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/sale"
                  className="inline-flex items-center space-x-2 bg-luxury-gold text-black font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-glow-gold hover:bg-white transition-all"
                >
                  <span>Shop Flash Sale</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {flashSaleProducts.slice(0, 2).map((p) => (
                <div key={p.id} className="glass-panel rounded-2xl p-3 border border-white/10">
                  <img src={p.images[0]} alt={p.name} className="w-full aspect-square object-cover rounded-xl mb-2" />
                  <h4 className="text-xs font-bold text-white line-clamp-1">{p.name}</h4>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-sm font-black text-luxury-gold">₹{p.price}</span>
                    <span className="text-xs text-gray-500 line-through">₹{p.originalPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals & Best Sellers Grid */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold">
            New Season Drop
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            NEW ARRIVALS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Footwear Spotlight Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold block mb-2">
              Footwear Atelier
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              PREMIUM SNEAKERS & SHOES
            </h2>
          </div>
          <Link
            to="/sneakers"
            className="inline-flex items-center space-x-2 text-xs font-extrabold text-luxury-gold hover:text-white uppercase tracking-wider transition-colors"
          >
            <span>Explore All Footwear</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sneakersShowcase.concat(formalShoesShowcase).slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials / Customer Reviews */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold">
            Client Distinction
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            WHAT OUR CLIENTS SAY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "The cashmere quality of the oversized hoodie easily rivals Savile Row fashion houses. The gold drawer tips and weight are extraordinary.",
              author: "Dominic Sterling",
              role: "Creative Director & Verified Buyer",
              rating: 5
            },
            {
              quote: "AURA VORTEX sneakers are the most comfortable hybrid running shoes I have owned. Sleek enough for Paris Fashion Week, durable for daily wear.",
              author: "Marcus Thorne",
              role: "Architect & Sneaker Collector",
              rating: 5
            },
            {
              quote: "Customer concierge and packaging arrived in custom obsidian velvet boxes. Pure 5-star luxury experience from purchase to delivery.",
              author: "Alexander Rothschild",
              role: "Venture Partner",
              rating: 5
            }
          ].map((rev, idx) => (
            <div key={idx} className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex space-x-1 text-luxury-gold">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  "{rev.quote}"
                </p>
              </div>
              <div className="pt-4 border-t border-white/5">
                <h4 className="text-sm font-bold text-white">{rev.author}</h4>
                <span className="text-xs text-luxury-gold">{rev.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
