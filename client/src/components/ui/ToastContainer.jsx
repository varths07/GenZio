import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useShop } from '../../context/ShopContext';
import { Sparkles, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts } = useShop();
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={
              reduceMotion ? false : { opacity: 0, x: 16, scale: 0.98 }
            }
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: reduceMotion ? 0 : 12 }}
            transition={{ duration: reduceMotion ? 0 : 0.24 }}
            className="pointer-events-auto flex items-center space-x-3 rounded-2xl border border-luxury-gold/30 px-5 py-3.5 text-xs font-semibold text-white shadow-2xl glass-panel-gold"
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-luxury-gold flex-shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
            <span>{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
