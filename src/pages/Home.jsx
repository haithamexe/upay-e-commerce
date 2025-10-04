import React from "react";

import { FaCartPlus } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import { useCart } from "../contexts/CartProvider";
import {
  categories,
  products,
  productsWithCards,
  allProducts,
} from "../utils/products";

function FavoriteElement() {
  return (
    <>
      <MdFavoriteBorder className="text-black absolute right-3 top-3 text-3xl cursor-pointer" />
      <div className="bg-amber-400 rounded-xl w-12 h-12 flex items-center justify-center absolute right-1 bottom-1 cursor-pointer font-bold">
        <FaCartPlus className="text-2xl" />
        {/* <h1>+</h1> */}
      </div>
    </>
  );
}

const Home = () => {
  const {
    addToCart,
    cartItems,
    isCheckoutOpen,
    setIsCheckoutOpen,
    removeFromCart,
  } = useCart();

  return (
    <div>
      <section>
        <h1 className="text-4xl font-bold border-b-1 pb-4 pl-4 pt-2 text-white">
          Categories
        </h1>
        <div className="flex gap-4 overflow-x-auto py-4 px-4 overflow-hidden rounded-full cursor-pointer">
          {/* <div className="bg-gray-200 h-40 w-40 flex items-center justify-center rounded-full overflow-hidden">
            <img src="https://i.imgur.com/4lTaHfF.jpeg" />
          </div>
          <div className="bg-gray-200 h-40 w-40 flex items-center justify-center rounded-full overflow-hidden">
            <img src="https://i.imgur.com/qNOjJje.jpeg" />
          </div>
          <div className="bg-gray-200 h-40 w-40 flex items-center justify-center rounded-full overflow-hidden">
            <img src="https://i.imgur.com/w3Y8NwQ.jpeg" />
          </div>
          <div className="bg-gray-200 h-40 w-40 flex items-center justify-center rounded-full overflow-hidden ">
            <img src="https://i.imgur.com/ItHcq7o.jpeg" />
          </div>
          <div className="bg-gray-200 h-40 w-40 flex items-center justify-center rounded-full overflow-hidden">
            <img src="https://i.imgur.com/axsyGpD.jpeg" />
          </div>
          <div className="bg-gray-200 h-40 w-40 flex items-center justify-center rounded-full overflow-hidden">
            <img src="https://i.imgur.com/w3Y8NwQ.jpeg" />
          </div>
          <div className="bg-gray-200 h-40 w-1/3 flex flex-1 items-center justify-center rounded-full overflow-hidden">
            <img src="https://i.imgur.com/Qphac99.jpeg" />
          </div> */}
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white h-40 w-40 flex items-center justify-center rounded-full overflow-hidden last:flex-1"
            >
              <img
                src={category.imageUrl}
                alt={category.title}
                className="object-cover h-full w-full"
              />
            </div>
          ))}
        </div>
      </section>
      <section>
        <h1 className="text-4xl font-bold border-t-1 pb-4 pl-4 pt-2 text-white">
          Featured Products
        </h1>
        <div className="flex gap-4 flex-wrap py-4 px-4 w-full overflow-x-auto">
          {/* <div className="border p-1 rounded-lg relative">
            <img
              src="https://i.imgur.com/1ttYWaI.jpeg"
              alt="Product 1"
              className="object-cover w-full h-48 rounded-xl"
            />
            <div className="flex flex-col  mt-2 text-left">
              <h1 className="">Apple Watch</h1>
              <p className=" font-bold">$9.99</p>
            </div>
            <FavoriteElement />
          </div> */}
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-1 rounded-lg relative bg-yellow-200"
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="object-cover w-full h-48 rounded-xl"
              />
              <div className="flex flex-col  mt-2 text-left">
                <h1 className="">{product.title}</h1>
                <p className=" font-bold">${product.price}</p>
              </div>
              <>
                <MdFavoriteBorder className="text-black absolute right-3 top-3 text-3xl cursor-pointer" />
                <div className="bg-amber-400 rounded-xl w-12 h-12 flex items-center justify-center absolute right-1 bottom-1 cursor-pointer font-bold">
                  <FaCartPlus
                    className="text-2xl"
                    onClick={() => addToCart(product)}
                  />
                  {/* <h1>+</h1> */}
                </div>
              </>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h1 className="text-4xl font-bold border-t-1 pb-4 pl-4 pt-4 text-white">
          Browse
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productsWithCards.map((product) => (
            <div
              key={product.id}
              className="border p-1 rounded-lg relative bg-amber-100"
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="object-cover w-full h-48 rounded-xl"
              />
              <div className="flex flex-col  mt-2 text-left">
                <h1 className="">{product.title}</h1>
                <p className=" font-bold">${product.price}</p>
              </div>
              <>
                <MdFavoriteBorder className="text-black absolute right-3 top-3 text-3xl cursor-pointer" />
                <div className="bg-amber-400 rounded-xl w-12 h-12 flex items-center justify-center absolute right-1 bottom-1 cursor-pointer font-bold">
                  <FaCartPlus
                    className="text-2xl"
                    onClick={() => addToCart(product)}
                  />
                  {/* <h1>+</h1> */}
                </div>
              </>
            </div>
          ))}
        </div>
      </section>
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

export default Home;
