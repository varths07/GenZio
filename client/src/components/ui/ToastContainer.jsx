import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Sparkles, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts } = useShop();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center space-x-3 px-5 py-3.5 rounded-2xl glass-panel-gold shadow-2xl border border-luxury-gold/30 text-white text-xs font-semibold animate-in slide-in-from-right duration-300"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-luxury-gold flex-shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
