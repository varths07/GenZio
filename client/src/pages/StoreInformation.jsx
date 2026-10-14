import React from "react";
import { Link, useLocation } from "react-router-dom";

const informationPages = {
  "/shipping": {
    eyebrow: "Help & information",
    title: "Shipping information",
    paragraphs: [
      "Shipping options, delivery estimates and charges have not been configured in this storefront preview.",
      "Please confirm delivery terms with the store before placing an order. Checkout is currently unavailable.",
    ],
  },
  "/returns": {
    eyebrow: "Help & information",
    title: "Returns & exchanges",
    paragraphs: [
      "A return and exchange policy has not been configured in this storefront preview.",
      "Please confirm eligibility, time limits and return instructions with the store before making a purchase. Checkout is currently unavailable.",
    ],
  },
  "/privacy": {
    eyebrow: "Store information",
    title: "Privacy",
    paragraphs: [
      "The production privacy notice has not been supplied for this storefront preview.",
      "Before accepting orders, the store should publish the information it collects, how it is used, how long it is retained and how customers can exercise their privacy rights.",
    ],
  },
  "/terms": {
    eyebrow: "Store information",
    title: "Terms of use",
    paragraphs: [
      "The production terms have not been supplied for this storefront preview.",
      "Before accepting orders, the store should publish its terms of sale, pricing and availability conditions, payment terms and applicable consumer protections.",
    ],
  },
  "/size-guide": {
    eyebrow: "Help & information",
    title: "Size guide",
    paragraphs: [
      "Available sizes are listed on each product page. Garment measurements and a brand-wide size chart have not yet been provided.",
      "For a more reliable fit, measure a similar garment that fits you well and compare its measurements with the product details when they are available. Demo products show sample sizes only.",
    ],
  },
};

export const StoreInformation = () => {
  const { pathname } = useLocation();
  const page = informationPages[pathname] || informationPages["/terms"];

  return (
    <main className="min-h-[65vh] bg-[#f4f1ea] px-5 pb-20 pt-10 text-[#20201d] sm:px-10 sm:pt-14 lg:px-[8vw]">
      <div className="mx-auto max-w-[900px]">
        <nav aria-label="Breadcrumb" className="mb-8 text-[11px] text-[#817b70]">
          <Link to="/" className="hover:text-[#20201d]">
            Home
          </Link>
          <span className="px-2" aria-hidden="true">
            /
          </span>
          <span aria-current="page">{page.title}</span>
        </nav>
        <header className="border-b border-[#d7d1c6] pb-8">
          <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#817b70]">
            {page.eyebrow}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl">{page.title}</h1>
        </header>
        <div className="max-w-2xl space-y-5 py-8 text-sm leading-7 text-[#69655d]">
          {page.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            For current store information,{" "}
            <Link
              to="/contact"
              className="text-[#514b42] underline underline-offset-4"
            >
              contact GenZio
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
};
