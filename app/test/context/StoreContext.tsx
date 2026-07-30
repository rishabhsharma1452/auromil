"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Restaurant, Category, Item, Order, OrderItem } from "../types";
import { mockRestaurant, mockCategories, mockMenuItems, mockOrders } from "../data/mockData";

interface StoreContextProps {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: Item[];
  orders: Order[];
  cart: { item: Item; quantity: number; notes?: string }[];
  
  // Cart Actions
  addToCart: (item: Item, quantity?: number, notes?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => { subtotal: number; deliveryCharge: number; gstAmount: number; grandTotal: number };
  
  // Order Actions
  placeOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    landmark?: string;
    pinCode: string;
    paymentMethod: "COD" | "UPI" | "CARD";
    specialInstructions?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: Order["deliveryStatus"]) => void;
  
  // Menu/Category CRUD Actions
  addMenuItem: (item: Omit<Item, "id" | "popularityCount">) => void;
  updateMenuItem: (item: Item) => void;
  deleteMenuItem: (itemId: string) => void;
  addCategory: (category: Omit<Category, "id">) => void;
  
  // Audio Alert
  playNewOrderSound: () => void;
  resetToDefaults: () => void;
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [restaurant] = useState<Restaurant>(mockRestaurant);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [menuItems, setMenuItems] = useState<Item[]>(mockMenuItems);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [cart, setCart] = useState<{ item: Item; quantity: number; notes?: string }[]>([]);

  // Load from localStorage on client side mount to avoid SSR hydration mismatch
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      const storedCategories = localStorage.getItem("momo_categories");
      const storedMenuItems = localStorage.getItem("momo_menuItems");
      const storedOrders = localStorage.getItem("momo_orders");

      if (storedCategories) setCategories(JSON.parse(storedCategories));
      if (storedMenuItems) setMenuItems(JSON.parse(storedMenuItems));
      if (storedOrders) setOrders(JSON.parse(storedOrders));
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  // Play digital double-tone bell chime using Web Audio API (completely synthetic, no file assets needed)
  const playNewOrderSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // Note 1 (D5, crisp bell tone)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(587.33, now);
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.3, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.3);

      // Note 2 (A5, high chime offset by 150ms)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(880, now + 0.15);
      gain2.gain.setValueAtTime(0, now + 0.15);
      gain2.gain.linearRampToValueAtTime(0.3, now + 0.17);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.55);
    } catch (e) {
      console.warn("Audio Context blocked or failed:", e);
    }
  };

  // Listen to storage events to sync across tabs (simulates real-time database)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "momo_orders" && e.newValue) {
        const newOrders = JSON.parse(e.newValue) as Order[];
        // If a new order is added compared to current state, play a notification chime!
        if (newOrders.length > orders.length) {
          playNewOrderSound();
        }
        setOrders(newOrders);
      }
      if (e.key === "momo_menuItems" && e.newValue) {
        setMenuItems(JSON.parse(e.newValue));
      }
      if (e.key === "momo_categories" && e.newValue) {
        setCategories(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [orders]);

  // Save states helper
  const saveCategories = (updated: Category[]) => {
    setCategories(updated);
    localStorage.setItem("momo_categories", JSON.stringify(updated));
  };

  const saveMenuItems = (updated: Item[]) => {
    setMenuItems(updated);
    localStorage.setItem("momo_menuItems", JSON.stringify(updated));
  };

  const saveOrders = (updated: Order[]) => {
    setOrders(updated);
    localStorage.setItem("momo_orders", JSON.stringify(updated));
  };

  // Cart Operations
  const addToCart = (item: Item, quantity: number = 1, notes?: string) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((c) => c.item.id === item.id);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += quantity;
        if (notes) updated[existingIdx].notes = notes;
        return updated;
      }
      return [...prevCart, { item, quantity, notes }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((c) => c.item.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((c) => (c.item.id === itemId ? { ...c, quantity } : c))
    );
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    const subtotal = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);
    const deliveryCharge = subtotal > 0 ? restaurant.deliveryFee : 0;
    const gstAmount = Math.round(subtotal * (restaurant.gstPercentage / 100) * 100) / 100;
    const grandTotal = subtotal + deliveryCharge + gstAmount;
    
    return { subtotal, deliveryCharge, gstAmount, grandTotal };
  };

  // Order Operations
  const placeOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    landmark?: string;
    pinCode: string;
    paymentMethod: "COD" | "UPI" | "CARD";
    specialInstructions?: string;
  }) => {
    const { subtotal, deliveryCharge, gstAmount, grandTotal } = getCartTotal();
    
    const orderItems: OrderItem[] = cart.map((c) => ({
      itemId: c.item.id,
      name: c.item.name,
      price: c.item.price,
      quantity: c.quantity,
      notes: c.notes,
      isVeg: c.item.isVeg,
    }));

    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const timeOrdered = new Date().toISOString();
    
    // Calculate expected delivery time (30 mins from now)
    const deliveryTime = new Date();
    deliveryTime.setMinutes(deliveryTime.getMinutes() + 30);
    const expectedDeliveryTime = deliveryTime.toISOString();

    const newOrder: Order = {
      id: newOrderId,
      restaurantId: restaurant.id,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      deliveryAddress: orderData.deliveryAddress,
      landmark: orderData.landmark,
      pinCode: orderData.pinCode,
      items: orderItems,
      subtotal,
      deliveryCharge,
      gstAmount,
      grandTotal,
      specialInstructions: orderData.specialInstructions,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === "COD" ? "PENDING" : "PAID",
      deliveryStatus: "PENDING",
      timeOrdered,
      expectedDeliveryTime,
    };

    const updatedOrders = [newOrder, ...orders];
    saveOrders(updatedOrders);
    clearCart();
    
    // Explicitly play chime in this tab too (local notification)
    playNewOrderSound();
    
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order["deliveryStatus"]) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        let paymentStatus = o.paymentStatus;
        if (status === "DELIVERED" && o.paymentMethod === "COD") {
          paymentStatus = "PAID";
        }
        return { ...o, deliveryStatus: status, paymentStatus };
      }
      return o;
    });
    saveOrders(updated);
  };

  // Menu CRUD Operations
  const addMenuItem = (item: Omit<Item, "id" | "popularityCount">) => {
    const newItem: Item = {
      ...item,
      id: `item-${Date.now()}`,
      popularityCount: 0,
    };
    const updated = [...menuItems, newItem];
    saveMenuItems(updated);
  };

  const updateMenuItem = (updatedItem: Item) => {
    const updated = menuItems.map((i) => (i.id === updatedItem.id ? updatedItem : i));
    saveMenuItems(updated);
  };

  const deleteMenuItem = (itemId: string) => {
    const updated = menuItems.filter((i) => i.id !== itemId);
    saveMenuItems(updated);
  };

  const addCategory = (category: Omit<Category, "id">) => {
    const newCategory: Category = {
      ...category,
      id: `cat-${Date.now()}`,
    };
    const updated = [...categories, newCategory];
    saveCategories(updated);
  };

  const resetToDefaults = () => {
    localStorage.removeItem("momo_categories");
    localStorage.removeItem("momo_menuItems");
    localStorage.removeItem("momo_orders");
    setCategories(mockCategories);
    setMenuItems(mockMenuItems);
    setOrders(mockOrders);
  };

  return (
    <StoreContext.Provider
      value={{
        restaurant,
        categories,
        menuItems,
        orders,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        placeOrder,
        updateOrderStatus,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        addCategory,
        playNewOrderSound,
        resetToDefaults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
