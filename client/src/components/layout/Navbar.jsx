import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Sun, Moon, Menu, X, ShieldCheck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    cart,
    wishlist,
    setIsCartOpen,
    setSearchOpen,
    user,
    authLoading,
    signOut,
    addToast,
  } = useShop();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      setMobileMenuOpen(false);
      navigate('/', { replace: true });
    } catch (error) {
      addToast(error.message || 'Unable to log out. Please try again.', 'error');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Sale', path: '/sale', highlight: true },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin', path: '/admin', isBadge: true },
  ];

  return (
    <header
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    isScrolled
      ? 'glass-nav py-3.5 shadow-luxury'
      : 'bg-transparent py-6 border-b border-white/5'
  }`}
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-luxury-goldDark via-luxury-gold to-luxury-goldLight p-0.5 flex items-center justify-center shadow-glow-gold group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#070709] rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-luxury-gold text-lg tracking-widest">A</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-[0.25em] text-white group-hover:text-luxury-gold transition-colors">
                GenZio
              </span>
              <span className="text-[10px] tracking-[0.3em] text-luxury-gold font-medium uppercase">
                Haute Couture Men
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium tracking-wider transition-all duration-300 relative py-1 ₹{
                    link.highlight
                      ? 'text-luxury-gold font-semibold'
                      : isActive
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {link.isBadge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/40">
                      Pro
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-luxury-gold to-white rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-300 hover:text-luxury-gold transition-colors duration-200 rounded-full hover:bg-white/5"
              title="Search store"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="p-2 text-gray-300 hover:text-luxury-gold transition-colors duration-200 rounded-full hover:bg-white/5 relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-glow-gold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-300 hover:text-luxury-gold transition-colors duration-200 rounded-full hover:bg-white/5 relative group"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-glow-gold">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Profile Link */}
            <div className="flex items-center gap-3">
              {!authLoading && (user ? (
                <>
                  <Link
                    to="/profile"
                    className="max-w-32 truncate text-sm text-luxury-gold hover:text-white transition"
                    title={user.name}
                  >
                    {user.name}
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-4 py-2 border border-luxury-gold text-luxury-gold rounded-lg hover:bg-luxury-gold hover:text-black transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 border border-luxury-gold text-luxury-gold rounded-lg hover:bg-luxury-gold hover:text-black transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-luxury-gold text-black rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    Register
                  </Link>
                </>
              ))}
            </div>
            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-t border-white/10 mt-3 px-6 py-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider text-gray-200 hover:text-luxury-gold py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          {!authLoading && (user ? (
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="truncate text-sm font-semibold text-luxury-gold"
              >
                {user.name}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-semibold text-gray-200 hover:text-luxury-gold"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3 border-t border-white/10 pt-4">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-luxury-gold"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-gray-200"
              >
                Register
              </Link>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};
