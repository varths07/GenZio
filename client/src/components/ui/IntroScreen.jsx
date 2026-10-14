import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export const IntroScreen = ({ isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        className="genzio-intro fixed inset-0 z-[100] flex min-h-[100svh] items-center justify-center overflow-hidden px-6 text-[#f4f1ea]"
        role="dialog"
        aria-modal="true"
        aria-label="GenZio, considered menswear"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
          <motion.div
            className="mb-8 grid h-[76px] w-[76px] place-items-center rounded-full border border-[#c5b99e]/55 font-serif text-4xl text-[#d5c49e]"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            G
          </motion.div>

          <motion.p
            className="font-serif text-5xl tracking-[0.1em] sm:text-6xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            GenZio
          </motion.p>

          <motion.div
            className="mt-4 h-px w-16 bg-[#c5b99e]/80"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />

          <motion.p
            className="mt-4 text-[9px] font-medium uppercase tracking-[0.38em] text-[#d5c49e]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.38 }}
          >
            Considered menswear
          </motion.p>

          <motion.p
            className="mt-12 font-serif text-lg italic text-[#f4f1ea]/70"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            A new perspective on the everyday.
          </motion.p>

          <div className="mt-12 h-px w-28 overflow-hidden bg-white/15" aria-hidden="true">
            <div className="genzio-intro-progress h-full w-full bg-[#d5c49e]" />
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
