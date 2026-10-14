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
  { name: "Discover", path: "/" },
  { name: "Collections", path: "/shop" },
  { name: "New Season", path: "/new-arrivals" },
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
  const [homeHeaderSolid, setHomeHeaderSolid] = useState(false);
  const { scrollY } = useScroll();
  const visibleLinks = isAdmin ? adminLinks : storeLinks;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const accountPath = authLoading ? "/login" : user ? "/profile" : "/login";

  useEffect(() => {
    setHomeHeaderSolid(!isHome || window.scrollY > 150);
  }, [isHome]);

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

  useMotionValueEvent(scrollY, "change", (current) => {
    if (isHome) setHomeHeaderSolid(current > 150);
  });

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
    `genzio-nav-link relative py-3 text-[10px] font-medium uppercase tracking-[0.17em] transition-colors duration-300 after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#d5c49e] after:transition-transform after:duration-300 hover:after:scale-x-100 ${
      location.pathname === path ? "text-[#d5c49e]" : "text-[#f4f1ea]/85"
    } ${location.pathname === path ? "after:scale-x-100" : ""}`;

  return (
    <header
      className={`relative z-40 border-b text-[#f4f1ea] transition-colors duration-500 ${
        isHome ? "fixed inset-x-0 top-0" : "sticky top-0"
      } ${
        isAdmin
          ? "border-white/10 bg-[#171b16]"
          : isHome && !homeHeaderSolid
            ? "border-transparent bg-transparent"
            : "border-white/10 bg-[#171b16]/95 shadow-sm backdrop-blur-md"
      }`}
    >
      <div className="relative mx-auto flex min-h-[72px] max-w-[1600px] items-center justify-between px-4 sm:min-h-[82px] sm:px-8 lg:px-[5vw]">
        <button
          type="button"
          className="grid h-10 w-10 place-items-center text-[#f4f1ea] transition-colors hover:text-[#d5c49e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d5c49e] lg:hidden"
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
          className="hidden items-center gap-7 lg:flex xl:gap-10"
        >
          {visibleLinks.map((link) => (
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
          className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center"
          aria-label="GenZio home"
        >
          <span className="font-serif text-[21px] leading-none tracking-[0.17em] sm:text-[26px] sm:tracking-[0.2em]">
            GENZIO
          </span>
          <span className="mt-1.5 text-[7px] font-medium uppercase tracking-[0.38em] text-[#d5c49e] sm:text-[8px]">
            {isAdmin ? "Admin" : "Menswear"}
          </span>
        </Link>

        <div className="flex items-center justify-end gap-1 sm:gap-2 lg:gap-3">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search products"
            className="hidden h-10 w-10 place-items-center transition-colors hover:text-[#d5c49e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d5c49e] lg:grid"
          >
            <Search className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
          <Link
            to={accountPath}
            aria-label={user ? "Your account" : "Sign in"}
            className="hidden h-10 w-10 place-items-center transition-colors hover:text-[#d5c49e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d5c49e] lg:grid"
          >
            <UserRound className="h-[18px] w-[18px]" aria-hidden="true" />
          </Link>
          <Link
            to="/cart"
            aria-label={`Shopping bag${cartCount ? `, ${cartCount} items` : ""}`}
            className="relative grid h-10 w-10 place-items-center transition-colors hover:text-[#d5c49e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d5c49e]"
          >
            <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#d5c49e] px-1 text-[9px] font-semibold text-[#171b16]">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

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
              className="flex h-full w-[min(88vw,390px)] flex-col overflow-y-auto bg-[#f4f1ea] px-6 pb-8 pt-5 text-[#20201d] shadow-2xl sm:px-8"
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
                  <p className="mt-1.5 text-[8px] uppercase tracking-[0.28em] text-[#817b70]">
                    Considered menswear
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="grid h-10 w-10 place-items-center text-[#514b42] transition-colors hover:text-[#8c6b3e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav
                aria-label="Mobile navigation"
                className="mt-3 flex flex-col"
              >
                {visibleLinks.map((link, index) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={
                      location.pathname === link.path ? "page" : undefined
                    }
                    className={`flex items-baseline justify-between border-b border-[#d7d1c6] py-5 font-serif text-[25px] transition-colors hover:text-[#8c6b3e] ${
                      location.pathname === link.path
                        ? "text-[#8c6b3e]"
                        : "text-[#20201d]"
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#9b958a]">
                      0{index + 1}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={openSearch}
                  className="flex min-h-12 items-center gap-2 border border-[#d7d1c6] px-3 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors hover:border-[#8c6b3e] hover:text-[#8c6b3e]"
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                  Search
                </button>
                <Link
                  to={accountPath}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-12 items-center gap-2 border border-[#d7d1c6] px-3 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors hover:border-[#8c6b3e] hover:text-[#8c6b3e]"
                >
                  <UserRound className="h-4 w-4" aria-hidden="true" />
                  {user ? "My account" : "Sign in"}
                </Link>
                {!isAdmin && (
                  <Link
                    to="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="col-span-2 flex min-h-12 items-center gap-2 border border-[#d7d1c6] px-3 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors hover:border-[#8c6b3e] hover:text-[#8c6b3e]"
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
                  className="mt-auto pt-10 text-[9px] font-medium uppercase tracking-[0.2em] text-[#817b70] transition-colors hover:text-[#8c6b3e]"
                >
                  Contact GenZio
                </Link>
              )}
              {user && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-6 self-start text-[9px] font-medium uppercase tracking-[0.2em] text-[#817b70] transition-colors hover:text-[#8c6b3e]"
                >
                  Sign out
                </button>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
