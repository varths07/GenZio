import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { useShop } from "../../context/ShopContext";

const storeLinks = [
  { name: "Home", path: "/" },
  { name: "Collections", path: "/shop" },
  { name: "New Arrivals", path: "/new-arrivals" },
  { name: "About", path: "/about" },
];

const adminLinks = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Products", path: "/admin/products" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Storefront", path: "/" },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const {
    cart,
    wishlist,
    setSearchOpen,
    user,
    authLoading,
    signOut,
    addToast,
  } = useShop();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith("/admin");
  const isHome = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const mobileLinks = isAdmin ? adminLinks : storeLinks;
  const desktopLeftLinks = isAdmin
    ? adminLinks
    : storeLinks.slice(0, 2);
  const desktopRightLinks = isAdmin ? [] : storeLinks.slice(2);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const accountPath = authLoading ? "/login" : user ? "/profile" : "/login";
  const isHeroOverlay = isHome && !isAdmin && !isScrolled && !mobileMenuOpen;

  useEffect(() => {
    setIsScrolled(window.scrollY > 48);
  }, [isHome]);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (isHome) setIsScrolled(current > 48);
  });

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await signOut();
      setMobileMenuOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      addToast(error.message || "Unable to log out. Please try again.", "error");
    }
  };

  const openSearch = () => {
    setMobileMenuOpen(false);
    setSearchOpen(true);
  };

  const linkClassName = (path) =>
    `genzio-nav-link relative py-3 text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${
      location.pathname === path ? "after:scale-x-100" : ""
    }`;

  return (
    <>
      <header
        className={`z-40 border-b transition-[background-color,border-color,color,box-shadow,backdrop-filter] duration-500 ${
          isHeroOverlay
            ? "border-transparent bg-transparent text-white shadow-none"
            : "border-[#e5e0d7] bg-[#F8F6F2]/95 text-[#111111] shadow-sm backdrop-blur-md"
        } ${isHome ? "fixed inset-x-0 top-0" : "sticky top-0"}`}
      >
      <div className="mx-auto grid min-h-[72px] max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:min-h-[82px] sm:px-8 lg:px-[5vw]">
        <button
          type="button"
          className={`grid h-10 w-10 place-items-center justify-self-start transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden ${
            isHeroOverlay
              ? "text-white focus-visible:outline-white"
              : "text-[#111111] focus-visible:outline-[#111111]"
          }`}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="genzio-mobile-menu"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        <nav
          aria-label="Main navigation"
          className={`hidden items-center gap-6 xl:gap-9 lg:flex ${
            isAdmin ? "gap-4 xl:gap-6" : ""
          }`}
        >
          {desktopLeftLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              aria-current={
                location.pathname === link.path ? "page" : undefined
              }
              className={linkClassName(link.path)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <Link
          to="/"
          className="col-start-2 row-start-1 flex flex-col items-center"
          aria-label="GenZio home"
        >
          <span className="font-serif text-[21px] leading-none tracking-[0.17em] transition-colors duration-500 sm:text-[26px] sm:tracking-[0.2em]">
            GENZIO
          </span>
          <span
            className={`mt-1.5 text-[7px] font-medium uppercase tracking-[0.38em] transition-colors duration-500 sm:text-[8px] ${
              isHeroOverlay ? "text-white/75" : "text-[#55504A]"
            }`}
          >
            {isAdmin ? "Admin" : "Menswear"}
          </span>
        </Link>

        <div className="col-start-3 row-start-1 flex items-center justify-self-end gap-1 sm:gap-2 lg:gap-3">
          <nav
            aria-label="Featured navigation"
            className="mr-1 hidden items-center gap-3 lg:flex xl:gap-5"
          >
            {desktopRightLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                aria-current={
                  location.pathname === link.path ? "page" : undefined
                }
                className={linkClassName(link.path)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search products"
            className="hidden h-10 w-10 place-items-center transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current lg:grid"
          >
            <Search className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
          <Link
            to={accountPath}
            aria-label={user ? "Your account" : "Sign in"}
            className="hidden h-10 w-10 place-items-center transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current lg:grid"
          >
            <UserRound className="h-[18px] w-[18px]" aria-hidden="true" />
          </Link>
          <Link
            to="/cart"
            aria-label={`Shopping bag${cartCount ? `, ${cartCount} items` : ""}`}
            className="relative grid h-10 w-10 place-items-center transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          >
            <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
            {cartCount > 0 && (
              <span className={`absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[9px] font-semibold ${
                isHeroOverlay
                  ? "bg-white text-[#111111]"
                  : "bg-[#111111] text-[#F8F6F2]"
              }`}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      </header>

      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
        <motion.div
            className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-[2px] lg:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setMobileMenuOpen(false);
              }
            }}
          >
            <motion.aside
              id="genzio-mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="flex h-full w-[min(88vw,390px)] flex-col overflow-y-auto bg-[#F8F6F2] px-6 pb-8 pt-5 text-[#111111] shadow-2xl sm:px-8"
              initial={reduceMotion ? false : { x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: reduceMotion ? 0 : 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex items-start justify-between border-b border-[#d7d1c6] pb-6">
                <div>
                  <p className="font-serif text-2xl tracking-[0.12em]">
                    GENZIO
                  </p>
                  <p className="mt-1.5 text-[8px] uppercase tracking-[0.28em] text-[#55504A]">
                    Menswear
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="grid h-10 w-10 place-items-center text-[#111111] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav
                aria-label="Mobile navigation"
                className="mt-3 flex flex-col"
              >
                {mobileLinks.map((link, index) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={
                      location.pathname === link.path ? "page" : undefined
                    }
                    className={`relative flex items-baseline justify-between border-b border-[#d7d1c6] py-5 font-serif text-[25px] text-[#111111] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#111111] after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                      location.pathname === link.path
                        ? "after:scale-x-100"
                        : ""
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#55504A]">
                      0{index + 1}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={openSearch}
                  className="flex min-h-12 items-center gap-2 border border-[#d7d1c6] px-3 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-200 hover:border-[#55504A] hover:text-[#111111]"
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                  Search
                </button>
                <Link
                  to={accountPath}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-12 items-center gap-2 border border-[#d7d1c6] px-3 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-200 hover:border-[#55504A] hover:text-[#111111]"
                >
                  <UserRound className="h-4 w-4" aria-hidden="true" />
                  {user ? "My account" : "Sign in"}
                </Link>
                {!isAdmin && (
                  <Link
                    to="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="col-span-2 flex min-h-12 items-center gap-2 border border-[#d7d1c6] px-3 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-200 hover:border-[#55504A] hover:text-[#111111]"
                  >
                    <Heart className="h-4 w-4" aria-hidden="true" />
                    Wishlist
                    {wishlist.length > 0 && ` (${wishlist.length})`}
                  </Link>
                )}
              </div>

              {!isAdmin && (
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-auto pt-10 text-[9px] font-medium uppercase tracking-[0.2em] text-[#55504A] transition-colors duration-200 hover:text-[#111111]"
                >
                  Contact GenZio
                </Link>
              )}
              {user && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-6 self-start text-[9px] font-medium uppercase tracking-[0.2em] text-[#55504A] transition-colors duration-200 hover:text-[#111111]"
                >
                  Sign out
                </button>
              )}
            </motion.aside>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
