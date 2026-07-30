"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from "react";
import { useStore } from "./context/StoreContext";
import Link from "next/link";

export default function CustomerOrderingPage() {
  const {
    restaurant,
    categories,
    menuItems,
    cart,
    addToCart,
    updateCartQuantity,
    getCartTotal,
  } = useStore();

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [nonVegOnly, setNonVegOnly] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState<string>("");

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

  // Filter items
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.categoryId === selectedCategory;
    const matchesVeg = !vegOnly || item.isVeg;
    const matchesNonVeg = !nonVegOnly || item.isNonVeg;
    return matchesSearch && matchesCategory && matchesVeg && matchesNonVeg;
  });

  const recommendedItems = menuItems.filter((item) => item.isRecommended && item.isAvailable);

  const { subtotal, deliveryCharge, gstAmount, grandTotal } = getCartTotal();

  const applyPromo = () => {
    setPromoError("");
    const code = promoCode.trim().toUpperCase();
    if (code === "MOMOLOVE") {
      if (subtotal >= 299) {
        const discount = Math.min(Math.round(subtotal * 0.15 * 100) / 100, 100);
        setAppliedPromo({ code, discount });
      } else {
        setPromoError("Minimum order value for MOMOLOVE is ₹299");
      }
    } else if (code === "FIRST50") {
      if (subtotal >= 199) {
        setAppliedPromo({ code, discount: 50 });
      } else {
        setPromoError("Minimum order value for FIRST50 is ₹199");
      }
    } else {
      setPromoError("Invalid promo code");
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
  };

  const finalTotal = appliedPromo ? Math.max(0, grandTotal - appliedPromo.discount) : grandTotal;

  // Render spice index helper
  const renderSpice = (level: number) => {
    return (
      <div className="flex gap-0.5 text-red-500 font-bold text-xs" title={`Spice Level: ${level}/3`}>
        {Array.from({ length: level }).map((_, i) => (
          <span key={i}>🌶️</span>
        ))}
        {level === 0 && <span className="text-slate-400 font-normal">Mild</span>}
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"}`}>
      {/* Top Banner & Navbar */}
      <header className="relative h-64 md:h-80 w-full overflow-hidden">
        <img
          src={restaurant.bannerImage}
          alt={restaurant.name}
          className="absolute inset-0 h-full w-full object-cover brightness-[0.4]"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1625220194771-7ebedd0b4d11?w=1200&auto=format&fit=crop&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/20" />
        
        {/* Local Navbar Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 md:px-8 flex justify-between items-center z-10 max-w-7xl mx-auto">
          <Link href="/test" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
              🥟 <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">MOMO</span> JUNCTION
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition cursor-pointer"
              aria-label="Toggle Theme"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <Link
              href="/test/admin"
              className="px-4 py-2 text-xs font-semibold rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 transition cursor-pointer shadow-lg"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* Restaurant Header Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-4 text-white">
          <div className="flex gap-4 items-center">
            <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl flex-shrink-0 bg-white">
              <img
                src={restaurant.logo}
                alt="Logo"
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=120&auto=format&fit=crop&q=80";
                }}
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">{restaurant.name}</h1>
              <p className="text-white/80 text-xs md:text-sm mt-1 max-w-xl line-clamp-2 md:line-clamp-none">{restaurant.description}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 text-xs md:text-sm w-full md:w-auto">
            <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
              <span>🕒</span> {restaurant.openingHours}
            </div>
            <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
              <span>🚀</span> {restaurant.deliveryTimeEstimate}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Menu & Filters Panel (ColSpan 2) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Buttons & Contact */}
          <div className={`p-4 rounded-2xl border flex flex-wrap justify-between items-center gap-4 ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} shadow-sm`}>
            <div>
              <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Need help placing your order?</p>
              <h3 className="font-bold text-sm">Direct Contact Channels</h3>
            </div>
            <div className="flex gap-2">
              <a
                href={`tel:${restaurant.phone.replace(/\s+/g, "")}`}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition flex items-center gap-1.5 shadow"
              >
                📞 Call Shop
              </a>
              <a
                href={`https://wa.me/${restaurant.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition flex items-center gap-1.5 shadow"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>

          {/* Popular and Recommended Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-black tracking-tight flex items-center gap-1.5">
              🔥 Recommended Favorites
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedItems.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border flex gap-3 relative overflow-hidden transition-all duration-300 hover:shadow-md ${
                    darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                  }`}
                >
                  <div className="absolute top-2 left-2 z-10">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white shadow ${
                      item.isVeg ? "bg-emerald-600" : "bg-red-600"
                    }`}>
                      {item.isVeg ? "Veg" : "Non-Veg"}
                    </span>
                  </div>
                  <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80";
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <h4 className="font-extrabold text-sm md:text-base leading-tight">{item.name}</h4>
                      <p className={`text-[11px] leading-snug mt-1 line-clamp-2 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                        {item.description}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex flex-col">
                        <span className="font-black text-sm md:text-base text-amber-500">₹{item.price}</span>
                        {renderSpice(item.spiceLevel)}
                      </div>
                      
                      {/* Quantity or Add button */}
                      {cart.some((c) => c.item.id === item.id) ? (
                        <div className="flex items-center gap-2 bg-amber-500 text-slate-950 font-bold px-2 py-1 rounded-xl shadow-md text-xs">
                          <button
                            onClick={() => updateCartQuantity(item.id, cart.find((c) => c.item.id === item.id)!.quantity - 1)}
                            className="h-5 w-5 flex items-center justify-center hover:bg-amber-400 rounded cursor-pointer"
                          >
                            -
                          </button>
                          <span>{cart.find((c) => c.item.id === item.id)!.quantity}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="h-5 w-5 flex items-center justify-center hover:bg-amber-400 rounded cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          className="px-3.5 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow hover:bg-amber-400 transition cursor-pointer"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search, Filters, & Menu Categories */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search Bar */}
              <div className="relative flex-grow">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">🔍</span>
                <input
                  type="text"
                  placeholder="Search momos, drinks, sides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    darkMode
                      ? "bg-slate-900 border-slate-800 focus:bg-slate-850"
                      : "bg-white border-slate-200 focus:bg-slate-50"
                  }`}
                />
              </div>

              {/* Veg / Non-Veg Filters */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setVegOnly(!vegOnly);
                    setNonVegOnly(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1 cursor-pointer ${
                    vegOnly
                      ? "bg-emerald-600 text-white border-emerald-600 shadow"
                      : darkMode
                      ? "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  🟢 Veg Only
                </button>
                <button
                  onClick={() => {
                    setNonVegOnly(!nonVegOnly);
                    setVegOnly(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1 cursor-pointer ${
                    nonVegOnly
                      ? "bg-red-600 text-white border-red-600 shadow"
                      : darkMode
                      ? "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  🔴 Non-Veg Only
                </button>
              </div>
            </div>

            {/* Categories Navigation Carousel */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-amber-500 text-slate-950 shadow"
                    : darkMode
                    ? "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                All Menu
              </button>
              {categories
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-amber-500 text-slate-950 shadow"
                        : darkMode
                        ? "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md ${
                  darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                } ${!item.isAvailable ? "opacity-60" : ""}`}
              >
                <div className="relative h-44 w-full bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold text-white shadow ${
                      item.isVeg ? "bg-emerald-600" : "bg-red-600"
                    }`}>
                      {item.isVeg ? "VEG" : "NON-VEG"}
                    </span>
                    {item.isPopular && (
                      <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500 text-slate-950 shadow">
                        POPULAR
                      </span>
                    )}
                  </div>
                  {!item.isAvailable && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
                      <span className="bg-red-600 text-white font-black px-4 py-1.5 rounded-lg text-xs tracking-wider">
                        OUT OF STOCK
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-extrabold text-base md:text-lg tracking-tight leading-snug">{item.name}</h3>
                      <span className="font-black text-amber-500 text-lg">₹{item.price}</span>
                    </div>
                    <p className={`text-xs leading-normal line-clamp-3 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                      {item.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-dashed border-slate-250 dark:border-slate-800">
                    {renderSpice(item.spiceLevel)}

                    {item.isAvailable && (
                      <>
                        {cart.some((c) => c.item.id === item.id) ? (
                          <div className="flex items-center gap-3 bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-xl shadow-md text-sm">
                            <button
                              onClick={() => updateCartQuantity(item.id, cart.find((c) => c.item.id === item.id)!.quantity - 1)}
                              className="h-5 w-5 flex items-center justify-center hover:bg-amber-400 rounded cursor-pointer"
                            >
                              -
                            </button>
                            <span>{cart.find((c) => c.item.id === item.id)!.quantity}</span>
                            <button
                              onClick={() => addToCart(item)}
                              className="h-5 w-5 flex items-center justify-center hover:bg-amber-400 rounded cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item)}
                            className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow hover:bg-amber-400 transition cursor-pointer"
                          >
                            Add to Cart
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className={`text-center py-12 rounded-3xl border ${darkMode ? "border-slate-800 bg-slate-900/50" : "border-slate-200 bg-white"}`}>
              <span className="text-4xl">🔍</span>
              <h3 className="font-extrabold text-base mt-3">No momos found</h3>
              <p className={`text-xs mt-1 max-w-sm mx-auto ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                Try adjusting your keyword search or category filters.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar Widgets & Mini-cart (ColSpan 1) */}
        <div className="space-y-6">
          
          {/* Shop Location & Map */}
          <div className={`p-4 rounded-2xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} shadow-sm space-y-3`}>
            <h3 className="font-extrabold text-sm flex items-center gap-1.5">
              📍 Location Details
            </h3>
            {/* Map Placeholder Graphic */}
            <div className="relative h-44 w-full rounded-xl overflow-hidden bg-sky-100 border border-slate-200 dark:border-slate-850 flex flex-col justify-end">
              {/* Decorative map graphics using raw Tailwind classes */}
              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800">
                <div className="absolute top-1/3 left-0 right-0 h-2.5 bg-white/40 dark:bg-white/5 transform -rotate-12" />
                <div className="absolute top-0 bottom-0 left-1/3 w-2.5 bg-white/40 dark:bg-white/5 transform rotate-45" />
                <div className="absolute bottom-1/4 left-0 right-0 h-4 bg-white/40 dark:bg-white/5 transform rotate-6" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <span className="text-3xl animate-bounce">📍</span>
                  <span className="text-[10px] font-black bg-slate-950 text-white px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap">Momo Junction</span>
                </div>
              </div>
              <div className="relative p-2.5 bg-slate-950/80 backdrop-blur-md text-white flex justify-between items-center text-xs">
                <span className="line-clamp-1 font-semibold text-white/90">Manipal Tibetan Colony</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white font-bold px-2.5 py-1 rounded hover:bg-blue-500 transition whitespace-nowrap"
                >
                  Directions
                </a>
              </div>
            </div>
            <div className="text-xs space-y-1">
              <p className="font-semibold">{restaurant.name}</p>
              <p className={`${darkMode ? "text-slate-400" : "text-slate-500"}`}>{restaurant.address}</p>
            </div>
          </div>

          {/* Sticky Mini Cart */}
          <div className={`p-4 rounded-2xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} shadow-sm sticky top-6`}>
            <h3 className="font-extrabold text-base flex justify-between items-center">
              <span>🛒 Shopping Bag</span>
              <span className="bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full text-xs font-bold">{cart.reduce((s, c) => s + c.quantity, 0)}</span>
            </h3>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-3xl">🥟</span>
                <p className={`text-xs mt-2 font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Your cart is currently empty.</p>
                <p className={`text-[10px] mt-0.5 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>Add yummy momos to start ordering!</p>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {/* Scrollable Items list */}
                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {cart.map((cartItem) => (
                    <div key={cartItem.item.id} className="flex justify-between items-center gap-2 text-xs">
                      <div className="flex-grow">
                        <div className="flex items-center gap-1.5">
                          <span className={cartItem.item.isVeg ? "text-emerald-500" : "text-red-500"}>
                            {cartItem.item.isVeg ? "🟢" : "🔴"}
                          </span>
                          <span className="font-bold line-clamp-1">{cartItem.item.name}</span>
                        </div>
                        <span className={`text-[10px] ${darkMode ? "text-slate-400" : "text-slate-500"}`}>₹{cartItem.item.price} each</span>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                        <button
                          onClick={() => updateCartQuantity(cartItem.item.id, cartItem.quantity - 1)}
                          className="h-4 w-4 flex items-center justify-center bg-white dark:bg-slate-700 rounded hover:bg-slate-200 text-xs font-extrabold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-bold w-4 text-center">{cartItem.quantity}</span>
                        <button
                          onClick={() => addToCart(cartItem.item)}
                          className="h-4 w-4 flex items-center justify-center bg-white dark:bg-slate-700 rounded hover:bg-slate-200 text-xs font-extrabold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal summary */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className={darkMode ? "text-slate-400" : "text-slate-500"}>Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>
                  
                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span>Promo Discount ({appliedPromo.code})</span>
                      <span>-₹{appliedPromo.discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className={darkMode ? "text-slate-400" : "text-slate-500"}>Delivery Fee</span>
                    <span className="font-semibold">₹{deliveryCharge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={darkMode ? "text-slate-400" : "text-slate-500"}>GST (5%)</span>
                    <span className="font-semibold">₹{gstAmount}</span>
                  </div>
                  <div className="flex justify-between font-black text-sm pt-2 border-t border-slate-200 dark:border-slate-800 text-amber-500">
                    <span>Grand Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="space-y-1">
                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 p-2 rounded-xl text-xs border border-emerald-200 dark:border-emerald-900">
                      <span>🎉 Code <b>{appliedPromo.code}</b> applied!</span>
                      <button onClick={removePromo} className="text-red-500 hover:text-red-600 font-extrabold cursor-pointer">✕</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="MOMOLOVE / FIRST50"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className={`flex-grow px-3 py-1.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                          darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"
                        }`}
                      />
                      <button
                        onClick={applyPromo}
                        className="px-3 py-1.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs rounded-xl hover:opacity-90 transition cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {promoError && <p className="text-red-500 text-[10px]">{promoError}</p>}
                </div>

                {/* Direct Checkout Button */}
                <Link
                  href="/test/checkout"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-center rounded-xl transition block shadow-lg text-sm cursor-pointer"
                >
                  Proceed to Checkout 🚀
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Cart Button (Mobile view popup indicator) */}
      {cart.length > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 lg:hidden flex items-center gap-2 px-5 py-3.5 rounded-full bg-amber-500 text-slate-950 font-black shadow-2xl hover:scale-105 active:scale-95 transition cursor-pointer border border-amber-400"
        >
          <span>🛒</span>
          <span>Cart • {cart.reduce((s, c) => s + c.quantity, 0)} Items</span>
          <span className="bg-slate-950 text-amber-500 px-2 py-0.5 rounded-full text-xs font-bold">₹{finalTotal}</span>
        </button>
      )}

      {/* Slide-out Cart Drawer for Mobile/Tablet */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity" onClick={() => setCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className={`w-screen max-w-md ${darkMode ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"} shadow-xl flex flex-col justify-between`}>
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-extrabold text-base flex items-center gap-2">
                  <span>🛒 Shopping Cart</span>
                  <span className="bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full text-xs font-bold">
                    {cart.reduce((s, c) => s + c.quantity, 0)}
                  </span>
                </h3>
                <button onClick={() => setCartOpen(false)} className="text-xl hover:opacity-75 cursor-pointer">✕</button>
              </div>

              {/* Scrollable Cart Items */}
              <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <span className="text-4xl">🥟</span>
                    <p className="text-sm mt-3 font-semibold">Your cart is empty</p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="mt-4 px-4 py-2 bg-amber-500 text-slate-950 rounded-xl font-bold text-xs cursor-pointer"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  cart.map((cartItem) => (
                    <div key={cartItem.item.id} className="flex justify-between items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs">{cartItem.item.isVeg ? "🟢" : "🔴"}</span>
                          <span className="font-bold text-sm">{cartItem.item.name}</span>
                        </div>
                        <span className="text-xs text-amber-500 font-bold">₹{cartItem.item.price} each</span>
                      </div>
                      
                      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                        <button
                          onClick={() => updateCartQuantity(cartItem.item.id, cartItem.quantity - 1)}
                          className="h-5 w-5 flex items-center justify-center bg-white dark:bg-slate-700 rounded hover:bg-slate-200 text-xs font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-bold text-sm w-4 text-center">{cartItem.quantity}</span>
                        <button
                          onClick={() => addToCart(cartItem.item)}
                          className="h-5 w-5 flex items-center justify-center bg-white dark:bg-slate-700 rounded hover:bg-slate-200 text-xs font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout details at bottom */}
              {cart.length > 0 && (
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-slate-400" : "text-slate-500"}>Subtotal</span>
                      <span className="font-semibold">₹{subtotal}</span>
                    </div>
                    {appliedPromo && (
                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                        <span>Promo Code ({appliedPromo.code})</span>
                        <span>-₹{appliedPromo.discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-slate-400" : "text-slate-500"}>Delivery Fee</span>
                      <span className="font-semibold">₹{deliveryCharge}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-slate-400" : "text-slate-500"}>GST (5%)</span>
                      <span className="font-semibold">₹{gstAmount}</span>
                    </div>
                    <div className="flex justify-between font-black text-base pt-2 border-t border-slate-200 dark:border-slate-800 text-amber-500">
                      <span>Total Amount</span>
                      <span>₹{finalTotal}</span>
                    </div>
                  </div>

                  {/* Promo Input for Mobile */}
                  <div className="space-y-1">
                    {appliedPromo ? (
                      <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 p-2 rounded-xl text-xs border border-emerald-250 dark:border-emerald-900">
                        <span>🎉 Code <b>{appliedPromo.code}</b> applied!</span>
                        <button onClick={removePromo} className="text-red-500 font-extrabold cursor-pointer">✕</button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo Code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className={`flex-grow px-3 py-1.5 rounded-xl border text-xs focus:outline-none ${
                            darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"
                          }`}
                        />
                        <button
                          onClick={applyPromo}
                          className="px-4 py-1.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                    {promoError && <p className="text-red-500 text-[10px]">{promoError}</p>}
                  </div>

                  <Link
                    href="/test/checkout"
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-center rounded-xl transition block shadow-lg text-sm cursor-pointer"
                  >
                    Proceed to Checkout (₹{finalTotal})
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
