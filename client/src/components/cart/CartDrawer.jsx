import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useShop } from "../../context/ShopContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
  } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCartOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsCartOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const closeDrawer = () => setIsCartOpen(false);
  const handleCheckoutClick = () => {
    closeDrawer();
    navigate("/checkout");
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#111b13]/65 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeDrawer();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="bag-title"
        className="ml-auto flex h-full w-full max-w-md flex-col bg-[#f4f1ea] text-[#20201d] shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-[#d7d1c6] px-5 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-[#555c45]" aria-hidden="true" />
            <h2 id="bag-title" className="font-serif text-2xl">
              Your bag
            </h2>
            <span className="text-xs text-[#817b70]">
              ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </span>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close shopping bag"
            className="grid h-10 w-10 place-items-center hover:bg-[#e8e4dc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag className="h-8 w-8 text-[#817b70]" />
            <p className="mt-4 font-serif text-xl">Your bag is empty.</p>
            <Link
              to="/shop"
              onClick={closeDrawer}
              className="mt-5 inline-flex min-h-11 items-center bg-[#20201d] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4f1ea]"
            >
              Explore the collection
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {cart.map((item) => {
                const image =
                  item.image_url || item.image || item.images?.[0] || "";
                return (
                  <article
                    key={item.cartItemId}
                    className="flex gap-3 border-b border-[#d7d1c6] pb-4"
                  >
                    <div className="h-24 w-20 shrink-0 overflow-hidden bg-[#e8e4dc]">
                      {image && (
                        <img
                          src={image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.name}</p>
                      <p className="mt-1 text-[10px] text-[#817b70]">
                        {item.selectedColor} · {item.selectedSize}
                        {item.isDemo ? " · Demo" : ""}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="flex h-8 items-center border border-[#cfc8ba]">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity - 1)
                            }
                            aria-label={`Decrease ${item.name} quantity`}
                            className="grid h-7 w-7 place-items-center"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-6 text-center text-xs">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity + 1)
                            }
                            aria-label={`Increase ${item.name} quantity`}
                            className="grid h-7 w-7 place-items-center"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm">
                          {formatPrice(Number(item.price) * item.quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.cartItemId)}
                      aria-label={`Remove ${item.name}`}
                      className="self-start p-1 text-[#817b70] hover:text-[#914d40]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </article>
                );
              })}
            </div>

            <footer className="border-t border-[#d7d1c6] bg-[#eeebe4] px-5 py-5">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              <p className="mt-2 text-[11px] leading-5 text-[#69655d]">
                Shipping and payment are not available in this storefront
                preview.
              </p>
              {cart.some((item) => item.isDemo) && (
                <p className="mt-2 text-[11px] leading-5 text-[#8c6b3e]">
                  Demo products cannot be purchased.
                </p>
              )}
              <button
                type="button"
                onClick={handleCheckoutClick}
                className="mt-4 min-h-11 w-full bg-[#20201d] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4f1ea] transition-colors hover:bg-[#45483b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
              >
                View checkout information
              </button>
              <Link
                to="/cart"
                onClick={closeDrawer}
                className="mt-3 block text-center text-[10px] font-medium uppercase tracking-[0.12em] underline underline-offset-4"
              >
                View bag
              </Link>
            </footer>
          </>
        )}
      </section>
    </div>
  );
};
