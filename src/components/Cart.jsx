import React from "react";
import { useCart } from "../contexts/CartProvider";

const Cart = ({ onClose }) => {
  const { cartItems, removeFromCart, setIsCheckoutOpen } = useCart();

  return (
    <section>
      <div className="absolute top-8 -right-4 bg-yellow-500 shadow-lg p-4 w-80 rounded-3xl rounded-tr-none z-50">
        <h2 className="text-lg font-bold mb-2">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex  items-center mb-2 last:mb-0 bg-gradient-to-b from-gray-800 to-black p-2 rounded-2xl"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-15 h-auto object-cover mr-2 rounded-2xl"
                />
                <div className="flex flex-col items-start mr-4">
                  <h1 className="text-sm font-semibold text-white">
                    {item.title}
                  </h1>
                  <p className="text-sm font-semibold text-white">
                    {" "}
                    ${item.price}
                  </p>
                </div>

                <button
                  className="text-red-700 ml-auto mt-auto text-sm font-bold hover:underline mr-2"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        {cartItems.length > 0 && (
          <h1
            className="text-black font-bold w-full flex justify-center items-center bg-gradient-to-b from-amber-400 to-amber-600 rounded-2xl p-2 mt-4 hover:scale-102 border-black border-4 cursor-pointer"
            onClick={() => {
              setIsCheckoutOpen(true);
              onClose();
            }}
          >
            Proceed to Checkout
          </h1>
        )}
      </div>
      <section></section>
    </section>
  );
};

export default Cart;
