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
      {isCheckoutOpen && (
        <Checkout
          cartItems={cartItems}
          setIsCheckoutOpen={setIsCheckoutOpen}
          removeFromCart={removeFromCart}
        />
      )}
    </div>
  );
};

export default Layout;

const Checkout = ({ cartItems, setIsCheckoutOpen, removeFromCart }) => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-90 rounded-3xl z-0"></div>

      <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white z-200 rounded-3xl p-4 w-11/12 md:w-2/3 lg:w-1/4 ">
        <h2 className="text-lg font-bold mb-2">Order Summary</h2>
        <div className="max-h-64 overflow-y-auto border rounded mb-4">
          {cartItems?.map((item) => (
            <div
              key={item.id}
              className="p-4 border-b flex items-center last:border-b-0"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <div className="flex flex-col items-end justify-center">
                <p className="font-bold">${item.price}</p>
                <button
                  className="text-red-400 text-xs mr-1 hover:underline"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <h2 className="text-lg font-bold mb-2">Payment Information</h2>
          <div className="flex justify-between flex-wrap">
            <div className="flex justify-between w-full">
              <h1>subtotal</h1>
              <span>
                ${cartItems.reduce((total, item) => total + item.price, 0)}
              </span>
            </div>
            <div className="flex justify-between w-full">
              <h1>Shipping</h1>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between w-full">
              <h1>Tax</h1>
              <span>
                $
                {(
                  (cartItems.reduce((total, item) => total + item.price, 0) +
                    5) *
                  0.1
                ).toFixed(2)}
              </span>
            </div>
            <h1 className="font-bold text-xl">Total</h1>
            <span className="font-bold text-lg">
              $
              {(
                cartItems.reduce((total, item) => total + item.price, 0) +
                5 +
                (cartItems.reduce((total, item) => total + item.price, 0) + 5) *
                  0.1
              ).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="pt-4 border-t flex justify-end">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2 font-bold cursor-pointer"
            onClick={() => setIsCheckoutOpen(false)}
          >
            Cancel
          </button>
          <button className="bg-amber-500 text-black px-4 py-2 rounded w-full font-bold cursor-pointer hover:scale-102 hover:bg-amber-600">
            Pay By U-Pay
          </button>
        </div>
      </div>
    </>
  );
};
