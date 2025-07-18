import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ShoppingContext = createContext();

const ShoppingContextProvider = ({ children }) => {
  const currency = "$";
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState(" ");
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getProductData();
    fetchToken();
  }, []);

  useEffect(() => {
    let usernameData = localStorage.getItem("username");
    if (token) {
      getUserCart();
      getCartCount();
      setUsername(usernameData);
    }
  }, [token]);

  // ✅ Fetch token and verify login
  const fetchToken = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/verify`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setToken(true); // This will trigger getCartCount via useEffect
      } else {
        setToken(false);
      }
    } catch (err) {
      console.error("Token verify error:", err);
      setToken(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        setToken(false);
        setCartItems({});
        setCartCount(0);
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const getProductData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/show`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setProducts(res.data.product || []);
      }
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  };

  const getUserCart = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/get`,
        { withCredentials: true }
      );
      setCartItems(res.data.cart || {});
    } catch (err) {
      console.error("Get cart error:", err);
    }
  };

  const getCartCount = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/count`,
        { withCredentials: true }
      );
      setCartCount(res.data.total || 0);
    } catch (err) {
      console.error("Get cart count error:", err);
    }
  };

  const addToCart = async (itemId, size) => {
    const updatedCart = { ...cartItems };
    if (!updatedCart[itemId]) updatedCart[itemId] = {};
    updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;

    if (token) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/add`,
          { itemId, size },
          { withCredentials: true }
        );
        setCartItems(res.data.cartData || updatedCart);
        await getCartCount();
      } catch (err) {
        toast.error(err?.response?.data?.message || "Add to cart failed");
      }
    } else {
      setCartItems(updatedCart);
      const guestCount = Object.values(updatedCart).reduce(
        (acc, sizeMap) =>
          acc + Object.values(sizeMap).reduce((a, b) => a + b, 0),
        0
      );
      setCartCount(guestCount);
    }
  };

  const updatedQuantity = async (itemId, size, quantity) => {
    try {
      await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/cart/update/${itemId}/${size}/${quantity}`,
        {},
        { withCredentials: true }
      );

      await getUserCart();
      await getCartCount();
    } catch (error) {
      console.error("Update quantity error:", error);
    }
  };

  const deleteCartItem = async (id, size) => {
    const updatedCart = { ...cartItems };

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/delete/${id}/${size}`,
        { withCredentials: true }
      );
      toast.success("Item removed from cart");

      if (updatedCart[id]) {
        delete updatedCart[id][size];
        if (Object.keys(updatedCart[id]).length === 0) {
          delete updatedCart[id];
        }
      }

      setCartItems(updatedCart);
      await getCartCount();
    } catch (err) {
      console.error("Delete cart item error:", err);
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (!product) continue;
      for (const size in cartItems[id]) {
        const qty = cartItems[id][size];
        if (qty > 0) total += qty * product.price + 10;
      }
    }
    return total;
  };

  const value = {
    currency,
    username,
    setUsername,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    products,
    token,
    setToken,
    handleLogout,
    cartItems,
    setCartItems,
    addToCart,
    cartCount,
    updatedQuantity,
    getCartAmount,
    deleteCartItem,
  };

  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContextProvider;
