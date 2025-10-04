import React from "react";
import { useState, useEffect, useRef } from "react";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./Cart";
import { useCart } from "../contexts/CartProvider";
import axios from "axios";
const Header = () => {
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

  const [isCartOpen, setIsCartOpen] = useState(false);
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

  const url = "http://localhost:3000/payment";

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const sendToPaymentGateway = async (cartItems) => {
    try {
      const totalAmount = cartItems.reduce(
        (total, item) => total + item.price,
        0
      );
      const tax = (totalAmount + 5) * 0.1;
      const shipping = 5;
      const finalAmount = totalAmount + shipping + tax;
      if (totalAmount === 0) {
        setError("Cart is empty");
        return;
      }
      setProcessing(true);
      const response = await axios({
        method: "post",
        url: url,
        data: {
          merchantSecretId: "c85db23f-6192-4728-8d57-5717af04e268",
          amount: finalAmount,
          expiresAfterMinutes: 0,
          redirectUrl: "https://upay-gateway.vercel.app/",
          items: cartItems.map((item) => ({
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            price: item.price,
          })),
        },
        headers: { "Content-Type": "application/json" },
      });

      const { upayPaymentUrl } = response.data;
      // console.log("Checkout URL:", checkoutUrl);
      setProcessing(false);
      window.location.href = upayPaymentUrl;
    } catch (error) {
      setProcessing(false);
      setError("Error creating checkout session");
      console.error("Error creating checkout session:", error);
    }
  };

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
      {isCheckoutOpen && cartItems.length > 0 && (
        <Checkout
          cartItems={cartItems}
          setIsCheckoutOpen={setIsCheckoutOpen}
          removeFromCart={removeFromCart}
          sendToPaymentGateway={sendToPaymentGateway}
        />
      )}
    </div>
  );
};

export default Header;

const Checkout = ({
  cartItems,
  setIsCheckoutOpen,
  removeFromCart,
  sendToPaymentGateway,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div
        className="absolute top-0 left-0 w-full h-[400vh] bg-black opacity-90 z-0
      "
      ></div>

      <div className="absolute  bg-white z-200 rounded-3xl p-4 w-11/12 md:w-2/3 lg:w-1/4 ">
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
          <button
            className="bg-amber-500 text-black px-4 py-2 rounded w-full font-bold cursor-pointer hover:scale-102 hover:bg-amber-600"
            onClick={() => sendToPaymentGateway(cartItems)}
          >
            Pay By U-Pay
          </button>
        </div>
      </div>
    </div>
  );
};
