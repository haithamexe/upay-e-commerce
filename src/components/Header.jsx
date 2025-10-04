import React from "react";
import { useState, useEffect, useRef } from "react";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./Cart";
import { useCart } from "../contexts/CartProvider";

const Header = () => {
  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-16 bg-amber-500 text-black flex items-center justify-between px-4 fixed w-full top-0 z-100 ">
      <h1 className="text-xl font-bold">Fintech e-commerce</h1>
      <div className="flex items-center ">
        {<MdAccountCircle className="text-2xl mr-4" />}
        {cartItems.length > 0 && (
          <div className="pointer-events-none">
            <div className="absolute top-3 right-2 bg-red-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
              {cartItems.length}
            </div>
          </div>
        )}
        <FaShoppingCart
          className="text-2xl"
          onClick={() => setIsCartOpen(!isCartOpen)}
        />
        {
          <div ref={menuRef} className="relative cursor-pointer ">
            {isCartOpen && (
              <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default Header;
