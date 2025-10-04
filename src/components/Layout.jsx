import React from "react";
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useCart } from "../contexts/CartProvider";

const Layout = () => {
  const { cartItems, isCheckoutOpen, setIsCheckoutOpen, removeFromCart } =
    useCart();

  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCheckoutOpen]);

  return (
    <div>
      <Header />
      <main className="min-h-[calc(100vh-4rem-3rem)] bg-black mt-15">
        <Outlet />
      </main>
      <Footer />
      {/* {isCheckoutOpen && (
        <Checkout
          cartItems={cartItems}
          setIsCheckoutOpen={setIsCheckoutOpen}
          removeFromCart={removeFromCart}
        />
      )} */}
    </div>
  );
};

export default Layout;
