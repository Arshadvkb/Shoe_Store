import { useReducer, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { CartContext } from "../context/Cart_Context";

const initialState = {
  cart: [], 
  wishlist: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART_AND_WISHLIST":
      return {
        ...state,
        cart: action.payload.cart || [],
        wishlist: action.payload.wishlist || [],
      };

    case "ADD_TO_CART": {
      const { product, quantity = 1 } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === product.id
      );

      let updatedCart;
      if (existingItemIndex > -1) {
        updatedCart = state.cart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...product, quantity }];
      }
      return { ...state, cart: updatedCart };
    }

    case "REMOVE_FROM_CART": {
      const updatedCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, cart: updatedCart };
    }

    case "UPDATE_CART_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== id),
        };
      }
      const updatedCart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      return { ...state, cart: updatedCart };
    }

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "ADD_TO_WISHLIST": {
      const product = action.payload.product;
      const exists = state.wishlist.some((item) => item.id === product.id);
      if (exists) return state;
      return { ...state, wishlist: [...state.wishlist, product] };
    }

    case "REMOVE_FROM_WISHLIST": {
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    }

    case "TOGGLE_WISHLIST": {
      const product = action.payload.product;
      const exists = state.wishlist.some((item) => item.id === product.id);
      let updatedWishlist;
      if (exists) {
        updatedWishlist = state.wishlist.filter(
          (item) => item.id !== product.id
        );
      } else {
        updatedWishlist = [...state.wishlist, product];
      }
      return { ...state, wishlist: updatedWishlist };
    }

    case "CLEAR_WISHLIST":
      return { ...state, wishlist: [] };

    default:
      return state;
  }
};

