export const MOCK_PRODUCTS = [
  // --- SNEAKERS & RUNNING SHOES & FOOTWEAR ---
  {
    id: "prod-1",
    name: "AURA VORTEX 900 MATRIX SNEAKER",
    category: "Footwear",
    subCategory: "Sneakers",
    price: 340,
    originalPrice: 420,
    rating: 4.9,
    reviewsCount: 128,
    isNew: true,
    isBestSeller: true,
    isTrending: true,
    isFlashSale: false,
    discountPercent: 19,
    colors: [
      { name: "Obsidian Gold", hex: "#111115" },
      { name: "Pure Titanium", hex: "#E2E8F0" },
      { name: "Midnight Charcoal", hex: "#26262E" }
    ],
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    inStock: true,
    stockCount: 14,
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Engineered for elite performance and high-street luxury aesthetics. Crafted with multi-layered responsive foam midsoles and Italian metallic gold dynamic cage detailing.",
    specifications: {
      material: "3D Fly-Knit & Premium Italian Calfskin Leather",
      fit: "True to size (Sculpted Ergonomic)",
      sole: "Carbon Fiber Plate & Air Cushioning",
      origin: "Handcrafted in Italy"
    }
  },
  {
    id: "prod-2",
    name: "KINETIC HYPER-RUN PRO",
    category: "Footwear",
    subCategory: "Running Shoes",
    price: 290,
    originalPrice: 350,
    rating: 4.8,
    reviewsCount: 94,
    isNew: true,
    isBestSeller: false,
    isTrending: true,
    isFlashSale: true,
    discountPercent: 17,
    colors: [
      { name: "Matte Black", hex: "#0F0F12" },
      { name: "Neon Platinum", hex: "#CBD5E1" }
    ],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    inStock: true,
    stockCount: 22,
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Ultra-lightweight marathon running shoes featuring carbon propulsive technology and breathable aerodynamic grid upper.",
    specifications: {
      material: "Micro-Grid Mesh & Recycled TPU",
      fit: "Precision Snug",
      sole: "Pro-Bounce Nitro Cushion",
      origin: "Designed in Tokyo"
    }
  },
  {
    id: "prod-3",
    name: "ROYAL MONARCH DERBY FORMAL SHOES",
    category: "Footwear",
    subCategory: "Formal Shoes",
    price: 490,
    originalPrice: 580,
    rating: 5.0,
    reviewsCount: 64,
    isNew: false,
    isBestSeller: true,
    isTrending: false,
    isFlashSale: false,
    discountPercent: 15,
    colors: [
      { name: "Burnished Espresso", hex: "#2A1810" },
      { name: "Jet Black", hex: "#000000" }
    ],
    sizes: ["US 8", "US 9", "US 10", "US 11"],
    inStock: true,
    stockCount: 8,
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Exquisite hand-burnished Full-Grain Leather Derby featuring Goodyear welted sole and gold debossed insoles for executive distinction.",
    specifications: {
      material: "100% Full-Grain French Calfskin",
      fit: "Classic European Fit",
      sole: "Goodyear Welted Oak-Tanned Leather",
      origin: "Handcrafted in Florence, Italy"
    }
  },
  {
    id: "prod-4",
    name: "CHRONOS Suede CHELSEA BOOTS",
    category: "Footwear",
    subCategory: "Boots",
    price: 420,
    originalPrice: 480,
    rating: 4.9,
    reviewsCount: 88,
    isNew: true,
    isBestSeller: true,
    isTrending: true,
    isFlashSale: false,
    discountPercent: 12,
    colors: [
      { name: "Sand Beige", hex: "#C5B39B" },
      { name: "Charcoal Black", hex: "#1A1A1A" }
    ],
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    inStock: true,
    stockCount: 19,
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Sleek Chelsea silhouette in water-resistant Italian suede with stretch side panels and a solid stacked leather heel.",
    specifications: {
      material: "Italian Calfskin Suede",
      fit: "Tailored Ankle Fit",
      sole: "Vibram Rubber & Leather Stack",
      origin: "Made in Portugal"
    }
  },
  {
    id: "prod-5",
    name: "URBAN DRIFT CASUAL LOAFERS",
    category: "Footwear",
    subCategory: "Casual Shoes",
    price: 260,
    originalPrice: 310,
    rating: 4.7,
    reviewsCount: 42,
    isNew: false,
    isBestSeller: false,
    isTrending: true,
    isFlashSale: false,
    discountPercent: 16,
    colors: [
      { name: "Rich Cognac", hex: "#5C3A21" },
      { name: "Stealth Black", hex: "#141414" }
    ],
    sizes: ["US 8", "US 9", "US 10", "US 11"],
    inStock: true,
    stockCount: 15,
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Effortless casual loafers with gold horsebit ornament and memory foam footbed for executive weekend luxury.",
    specifications: {
      material: "Soft Nappa Leather",
      fit: "Relaxed Slip-on",
      sole: "Flexible Rubber Pebble Sole",
      origin: "Made in Spain"
    }
  },
  {
    id: "prod-6",
    name: "SOLARIS LUXURY LEATHER SANDALS",
    category: "Footwear",
    subCategory: "Sandals",
    price: 180,
    originalPrice: 220,
    rating: 4.6,
    reviewsCount: 31,
    isNew: true,
    isBestSeller: false,
    isTrending: false,
    isFlashSale: true,
    discountPercent: 18,
    colors: [
      { name: "Dark Ebony", hex: "#1E1A18" },
      { name: "Sahara Tan", hex: "#8C6D58" }
    ],
    sizes: ["US 8", "US 9", "US 10", "US 11"],
    inStock: true,
    stockCount: 10,
    images: [
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Minimalist criss-cross leather strap sandals with ergonomic arch support for resort wear and summer luxury.",
    specifications: {
      material: "Vegetable Tanned Leather",
      fit: "Standard Slide",
      sole: "Molded Cork & EVA Sole",
      origin: "Made in Greece"
    }
  },

  // --- JACKETS & HOODIES & SWEATSHIRTS & CLOTHING ---
  {
    id: "prod-7",
    name: "OVERSIZED LUXURY CASHMERE HOODIE",
    category: "Clothing",
    subCategory: "Hoodies",
    price: 380,
    originalPrice: 450,
    rating: 4.9,
    reviewsCount: 156,
    isNew: true,
    isBestSeller: true,
    isTrending: true,
    isFlashSale: false,
    discountPercent: 15,
    colors: [
      { name: "Obsidian Black", hex: "#0A0A0C" },
      { name: "Champagne Cream", hex: "#E8E2D5" },
      { name: "Titanium Gray", hex: "#3A3A42" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 25,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Heavyweight 480GSM organic Mongolian Cashmere blend hoodie with custom engraved gold-tipped drawstrings and double-lined hood.",
    specifications: {
      material: "70% Mongolian Cashmere, 30% Organic Heavy Cotton",
      fit: "Relaxed Luxury Oversized",
      weight: "480 GSM",
      care: "Dry Clean Only"
    }
  },
  {
    id: "prod-8",
    name: "METROPOLIS LEATHER BIKER JACKET",
    category: "Clothing",
    subCategory: "Jackets",
    price: 890,
    originalPrice: 1100,
    rating: 5.0,
    reviewsCount: 79,
    isNew: false,
    isBestSeller: true,
    isTrending: true,
    isFlashSale: false,
    discountPercent: 19,
    colors: [
      { name: "Midnight Noir", hex: "#09090B" }
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 6,
    images: [
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Iconic asymmetric moto leather jacket crafted from buttery soft Lambskin leather with custom matte gold YKK hardware and silk lining.",
    specifications: {
      material: "100% Premium Lambskin Leather",
      lining: "100% Japanese Cupro Silk",
      hardware: "Engraved Matte Gold Zippers",
      origin: "Tailored in Milan"
    }
  },
  {
    id: "prod-9",
    name: "MONARCH TAILORED SUIT JACKET",
    category: "Clothing",
    subCategory: "Jackets",
    price: 750,
    originalPrice: 900,
    rating: 4.9,
    reviewsCount: 52,
    isNew: true,
    isBestSeller: false,
    isTrending: true,
    isFlashSale: false,
    discountPercent: 16,
    colors: [
      { name: "Charcoal Micro-Check", hex: "#23232C" },
      { name: "Deep Navy", hex: "#0F172A" }
    ],
    sizes: ["38R", "40R", "42R", "44R"],
    inStock: true,
    stockCount: 11,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Single-breasted double-vented suit blazer crafted from Super 150s Merino Wool. Features peak lapels and real horn buttons.",
    specifications: {
      material: "100% Super 150s Italian Merino Wool",
      lapel: "Peak Lapel with Gold Buttonhole Accent",
      fit: "Modern Slim Tailored",
      origin: "Made in Italy"
    }
  },
  {
    id: "prod-10",
    name: "ESSENTIAL PIMA COTTON T-SHIRT",
    category: "Clothing",
    subCategory: "T-Shirts",
    price: 95,
    originalPrice: 120,
    rating: 4.8,
    reviewsCount: 240,
    isNew: false,
    isBestSeller: true,
    isTrending: false,
    isFlashSale: false,
    discountPercent: 20,
    colors: [
      { name: "Crisp White", hex: "#FFFFFF" },
      { name: "Obsidian", hex: "#0D0D11" },
      { name: "Taupe Gray", hex: "#737373" }
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 45,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Unmatched silky softness crafted from 100% Supima Long-Staple Cotton. Pre-shrunk micro-ribbed crew neck.",
    specifications: {
      material: "100% Peruvian Supima Cotton",
      weight: "220 GSM Heavyweight Soft",
      fit: "Tailored Modern Boxy",
      care: "Machine Wash Cold"
    }
  },
  {
    id: "prod-11",
    name: "SILK TOUCH OXFORD BUTTON-DOWN SHIRT",
    category: "Clothing",
    subCategory: "Shirts",
    price: 185,
    originalPrice: 220,
    rating: 4.9,
    reviewsCount: 110,
    isNew: true,
    isBestSeller: false,
    isTrending: true,
    isFlashSale: false,
    discountPercent: 15,
    colors: [
      { name: "Sky Azure", hex: "#BAE6FD" },
      { name: "Pure White", hex: "#FFFFFF" }
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 30,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Crisp Oxford weave shirt infused with 5% Mulberry Silk for subtle lustre and effortless drape under blazers.",
    specifications: {
      material: "95% Egyptian Cotton, 5% Silk",
      collar: "Button-Down Spread Collar",
      buttons: "Mother of Pearl Buttons",
      origin: "Made in Portugal"
    }
  },
  {
    id: "prod-12",
    name: "VENICE MERCERIZED POLO SHIRT",
    category: "Clothing",
    subCategory: "Polo Shirts",
    price: 160,
    originalPrice: 195,
    rating: 4.7,
    reviewsCount: 86,
    isNew: false,
    isBestSeller: true,
    isTrending: false,
    isFlashSale: true,
    discountPercent: 18,
    colors: [
      { name: "Emerald Olive", hex: "#1C3A27" },
      { name: "Black Gold Accent", hex: "#121214" }
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 18,
    images: [
      "https://images.unsplash.com/photo-1625910513413-562a12903c70?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Mercerized double-knit polo shirt with seamless open placket and understated metallic gold collar trim.",
    specifications: {
      material: "100% Double-Mercerized Cotton",
      fit: "Athletic Slim",
      placket: "Zipperless Clean V-Placket"
    }
  },
  {
    id: "prod-13",
    name: "NOIR EMBOSSED SWEATSHIRT",
    category: "Clothing",
    subCategory: "Sweatshirts",
    price: 240,
    originalPrice: 290,
    rating: 4.8,
    reviewsCount: 73,
    isNew: true,
    isBestSeller: false,
    isTrending: true,
    isFlashSale: false,
    discountPercent: 17,
    colors: [
      { name: "Slate Charcoal", hex: "#1F1F28" },
      { name: "Oatmeal Heather", hex: "#D6D3D1" }
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 21,
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Structured crewneck sweatshirt featuring subtle tonal 3D debossed crest on chest and French Terry interior.",
    specifications: {
      material: "100% French Terry Heavy Cotton",
      weight: "420 GSM",
      fit: "Structured Boxy Fit"
    }
  },
  {
    id: "prod-14",
    name: "RAW DENIM SELVEDGE JEANS",
    category: "Clothing",
    subCategory: "Jeans",
    price: 220,
    originalPrice: 270,
    rating: 4.9,
    reviewsCount: 142,
    isNew: false,
    isBestSeller: true,
    isTrending: false,
    isFlashSale: false,
    discountPercent: 18,
    colors: [
      { name: "Japanese Deep Indigo", hex: "#1A233A" },
      { name: "Washed Carbon Black", hex: "#1A1A1E" }
    ],
    sizes: ["30x32", "32x32", "34x32", "36x32"],
    inStock: true,
    stockCount: 28,
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "14.5oz Japanese Kurabo Mills shuttle-loom selvedge denim. Custom copper rivets and gold thread stitching.",
    specifications: {
      material: "100% Kurabo Japanese Selvedge Cotton",
      fit: "Slim Tapered",
      details: "Redline Selvedge ID"
    }
  },
  {
    id: "prod-15",
    name: "ARCHITECT PLEATED TROUSERS",
    category: "Clothing",
    subCategory: "Trousers",
    price: 260,
    originalPrice: 320,
    rating: 4.8,
    reviewsCount: 61,
    isNew: true,
    isBestSeller: false,
    isTrending: true,
    isFlashSale: false,
    discountPercent: 18,
    colors: [
      { name: "Obsidian Black", hex: "#0B0B0E" },
      { name: "Sandstone Beige", hex: "#A89F91" }
    ],
    sizes: ["30", "32", "34", "36"],
    inStock: true,
    stockCount: 16,
    images: [
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Single forward pleat tailored trousers featuring side adjusters and a fluid high-waisted drape.",
    specifications: {
      material: "Wool-Viscose Blend",
      fit: "Relaxed Tapered High Rise",
      waist: "Extended Tab & Gold Side Buckles"
    }
  },
  {
    id: "prod-16",
    name: "STEALTH UTILITY TAILORED SHORTS",
    category: "Clothing",
    subCategory: "Shorts",
    price: 145,
    originalPrice: 180,
    rating: 4.7,
    reviewsCount: 39,
    isNew: false,
    isBestSeller: false,
    isTrending: true,
    isFlashSale: true,
    discountPercent: 19,
    colors: [
      { name: "Matte Slate", hex: "#2A2A33" },
      { name: "Desert Khaki", hex: "#9E8B75" }
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 22,
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Water-repellent 4-way stretch utility shorts with concealed magnetic pockets and minimalist clean silhouette.",
    specifications: {
      material: "88% Nylon, 12% Elastane",
      inseam: "7 Inches",
      features: "Waterproof Zippers & Magnetic Closure"
    }
  },

  // --- SPORTSWEAR ---
  {
    id: "prod-17",
    name: "AURA PRO ATHLETIC SET (JACKET + JOGGERS)",
    category: "Sportswear",
    subCategory: "Sportswear",
    price: 360,
    originalPrice: 440,
    rating: 4.9,
    reviewsCount: 115,
    isNew: true,
    isBestSeller: true,
    isTrending: true,
    isFlashSale: false,
    discountPercent: 18,
    colors: [
      { name: "Cyber Stealth Black", hex: "#0A0A0D" },
      { name: "Silver Metal", hex: "#94A3B8" }
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 17,
    images: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1483721077285-f125ad85974b?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Complete performance activewear set built with dynamic thermal regulation technology, seamless ventilation zones, and phone zip pockets.",
    specifications: {
      material: "Aerodynamic Micro-Polyester & Spandex",
      includes: "Zip Track Jacket & Tapered Jogger Pant",
      features: "360 Reflective Gold Logos & Moisture Wicking"
    }
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Products" },
  { id: "Clothing", name: "Clothing" },
  { id: "Footwear", name: "Footwear" },
  { id: "Sportswear", name: "Sportswear" },
];

export const SUB_CATEGORIES = [
  "T-Shirts",
  "Shirts",
  "Polo Shirts",
  "Hoodies",
  "Sweatshirts",
  "Jackets",
  "Jeans",
  "Trousers",
  "Shorts",
  "Sportswear",
  "Sneakers",
  "Casual Shoes",
  "Formal Shoes",
  "Running Shoes",
  "Boots",
  "Sandals"
];
