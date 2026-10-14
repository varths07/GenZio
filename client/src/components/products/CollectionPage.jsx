import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./ProductCard";

export const CollectionPage = ({
  eyebrow,
  title,
  description,
  products,
  emptyMessage = "There are no products in this collection yet.",
  children,
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#f4f1ea] px-5 pb-20 pt-12 text-[#20201d] sm:px-10 sm:pt-16 lg:px-[8vw]">
      <div className="mx-auto max-w-[1600px]">
        <nav aria-label="Breadcrumb" className="mb-8 text-[11px] text-[#817b70]">
          <Link to="/" className="transition-colors hover:text-[#20201d]">
            Home
          </Link>
          <span className="px-2" aria-hidden="true">
            /
          </span>
          <span aria-current="page">{title}</span>
        </nav>

        <header className="mb-9 border-b border-[#d7d1c6] pb-8 sm:mb-12 sm:pb-10">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#817b70]">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl font-serif text-4xl leading-[1.06] sm:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#69655d] sm:text-base">
              {description}
            </p>
          )}
        </header>

        {children}

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-6">
            <AnimatePresence initial={false} mode="popLayout">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0.78, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.28,
                    delay: reduceMotion ? 0 : Math.min(index * 0.035, 0.2),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="border-y border-[#d7d1c6] py-14 text-center">
            <p className="font-serif text-2xl">{emptyMessage}</p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-[#514b42] transition-colors hover:text-[#8c6b3e]"
            >
              Explore all menswear <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
