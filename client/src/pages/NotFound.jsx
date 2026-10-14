import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const NotFound = () => (
  <main className="flex min-h-[65vh] flex-col items-center justify-center bg-[#f4f1ea] px-5 py-16 text-center text-[#20201d]">
    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#817b70]">
      GenZio · 404
    </p>
    <h1 className="mt-4 font-serif text-5xl sm:text-6xl">Page not found.</h1>
    <p className="mt-4 max-w-md text-sm leading-6 text-[#69655d]">
      The page you’re looking for isn’t here. Explore the collection or return
      to the GenZio homepage.
    </p>
    <Link
      to="/"
      className="mt-7 inline-flex min-h-11 items-center gap-2 bg-[#20201d] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4f1ea] transition-colors hover:bg-[#45483b]"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      Back to home
    </Link>
  </main>
);
