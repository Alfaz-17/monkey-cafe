'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: string; // Product ID
  name: string;
  price: number;
  qty: number;
  image?: string;
  // customizations?: any; // To be added later
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalQty: number;
  tableId: string | null;
  setTableId: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [tableId, setTableId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart and tableId from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    const savedTable = localStorage.getItem('tableId');
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedTable) setTableId(savedTable);
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save tableId
  useEffect(() => {
    if (tableId) localStorage.setItem('tableId', tableId);
  }, [tableId]);

  const addToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const existItem = prevItems.find((x) => x.id === newItem.id);
      if (existItem) {
        return prevItems.map((x) =>
          x.id === existItem.id ? { ...x, qty: x.qty + newItem.qty } : x
        );
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((x) => x.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    // Do NOT clear tableId, customer might order again
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice, totalQty, tableId, setTableId }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
