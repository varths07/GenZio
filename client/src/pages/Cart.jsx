import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useShop } from "../context/ShopContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartSubtotal } = useShop();
  const hasDemoItems = cart.some((item) => item.isDemo);

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-5 pb-20 pt-10 text-[#20201d] sm:px-10 sm:pt-14 lg:px-[8vw]">
      <div className="mx-auto max-w-[1400px]">
        <nav aria-label="Breadcrumb" className="mb-8 text-[11px] text-[#817b70]">
          <Link to="/" className="hover:text-[#20201d]">
            Home
          </Link>
          <span className="px-2" aria-hidden="true">
            /
          </span>
          <span aria-current="page">Shopping bag</span>
        </nav>

        <header className="mb-9 border-b border-[#d7d1c6] pb-7">
          <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#817b70]">
            Your selection
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl">
            Shopping bag{" "}
            <span className="text-2xl text-[#817b70]">
              ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </span>
          </h1>
        </header>

        {cart.length === 0 ? (
          <div className="py-16 text-center">
            <ShoppingBag className="mx-auto h-8 w-8 text-[#817b70]" />
            <p className="mt-5 font-serif text-2xl">Your bag is empty.</p>
            <p className="mt-2 text-sm text-[#69655d]">
              Find something that feels like you.
            </p>
            <Link
              to="/shop"
              className="mt-7 inline-flex min-h-11 items-center gap-3 bg-[#20201d] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4f1ea] transition-colors hover:bg-[#45483b]"
            >
              Explore the collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
            <section aria-label="Items in your bag" className="divide-y divide-[#d7d1c6]">
              {cart.map((item) => {
                const image =
                  item.image_url || item.image || item.images?.[0] || "";
                return (
                  <article
                    key={item.cartItemId}
                    className="flex gap-4 py-5 sm:gap-6"
                  >
                    <Link
                      to={`/product/${item.id}`}
                      aria-label={`View ${item.name}`}
                      className="h-28 w-24 shrink-0 overflow-hidden bg-[#e8e4dc] sm:h-36 sm:w-28"
                    >
                      {image && (
                        <img
                          src={image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.14em] text-[#817b70]">
                          {item.subCategory || item.category}
                          {item.isDemo && " · Demo"}
                        </p>
                        <Link
                          to={`/product/${item.id}`}
                          className="mt-1 block text-sm font-medium leading-5 hover:text-[#8c6b3e]"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-2 text-xs text-[#69655d]">
                          {item.selectedColor} · {item.selectedSize}
                        </p>
                        <p className="mt-2 text-sm">{formatPrice(item.price)}</p>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-between">
                        <div className="flex h-9 items-center border border-[#cfc8ba]">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity - 1)
                            }
                            aria-label={`Decrease ${item.name} quantity`}
                            className="grid h-8 w-8 place-items-center"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span
                            className="min-w-7 text-center text-xs"
                            aria-live="polite"
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity + 1)
                            }
                            aria-label={`Increase ${item.name} quantity`}
                            className="grid h-8 w-8 place-items-center"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.1em] text-[#817b70] hover:text-[#914d40]"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            <aside className="h-fit border border-[#d7d1c6] bg-[#eeebe4] p-5 sm:p-6">
              <h2 className="font-serif text-2xl">Bag summary</h2>
              <div className="mt-5 flex justify-between border-t border-[#d7d1c6] pt-4 text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              <p className="mt-3 text-xs leading-5 text-[#69655d]">
                Shipping and payment are not available in this storefront
                preview.
              </p>
              {hasDemoItems && (
                <p className="mt-4 border-l-2 border-[#8c6b3e] pl-3 text-xs leading-5 text-[#514b42]">
                  Your bag includes demo products. Demo items cannot be
                  purchased or included in an order.
                </p>
              )}
              <Link
                to="/checkout"
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#20201d] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4f1ea] transition-colors hover:bg-[#45483b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
              >
                Checkout information <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/shop"
                className="mt-4 block text-center text-[10px] font-medium uppercase tracking-[0.12em] text-[#514b42] underline underline-offset-4"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};
