import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export const Reveal = ({ children, className = "", delay = 0, amount = 0.14 }) => {
  const reduceMotion = useReducedMotion();
  const canObserve = typeof IntersectionObserver !== "undefined";

  return (
    <motion.div
      className={className}
      initial={reduceMotion || !canObserve ? false : { y: 56, scale: 1.02 }}
      whileInView={reduceMotion ? undefined : { y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: reduceMotion ? 0 : 0.78,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};
