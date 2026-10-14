import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const footerGroups = [
  {
    title: "Shop",
    links: [
      ["All menswear", "/shop"],
      ["New arrivals", "/new-arrivals"],
      ["Clothing", "/clothing"],
      ["Footwear", "/footwear"],
    ],
  },
  {
    title: "GenZio",
    links: [
      ["Our story", "/about"],
      ["Contact", "/contact"],
      ["My account", "/profile"],
      ["Wishlist", "/wishlist"],
    ],
  },
  {
    title: "Help & information",
    links: [
      ["Order history", "/orders"],
      ["Shipping", "/shipping"],
      ["Returns", "/returns"],
      ["Size guide", "/size-guide"],
    ],
  },
];

export const Footer = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isHome = location.pathname === "/";
  const FooterContent = isHome ? Reveal : "div";

  return (
  <footer
    className={`text-[#f4f1ea] ${
      isAdmin ? "border-t border-white/10 bg-[#050507]" : "bg-[#111b13]"
    }`}
  >
    <FooterContent className="mx-auto max-w-[1600px] px-5 pb-8 pt-16 sm:px-10 lg:px-[8vw]">
      <div className="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-[1.4fr_2fr]">
        <div>
          <Link to="/" className="inline-flex flex-col" aria-label="GenZio home">
            <span className="font-serif text-3xl tracking-[0.08em]">GenZio</span>
            <span className="mt-1 text-[9px] uppercase tracking-[0.28em] text-[#c5b99e]">
              Menswear
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#f4f1ea]/70">
            A considered edit of everyday clothing for men. Find the pieces
            that feel like you.
          </p>
          {!isAdmin && (
            <Link
              to="/about"
              className="mt-5 inline-block text-[10px] font-medium uppercase tracking-[0.14em] text-[#d5c49e] underline-offset-4 hover:underline"
            >
              The GenZio story
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#d5c49e]">
                {group.title}
              </h2>
              <ul className="space-y-3">
                {group.links.map(([label, path]) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className="text-xs text-[#f4f1ea]/75 transition-colors hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 pt-6 text-[10px] text-[#f4f1ea]/65 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} GenZio. All rights reserved.</p>
        <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link to="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-white">
            Terms
          </Link>
          <Link to="/contact" className="hover:text-white">
            Support
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d5c49e]"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </FooterContent>
  </footer>
  );
};
