import React from "react";

const Checkout = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white z-50">
      Checkout
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">Order Summary</h2>
        {/* Add order summary details here */}
      </div>
      <div className="p-4 border-t">
        <h2 className="text-lg font-bold mb-2">Payment Information</h2>
        {/* Add payment form here */}
      </div>
      <div className="p-4 border-t flex justify-end">
        <button className="bg-gray-300 text-black px-4 py-2 rounded mr-2">
          Cancel
        </button>
        <button className="bg-amber-500 text-black px-4 py-2 rounded">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
