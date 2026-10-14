import React, { useMemo, useState } from "react";
import { CollectionPage } from "../components/products/CollectionPage";
import { useShop } from "../context/ShopContext";

export const Shop = () => {
  const { storefrontProducts } = useShop();
  const [category, setCategory] = useState("All");
  const [subcategory, setSubcategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(null);
  const maxAvailablePrice = Math.max(
    2500,
    ...storefrontProducts.map((product) => Number(product.price) || 0)
  );
  const activeMaxPrice = maxPrice ?? maxAvailablePrice;

  const categories = [
    "All",
    ...new Set(storefrontProducts.map((product) => product.category).filter(Boolean)),
  ];
  const subcategories = [
    "All",
    ...new Set(
      storefrontProducts
        .filter((product) => category === "All" || product.category === category)
        .map((product) => product.subCategory)
        .filter(Boolean)
    ),
  ];

  const filteredProducts = useMemo(() => {
    const selected = storefrontProducts.filter((product) => {
      if (category !== "All" && product.category !== category) return false;
      if (subcategory !== "All" && product.subCategory !== subcategory) return false;
      return Number(product.price) <= activeMaxPrice;
    });

    return selected.sort((first, second) => {
      if (sortBy === "price-low") return Number(first.price) - Number(second.price);
      if (sortBy === "price-high") return Number(second.price) - Number(first.price);
      if (sortBy === "name") return first.name.localeCompare(second.name);
      return 0;
    });
  }, [storefrontProducts, category, subcategory, activeMaxPrice, sortBy]);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setSubcategory("All");
  };

  return (
    <CollectionPage
      eyebrow="The GenZio edit"
      title="Shop all menswear"
      description="Explore clothing and footwear selected for everyday wear. Filter by category or find a piece that feels right."
      products={filteredProducts}
      emptyMessage="No pieces match those filters."
    >
      <div className="mb-8 space-y-5 border-b border-[#d7d1c6] pb-6">
        <div className="flex flex-wrap items-center gap-2" aria-label="Filter by category">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => handleCategoryChange(item)}
              aria-pressed={category === item}
              className={`min-h-10 border px-4 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e] ${
                category === item
                  ? "border-[#20201d] bg-[#20201d] text-[#f4f1ea]"
                  : "border-[#cfc8ba] text-[#514b42] hover:border-[#20201d]"
              }`}
            >
              {item === "All" ? "All clothing" : item}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-3 text-xs text-[#69655d]">
            <span className="whitespace-nowrap">Type</span>
            <select
              value={subcategory}
              onChange={(event) => setSubcategory(event.target.value)}
              className="min-h-10 min-w-40 border border-[#cfc8ba] bg-transparent px-3 text-xs text-[#20201d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
            >
              {subcategories.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All types" : item}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-3 text-xs text-[#69655d]">
            <span>Up to ₹{activeMaxPrice.toLocaleString("en-IN")}</span>
            <input
              type="range"
              min="0"
              max={maxAvailablePrice}
              step="100"
              value={activeMaxPrice}
              aria-label="Maximum price"
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="w-28 accent-[#555c45]"
            />
          </label>
          <label className="flex items-center gap-3 text-xs text-[#69655d]">
            <span>Sort</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="min-h-10 border border-[#cfc8ba] bg-transparent px-3 text-xs text-[#20201d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name</option>
            </select>
          </label>
          <p className="text-xs text-[#817b70]" aria-live="polite">
            {filteredProducts.length} {filteredProducts.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
      </div>
    </CollectionPage>
  );
};
