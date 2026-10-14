import React from "react";
import { Link } from "react-router-dom";
import { Heart, Package, UserRound } from "lucide-react";
import { useShop } from "../context/ShopContext";

export const Profile = () => {
  const { user } = useShop();

  if (!user) {
    return (
      <main className="min-h-[60vh] bg-[#f4f1ea] px-5 py-20 text-center text-[#20201d]">
        <h1 className="font-serif text-4xl">Sign in to view your account.</h1>
        <Link to="/login" className="mt-6 inline-block underline underline-offset-4">
          Sign in
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-5 pb-20 pt-10 text-[#20201d] sm:px-10 sm:pt-14 lg:px-[8vw]">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#817b70]">
          Your GenZio
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl">Account</h1>

        <section className="mt-8 flex flex-col gap-5 border-y border-[#d7d1c6] py-7 sm:flex-row sm:items-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt=""
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[#e8e4dc]">
              <UserRound className="h-6 w-6 text-[#555c45]" />
            </div>
          )}
          <div>
            <h2 className="font-serif text-2xl">{user.name}</h2>
            <p className="mt-1 text-sm text-[#69655d]">{user.email}</p>
          </div>
        </section>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            to="/orders"
            className="flex min-h-24 items-center gap-4 border border-[#d7d1c6] bg-[#eeebe4] p-5 transition-colors hover:border-[#8c6b3e]"
          >
            <Package className="h-5 w-5 text-[#555c45]" />
            <span>
              <span className="block font-serif text-xl">Order history</span>
              <span className="mt-1 block text-xs text-[#69655d]">
                View your orders when order history is available.
              </span>
            </span>
          </Link>
          <Link
            to="/wishlist"
            className="flex min-h-24 items-center gap-4 border border-[#d7d1c6] bg-[#eeebe4] p-5 transition-colors hover:border-[#8c6b3e]"
          >
            <Heart className="h-5 w-5 text-[#555c45]" />
            <span>
              <span className="block font-serif text-xl">Wishlist</span>
              <span className="mt-1 block text-xs text-[#69655d]">
                Return to the pieces you saved.
              </span>
            </span>
          </Link>
        </div>

        <section className="mt-10 max-w-2xl">
          <h2 className="font-serif text-2xl">Account details</h2>
          <dl className="mt-4 divide-y divide-[#d7d1c6] border-y border-[#d7d1c6]">
            {[
              ["Mobile", user.mobile],
              ["Address", user.address],
              ["City", user.city],
              ["State", user.state],
              ["PIN code", user.pincode],
            ]
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 py-3 text-sm"
                >
                  <dt className="text-[#817b70]">{label}</dt>
                  <dd className="text-right">{value}</dd>
                </div>
              ))}
            {!user.mobile &&
              !user.address &&
              !user.city &&
              !user.state &&
              !user.pincode && (
                <p className="py-4 text-sm text-[#69655d]">
                  No additional account details have been saved.
                </p>
              )}
          </dl>
        </section>
      </div>
    </main>
  );
};
