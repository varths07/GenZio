import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Reveal } from '../components/ui/Reveal';

const heroImage =
  'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&crop=faces,center&w=2200&h=1400&q=85';

const getProductImage = (product) =>
  product.image_url || product.image || product.images?.[0] || '';

const getCategoryPath = (category = '') => {
  const normalizedCategory = category.toLowerCase();

  if (normalizedCategory.includes('foot')) return '/footwear';
  if (normalizedCategory.includes('sport')) return '/sportswear';
  return '/clothing';
};

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

const HomeProduct = ({ product, addToCart, toggleWishlist, isInWishlist }) => {
  const saved = isInWishlist(product.id);
  const image = getProductImage(product);
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="group min-w-0"
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e4dc]">
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
          {image ? (
            <img
              src={image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
            />
          ) : (
            <span className="grid h-full place-items-center text-xs text-[#55504A]">
              Image unavailable
            </span>
          )}
        </Link>
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={saved}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center bg-[#f5f2eb]/95 text-[#20201d] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e] active:scale-90 active:transition-transform"
        >
          <Heart className={`h-[17px] w-[17px] ${saved ? 'fill-current text-[#914d40]' : ''}`} />
        </button>
        {product.isDemo && (
          <span className="absolute left-3 top-3 bg-[#f5f2eb]/95 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#514b42]">
            Demo
          </span>
        )}
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="absolute bottom-3 left-3 right-3 flex min-h-11 items-center justify-between bg-[#f5f2eb] px-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#20201d] opacity-100 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e] active:scale-[0.98] sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100"
        >
          <span>Add to bag</span>
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <div className="flex items-start justify-between gap-3 pt-4">
        <div className="min-w-0">
          <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-[#77736c]">
            {product.subCategory || product.category}
          </p>
          <Link
            to={`/product/${product.id}`}
            className="inline-block text-sm font-medium leading-snug text-[#20201d] transition-colors hover:text-[#8c6b3e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
          >
            {product.name}
          </Link>
        </div>
        <span className="shrink-0 pt-5 text-sm text-[#20201d]">{formatPrice(product.price)}</span>
      </div>
    </motion.article>
  );
};

export const Home = () => {
  const {
    products,
    storefrontProducts,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useShop();
  const reduceMotion = useReducedMotion();
  const canObserve = typeof IntersectionObserver !== 'undefined';

  const catalogProducts = [...storefrontProducts].sort((first, second) => {
    if (Boolean(first.isDemo) !== Boolean(second.isDemo)) {
      return first.isDemo ? 1 : -1;
    }
    return new Date(second.created_at || 0) - new Date(first.created_at || 0);
  });

  const featuredCollections = [
    {
      title: "Shirts",
      matches: (product) =>
        /shirt/i.test(product.subCategory || product.category || "") &&
        !/t[ -]?shirts?|tees/i.test(product.subCategory || ""),
    },
    {
      title: "T-shirts",
      matches: (product) =>
        /t[ -]?shirts?|tees/i.test(product.subCategory || ""),
    },
    {
      title: "Trousers",
      matches: (product) =>
        /trousers?|pants/i.test(product.subCategory || product.category || ""),
    },
    {
      title: "Jeans",
      matches: (product) =>
        /jeans?|denim/i.test(product.subCategory || product.category || ""),
    },
    {
      title: "Jackets",
      matches: (product) =>
        /jackets?|overshirts?|outerwear/i.test(
          product.subCategory || product.category || ""
        ),
    },
  ]
    .map((collection) => ({
      ...collection,
      product: catalogProducts.find(
        (product) =>
          collection.matches(product) && getProductImage(product)
      ),
    }))
    .filter((collection) => collection.product);

  const flaggedArrivals = catalogProducts
    .filter((product) => product.isNew || product.is_new || product.isDemo)
    .slice(0, 4);
  const newArrivals =
    flaggedArrivals.length > 0
      ? flaggedArrivals
      : catalogProducts.slice(0, 4);
  const newArrivalIds = new Set(newArrivals.map((product) => product.id));
  const moreToExplore = catalogProducts
    .filter((product) => !newArrivalIds.has(product.id))
    .slice(0, 4);
  const editorialProduct = catalogProducts[4] || catalogProducts[0];
  const bestSellers = products
    .filter((product) => product.isBestSeller || product.is_best_seller)
    .slice(0, 4);
  const trendingProducts =
    bestSellers.length > 0 ? bestSellers : moreToExplore.slice(0, 4);
  const currentOffers = products
    .filter(
      (product) =>
        (product.isFlashSale || product.is_flash_sale) &&
        Number(product.discountPercent ?? product.discount_percent) > 0
    )
    .slice(0, 4);

  return (
    <main className="genzio-home overflow-x-clip bg-[#f4f1ea] text-[#20201d]">
      <section className="relative isolate flex min-h-[100svh] items-end bg-[#171b20] text-[#f8f6f2]">
        <motion.img
          src={heroImage}
          alt="Male model in a navy waistcoat and white shirt on an architectural city street"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 z-0 h-full w-full object-cover object-[center_38%]"
          initial={reduceMotion || !canObserve ? false : { scale: 1.035, opacity: 1 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#101820]/85 via-[#101820]/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-[#101820]/55 via-transparent to-transparent" />
        <motion.div
          className="relative z-20 mx-auto w-full max-w-[1600px] px-5 pb-16 pt-36 sm:px-10 sm:pb-20 lg:px-[8vw] lg:pb-[9vh]"
          initial={reduceMotion || !canObserve ? false : { opacity: 1, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.24em] text-white/80 sm:text-xs">
            GENZIO <span className="px-1.5 text-white/50">|</span> MENSWEAR
          </p>
          <h1 className="max-w-2xl font-serif text-5xl leading-[0.98] sm:text-7xl lg:text-[6rem]">
            Dress like
            <br />
            <span className="italic">yourself.</span>
          </h1>
          <div className="mt-7 flex max-w-2xl flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-sm text-sm leading-6 text-white/85 sm:text-base">
              Everyday menswear with a point of view. Find the pieces you'll reach for again.
            </p>
            <Link
              to="/shop"
              className="group inline-flex min-h-12 w-fit items-center gap-5 border border-white/70 px-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:border-[#f8f6f2] hover:bg-[#f8f6f2] hover:text-[#171b20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-xs"
            >
              Explore the collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
        <a
          href="#collections"
          className="absolute bottom-7 right-6 z-20 hidden items-center gap-3 text-[9px] font-medium uppercase tracking-[0.2em] text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:inline-flex lg:right-[8vw]"
        >
          Scroll to explore <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-5 px-5 py-16 sm:px-10 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-14 lg:px-[8vw]">
        <Reveal>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#817b70]">
              A note from GenZio
            </p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Less noise.
              <br />
              More you.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-2xl text-sm leading-7 text-[#69655d] sm:text-base">
            GenZio is a focused edit of menswear made for the way you live now:
            simple pieces, considered proportions and room to make each look your
            own.
          </p>
        </Reveal>
      </section>

      <section id="collections" className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 sm:py-28 lg:px-[8vw]">
        <div className="mb-9 flex items-end justify-between gap-6 sm:mb-12">
          <Reveal>
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#77736c]">
                Explore the edit
              </p>
              <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
                Made to be worn
              </h2>
            </div>
          </Reveal>
          <Link
            to="/shop"
            className="hidden items-center gap-2 pb-1 text-xs font-semibold uppercase tracking-[0.13em] text-[#45423c] transition-colors hover:text-[#111111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111] sm:inline-flex"
          >
            All collections <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {featuredCollections.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-5 lg:gap-x-6">
            {featuredCollections.map(({ title, product }, index) => (
              <Reveal
                key={title}
                delay={index * 0.07}
              >
                <Link
                  to={getCategoryPath(product.category)}
                  className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[#e8e4dc]">
                    <img
                      src={getProductImage(product)}
                      alt={`${product.name} in the ${title} collection`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 border-b border-[#d7d1c6] py-3 transition-colors group-hover:border-[#111111]">
                    <span className="text-sm font-medium sm:text-base">{title}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#77736c] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="border-y border-[#d7d1c6] py-8 text-sm text-[#77736c]">
            Featured collections will appear here when products are available.
          </p>
        )}
      </section>

      <section className="border-y border-[#ded9cf] bg-[#eeebe4]">
        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-2">
          <Reveal className="flex min-h-[48svh] flex-col justify-center px-5 py-14 sm:px-10 sm:py-20 lg:min-h-[78svh] lg:px-[8vw]">
            <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#817b70]">
              Considered, not complicated
            </p>
            <h2 className="max-w-lg font-serif text-4xl leading-[1.08] sm:text-5xl">
              A good fit for the days that make you.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-[#69655d]">
              T-shirts, shirts, denim and more. Build a wardrobe around what feels like you.
            </p>
            <Link
              to="/clothing"
              className="mt-8 inline-flex w-fit items-center gap-3 border-b border-[#20201d] pb-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-[#8c6b3e] hover:text-[#8c6b3e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8c6b3e]"
            >
              Shop menswear <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal>
            <div className="group relative min-h-[48svh] overflow-hidden bg-[#d8d3c9] sm:min-h-[68svh] lg:min-h-[78svh]">
              {editorialProduct && getProductImage(editorialProduct) ? (
                <img
                  src={getProductImage(editorialProduct)}
                  alt={editorialProduct.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <img
                  src={heroImage}
                  alt="Male model in a navy waistcoat and white shirt on a city street"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-[center_38%]"
                />
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="new-arrivals" className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 sm:py-28 lg:px-[8vw]">
        <div className="mb-9 flex items-end justify-between gap-6 sm:mb-12">
          <Reveal>
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#817b70]">
                Just added
              </p>
              <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
                New arrivals
              </h2>
            </div>
          </Reveal>
          <Link
            to="/new-arrivals"
            className="hidden items-center gap-2 pb-1 text-xs font-semibold uppercase tracking-[0.13em] text-[#45423c] transition-colors hover:text-[#8c6b3e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8c6b3e] sm:inline-flex"
          >
            View all <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {newArrivals.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
            {newArrivals.map((product, index) => (
              <Reveal
                key={product.id}
                delay={index * 0.07}
              >
                <HomeProduct
                  product={product}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  isInWishlist={isInWishlist}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="border-y border-[#d7d1c6] py-8 text-sm text-[#77736c]">
            New arrivals will appear here when products are available.
          </p>
        )}
      </section>

      {moreToExplore.length > 0 && (
        <section className="bg-[#eeebe4] text-[#20201d]">
          <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 sm:py-28 lg:px-[8vw]">
            <div className="mb-9 flex items-end justify-between gap-6 sm:mb-12">
              <Reveal>
                <div>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#77736c]">
                    More to explore
                  </p>
                  <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
                    The rest of the edit
                  </h2>
                </div>
              </Reveal>
              <Link
                to="/shop"
                className="hidden items-center gap-2 pb-1 text-xs font-semibold uppercase tracking-[0.13em] text-[#45423c] transition-colors hover:text-[#111111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111] sm:inline-flex"
              >
                Shop all <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
              {moreToExplore.map((product, index) => (
                <Reveal key={product.id} delay={index * 0.07}>
                  <HomeProduct
                    product={product}
                    addToCart={addToCart}
                    toggleWishlist={toggleWishlist}
                    isInWishlist={isInWishlist}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {trendingProducts.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 sm:py-28 lg:px-[8vw]">
          <div className="mb-9 flex items-end justify-between gap-6 sm:mb-12">
            <Reveal>
              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#817b70]">
                  The collection
                </p>
                <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
                  {bestSellers.length > 0 ? "Best sellers" : "Trending now"}
                </h2>
              </div>
            </Reveal>
            <Link
              to="/shop"
              className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-[#45423c] hover:text-[#8c6b3e] sm:inline-flex"
            >
              Shop all <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
            {trendingProducts.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.07}>
                <HomeProduct
                  product={product}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  isInWishlist={isInWishlist}
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {currentOffers.length > 0 && (
        <section className="bg-[#eeebe4] text-[#20201d]">
          <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-10 sm:py-20 lg:px-[8vw]">
            <div className="mb-9 flex items-end justify-between gap-6 sm:mb-12">
              <Reveal>
                <div>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#77736c]">
                    Current offers
                  </p>
                  <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
                    A little extra
                  </h2>
                </div>
              </Reveal>
              <Link
                to="/sale"
                className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-[#45423c] hover:text-[#111111] sm:inline-flex"
              >
                View offers <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
              {currentOffers.map((product, index) => (
                <Reveal key={product.id} delay={index * 0.07}>
                  <HomeProduct
                    product={product}
                    addToCart={addToCart}
                    toggleWishlist={toggleWishlist}
                    isInWishlist={isInWishlist}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto grid max-w-[1600px] gap-8 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-[8vw]">
        <Reveal>
          <div className="group relative aspect-[4/3] overflow-hidden bg-[#e8e4dc]">
            <img
              src={getProductImage(editorialProduct) || heroImage}
              alt={
                editorialProduct?.name ||
                "Male model in a navy waistcoat and white shirt on a city street"
              }
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#817b70]">
              The GenZio approach
            </p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              A wardrobe, on your terms.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#69655d]">
              Start with a tee, add a layer, or build a look around the pieces
              you already love. Explore our men’s edit at your own pace.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-3 border-b border-[#20201d] pb-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-[#8c6b3e] hover:text-[#8c6b3e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8c6b3e]"
            >
              About GenZio <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-[#ded9cf] bg-[#eeebe4]">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-10 sm:py-20 lg:px-[8vw]">
          <Reveal className="mb-10 max-w-xl">
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#817b70]">
              Shopping, made simple
            </p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Made for a better browse.
            </h2>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["A focused edit", "Men's clothing and footwear, all in one place."],
              ["Find your fit", "See available sizes on each product page."],
              ["Save for later", "Keep a personal wishlist while you browse."],
              ["Browse your way", "Explore by category, search, or new arrivals."],
            ].map(([title, text], index) => (
              <Reveal key={title} delay={index * 0.06}>
                <div className="border-t border-[#cfc8ba] pt-4">
                  <h3 className="font-serif text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#69655d]">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
