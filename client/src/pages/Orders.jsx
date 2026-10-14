import React from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { useShop } from "../context/ShopContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

export const Orders = () => {
  const { orders } = useShop();

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-5 pb-20 pt-10 text-[#20201d] sm:px-10 sm:pt-14 lg:px-[8vw]">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#817b70]">
          Your account
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl">Order history</h1>

        {orders.length === 0 ? (
          <section className="mt-9 border-y border-[#d7d1c6] py-14 text-center">
            <Package className="mx-auto h-8 w-8 text-[#817b70]" />
            <h2 className="mt-5 font-serif text-2xl">
              Order history is not connected yet.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#69655d]">
              This storefront preview does not persist or track orders. No
              order has been created by adding an item to your bag.
            </p>
            <Link
              to="/shop"
              className="mt-7 inline-flex min-h-11 items-center bg-[#20201d] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4f1ea]"
            >
              Explore the collection
            </Link>
          </section>
        ) : (
          <section className="mt-8 divide-y divide-[#d7d1c6] border-y border-[#d7d1c6]">
            {orders.map((order) => (
              <article key={order.id} className="py-6">
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <h2 className="font-medium">{order.id}</h2>
                    <p className="mt-1 text-xs text-[#817b70]">
                      {order.date}
                    </p>
                  </div>
                  <p className="text-sm">{formatPrice(order.total)}</p>
                </div>
                <ul className="mt-4 space-y-2">
                  {(order.items || []).map((item, index) => (
                    <li
                      key={`${order.id}-${index}`}
                      className="flex justify-between gap-4 text-xs text-[#69655d]"
                    >
                      <span>
                        {item.name} · Qty {item.qty}
                      </span>
                      <span>{formatPrice(Number(item.price) * item.qty)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};
