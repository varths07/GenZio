import React from "react";
import { Link } from "react-router-dom";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { useShop } from "../../context/ShopContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

export const ProductCard = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
  } = useShop();
  const saved = isInWishlist(product.id);
  const image = product.image_url || product.image || product.images?.[0] || "";

  return (
    <article className="group min-w-0">
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
            <span className="grid h-full place-items-center text-xs text-[#817b70]">
              Image unavailable
            </span>
          )}
        </Link>

        {product.isDemo && (
          <span className="absolute left-3 top-3 bg-[#f4f1ea]/95 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#514b42]">
            Demo
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            saved
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          aria-pressed={saved}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center bg-[#f4f1ea]/95 text-[#20201d] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
        >
          <Heart
            className={`h-[17px] w-[17px] ${saved ? "fill-current text-[#914d40]" : ""}`}
            aria-hidden="true"
          />
        </button>

        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-100 transition-all sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
          <button
            type="button"
            onClick={() => setQuickViewProduct(product)}
            className="flex min-h-11 flex-1 items-center justify-center gap-2 bg-[#f4f1ea] text-[10px] font-semibold uppercase tracking-[0.12em] text-[#20201d] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            Quick view
          </button>
          <button
            type="button"
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.name} to bag`}
            className="grid min-h-11 w-11 place-items-center bg-[#f4f1ea] text-[#20201d] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 pt-4">
        <div className="min-w-0">
          <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-[#77736c]">
            {product.subCategory || product.category || "Menswear"}
          </p>
          <Link
            to={`/product/${product.id}`}
            className="inline-block text-sm font-medium leading-snug text-[#20201d] transition-colors hover:text-[#8c6b3e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
          >
            {product.name}
          </Link>
        </div>
        <span className="shrink-0 pt-5 text-sm text-[#20201d]">
          {formatPrice(product.price)}
        </span>
      </div>
    </article>
  );
};
