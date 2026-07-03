'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface CartItem {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  alt: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  totalCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: {children: React.ReactNode;}) {
  const [items, setItems] = useState<CartItem[]>([
  { id: 101, name: 'Custom Bouquet — Satin Wrap', subtitle: 'Artisan crafted', price: 89.5, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d879d697-1767797651578.png", alt: 'Custom bouquet', qty: 1 },
  { id: 102, name: 'Red Rose × 5', subtitle: 'Premium stems', price: 22.5, image: "https://images.unsplash.com/photo-1668706977571-f65f10e8edde", alt: 'Red roses', qty: 1 },
  { id: 103, name: 'Peony × 3', subtitle: 'Garden fresh', price: 19.5, image: "https://images.unsplash.com/photo-1523651136219-c9ec5fb78403", alt: 'Peonies', qty: 1 }]
  );

  const addItem = useCallback((item: Omit<CartItem, 'qty'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id: number, qty: number) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
  }, []);

  const totalCount = items.reduce((a, i) => a + i.qty, 0);
  const totalPrice = items.reduce((a, i) => a + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, totalCount, totalPrice }}>
      {children}
    </CartContext.Provider>);

}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}