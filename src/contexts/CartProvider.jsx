//cart provider.jsx
import { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      setIsCheckoutOpen(false);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    localStorage.setItem("cartItems", JSON.stringify([...cartItems, product]));
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((item) => item.id !== productId))
    );
  };

  const emptyCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        isCheckoutOpen,
        setIsCheckoutOpen,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

export default CartProvider;
