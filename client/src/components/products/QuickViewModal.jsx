import React, { useEffect, useState } from "react";
import { Check, Heart, Ruler, ShoppingBag, X } from "lucide-react";
import { useShop } from "../../context/ShopContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

export const QuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
  } = useShop();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!quickViewProduct) return;
    const images = quickViewProduct.images?.length
      ? quickViewProduct.images
      : [quickViewProduct.image_url || quickViewProduct.image].filter(Boolean);
    setSelectedImage(images[0] || "");
    setSelectedColor(quickViewProduct.colors?.[0] || null);
    setSelectedSize(quickViewProduct.sizes?.[0] || "Standard");
    setQuantity(1);
  }, [quickViewProduct]);

  useEffect(() => {
    if (!quickViewProduct) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setQuickViewProduct(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [quickViewProduct, setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const images = product.images?.length
    ? product.images
    : [product.image_url || product.image].filter(Boolean);
  const colors = product.colors?.length ? product.colors : [];
  const sizes = product.sizes?.length ? product.sizes : ["Standard"];
  const saved = isInWishlist(product.id);

  const handleAddToBag = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#111b13]/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setQuickViewProduct(null);
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        className="relative grid max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-[#f4f1ea] text-[#20201d] shadow-2xl md:grid-cols-2"
      >
        <button
          type="button"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close quick view"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center bg-[#f4f1ea]/90 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="min-h-64 bg-[#e8e4dc]">
          {selectedImage && (
            <img
              src={selectedImage}
              alt={product.name}
              className="h-full max-h-[70vh] w-full object-cover"
            />
          )}
        </div>

        <div className="flex flex-col p-5 sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.16em] text-[#817b70]">
            {product.subCategory || product.category}
            {product.isDemo && " · Demo"}
          </p>
          <h2 id="quick-view-title" className="mt-2 pr-8 font-serif text-3xl">
            {product.name}
          </h2>
          <p className="mt-3 text-lg">{formatPrice(product.price)}</p>
          <p className="mt-3 text-sm leading-6 text-[#69655d]">
            {product.description || "Explore this piece from the GenZio edit."}
          </p>

          {images.length > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={selectedImage === image}
                  className={`h-14 w-12 shrink-0 overflow-hidden border-2 ${
                    selectedImage === image
                      ? "border-[#555c45]"
                      : "border-transparent"
                  }`}
                >
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {colors.length > 0 && (
            <fieldset className="mt-5">
              <legend className="text-[10px] font-semibold uppercase tracking-[0.12em]">
                Colour — {selectedColor?.name}
              </legend>
              <div className="mt-2 flex gap-2">
                {colors.map((color) => (
                  <button
                    type="button"
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    aria-label={color.name}
                    aria-pressed={selectedColor?.name === color.name}
                    className={`grid h-8 w-8 place-items-center rounded-full border ${
                      selectedColor?.name === color.name
                        ? "border-[#20201d] ring-1 ring-[#20201d]"
                        : "border-[#cfc8ba]"
                    }`}
                    style={{ backgroundColor: color.hex || "#76766b" }}
                  >
                    {selectedColor?.name === color.name && (
                      <Check className="h-3 w-3 text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <fieldset className="mt-5">
            <div className="flex items-center justify-between">
              <legend className="text-[10px] font-semibold uppercase tracking-[0.12em]">
                Size
              </legend>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.1em] text-[#6c7057] underline underline-offset-4"
              >
                <Ruler className="h-3 w-3" /> Size guide
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={selectedSize === size}
                  className={`min-h-9 min-w-10 border px-3 text-xs ${
                    selectedSize === size
                      ? "border-[#20201d] bg-[#20201d] text-[#f4f1ea]"
                      : "border-[#cfc8ba]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-auto pt-6">
            <div className="mb-3 flex items-center gap-4">
              <div className="flex h-10 items-center border border-[#cfc8ba]">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                  className="h-9 w-9"
                >
                  −
                </button>
                <span className="min-w-6 text-center text-sm">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Increase quantity"
                  className="h-9 w-9"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={saved}
                className="grid h-10 w-10 place-items-center border border-[#cfc8ba]"
              >
                <Heart className={`h-4 w-4 ${saved ? "fill-current text-[#914d40]" : ""}`} />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddToBag}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#20201d] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4f1ea] transition-colors hover:bg-[#45483b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Add to bag · {formatPrice(Number(product.price) * quantity)}
            </button>
            {product.isDemo && (
              <p className="mt-2 text-center text-[10px] leading-4 text-[#817b70]">
                Demo item for preview; checkout is unavailable.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
