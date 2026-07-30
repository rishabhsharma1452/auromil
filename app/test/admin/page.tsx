"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from "react";
import { useStore } from "../context/StoreContext";
import { Item } from "../types";
import Link from "next/link";

type TabId = "overview" | "orders" | "menu" | "customers" | "analytics";

export default function AdminDashboard() {
  const {
    restaurant,
    categories,
    menuItems,
    orders,
    updateOrderStatus,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    addCategory,
    playNewOrderSound,
    resetToDefaults
  } = useStore();

  const [activeTab, setActiveTab] = useState<TabId>("overview");
  
  // Real-time order notification state
  const [toast, setToast] = useState<{ id: string; message: string } | null>(null);
  const [orderLength, setOrderLength] = useState(orders.length);

  useEffect(() => {
    if (orders.length > orderLength) {
      const newOrder = orders[0]; // newest is first in state
      const handle = requestAnimationFrame(() => {
        setToast({
          id: newOrder.id,
          message: `New order ${newOrder.id} received from ${newOrder.customerName} (₹${newOrder.grandTotal})!`,
        });
        setOrderLength(orders.length);
      });
      playNewOrderSound();

      // Clear toast after 5s
      const timer = setTimeout(() => {
        requestAnimationFrame(() => setToast(null));
      }, 5000);
      
      return () => {
        cancelAnimationFrame(handle);
        clearTimeout(timer);
      };
    } else if (orders.length < orderLength) {
      const handle = requestAnimationFrame(() => {
        setOrderLength(orders.length);
      });
      return () => cancelAnimationFrame(handle);
    }
  }, [orders, orderLength, playNewOrderSound]);

  // Order Management Search & Filters
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("ALL");
  const [orderSortBy, setOrderSortBy] = useState<"time_desc" | "time_asc" | "total_desc" | "total_asc">("time_desc");

  // Menu Management forms state
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  // Add Item form fields
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemCat, setItemCat] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [itemIsVeg, setItemIsVeg] = useState(true);
  const [itemSpice, setItemSpice] = useState<0 | 1 | 2 | 3>(1);
  const [itemAvailable, setItemAvailable] = useState(true);
  const [itemPopular, setItemPopular] = useState(false);
  const [itemRecommended, setItemRecommended] = useState(false);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setIsClient(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  // Edit Item form fields (loaded when editing)
  const loadEditItem = (item: Item) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemPrice(item.price.toString());
    setItemDesc(item.description);
    setItemCat(item.categoryId);
    setItemImage(item.image);
    setItemIsVeg(item.isVeg);
    setItemSpice(item.spiceLevel);
    setItemAvailable(item.isAvailable);
    setItemPopular(item.isPopular);
    setItemRecommended(item.isRecommended);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName || !itemPrice || !itemCat) return;

    const data = {
      categoryId: itemCat,
      name: itemName,
      description: itemDesc,
      price: parseFloat(itemPrice),
      image: itemImage || "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80",
      isVeg: itemIsVeg,
      isNonVeg: !itemIsVeg,
      spiceLevel: itemSpice,
      isAvailable: itemAvailable,
      isPopular: itemPopular,
      isRecommended: itemRecommended,
    };

    if (editingItem) {
      updateMenuItem({ ...editingItem, ...data });
      setEditingItem(null);
    } else {
      addMenuItem(data);
      setIsAddingItem(false);
    }
    
    // Clear fields
    setItemName("");
    setItemPrice("");
    setItemDesc("");
    setItemCat("");
    setItemImage("");
    setItemIsVeg(true);
    setItemSpice(1);
    setItemAvailable(true);
    setItemPopular(false);
    setItemRecommended(false);
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory({
      name: newCatName.trim(),
      slug: newCatName.toLowerCase().replace(/\s+/g, "-"),
      sortOrder: categories.length + 1,
    });
    setNewCatName("");
  };

  // KPIs Calculations
  const todayOrders = orders.filter((o) => {
    const orderDate = new Date(o.timeOrdered);
    const today = new Date();
    return orderDate.toDateString() === today.toDateString();
  });
  
  const revenue = todayOrders
    .filter((o) => o.deliveryStatus === "DELIVERED")
    .reduce((sum, o) => sum + o.grandTotal, 0);

  const pendingCount = orders.filter((o) => ["PENDING", "ACCEPTED", "PREPARING", "OUT_FOR_DELIVERY"].includes(o.deliveryStatus)).length;
  
  const averageOrderValue = todayOrders.length > 0 
    ? Math.round((todayOrders.reduce((sum, o) => sum + o.grandTotal, 0) / todayOrders.length) * 100) / 100 
    : 0;

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerPhone.includes(orderSearch);
    
    const matchesStatus =
      orderStatusFilter === "ALL" ||
      (orderStatusFilter === "PENDING" && o.deliveryStatus === "PENDING") ||
      (orderStatusFilter === "PREPARING" && ["ACCEPTED", "PREPARING"].includes(o.deliveryStatus)) ||
      (orderStatusFilter === "DELIVERY" && o.deliveryStatus === "OUT_FOR_DELIVERY") ||
      (orderStatusFilter === "COMPLETED" && o.deliveryStatus === "DELIVERED") ||
      (orderStatusFilter === "CANCELLED" && ["CANCELLED", "REJECTED"].includes(o.deliveryStatus));
      
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    const timeA = new Date(a.timeOrdered).getTime();
    const timeB = new Date(b.timeOrdered).getTime();
    
    if (orderSortBy === "time_desc") return timeB - timeA;
    if (orderSortBy === "time_asc") return timeA - timeB;
    if (orderSortBy === "total_desc") return b.grandTotal - a.grandTotal;
    if (orderSortBy === "total_asc") return a.grandTotal - b.grandTotal;
    return 0;
  });

  // Unique customers aggregate
  const customerMap: Record<string, { phone: string; name: string; address: string; totalOrders: number; lifetimeSpend: number; lastOrder: string }> = {};
  orders.forEach((o) => {
    const key = o.customerPhone;
    if (!customerMap[key]) {
      customerMap[key] = {
        phone: o.customerPhone,
        name: o.customerName,
        address: o.deliveryAddress,
        totalOrders: 0,
        lifetimeSpend: 0,
        lastOrder: o.timeOrdered,
      };
    }
    customerMap[key].totalOrders += 1;
    customerMap[key].lifetimeSpend += o.grandTotal;
    if (new Date(o.timeOrdered) > new Date(customerMap[key].lastOrder)) {
      customerMap[key].lastOrder = o.timeOrdered;
    }
  });
  const customersList = Object.values(customerMap);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar Nav */}
      <aside className="w-full md:w-64 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col justify-between flex-shrink-0 z-20">
        <div className="space-y-8">
          <div>
            <Link href="/test" className="text-xl font-black tracking-tight text-white flex items-center gap-1.5 cursor-pointer">
              🥟 <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">MOMO</span> JUNC
            </Link>
            <span className="text-[10px] text-slate-500 font-bold tracking-widest mt-1 block">ADMIN CONSOLE</span>
          </div>

          <nav className="space-y-1">
            {[
              { id: "overview", label: "Overview", icon: "📊" },
              { id: "orders", label: "Live Orders", icon: "🛵", badge: pendingCount },
              { id: "menu", label: "Menu Editor", icon: "🍳" },
              { id: "customers", label: "Customers", icon: "👥" },
              { id: "analytics", label: "Analytics", icon: "📈" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as TabId);
                  setEditingItem(null);
                  setIsAddingItem(false);
                }}
                className={`w-full flex justify-between items-center px-4 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </span>
                {tab.badge && tab.badge > 0 ? (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    activeTab === tab.id ? "bg-slate-950 text-amber-500 animate-pulse" : "bg-amber-500 text-slate-950 animate-bounce"
                  }`}>
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-[10px] text-slate-500 space-y-1 md:block hidden">
          <p>© Momo Junction SaaS</p>
          <p>Local Store: {restaurant.name}</p>
          <p className="font-mono text-[9px]">Server status: ONLINE</p>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-grow p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full relative">
        
        {/* Floating Notification Toast */}
        {toast && (
          <div className="fixed top-6 right-6 z-50 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 p-4 rounded-2xl shadow-2xl border border-amber-400 flex items-center gap-3 animate-bounce">
            <span className="text-2xl">🔔</span>
            <div>
              <h4 className="font-black text-sm text-slate-950">New Order Placed!</h4>
              <p className="text-xs font-semibold text-slate-900/90">{toast.message}</p>
            </div>
            <button
              onClick={() => {
                setActiveTab("orders");
                setToast(null);
              }}
              className="px-2.5 py-1 bg-slate-950 text-amber-500 text-[10px] font-bold rounded-lg shadow cursor-pointer hover:bg-slate-900"
            >
              View
            </button>
          </div>
        )}

        {/* Dashboard Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight capitalize">{activeTab} Dashboard</h1>
            <p className="text-slate-400 text-xs mt-1">Review live store operations, edit menu details, and track performance.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={resetToDefaults}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-red-800 bg-red-950/20 text-red-400 hover:bg-red-950/40 transition flex items-center gap-1.5 cursor-pointer"
            >
              🔄 Reset Store Data
            </button>
            <button
              onClick={playNewOrderSound}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-900 transition flex items-center gap-1.5 cursor-pointer"
            >
              🔊 Test Chime
            </button>
            <Link
              href="/test"
              target="_blank"
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-850 hover:bg-slate-800 transition flex items-center gap-1.5 cursor-pointer border border-slate-700"
            >
              🌐 Open Customer App
            </Link>
          </div>
        </header>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* KPI Metrics row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Today's Orders", val: todayOrders.length, desc: "Total placed today", icon: "🛒", color: "text-blue-400" },
                { label: "Today's Revenue", val: `₹${revenue}`, desc: "Delivered totals", icon: "💰", color: "text-emerald-400" },
                { label: "Active Orders", val: pendingCount, desc: "Pending preparation", icon: "🛵", color: "text-amber-400" },
                { label: "Avg Order Value", val: `₹${averageOrderValue}`, desc: "Average bill size", icon: "📊", color: "text-purple-400" },
              ].map((kpi, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between min-h-24">
                  <div className="flex justify-between items-start">
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">{kpi.label}</span>
                    <span className="text-lg">{kpi.icon}</span>
                  </div>
                  <div className="mt-2">
                    <h3 className={`text-xl md:text-2xl font-black ${kpi.color}`}>{kpi.val}</h3>
                    <p className="text-[10px] text-slate-500 mt-0.5">{kpi.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Overview Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Live Orders Feed */}
              <div className="lg:col-span-2 bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="font-extrabold text-base flex justify-between items-center text-white">
                  <span>🛵 Live Active Feed</span>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                </h3>
                
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {orders.filter((o) => !["DELIVERED", "CANCELLED", "REJECTED"].includes(o.deliveryStatus)).length === 0 ? (
                    <div className="text-center py-16 text-slate-500 space-y-2">
                      <span className="text-3xl">📭</span>
                      <p className="text-xs font-bold">No active orders</p>
                      <p className="text-[10px]">All placed orders are prepared and delivered!</p>
                    </div>
                  ) : (
                    orders
                      .filter((o) => !["DELIVERED", "CANCELLED", "REJECTED"].includes(o.deliveryStatus))
                      .map((o) => (
                        <div key={o.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-extrabold text-white">{o.id}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[8px] font-black ${
                                o.deliveryStatus === "PENDING" ? "bg-amber-500/20 text-amber-500 animate-pulse" : "bg-blue-500/20 text-blue-400"
                              }`}>
                                {o.deliveryStatus}
                              </span>
                            </div>
                            <p className="text-[11px] font-bold text-slate-300">{o.customerName} • {o.items.reduce((s, i) => s + i.quantity, 0)} Items</p>
                            <p className="text-[10px] text-slate-500 line-clamp-1">{o.deliveryAddress}</p>
                          </div>
                          
                          <div className="text-right flex flex-col items-end gap-1.5">
                            <span className="font-bold text-xs text-amber-500">₹{o.grandTotal}</span>
                            <div className="flex gap-1">
                              {o.deliveryStatus === "PENDING" ? (
                                <>
                                  <button
                                    onClick={() => updateOrderStatus(o.id, "REJECTED")}
                                    className="px-2 py-1 bg-red-950 text-red-400 text-[9px] font-bold rounded hover:bg-red-900/40 cursor-pointer"
                                  >
                                    Reject
                                  </button>
                                  <button
                                    onClick={() => updateOrderStatus(o.id, "ACCEPTED")}
                                    className="px-2 py-1 bg-emerald-600 text-slate-950 text-[9px] font-black rounded hover:bg-emerald-500 cursor-pointer"
                                  >
                                    Accept
                                  </button>
                                </>
                              ) : o.deliveryStatus === "ACCEPTED" ? (
                                <button
                                  onClick={() => updateOrderStatus(o.id, "PREPARING")}
                                  className="px-3 py-1 bg-blue-600 text-white text-[9px] font-bold rounded hover:bg-blue-500 cursor-pointer"
                                >
                                  Cook
                                </button>
                              ) : o.deliveryStatus === "PREPARING" ? (
                                <button
                                  onClick={() => updateOrderStatus(o.id, "OUT_FOR_DELIVERY")}
                                  className="px-3 py-1 bg-amber-500 text-slate-950 text-[9px] font-bold rounded hover:bg-amber-400 cursor-pointer"
                                >
                                  Deliver
                                </button>
                              ) : o.deliveryStatus === "OUT_FOR_DELIVERY" ? (
                                <button
                                  onClick={() => updateOrderStatus(o.id, "DELIVERED")}
                                  className="px-3 py-1 bg-emerald-600 text-slate-950 text-[9px] font-bold rounded hover:bg-emerald-500 cursor-pointer"
                                >
                                  Complete
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>

              {/* Side Popular Items Widget */}
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="font-extrabold text-base text-white">🔥 Popular Items</h3>
                <div className="space-y-3">
                  {menuItems
                    .sort((a, b) => b.popularityCount - a.popularityCount)
                    .slice(0, 4)
                    .map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <div className="relative h-9 w-9 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="absolute inset-0 h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=120&auto=format&fit=crop&q=80";
                              }}
                            />
                          </div>
                          <div>
                            <p className="font-bold text-slate-200 line-clamp-1">{item.name}</p>
                            <span className="text-[9px] text-slate-500 uppercase font-semibold">{categories.find((c) => c.id === item.categoryId)?.name}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-200">₹{item.price}</p>
                          <span className="text-[9px] text-slate-400">{item.popularityCount} ordered</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Search, Filter & Sort Controls */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between gap-4">
              <input
                type="text"
                placeholder="Search Customer name, phone, or Order ID..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="px-4 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-200 flex-grow max-w-md"
              />

              <div className="flex flex-wrap gap-2">
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-400 focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PENDING">Pending</option>
                  <option value="PREPARING">Preparing/Cooking</option>
                  <option value="DELIVERY">Out for Delivery</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>

                <select
                  value={orderSortBy}
                  onChange={(e) => setOrderSortBy(e.target.value as "time_desc" | "time_asc" | "total_desc" | "total_asc")}
                  className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-400 focus:outline-none"
                >
                  <option value="time_desc">Newest First</option>
                  <option value="time_asc">Oldest First</option>
                  <option value="total_desc">Highest Price</option>
                  <option value="total_asc">Lowest Price</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900/50 border-b border-slate-850 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Items Ordered</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Pay Method</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((o) => (
                      <tr key={o.id} className="border-b border-slate-850 hover:bg-slate-900/25 transition">
                        <td className="p-4 font-mono font-black text-white">{o.id}</td>
                        <td className="p-4 space-y-0.5">
                          <p className="font-extrabold text-slate-200">{o.customerName}</p>
                          <p className="text-slate-400 font-semibold">{o.customerPhone}</p>
                          <p className="text-[10px] text-slate-500 line-clamp-1 max-w-[180px]" title={o.deliveryAddress}>{o.deliveryAddress}</p>
                        </td>
                        <td className="p-4 font-medium text-slate-300">
                          {o.items.map((item, idx) => (
                            <div key={idx}>
                              {item.name} <span className="text-slate-500">x{item.quantity}</span>
                            </div>
                          ))}
                        </td>
                        <td className="p-4 font-extrabold text-amber-500">₹{o.grandTotal}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            o.paymentStatus === "PAID" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                          }`}>
                            {o.paymentMethod} • {o.paymentStatus}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            ["CANCELLED", "REJECTED"].includes(o.deliveryStatus)
                              ? "bg-red-500/10 text-red-400"
                              : o.deliveryStatus === "DELIVERED"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-amber-500/10 text-amber-400"
                          }`}>
                            {o.deliveryStatus}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1.5 justify-center flex-wrap max-w-[140px] mx-auto">
                            {o.deliveryStatus === "PENDING" && (
                              <>
                                <button
                                  onClick={() => updateOrderStatus(o.id, "ACCEPTED")}
                                  className="px-2 py-0.5 bg-emerald-600 text-slate-950 font-black rounded text-[10px] cursor-pointer hover:bg-emerald-500"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => updateOrderStatus(o.id, "REJECTED")}
                                  className="px-2 py-0.5 bg-red-950 text-red-400 font-bold rounded text-[10px] cursor-pointer hover:bg-red-900/40"
                                >
                                  Reject
                                </button>
                              </>
                            )}

                            {o.deliveryStatus === "ACCEPTED" && (
                              <button
                                onClick={() => updateOrderStatus(o.id, "PREPARING")}
                                className="px-2.5 py-0.5 bg-blue-600 text-white font-bold rounded text-[10px] cursor-pointer hover:bg-blue-500"
                              >
                                Cook
                              </button>
                            )}

                            {o.deliveryStatus === "PREPARING" && (
                              <button
                                onClick={() => updateOrderStatus(o.id, "OUT_FOR_DELIVERY")}
                                className="px-2.5 py-0.5 bg-amber-500 text-slate-950 font-bold rounded text-[10px] cursor-pointer hover:bg-amber-400"
                              >
                                Dispatch
                              </button>
                            )}

                            {o.deliveryStatus === "OUT_FOR_DELIVERY" && (
                              <button
                                onClick={() => updateOrderStatus(o.id, "DELIVERED")}
                                className="px-2.5 py-0.5 bg-emerald-600 text-slate-950 font-bold rounded text-[10px] cursor-pointer hover:bg-emerald-500"
                              >
                                Deliver
                              </button>
                            )}

                            {!["DELIVERED", "CANCELLED", "REJECTED"].includes(o.deliveryStatus) && (
                              <button
                                onClick={() => updateOrderStatus(o.id, "CANCELLED")}
                                className="px-2 py-0.5 bg-slate-800 text-slate-400 font-bold rounded text-[10px] cursor-pointer hover:bg-slate-700"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredOrders.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-500">
                          No orders matched current query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MENU MANAGEMENT */}
        {activeTab === "menu" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
            
            {/* Left side: Categories & Add Form (ColSpan 1) */}
            <div className="space-y-6">
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="font-extrabold text-sm text-white">Categories</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {categories.map((cat) => (
                    <div key={cat.id} className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-xs flex justify-between items-center text-slate-300">
                      <span className="font-bold">{cat.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">ID: {cat.id}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddCategorySubmit} className="space-y-2 border-t border-slate-900 pt-4">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Add New Category</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Category Name"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      className="flex-grow px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-amber-500 text-slate-950 font-black text-xs rounded-xl hover:bg-amber-400 cursor-pointer shadow"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>

              {/* Add / Edit Form */}
              {(isAddingItem || editingItem) && (
                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h3 className="font-extrabold text-sm text-white">
                    {editingItem ? `Edit Item: ${editingItem.name}` : "Add Menu Item"}
                  </h3>
                  
                  <form onSubmit={handleSaveItem} className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500">ITEM NAME</label>
                      <input
                        type="text"
                        placeholder="e.g. Tandoori Paneer Momo"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500">PRICE (₹)</label>
                        <input
                          type="number"
                          placeholder="e.g. 150"
                          value={itemPrice}
                          onChange={(e) => setItemPrice(e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500">CATEGORY</label>
                        <select
                          value={itemCat}
                          onChange={(e) => setItemCat(e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 focus:outline-none"
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500">DESCRIPTION</label>
                      <textarea
                        placeholder="Brief item ingredients and serving size details..."
                        value={itemDesc}
                        onChange={(e) => setItemDesc(e.target.value)}
                        rows={2}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500">IMAGE URL</label>
                      <input
                        type="text"
                        placeholder="Unsplash image URL"
                        value={itemImage}
                        onChange={(e) => setItemImage(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
                      />
                    </div>

                    {/* Food settings (Veg/NonVeg, Spice) */}
                    <div className="grid grid-cols-2 gap-3 border-t border-slate-900 pt-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isVegCheck"
                          checked={itemIsVeg}
                          onChange={(e) => setItemIsVeg(e.target.checked)}
                          className="h-4 w-4 bg-slate-900 border-slate-800 text-amber-500 rounded focus:ring-0"
                        />
                        <label htmlFor="isVegCheck" className="text-[10px] font-bold text-slate-400">IS VEGETARIAN</label>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[9px] font-bold text-slate-500 uppercase">Spice Level (0-3)</label>
                        <input
                          type="range"
                          min="0"
                          max="3"
                          value={itemSpice}
                          onChange={(e) => setItemSpice(parseInt(e.target.value) as 0 | 1 | 2 | 3)}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 border-t border-slate-900 pt-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isAvailCheck"
                          checked={itemAvailable}
                          onChange={(e) => setItemAvailable(e.target.checked)}
                          className="h-4 w-4 bg-slate-900 border-slate-800 text-amber-500 rounded focus:ring-0"
                        />
                        <label htmlFor="isAvailCheck" className="text-[10px] font-bold text-slate-400">IN STOCK</label>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isPopCheck"
                          checked={itemPopular}
                          onChange={(e) => setItemPopular(e.target.checked)}
                          className="h-4 w-4 bg-slate-900 border-slate-800 text-amber-500 rounded focus:ring-0"
                        />
                        <label htmlFor="isPopCheck" className="text-[10px] font-bold text-slate-400">POPULAR BADGE</label>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingItem(null);
                          setIsAddingItem(false);
                        }}
                        className="w-1/2 py-2 border border-slate-800 bg-slate-900 hover:bg-slate-850 text-slate-400 rounded-xl transition font-bold cursor-pointer text-center"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-1/2 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition cursor-pointer shadow text-center"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Right side: Items grid list (ColSpan 2) */}
            <div className="lg:col-span-2 bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-base text-white">Menu Catalog</h3>
                {!isAddingItem && !editingItem && (
                  <button
                    onClick={() => setIsAddingItem(true)}
                    className="px-3 py-1.5 bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow cursor-pointer hover:bg-amber-400 flex items-center gap-1"
                  >
                    ➕ Add Item
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
                {menuItems.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex gap-3 relative justify-between">
                    <div className="flex gap-3">
                      <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="absolute inset-0 h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=120&auto=format&fit=crop&q=80";
                          }}
                        />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className={item.isVeg ? "text-emerald-500 text-xs" : "text-red-500 text-xs"}>
                            {item.isVeg ? "🟢" : "🔴"}
                          </span>
                          <h4 className="font-extrabold text-xs text-white line-clamp-1">{item.name}</h4>
                        </div>
                        <p className="text-[10px] text-amber-500 font-bold">₹{item.price}</p>
                        <p className="text-[9px] text-slate-500">Category: {categories.find((c) => c.id === item.categoryId)?.name || "Unknown"}</p>
                        <p className="text-[9px] text-slate-500 font-mono">Stock: <b className={item.isAvailable ? "text-emerald-500" : "text-red-500"}>{item.isAvailable ? "IN STOCK" : "OUT"}</b></p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-end">
                      <button
                        onClick={() => {
                          const updatedItem = { ...item, isAvailable: !item.isAvailable };
                          updateMenuItem(updatedItem);
                        }}
                        className={`px-2 py-0.5 rounded text-[8px] font-black cursor-pointer shadow-sm ${
                          item.isAvailable
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-800"
                            : "bg-red-500/10 text-red-400 border border-red-800"
                        }`}
                      >
                        {item.isAvailable ? "Disable" : "Enable"}
                      </button>

                      <div className="flex gap-1.5 mt-2">
                        <button
                          onClick={() => deleteMenuItem(item.id)}
                          className="h-6 w-6 rounded bg-slate-800 hover:bg-red-950 text-red-400 flex items-center justify-center text-xs font-bold transition cursor-pointer"
                          title="Delete Item"
                        >
                          🗑️
                        </button>
                        <button
                          onClick={() => loadEditItem(item)}
                          className="h-6 w-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center text-xs font-bold transition cursor-pointer"
                          title="Edit Item"
                        >
                          ✏️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOMERS */}
        {activeTab === "customers" && (
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden animate-fadeIn">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-850 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Contact Phone</th>
                    <th className="p-4">Recent Address</th>
                    <th className="p-4 text-center">Orders Count</th>
                    <th className="p-4 text-right">Lifetime Spend</th>
                    <th className="p-4 text-right">Last Ordered</th>
                  </tr>
                </thead>
                <tbody>
                  {customersList.map((cust, idx) => (
                    <tr key={idx} className="border-b border-slate-850 hover:bg-slate-900/25 transition">
                      <td className="p-4 font-extrabold text-slate-200">{cust.name}</td>
                      <td className="p-4 font-mono font-bold text-slate-400">{cust.phone}</td>
                      <td className="p-4 text-slate-400 line-clamp-1 max-w-[200px]" title={cust.address}>
                        {cust.address}
                      </td>
                      <td className="p-4 text-center font-bold text-slate-300">{cust.totalOrders}</td>
                      <td className="p-4 text-right font-black text-amber-500">₹{cust.lifetimeSpend}</td>
                      <td className="p-4 text-right text-slate-500">
                        {new Date(cust.lastOrder).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {customersList.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500">
                        No customer registrations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Daily Sales / Revenue Trend Chart (SVG Line Chart) */}
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div>
                  <h3 className="font-extrabold text-sm text-white">Daily Sales Trend</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Hourly revenue chart for today&apos;s orders.</p>
                </div>
                
                {/* Custom SVG line graph */}
                <div className="relative h-64 w-full">
                  <svg className="w-full h-full text-slate-650" viewBox="0 0 500 220" fill="none">
                    {/* Grid lines */}
                    <line x1="40" y1="20" x2="480" y2="20" stroke="#1e293b" strokeDasharray="3 3" />
                    <line x1="40" y1="70" x2="480" y2="70" stroke="#1e293b" strokeDasharray="3 3" />
                    <line x1="40" y1="120" x2="480" y2="120" stroke="#1e293b" strokeDasharray="3 3" />
                    <line x1="40" y1="170" x2="480" y2="170" stroke="#1e293b" strokeDasharray="3 3" />
                    
                    {/* Axis lines */}
                    <line x1="40" y1="170" x2="480" y2="170" stroke="#475569" strokeWidth="1.5" />
                    
                    {/* Trend Line (Simulated hourly data) */}
                    {/* 10AM (100), 12PM (450), 2PM (600), 4PM (200), 6PM (800), 8PM (1400), 10PM (500) */}
                    <path
                      d="M 40 165 L 113 140 L 186 110 L 259 155 L 332 90 L 405 25 L 478 115"
                      stroke="#f59e0b"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Gradient Area under line */}
                    <path
                      d="M 40 165 L 113 140 L 186 110 L 259 155 L 332 90 L 405 25 L 478 115 L 478 170 L 40 170 Z"
                      fill="url(#salesGrad)"
                      opacity="0.1"
                    />
                    
                    <defs>
                      <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Data Points */}
                    <circle cx="40" cy="165" r="5" fill="#f59e0b" />
                    <circle cx="113" cy="140" r="5" fill="#f59e0b" />
                    <circle cx="186" cy="110" r="5" fill="#f59e0b" />
                    <circle cx="259" cy="155" r="5" fill="#f59e0b" />
                    <circle cx="332" cy="90" r="5" fill="#f59e0b" />
                    <circle cx="405" cy="25" r="5" fill="#f59e0b" className="animate-ping" />
                    <circle cx="405" cy="25" r="5" fill="#f59e0b" />
                    <circle cx="478" cy="115" r="5" fill="#f59e0b" />
                    
                    {/* Y Axis Labels */}
                    <text x="5" y="24" fill="#64748b" className="text-[10px] font-bold font-mono">₹1.5k</text>
                    <text x="5" y="74" fill="#64748b" className="text-[10px] font-bold font-mono">₹1.0k</text>
                    <text x="10" y="124" fill="#64748b" className="text-[10px] font-bold font-mono">₹500</text>
                    <text x="25" y="174" fill="#64748b" className="text-[10px] font-bold font-mono">₹0</text>

                    {/* X Axis Labels */}
                    <text x="32" y="192" fill="#64748b" className="text-[10px] font-extrabold">10am</text>
                    <text x="105" y="192" fill="#64748b" className="text-[10px] font-extrabold">12pm</text>
                    <text x="178" y="192" fill="#64748b" className="text-[10px] font-extrabold">2pm</text>
                    <text x="251" y="192" fill="#64748b" className="text-[10px] font-extrabold">4pm</text>
                    <text x="324" y="192" fill="#64748b" className="text-[10px] font-extrabold">6pm</text>
                    <text x="397" y="192" fill="#64748b" className="text-[10px] font-extrabold">8pm</text>
                    <text x="465" y="192" fill="#64748b" className="text-[10px] font-extrabold">10pm</text>
                  </svg>
                </div>
              </div>

              {/* Peak Ordering Times (SVG Column Chart) */}
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                <div>
                  <h3 className="font-extrabold text-sm text-white">Peak Ordering Times</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Quantity of momo plates ordered by hours.</p>
                </div>

                <div className="relative h-64 w-full flex items-end justify-between px-6 pb-6 pt-4">
                  {/* Grid background */}
                  <div className="absolute inset-x-0 bottom-6 top-4 border-b border-slate-800 border-dashed flex flex-col justify-between pointer-events-none">
                    <div className="border-b border-slate-800 border-dashed w-full h-0" />
                    <div className="border-b border-slate-800 border-dashed w-full h-0" />
                    <div className="border-b border-slate-800 border-dashed w-full h-0" />
                  </div>

                  {/* Columns */}
                  {[
                    { label: "11am-2pm", height: "h-2/5", val: "18 plates" },
                    { label: "2pm-5pm", height: "h-1/5", val: "8 plates" },
                    { label: "5pm-8pm", height: "h-5/6", val: "42 plates" },
                    { label: "8pm-11pm", height: "h-full", val: "56 plates", peak: true },
                  ].map((col, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 z-10 w-16 group relative">
                      {/* Tooltip on hover */}
                      <span className="absolute -top-6 bg-slate-900 border border-slate-800 text-white font-bold px-2 py-0.5 rounded text-[9px] opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-xl">
                        {col.val}
                      </span>
                      
                      {/* Bar container */}
                      <div className={`w-10 ${col.height} rounded-t-xl transition-all duration-300 ${
                        col.peak 
                          ? "bg-gradient-to-t from-orange-500 to-amber-400 group-hover:brightness-110 shadow-lg shadow-orange-500/10"
                          : "bg-slate-800 group-hover:bg-slate-700"
                      }`} />
                      
                      <span className="text-[10px] font-extrabold text-slate-500">{col.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Selling Categories & Repeat rate place holders */}
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 md:col-span-2 space-y-4">
                <h3 className="font-extrabold text-sm text-white">Advanced Business Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-850 space-y-2">
                    <span className="text-slate-500 font-bold text-[10px] uppercase">Customer Repeat Rate</span>
                    <div className="flex items-center gap-2 mt-1">
                      <h4 className="text-xl font-black text-emerald-400">42.5%</h4>
                      <span className="text-[9px] bg-emerald-500/15 text-emerald-400 px-1.5 py-0.5 rounded font-black">HIGH</span>
                    </div>
                    <p className="text-[9px] text-slate-500">Simulated placeholder metric based on phone matching logs.</p>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-850 space-y-2">
                    <span className="text-slate-500 font-bold text-[10px] uppercase">Category Heatmap</span>
                    <div className="flex items-center gap-2 mt-1">
                      <h4 className="text-xl font-black text-white">Chicken Momos</h4>
                      <span className="text-[9px] bg-orange-500/15 text-orange-400 px-1.5 py-0.5 rounded font-black">TOP</span>
                    </div>
                    <p className="text-[9px] text-slate-500">Chicken-based items comprise 48% of total gross sales.</p>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-850 space-y-2">
                    <span className="text-slate-500 font-bold text-[10px] uppercase">Avg Prep & Delivery Time</span>
                    <div className="flex items-center gap-2 mt-1">
                      <h4 className="text-xl font-black text-white">28.4 mins</h4>
                      <span className="text-[9px] bg-blue-500/15 text-blue-400 px-1.5 py-0.5 rounded font-black">FAST</span>
                    </div>
                    <p className="text-[9px] text-slate-500">Estimated duration between acceptance and delivery.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
