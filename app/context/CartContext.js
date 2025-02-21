"use client";

import { useSession } from "next-auth/react";

const { createContext, useState, useContext, useEffect } = require("react");

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { data: session } = useSession();
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (session) {
      fetch(`${API}api/cart`)
        .then((res) => res.json())
        .then((data) => setCart(data?.cart));
    }
  }, [session]);

  const addToCart = async (product) => {
    console.log(product._id)
    const res = await fetch(`${API}api/cart`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setCart(data.cart);
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    console.log("removeFromCart")
    console.log({ productId })
    const res = await fetch(`${API}api/cart`, {
      method: "DELETE",
      body: JSON.stringify({ productId }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log("removeFromCart",data.cart)
    setCart(data.cart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => useContext(CartContext);
