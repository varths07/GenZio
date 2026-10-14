import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LockKeyhole, ShoppingBag } from "lucide-react";
import { useShop } from "../context/ShopContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

export const Checkout = () => {
  const { cart, cartSubtotal } = useShop();
  const hasDemoItems = cart.some((item) => item.isDemo);

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-5 pb-20 pt-10 text-[#20201d] sm:px-10 sm:pt-14 lg:px-[8vw]">
      <div className="mx-auto max-w-[1200px]">
        <nav aria-label="Breadcrumb" className="mb-8 text-[11px] text-[#817b70]">
          <Link to="/" className="hover:text-[#20201d]">
            Home
          </Link>
          <span className="px-2" aria-hidden="true">
            /
          </span>
          <Link to="/cart" className="hover:text-[#20201d]">
            Shopping bag
          </Link>
          <span className="px-2" aria-hidden="true">
            /
          </span>
          <span aria-current="page">Checkout</span>
        </nav>

        <header className="mb-8 border-b border-[#d7d1c6] pb-7">
          <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#817b70]">
            Secure checkout
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl">Checkout</h1>
        </header>

        {cart.length === 0 ? (
          <section className="py-14 text-center">
            <ShoppingBag className="mx-auto h-8 w-8 text-[#817b70]" />
            <h2 className="mt-5 font-serif text-2xl">Your bag is empty.</h2>
            <Link
              to="/shop"
              className="mt-6 inline-flex min-h-11 items-center gap-2 bg-[#20201d] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4f1ea]"
            >
              Return to shop
            </Link>
          </section>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <section>
              <div
                role="status"
                className="border border-[#cfc8ba] bg-[#eeebe4] p-5 sm:p-7"
              >
                <div className="flex items-start gap-3">
                  <LockKeyhole
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#555c45]"
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="font-serif text-2xl">
                      Ordering is not available in this preview.
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[#69655d]">
                      This storefront is not connected to an order service or
                      payment provider. Cash on delivery and online payments
                      are unavailable. No payment details should be entered,
                      and no order can be placed here.
                    </p>
                  </div>
                </div>
              </div>
              {hasDemoItems && (
                <p className="mt-4 border-l-2 border-[#8c6b3e] pl-4 text-sm leading-6 text-[#514b42]">
                  Your bag contains demo products for design review. They are
                  not real inventory and cannot be purchased.
                </p>
              )}
              <Link
                to="/cart"
                className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#514b42] underline underline-offset-4 hover:text-[#8c6b3e]"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to your bag
              </Link>
            </section>

            <aside className="h-fit border border-[#d7d1c6] bg-[#eeebe4] p-5 sm:p-6">
              <h2 className="font-serif text-2xl">Order summary</h2>
              <div className="mt-5 max-h-72 space-y-4 overflow-y-auto border-y border-[#d7d1c6] py-4">
                {cart.map((item) => {
                  const image =
                    item.image_url || item.image || item.images?.[0] || "";
                  return (
                    <div key={item.cartItemId} className="flex gap-3">
                      {image && (
                        <img
                          src={image}
                          alt=""
                          className="h-16 w-14 shrink-0 object-cover"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium">{item.name}</p>
                        <p className="mt-1 text-[10px] text-[#817b70]">
                          {item.selectedSize} · Qty {item.quantity}
                          {item.isDemo ? " · Demo" : ""}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs">
                        {formatPrice(Number(item.price) * item.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between pt-4 text-sm">
                <span>Items subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              <p className="mt-3 text-[11px] leading-5 text-[#69655d]">
                Shipping and taxes are not calculated in this preview.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};
