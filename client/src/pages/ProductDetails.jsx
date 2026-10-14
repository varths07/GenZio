import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Ruler, ShoppingBag } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { ProductCard } from "../components/products/ProductCard";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

export const ProductDetails = () => {
  const { id } = useParams();
  const {
    storefrontProducts,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
  } = useShop();
  const product = storefrontProducts.find((item) => String(item.id) === id);
  const imageList = product?.images?.length
    ? product.images
    : [product?.image_url || product?.image].filter(Boolean);
  const colors = product?.colors?.length
    ? product.colors
    : [{ name: "Default", hex: "#76766b" }];
  const sizes = product?.sizes?.length ? product.sizes : ["Standard"];

  const [activeImage, setActiveImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setActiveImage(imageList[0] || "");
    setSelectedColor(colors[0]);
    setSelectedSize(sizes[0]);
    setQuantity(1);
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] bg-[#f4f1ea] px-5 py-20 text-center text-[#20201d]">
        <h1 className="font-serif text-4xl">This piece could not be found.</h1>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 border-b border-[#20201d] pb-2 text-xs font-semibold uppercase tracking-[0.12em]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to the collection
        </Link>
      </div>
    );
  }

  const saved = isInWishlist(product.id);
  const related = storefrontProducts
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.subCategory === product.subCategory ||
          item.category === product.category)
    )
    .slice(0, 4);

  const handleAddToBag = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const specifications = Object.entries(product.specifications || {}).filter(
    ([, value]) => Boolean(value)
  );

  return (
    <div className="min-h-screen bg-[#f4f1ea] px-5 pb-20 pt-10 text-[#20201d] sm:px-10 sm:pt-14 lg:px-[8vw]">
      <div className="mx-auto max-w-[1400px]">
        <nav aria-label="Breadcrumb" className="mb-8 text-[11px] text-[#817b70]">
          <Link to="/" className="hover:text-[#20201d]">
            Home
          </Link>
          <span className="px-2" aria-hidden="true">
            /
          </span>
          <Link to="/shop" className="hover:text-[#20201d]">
            Shop
          </Link>
          <span className="px-2" aria-hidden="true">
            /
          </span>
          <span aria-current="page">{product.name}</span>
        </nav>

        {product.isDemo && (
          <p className="mb-5 border border-[#cfc8ba] bg-[#eeebe4] px-4 py-3 text-xs leading-5 text-[#514b42]">
            Demo product for storefront preview. It can be added to your bag,
            but it cannot be purchased or included in a real order.
          </p>
        )}

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="min-w-0">
            <div className="aspect-[4/5] overflow-hidden bg-[#e8e4dc]">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={product.name}
                  fetchpriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                <p className="grid h-full place-items-center text-sm text-[#817b70]">
                  Image unavailable
                </p>
              )}
            </div>
            {imageList.length > 1 && (
              <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                {imageList.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={activeImage === image}
                    className={`h-20 w-16 shrink-0 overflow-hidden border-2 ${
                      activeImage === image
                        ? "border-[#555c45]"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <section className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#817b70]">
              {product.subCategory || product.category || "Menswear"}
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-xl">{formatPrice(product.price)}</p>
            <p className="mt-5 text-sm leading-7 text-[#69655d]">
              {product.description || "Explore this piece from the GenZio edit."}
            </p>

            {colors.length > 0 && (
              <fieldset className="mt-8 border-t border-[#d7d1c6] pt-6">
                <legend className="text-[10px] font-semibold uppercase tracking-[0.14em]">
                  Colour — {selectedColor?.name || "Default"}
                </legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      aria-label={color.name}
                      aria-pressed={selectedColor?.name === color.name}
                      className={`grid h-9 w-9 place-items-center rounded-full border transition-all duration-200 active:scale-95 ${
                        selectedColor?.name === color.name
                          ? "border-[#20201d] ring-2 ring-[#f4f1ea] ring-offset-1 ring-offset-[#20201d]"
                          : "border-[#cfc8ba]"
                      }`}
                      style={{ backgroundColor: color.hex || "#76766b" }}
                    />
                  ))}
                </div>
              </fieldset>
            )}

            <fieldset className="mt-6 border-t border-[#d7d1c6] pt-6">
              <div className="flex items-center justify-between">
                <legend className="text-[10px] font-semibold uppercase tracking-[0.14em]">
                  Select size
                </legend>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.1em] text-[#6c7057] underline underline-offset-4"
                >
                  <Ruler className="h-3.5 w-3.5" />
                  Size guide
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                    className={`min-h-10 min-w-11 border px-3 text-xs transition-all duration-200 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e] ${
                      selectedSize === size
                        ? "border-[#20201d] bg-[#20201d] text-[#f4f1ea]"
                        : "border-[#cfc8ba] hover:border-[#20201d]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#d7d1c6] pt-6">
              <div className="flex min-h-11 items-center border border-[#cfc8ba]">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                  className="h-10 w-10 text-lg"
                >
                  −
                </button>
                <span className="min-w-8 text-center text-sm" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Increase quantity"
                  className="h-10 w-10 text-lg"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={handleAddToBag}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-[#20201d] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4f1ea] transition-colors hover:bg-[#45483b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Add to bag
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={saved}
                className="grid h-11 w-11 place-items-center border border-[#cfc8ba] transition-colors hover:border-[#20201d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
              >
                <Heart
                  className={`h-4 w-4 ${saved ? "fill-current text-[#914d40]" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {product.isDemo && (
              <p className="mt-4 text-xs leading-5 text-[#817b70]">
                Demo products are for browsing only and cannot be checked out.
              </p>
            )}

            <div className="mt-8 border-t border-[#d7d1c6] pt-6">
              <h2 className="font-serif text-2xl">Product details</h2>
              {specifications.length > 0 ? (
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  {specifications.map(([label, value]) => (
                    <div key={label} className="border-t border-[#d7d1c6] pt-3">
                      <dt className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#817b70]">
                        {label}
                      </dt>
                      <dd className="mt-1 text-xs">{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-3 text-sm leading-6 text-[#69655d]">
                  Product details and care information will be added when
                  available.
                </p>
              )}
            </div>
          </section>
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-[#d7d1c6] pt-10">
            <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#817b70]">
              Keep exploring
            </p>
            <h2 className="mb-8 font-serif text-3xl">More from the edit</h2>
            <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
