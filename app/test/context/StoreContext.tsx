"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Restaurant, Category, Item, Order, OrderItem } from "../types";
import { mockRestaurant, mockCategories, mockMenuItems, mockOrders } from "../data/mockData";

interface StoreContextProps {
  restaurant: Restaurant;
  categories: Category[];
  menuItems: Item[];
  orders: Order[];
  cart: { item: Item; quantity: number; notes?: string }[];
  isLoading: boolean;
  
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
  }) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order["deliveryStatus"]) => Promise<void>;
  
  // Menu/Category CRUD Actions
  addMenuItem: (item: Omit<Item, "id" | "popularityCount">) => Promise<void>;
  updateMenuItem: (item: Item) => Promise<void>;
  deleteMenuItem: (itemId: string) => Promise<void>;
  addCategory: (category: Omit<Category, "id">) => Promise<void>;
  
  // Audio Alert
  playNewOrderSound: () => void;
  resetToDefaults: () => Promise<void>;
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [restaurant] = useState<Restaurant>(mockRestaurant);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [menuItems, setMenuItems] = useState<Item[]>(mockMenuItems);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [cart, setCart] = useState<{ item: Item; quantity: number; notes?: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Play digital double-tone bell chime using Web Audio API (completely synthetic, no file assets needed)
  const playNewOrderSound = useCallback(() => {
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
  }, []);

  // Server Database synchronization (polls every 3 seconds for multi-device sync)
  const syncWithServer = useCallback(async (playChimeOnNew = true) => {
    try {
      const res = await fetch("/test/api");
      if (!res.ok) {
        setIsLoading(false);
        return;
      }
      const data = await res.json();

      setCategories(data.categories);
      setMenuItems(data.menuItems);

      setOrders((prevOrders) => {
        if (playChimeOnNew && data.orders.length > prevOrders.length) {
          const newOrders = data.orders.filter(
            (o: Order) => !prevOrders.some((po) => po.id === o.id)
          );
          if (newOrders.length > 0) {
            const hasNewPending = newOrders.some((o: Order) => o.deliveryStatus === "PENDING");
            if (hasNewPending) {
              playNewOrderSound();
            }
          }
        }
        return data.orders;
      });
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to sync with server:", err);
      setIsLoading(false);
    }
  }, [playNewOrderSound]);

  useEffect(() => {
    // Initial fetch wrapped to avoid synchronous setState inside mount effect
    const handle = requestAnimationFrame(() => {
      syncWithServer(false);
    });

    // Setup polling interval
    const interval = setInterval(() => {
      syncWithServer(true);
    }, 3000);

    return () => {
      cancelAnimationFrame(handle);
      clearInterval(interval);
    };
  }, [syncWithServer]);

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
  const placeOrder = async (orderData: {
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

    try {
      await fetch("/test/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "place_order", order: newOrder }),
      });
      await syncWithServer(false);
    } catch (err) {
      console.error("Failed to save order to server:", err);
    }

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: Order["deliveryStatus"]) => {
    try {
      await fetch("/test/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_status", orderId, status }),
      });
      await syncWithServer(false);
    } catch (err) {
      console.error("Failed to update status on server:", err);
    }
  };

  // Menu CRUD Operations
  const addMenuItem = async (item: Omit<Item, "id" | "popularityCount">) => {
    const newItem: Item = {
      ...item,
      id: `item-${Date.now()}`,
      popularityCount: 0,
    };
    try {
      await fetch("/test/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add_item", item: newItem }),
      });
      await syncWithServer(false);
    } catch (err) {
      console.error("Failed to add menu item on server:", err);
    }
  };

  const updateMenuItem = async (updatedItem: Item) => {
    try {
      await fetch("/test/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_item", item: updatedItem }),
      });
      await syncWithServer(false);
    } catch (err) {
      console.error("Failed to update menu item on server:", err);
    }
  };

  const deleteMenuItem = async (itemId: string) => {
    try {
      await fetch("/test/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_item", itemId }),
      });
      await syncWithServer(false);
    } catch (err) {
      console.error("Failed to delete menu item on server:", err);
    }
  };

  const addCategory = async (category: Omit<Category, "id">) => {
    const newCategory: Category = {
      ...category,
      id: `cat-${Date.now()}`,
    };
    try {
      await fetch("/test/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add_category", category: newCategory }),
      });
      await syncWithServer(false);
    } catch (err) {
      console.error("Failed to add category on server:", err);
    }
  };

  const resetToDefaults = async () => {
    try {
      await fetch("/test/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      await syncWithServer(false);
    } catch (err) {
      console.error("Failed to reset store on server:", err);
    }
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
        isLoading,
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