export const CartContextProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const activeUserIdRef = useRef(null);

  // Helper to get active user object from sessionStorage
  const getActiveUser = () => {
    const data = sessionStorage.getItem("Active User");
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse Active User from sessionStorage", e);
      return null;
    }
  };

  // Helper to check user authentication status
  const isUserAuthenticated = () => {
    const user = getActiveUser();
    return !!(user && user.email);
  };

  // Load cart & wishlist specifically for the logged-in user
  const loadUserCartAndWishlist = useCallback(async () => {
    const user = getActiveUser();
    if (!user || !user.email) {
      activeUserIdRef.current = null;
      dispatch({
        type: "SET_CART_AND_WISHLIST",
        payload: { cart: [], wishlist: [] },
      });
      return;
    }

    activeUserIdRef.current = user.id || user.email;

    try {
      if (user.id) {
        const response = await axios.get(`http://localhost:5000/users/${user.id}`);
        const fetchedUser = response.data;
        const userCart = fetchedUser.cart || [];
        const userWishlist = fetchedUser.wishlist || [];

        // Sync session storage with latest fetched user cart & wishlist
        const updatedUser = { ...user, cart: userCart, wishlist: userWishlist };
        sessionStorage.setItem("Active User", JSON.stringify(updatedUser));

        dispatch({
          type: "SET_CART_AND_WISHLIST",
          payload: { cart: userCart, wishlist: userWishlist },
        });
      } else {
        dispatch({
          type: "SET_CART_AND_WISHLIST",
          payload: { cart: user.cart || [], wishlist: user.wishlist || [] },
        });
      }
    } catch (e) {
      console.error("Error fetching logged in user cart from server:", e);
      dispatch({
        type: "SET_CART_AND_WISHLIST",
        payload: { cart: user.cart || [], wishlist: user.wishlist || [] },
      });
    }
  }, []);

  // Watch for changes in Active User (login / logout / switch user)
  useEffect(() => {
    loadUserCartAndWishlist();

    const interval = setInterval(() => {
      const user = getActiveUser();
      const currentActiveId = user ? user.id || user.email : null;
      if (currentActiveId !== activeUserIdRef.current) {
        activeUserIdRef.current = currentActiveId;
        loadUserCartAndWishlist();
      }
    }, 400);

    const handleStorageChange = () => {
      loadUserCartAndWishlist();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadUserCartAndWishlist]);

  // Sync cart & wishlist modifications to localStorage session and backend json-server for logged-in user
  const syncUserData = async (updatedCart, updatedWishlist) => {
    const user = getActiveUser();
    if (!user || !user.email) return;

    const updatedUser = {
      ...user,
      cart: updatedCart,
      wishlist: updatedWishlist,
    };

    // Update sessionStorage active user
    sessionStorage.setItem("Active User", JSON.stringify(updatedUser));

    // Sync with DB backend if user has id
    if (user.id) {
      try {
        await axios.patch(`http://localhost:5000/users/${user.id}`, {
          cart: updatedCart,
          wishlist: updatedWishlist,
        });
      } catch (error) {
        console.error("Failed to sync user cart/wishlist with server:", error);
      }
    }
  };

  // CRUD Cart Operations
  const addToCart = async (product, quantity = 1) => {
    if (!isUserAuthenticated()) {
      alert("Please log in to add items to your cart!");
      return false;
    }

    const existingItemIndex = state.cart.findIndex(
      (item) => item.id === product.id
    );

    let updatedCart;
    if (existingItemIndex > -1) {
      updatedCart = state.cart.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...state.cart, { ...product, quantity }];
    }

    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
    await syncUserData(updatedCart, state.wishlist);
    return true;
  };

  const removeFromCart = async (productId) => {
    if (!isUserAuthenticated()) {
      alert("Please log in to manage your cart!");
      return false;
    }

    const updatedCart = state.cart.filter((item) => item.id !== productId);
    dispatch({ type: "REMOVE_FROM_CART", payload: { id: productId } });
    await syncUserData(updatedCart, state.wishlist);
    return true;
  };

  const updateCartQuantity = async (productId, quantity) => {
    if (!isUserAuthenticated()) {
      alert("Please log in to manage your cart!");
      return false;
    }

    let updatedCart;
    if (quantity <= 0) {
      updatedCart = state.cart.filter((item) => item.id !== productId);
    } else {
      updatedCart = state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    }

    dispatch({
      type: "UPDATE_CART_QUANTITY",
      payload: { id: productId, quantity },
    });
    await syncUserData(updatedCart, state.wishlist);
    return true;
  };

  const incrementQuantity = async (productId) => {
    const item = state.cart.find((i) => i.id === productId);
    if (item) {
      return await updateCartQuantity(productId, item.quantity + 1);
    }
  };

  const decrementQuantity = async (productId) => {
    const item = state.cart.find((i) => i.id === productId);
    if (item) {
      return await updateCartQuantity(productId, item.quantity - 1);
    }
  };

  const clearCart = async () => {
    if (!isUserAuthenticated()) {
      alert("Please log in to clear your cart!");
      return false;
    }

    dispatch({ type: "CLEAR_CART" });
    await syncUserData([], state.wishlist);
    return true;
  };

  // CRUD Wishlist Operations
  const addToWishlist = async (product) => {
    if (!isUserAuthenticated()) {
      alert("Please log in to add items to your wishlist!");
      return false;
    }

    const exists = state.wishlist.some((item) => item.id === product.id);
    if (exists) return true;

    const updatedWishlist = [...state.wishlist, product];
    dispatch({ type: "ADD_TO_WISHLIST", payload: { product } });
    await syncUserData(state.cart, updatedWishlist);
    return true;
  };

  const removeFromWishlist = async (productId) => {
    if (!isUserAuthenticated()) {
      alert("Please log in to manage your wishlist!");
      return false;
    }

    const updatedWishlist = state.wishlist.filter(
      (item) => item.id !== productId
    );
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: { id: productId } });
    await syncUserData(state.cart, updatedWishlist);
    return true;
  };

  const toggleWishlist = async (product) => {
    if (!isUserAuthenticated()) {
      alert("Please log in to manage your wishlist!");
      return false;
    }

    const exists = state.wishlist.some((item) => item.id === product.id);
    let updatedWishlist;
    if (exists) {
      updatedWishlist = state.wishlist.filter((item) => item.id !== product.id);
    } else {
      updatedWishlist = [...state.wishlist, product];
    }

    dispatch({ type: "TOGGLE_WISHLIST", payload: { product } });
    await syncUserData(state.cart, updatedWishlist);
    return true;
  };

  const clearWishlist = async () => {
    if (!isUserAuthenticated()) {
      alert("Please log in to clear your wishlist!");
      return false;
    }

    dispatch({ type: "CLEAR_WISHLIST" });
    await syncUserData(state.cart, []);
    return true;
  };

  // Getters / Selectors
  const isInCart = useCallback(
    (productId) => state.cart.some((item) => item.id === productId),
    [state.cart]
  );

  const isInWishlist = useCallback(
    (productId) => state.wishlist.some((item) => item.id === productId),
    [state.wishlist]
  );

  const getCartTotal = useCallback(
    () =>
      state.cart.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 1),
        0
      ),
    [state.cart]
  );

  const getCartCount = useCallback(
    () =>
      state.cart.reduce((count, item) => count + (item.quantity || 1), 0),
    [state.cart]
  );

  const getWishlistCount = useCallback(
    () => state.wishlist.length,
    [state.wishlist]
  );

  const values = {
    cart: state.cart,
    wishlist: state.wishlist,
    state,
    dispatch,
    isUserAuthenticated,
    // Cart CRUD
    addToCart,
    removeFromCart,
    updateCartQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    // Wishlist CRUD
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    // Helpers
    isInCart,
    isInWishlist,
    getCartTotal,
    getCartCount,
    getWishlistCount,
  };

  return (
    <CartContext.Provider value={values}>
      {props.children}
    </CartContext.Provider>
  );
};