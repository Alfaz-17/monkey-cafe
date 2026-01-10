'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { CartItem } from '@/lib/types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (uniqueId: string) => void; // Changed id to uniqueId
  decrementFromCart: (uniqueId: string) => void; 
  clearCart: () => void;
  totalPrice: number;
  totalQty: number;
  tableId: string | null;
  setTableId: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [tableId, setTableId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('tableId');
    return null;
  });
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('cartItems');
        return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

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
      // Use uniqueId if available, fallback to _id (though types say uniqueId is required for CartItem)
      const key = newItem.uniqueId || newItem._id; 
      
      const existItem = prevItems.find((x) => (x.uniqueId || x._id) === key);
      if (existItem) {
        return prevItems.map((x) =>
          (x.uniqueId || x._id) === key ? { ...x, qty: x.qty + newItem.qty } : x
        );
      } else {
        // Ensure uniqueId is present
        return [...prevItems, { ...newItem, uniqueId: key }];
      }
    });
  };

  const removeFromCart = (uniqueId: string) => {
    setCartItems((prevItems) => prevItems.filter((x) => (x.uniqueId || x._id) !== uniqueId));
  };
  
  const decrementFromCart = (uniqueId: string) => {
       setCartItems((prevItems) => {
            const existItem = prevItems.find((x) => (x.uniqueId || x._id) === uniqueId);
            if (existItem) {
                if (existItem.qty === 1) {
                    return prevItems.filter((x) => (x.uniqueId || x._id) !== uniqueId);
                }
                return prevItems.map((x) =>
                     (x.uniqueId || x._id) === uniqueId ? { ...x, qty: x.qty - 1 } : x
                );
            }
            return prevItems;
       });
   };

  const clearCart = () => {
    setCartItems([]);
    // Do NOT clear tableId, customer might order again
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decrementFromCart, clearCart, totalPrice, totalQty, tableId, setTableId }}>
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
