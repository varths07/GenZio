import React, { useEffect } from "react";
import { Ruler, X } from "lucide-react";
import { useShop } from "../../context/ShopContext";

export const SizeGuideModal = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();

  useEffect(() => {
    if (!isSizeGuideOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsSizeGuideOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSizeGuideOpen, setIsSizeGuideOpen]);

  if (!isSizeGuideOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#111b13]/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setIsSizeGuideOpen(false);
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-guide-title"
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto bg-[#f4f1ea] p-6 text-[#20201d] shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={() => setIsSizeGuideOpen(false)}
          aria-label="Close size guide"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center hover:bg-[#e8e4dc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
        >
          <X className="h-5 w-5" />
        </button>

        <Ruler className="h-5 w-5 text-[#555c45]" aria-hidden="true" />
        <h2 id="size-guide-title" className="mt-4 font-serif text-3xl">
          Find your fit
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#69655d]">
          Available sizes are shown on each product page. Product measurements
          vary by style and have not been provided for every item.
        </p>

        <ol className="mt-7 space-y-5 border-y border-[#d7d1c6] py-6">
          {[
            ["Chest", "Measure around the fullest part of your chest, keeping the tape level."],
            ["Waist", "Measure around your natural waist without pulling the tape tight."],
            ["Inside leg", "Measure from the top of your inner thigh to where you want the hem."],
          ].map(([label, text], index) => (
            <li key={label} className="flex gap-4">
              <span className="grid h-7 w-7 shrink-0 place-items-center border border-[#cfc8ba] text-[10px]">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.12em]">
                  {label}
                </h3>
                <p className="mt-1 text-xs leading-5 text-[#69655d]">{text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="text-xs leading-5 text-[#817b70]">
          Demo product sizes are illustrative samples, not confirmed inventory
          or garment measurements.
        </p>
        <button
          type="button"
          onClick={() => setIsSizeGuideOpen(false)}
          className="mt-6 min-h-11 w-full bg-[#20201d] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4f1ea] hover:bg-[#45483b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
        >
          Done
        </button>
      </section>
    </div>
  );
};
