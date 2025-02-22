"use client";

import Modal from "../component/Modal";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Ensure items is always an array
  const items = Array.isArray(cart) ? cart : cart?.items || [];

  const getSubtotal = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {/* Loading State */}
      {cart === undefined && (
        <div className="text-center text-gray-500">
          <p>Loading your cart...</p>
        </div>
      )}

      {/* Cart is Empty State */}
      {cart !== undefined && items.length === 0 && (
        <div className="text-center text-gray-500">
          <p>Your cart is empty.</p>
        </div>
      )}

      {/* Cart Items */}
      {cart !== undefined && items.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center border-b py-4">
                <div className="ml-4 flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      className="px-2 py-1 border rounded text-sm"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className="px-2 py-1 border rounded text-sm"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="ml-4 text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="flex justify-between mt-2">
              <span>Subtotal:</span>
              <span>${getSubtotal()}</span>
            </div>
            <button className="w-full bg-yellow-500 text-white py-2 mt-4 rounded-md hover:bg-yellow-600">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
      {/* <Modal 
      isOpen={moadalOpen}
      onClose={setModalOpen(false)}
      onConfirm={confirmRemove}
      message="Are you sure you want to remove this item from your cart?"
      /> */}
    </div>
  );
};

export default CartPage;
