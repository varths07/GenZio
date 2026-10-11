
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { MOCK_PRODUCTS } from "../data/mockProducts";
import { supabase } from "../supabase";

const ShopContext = createContext();

const mapAuthUser = (authUser) => {
  const metadata = authUser.user_metadata || {};

  return {
    id: authUser.id,
    name:
      metadata.full_name ||
      metadata.name ||
      authUser.email?.split("@")[0] ||
      "Account",
    email: authUser.email || "",
    avatar: metadata.avatar_url || "",
    vipStatus: "Member",
    mobile: metadata.mobile || "",
    address: metadata.address || "",
    city: metadata.city || "",
    state: metadata.state || "",
    pincode: metadata.pincode || "",
  };
};

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    let authRequestId = 0;

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const requestId = ++authRequestId;

      if (!session) {
        setUser(null);
        setAuthError("");
        setAuthLoading(false);
        return;
      }

      // Keep the account available from the restored session while verifying it.
      const sessionUser = session.user;
      if (sessionUser) {
        setUser(mapAuthUser(sessionUser));
      }
      setAuthLoading(true);
      setAuthError("");

      Promise.resolve().then(async () => {
        try {
          const {
            data: { user: authUser },
            error,
          } = await supabase.auth.getUser();

          if (!isMounted || requestId !== authRequestId) return;

          if (error) {
            throw error;
          }
          if (!authUser) {
            throw new Error("The authentication provider returned no user.");
          }

          setUser(mapAuthUser(authUser));
          setAuthError("");
        } catch (error) {
          if (!isMounted || requestId !== authRequestId) return;

          // A verification/network failure does not prove that the stored session
          // is invalid. Retain its user and expose the failure instead of logging out.
          setAuthError(error.message || "Unable to verify your session.");
          console.error("Authentication session verification failed:", error);
        } finally {
          if (isMounted && requestId === authRequestId) {
            setAuthLoading(false);
          }
        }
      });
    });

    return () => {
      isMounted = false;
      authRequestId += 1;
      data.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    setAuthLoading(true);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setAuthError("");
    } finally {
      setAuthLoading(false);
    }
  };

  const [ordersByUser, setOrdersByUser] = useState({});
  const orders = user?.id ? ordersByUser[user.id] || [] : [];

  const setOrders = (nextOrders) => {
    if (!user?.id) return;

    setOrdersByUser((currentOrdersByUser) => {
      const currentOrders = currentOrdersByUser[user.id] || [];
      const updatedOrders =
        typeof nextOrders === "function"
          ? nextOrders(currentOrders)
          : nextOrders;

      return { ...currentOrdersByUser, [user.id]: updatedOrders };
    });
  };

  // Load active products from Supabase.
  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to load Supabase products:", error);
        return; // Keep the existing mock products.
      }

      if (!isMounted) return;

      const databaseProducts = (data || []).map((item) => ({
        ...item,
        id: item.id,
        name: item.name,
        description: item.description || "",
        price: Number(item.price),
        stockCount: Number(item.stock ?? 0),
        category: item.category || "",
        subCategory: item.sub_category || "",
        image: item.image_url || "",
        images: item.image_url ? [item.image_url] : [],
        colors: item.colors || [],
        sizes: item.sizes || [],
      }));

      setProducts(databaseProducts);
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Toast notifications
  const addToast = (message, type = "info") => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  };

  // Cart operations
  const addToCart = (
    product,
    selectedColor,
    selectedSize,
    quantity = 1
  ) => {
    const colorName =
      selectedColor?.name || product.colors?.[0]?.name || "Default";

    const sizeVal = selectedSize || product.sizes?.[0] || "Standard";

    const cartItemId = `${product.id}-${colorName}-${sizeVal}`;

    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.cartItemId === cartItemId
      );

      if (existing) {
        return prevCart.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          cartItemId,
          selectedColor: colorName,
          selectedSize: sizeVal,
          quantity,
        },
      ];
    });

    addToast(`Added ${product.name} to your Cart`, "success");
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.cartItemId !== cartItemId)
    );

    addToast("Item removed from cart", "info");
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // Wishlist
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);

      if (exists) {
        addToast(`Removed ${product.name} from Wishlist`, "info");

        return prev.filter((item) => item.id !== product.id);
      }

      addToast(`Saved ${product.name} to Wishlist`, "success");

      return [...prev, product];
    });
  };

  const isInWishlist = (productId) =>
    wishlist.some((item) => item.id === productId);

  // Cart calculations
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const discountAmount = appliedPromo
    ? cartSubtotal * appliedPromo.discount
    : 0;

  const freeShippingThreshold = 150;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;

  const shippingCost =
    cartSubtotal === 0 || isFreeShipping ? 0 : 25;

  const cartTotal = Math.max(
    0,
    cartSubtotal - discountAmount + shippingCost
  );

  // Promo codes
  const applyPromoCode = (code) => {
    const normalizedCode = code.trim().toUpperCase();

    if (
      normalizedCode === "AURA10" ||
      normalizedCode === "LUXURY10"
    ) {
      setAppliedPromo({
        code: normalizedCode,
        discount: 0.1,
      });

      addToast("10% VIP Promo Applied!", "success");
      return true;
    }

    addToast("Invalid promo code. Try AURA10", "error");
    return false;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        setProducts,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        discountAmount,
        shippingCost,
        cartTotal,
        isFreeShipping,
        freeShippingThreshold,
        appliedPromo,
        applyPromoCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        searchOpen,
        setSearchOpen,
        searchQuery,
        setSearchQuery,
        user,
        authLoading,
        authError,
        signOut,
        orders,
        setOrders,
        toasts,
        addToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
