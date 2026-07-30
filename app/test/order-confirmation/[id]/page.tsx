"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useStore } from "../../context/StoreContext";
import Link from "next/link";
import { Order } from "../../types";

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const { orders, updateOrderStatus } = useStore();
  const [isClient, setIsClient] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setIsClient(true);
    });
    
    // Countdown timer simulation
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 30));
    }, 60000); // decrement every minute
    
    return () => {
      cancelAnimationFrame(handle);
      clearInterval(timer);
    };
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 text-center shadow-lg space-y-4">
          <span className="text-5xl">⚠️</span>
          <h2 className="text-2xl font-black tracking-tight text-slate-800">Order Not Found</h2>
          <p className="text-slate-500 text-xs">
            We couldn&apos;t find an order with the ID: <b className="font-mono">{id}</b>. Please check your URL or place a new order.
          </p>
          <Link
            href="/test"
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-center rounded-xl transition block shadow text-sm cursor-pointer"
          >
            ← Go to Menu
          </Link>
        </div>
      </div>
    );
  }

  // Stepper status helper
  const steps = [
    { key: "PENDING", label: "Order Placed", icon: "📝", desc: "Sent to kitchen" },
    { key: "ACCEPTED", label: "Accepted", icon: "✓", desc: "Confirmed by owner" },
    { key: "PREPARING", label: "Preparing", icon: "🍳", desc: "Cooking your momos" },
    { key: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: "🛵", desc: "Driver is on the way" },
    { key: "DELIVERED", label: "Delivered", icon: "🎁", desc: "Enjoy your food!" },
  ];

  // Find index of current status
  const getStatusIndex = (currentStatus: string) => {
    if (currentStatus === "CANCELLED" || currentStatus === "REJECTED") return -1;
    const idx = steps.findIndex((step) => step.key === currentStatus);
    if (idx === -1) {
      // Fallback if status is preparing etc.
      if (currentStatus === "PENDING") return 0;
      return 0;
    }
    return idx;
  };

  const currentIdx = getStatusIndex(order.deliveryStatus);
  const isCancelled = order.deliveryStatus === "CANCELLED" || order.deliveryStatus === "REJECTED";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16 print:bg-white print:pb-0">
      
      {/* Local Navigation (Hidden on Print) */}
      <nav className="w-full bg-white border-b border-slate-100 py-4 px-6 sticky top-0 z-30 print:hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/test" className="flex items-center gap-1 text-slate-800 font-extrabold text-lg">
            <span>🥟</span> Momo Junction
          </Link>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs rounded-xl flex items-center gap-1 shadow-sm cursor-pointer"
            >
              🖨️ Print Receipt
            </button>
            <Link
              href="/test"
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm cursor-pointer"
            >
              Order More
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 mt-8 print:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Tracking & Status (ColSpan 2) (Hidden on Print if we want, or styled nicely) */}
          <div className="lg:col-span-2 space-y-6 print:hidden">
            
            {/* Status Header Banner */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center space-y-4">
              {isCancelled ? (
                <>
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 text-3xl font-bold animate-pulse">
                    ✕
                  </div>
                  <h1 className="text-2xl font-black text-slate-800">Order Cancelled</h1>
                  <p className="text-slate-500 text-xs max-w-sm mx-auto">
                    We regret to inform you that your order has been {order.deliveryStatus.toLowerCase()}. Please contact the shop for details.
                  </p>
                </>
              ) : (
                <>
                  {/* Confetti Checkmark Wrapper */}
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-3xl font-extrabold shadow-inner animate-bounce">
                    ✓
                  </div>
                  <h1 className="text-2xl font-black text-slate-800">Thank you for your order!</h1>
                  <p className="text-slate-500 text-xs">
                    Your order <b className="font-mono text-slate-700">{order.id}</b> is registered and tracking live.
                  </p>
                  
                  {order.deliveryStatus !== "DELIVERED" ? (
                    <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 inline-block">
                      <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Estimated Delivery Time</span>
                      <h3 className="text-2xl font-black text-amber-500 mt-0.5">{countdown} Mins</h3>
                      <p className="text-[10px] text-slate-400 mt-1">Arriving at your location soon</p>
                    </div>
                  ) : (
                    <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 inline-block">
                      <h3 className="text-lg font-black text-emerald-600">Delivered Successfully! 🎉</h3>
                      <p className="text-[10px] text-slate-500 mt-0.5">Enjoy your fresh Himalayan momos.</p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Live Tracking Stepper */}
            {!isCancelled && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-sm text-slate-800">Live Status Tracker</h3>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                </div>

                <div className="relative pl-6 md:pl-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  {/* Connection Line (Desktop) */}
                  <div className="absolute top-6 left-10 right-10 h-0.5 bg-slate-100 hidden md:block z-0" />
                  
                  {/* Stepper Node list */}
                  {steps.map((step, idx) => {
                    const isCompleted = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;
                    
                    return (
                      <div key={idx} className="flex md:flex-col items-center gap-4 md:gap-2 z-10 flex-1 relative">
                        {/* Circle */}
                        <div
                          className={`h-11 w-11 rounded-full flex items-center justify-center text-sm font-bold shadow-md transition-all duration-300 ${
                            isCompleted
                              ? "bg-amber-500 text-slate-950 font-black scale-105"
                              : "bg-slate-100 border border-slate-200 text-slate-400"
                          } ${isCurrent ? "ring-4 ring-amber-100 animate-pulse" : ""}`}
                        >
                          {step.icon}
                        </div>
                        
                        {/* Labels */}
                        <div className="text-left md:text-center">
                          <h4 className={`text-xs font-extrabold ${isCompleted ? "text-slate-800" : "text-slate-400"}`}>
                            {step.label}
                          </h4>
                          <p className="text-[9px] text-slate-400 mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Live Tracking Simulator Controls for testing (Admin shortcut helper) */}
                <div className="border-t border-slate-100 pt-4 mt-6">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Developer Sandbox Shortcuts (Simulate Status)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {steps.map((step) => (
                      <button
                        key={step.key}
                        onClick={() => updateOrderStatus(order.id, step.key as Order["deliveryStatus"])}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                          order.deliveryStatus === step.key
                            ? "bg-slate-800 text-white border-slate-800"
                            : "bg-slate-100 border-slate-250 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {step.label}
                      </button>
                    ))}
                    <button
                      onClick={() => updateOrderStatus(order.id, "CANCELLED")}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                        order.deliveryStatus === "CANCELLED"
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                      }`}
                    >
                      Cancel Order
                    </button>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-2">
                    💡 Clicking these updates the state instantly. If you keep the Admin Dashboard open in another tab, it will also reflect this status immediately in real-time!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Invoice / Receipt Card (ColSpan 1 on desktop, full page on print) */}
          <div className="lg:col-span-1 md:col-span-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm print:border-none print:shadow-none print:p-0 space-y-6">
            <div className="text-center border-b border-dashed border-slate-200 pb-4">
              <span className="text-3xl print:block hidden mb-2">🥟</span>
              <h2 className="font-extrabold text-lg text-slate-800">MOMO JUNCTION</h2>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Order Invoice</p>
            </div>

            {/* Order Meta details */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-slate-400">Order ID:</span>
                <span className="font-bold text-slate-800">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date:</span>
                <span className="font-semibold text-slate-700">
                  {new Date(order.timeOrdered).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  order.deliveryStatus === "DELIVERED"
                    ? "bg-emerald-100 text-emerald-700"
                    : isCancelled
                    ? "bg-red-100 text-red-700"
                    : "bg-amber-100 text-amber-700"
                }`}>
                  {order.deliveryStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment:</span>
                <span className={`font-bold ${order.paymentStatus === "PAID" ? "text-emerald-600" : "text-amber-500"}`}>
                  {order.paymentMethod} ({order.paymentStatus})
                </span>
              </div>
            </div>

            {/* Customer Details info block */}
            <div className="border-t border-dashed border-slate-150 pt-4 space-y-1.5 text-xs text-slate-700">
              <h4 className="font-black text-slate-800 text-[10px] uppercase tracking-wider">Customer Details</h4>
              <p><b>Name:</b> {order.customerName}</p>
              <p><b>Phone:</b> {order.customerPhone}</p>
              <p className="leading-tight"><b>Address:</b> {order.deliveryAddress}</p>
              {order.landmark && <p><b>Landmark:</b> {order.landmark}</p>}
              <p><b>PIN Code:</b> {order.pinCode}</p>
              {order.specialInstructions && <p className="text-slate-500 text-[11px] italic bg-slate-50 p-2 rounded-xl mt-1 border border-slate-150"><b>Inst:</b> &ldquo;{order.specialInstructions}&rdquo;</p>}
            </div>

            {/* Detailed list of Items Ordered */}
            <div className="border-t border-dashed border-slate-150 pt-4 space-y-3">
              <h4 className="font-black text-slate-800 text-[10px] uppercase tracking-wider">Items Ordered</h4>
              
              <div className="space-y-2.5">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs items-start gap-2">
                    <div className="flex-grow">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px]">{item.isVeg ? "🟢" : "🔴"}</span>
                        <span className="font-bold text-slate-700 leading-snug">{item.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">₹{item.price} x {item.quantity}</span>
                    </div>
                    <span className="font-bold text-slate-700">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtotal totals block */}
            <div className="border-t border-dashed border-slate-150 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-700">₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Delivery Charge</span>
                <span className="font-semibold text-slate-700">₹{order.deliveryCharge}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>GST (5%)</span>
                <span className="font-semibold text-slate-700">₹{order.gstAmount}</span>
              </div>
              {order.promoCode && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Promo Code Discount</span>
                  <span>-₹{Math.round((order.subtotal + order.deliveryCharge + order.gstAmount - order.grandTotal) * 100) / 100}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-base border-t border-dashed border-slate-200 pt-2 text-slate-800">
                <span>Total Bill</span>
                <span>₹{order.grandTotal}</span>
              </div>
            </div>

            {/* Footer barcode/thank you */}
            <div className="text-center border-t border-dashed border-slate-150 pt-4 space-y-2">
              <p className="text-[10px] text-slate-400">Thanks for dining with us! Come back soon.</p>
              {/* Simulated barcode */}
              <div className="h-6 w-full flex justify-center items-center gap-0.5 overflow-hidden select-none">
                {Array.from({ length: 40 }).map((_, i) => (
                  <span
                    key={i}
                    className="inline-block bg-slate-900 h-full"
                    style={{ width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1 : 2)}px` }}
                  />
                ))}
              </div>
              <p className="font-mono text-[8px] text-slate-400">MOM-102948-JUNC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
