import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const About = () => (
  <main className="min-h-screen bg-[#f4f1ea] text-[#20201d]">
    <section className="relative isolate flex min-h-[52svh] items-end bg-[#24241f] text-[#f4f1ea]">
      <img
        src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=2000&q=85"
        alt="Men's fashion editorial in a natural setting"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
      <div className="mx-auto w-full max-w-[1400px] px-5 pb-12 pt-32 sm:px-10 sm:pb-16 lg:px-[8vw]">
        <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-white/80">
          The GenZio story
        </p>
        <h1 className="max-w-2xl font-serif text-5xl leading-[1.02] sm:text-7xl">
          Wear what feels like you.
        </h1>
      </div>
    </section>

    <section className="mx-auto grid max-w-[1400px] gap-8 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-[8vw]">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#817b70]">
          About GenZio
        </p>
        <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          A focused edit of menswear.
        </h2>
      </div>
      <div className="space-y-5 text-sm leading-7 text-[#69655d] sm:text-base">
        <p>
          GenZio is a fashion storefront for boys and men. We bring everyday
          clothing and footwear together in one place, from simple essentials
          to pieces with a little more character.
        </p>
        <p>
          The idea is straightforward: make it easier to find clothes that fit
          your day and your own point of view. Explore the collection, compare
          sizes and keep your favourites close while you browse.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-3 border-b border-[#20201d] pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#20201d] transition-colors hover:border-[#8c6b3e] hover:text-[#8c6b3e]"
        >
          Explore the collection <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>

    <section className="border-y border-[#ded9cf] bg-[#eeebe4]">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-14 sm:px-10 sm:py-20 md:grid-cols-3 lg:px-[8vw]">
        {[
          ["Made for men", "A menswear-only collection, from clothing to footwear."],
          ["Easy to explore", "Browse by category, product, or the latest additions."],
          ["Your own style", "Find the pieces that feel right for your everyday."],
        ].map(([title, description]) => (
          <article key={title} className="border-t border-[#cfc8ba] pt-4">
            <h2 className="font-serif text-2xl">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#69655d]">{description}</p>
          </article>
        ))}
      </div>
    </section>
  </main>
);
