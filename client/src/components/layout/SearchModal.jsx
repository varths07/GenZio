import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, X } from "lucide-react";
import { useShop } from "../../context/ShopContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

export const SearchModal = () => {
  const {
    searchOpen,
    setSearchOpen,
    storefrontProducts,
    searchQuery,
    setSearchQuery,
  } = useShop();
  const inputRef = useRef(null);
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return storefrontProducts
      .filter((product) =>
        [
          product.name,
          product.category,
          product.subCategory,
          product.description,
        ]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedQuery))
      )
      .slice(0, 8);
  }, [storefrontProducts, normalizedQuery]);

  useEffect(() => {
    if (!searchOpen) return undefined;

    inputRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  const closeSearch = () => setSearchOpen(false);
  const searchImage = (product) =>
    product.image_url || product.image || product.images?.[0] || "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#111b13]/75 px-4 py-8 backdrop-blur-sm sm:py-16"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeSearch();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="store-search-title"
        className="w-full max-w-3xl bg-[#f4f1ea] p-5 text-[#20201d] shadow-2xl sm:p-8"
      >
        <div className="flex items-center gap-3 border-b border-[#d7d1c6] pb-4">
          <Search className="h-5 w-5 shrink-0 text-[#6c7057]" aria-hidden="true" />
          <label className="sr-only" htmlFor="store-search">
            Search products
          </label>
          <input
            ref={inputRef}
            id="store-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search clothing, shirts, denim..."
            className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-[#817b70] sm:text-lg"
          />
          <button
            type="button"
            onClick={closeSearch}
            aria-label="Close search"
            className="grid h-10 w-10 shrink-0 place-items-center text-[#514b42] hover:bg-[#e8e4dc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!normalizedQuery ? (
          <div className="py-7">
            <h2
              id="store-search-title"
              className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#817b70]"
            >
              Explore menswear
            </h2>
            <div className="flex flex-wrap gap-2">
              {["T-shirts", "Shirts", "Jeans", "Trousers", "Polos"].map(
                (term) => (
                  <button
                    type="button"
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="min-h-10 border border-[#cfc8ba] px-3 text-xs text-[#514b42] transition-colors hover:border-[#20201d] hover:text-[#20201d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="py-12 text-center">
            <h2 id="store-search-title" className="font-serif text-2xl">
              No pieces found
            </h2>
            <p className="mt-2 text-sm text-[#69655d]">
              Try a different search term.
            </p>
          </div>
        ) : (
          <div className="pt-6">
            <h2
              id="store-search-title"
              className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#817b70]"
            >
              {results.length} matching {results.length === 1 ? "piece" : "pieces"}
            </h2>
            <ul className="max-h-[60vh] divide-y divide-[#d7d1c6] overflow-y-auto">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/product/${product.id}`}
                    onClick={closeSearch}
                    className="flex items-center gap-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
                  >
                    <div className="h-16 w-14 shrink-0 overflow-hidden bg-[#e8e4dc]">
                      {searchImage(product) && (
                        <img
                          src={searchImage(product)}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {product.name}
                      </span>
                      <span className="mt-1 block text-[10px] uppercase tracking-[0.12em] text-[#817b70]">
                        {product.subCategory || product.category}
                        {product.isDemo ? " · Demo" : ""}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm">
                      {formatPrice(product.price)}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-[#817b70]"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};
