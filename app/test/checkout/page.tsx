"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "../context/StoreContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, getCartTotal, placeOrder } = useStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "UPI" | "CARD">("COD");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");

  // Card input mock states
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setIsClient(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  const { subtotal, deliveryCharge, gstAmount, grandTotal } = getCartTotal();

  // Validate form
  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = "Customer name is required";
    if (!phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(phone.trim())) {
      tempErrors.phone = "Please enter a valid phone number (e.g. 9876543210)";
    }
    if (!address.trim()) tempErrors.address = "Delivery address is required";
    if (!pinCode.trim()) {
      tempErrors.pinCode = "PIN Code is required";
    } else if (!/^[0-9]{6}$/.test(pinCode.trim())) {
      tempErrors.pinCode = "PIN Code must be a 6-digit number";
    }

    if (paymentMethod === "CARD") {
      if (!cardNumber.trim()) tempErrors.cardNumber = "Card number is required";
      if (!cardExpiry.trim()) tempErrors.cardExpiry = "Expiry date is required";
      if (!cardCvv.trim()) tempErrors.cardCvv = "CVV is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const order = await placeOrder({
        customerName: name,
        customerPhone: phone,
        deliveryAddress: address,
        landmark,
        pinCode,
        paymentMethod,
        specialInstructions: deliveryInstructions,
      });
      
      // Redirect to confirmation screen
      router.push(`/test/order-confirmation/${order.id}`);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  // If cart is empty, show empty state
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 text-center shadow-lg space-y-4">
          <span className="text-5xl">🥟</span>
          <h2 className="text-2xl font-black tracking-tight text-slate-800">Your cart is empty</h2>
          <p className="text-slate-500 text-xs">
            You cannot checkout with an empty cart. Go back and select some delicious hot momos first!
          </p>
          <Link
            href="/test"
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-center rounded-xl transition block shadow text-sm cursor-pointer"
          >
            ← Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Local Top Nav */}
      <nav className="w-full bg-white border-b border-slate-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/test" className="flex items-center gap-1 text-slate-800 font-extrabold text-lg">
            <span>🥟</span> Momo Junction
          </Link>
          <span className="text-xs font-bold text-slate-400">SECURE CHECKOUT</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/test" className="text-slate-400 hover:text-slate-600 text-sm font-bold flex items-center gap-1 cursor-pointer">
            ← Back to Menu
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Details Form (ColSpan 2) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Delivery Info */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-lg font-black tracking-tight text-slate-800 flex items-center gap-2">
                <span className="text-amber-500">📍</span> Delivery Address Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                      errors.name ? "border-red-500 bg-red-50/10" : "border-slate-200"
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-[10px]">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600">Phone Number</label>
                  <input
                    type="text"
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                      errors.phone ? "border-red-500 bg-red-50/10" : "border-slate-200"
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-[10px]">{errors.phone}</p>}
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="block text-xs font-bold text-slate-600">Complete Address</label>
                  <input
                    type="text"
                    placeholder="House No, Street, Building Name"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                      errors.address ? "border-red-500 bg-red-50/10" : "border-slate-200"
                    }`}
                  />
                  {errors.address && <p className="text-red-500 text-[10px]">{errors.address}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600">Landmark (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Near MIT gate"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600">PIN Code</label>
                  <input
                    type="text"
                    placeholder="6 digits PIN"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                      errors.pinCode ? "border-red-500 bg-red-50/10" : "border-slate-200"
                    }`}
                  />
                  {errors.pinCode && <p className="text-red-500 text-[10px]">{errors.pinCode}</p>}
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <h2 className="text-lg font-black tracking-tight text-slate-800 flex items-center gap-2">
                <span className="text-amber-500">💳</span> Payment Method
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("COD")}
                  className={`p-4 border rounded-2xl flex flex-col items-center gap-2 transition cursor-pointer text-center ${
                    paymentMethod === "COD"
                      ? "border-amber-500 bg-amber-500/5 text-amber-600 font-bold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <span className="text-2xl">💵</span>
                  <span className="text-xs">Cash on Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("UPI")}
                  className={`p-4 border rounded-2xl flex flex-col items-center gap-2 transition cursor-pointer text-center ${
                    paymentMethod === "UPI"
                      ? "border-amber-500 bg-amber-500/5 text-amber-600 font-bold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <span className="text-2xl">📲</span>
                  <span className="text-xs">UPI (Instant QR)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("CARD")}
                  className={`p-4 border rounded-2xl flex flex-col items-center gap-2 transition cursor-pointer text-center ${
                    paymentMethod === "CARD"
                      ? "border-amber-500 bg-amber-500/5 text-amber-600 font-bold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <span className="text-2xl">💳</span>
                  <span className="text-xs">Credit/Debit Card</span>
                </button>
              </div>

              {/* Conditionally Render UPI QR Code */}
              {paymentMethod === "UPI" && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                  <div className="relative h-28 w-28 bg-white border border-slate-200 rounded-xl p-2 flex items-center justify-center flex-shrink-0 shadow">
                    {/* Simulated SVG QR Code */}
                    <svg viewBox="0 0 100 100" className="h-full w-full text-slate-800" fill="currentColor">
                      <rect x="0" y="0" width="25" height="25" />
                      <rect x="5" y="5" width="15" height="15" fill="white" />
                      <rect x="8" y="8" width="9" height="9" />
                      
                      <rect x="75" y="0" width="25" height="25" />
                      <rect x="80" y="5" width="15" height="15" fill="white" />
                      <rect x="83" y="8" width="9" height="9" />
                      
                      <rect x="0" y="75" width="25" height="25" />
                      <rect x="5" y="80" width="15" height="15" fill="white" />
                      <rect x="8" y="83" width="9" height="9" />

                      {/* Random QR blocks */}
                      <rect x="35" y="5" width="8" height="8" />
                      <rect x="45" y="15" width="12" height="6" />
                      <rect x="60" y="8" width="6" height="12" />
                      <rect x="30" y="30" width="15" height="15" />
                      <rect x="55" y="35" width="10" height="20" />
                      <rect x="35" y="60" width="20" height="8" />
                      <rect x="70" y="65" width="12" height="12" />
                      <rect x="65" y="80" width="10" height="8" />
                      <rect x="40" y="80" width="15" height="15" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-800">Scan QR to Pay Instantly</h4>
                    <p className="text-slate-500 text-[11px] mt-1 max-w-sm">
                      Scan this mock QR with GPay, PhonePe, or Paytm. For testing, the transaction will be auto-approved upon checkout.
                    </p>
                    <span className="inline-block mt-2 font-mono font-bold text-xs bg-slate-200 px-2 py-0.5 rounded text-slate-700">
                      UPI ID: momojunction@okaxis
                    </span>
                  </div>
                </div>
              )}

              {/* Conditionally Render Card Details */}
              {paymentMethod === "CARD" && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <h4 className="font-extrabold text-sm text-slate-800">Mock Card Details</h4>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500">CARD NUMBER</label>
                      <input
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className={`w-full px-3 py-1.5 border rounded-xl text-xs focus:outline-none ${
                          errors.cardNumber ? "border-red-500 bg-red-50/10" : "border-slate-250 bg-white"
                        }`}
                      />
                      {errors.cardNumber && <p className="text-red-500 text-[9px]">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500">EXPIRY DATE</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className={`w-full px-3 py-1.5 border rounded-xl text-xs focus:outline-none ${
                            errors.cardExpiry ? "border-red-500 bg-red-50/10" : "border-slate-250 bg-white"
                          }`}
                        />
                        {errors.cardExpiry && <p className="text-red-500 text-[9px]">{errors.cardExpiry}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500">CVV</label>
                        <input
                          type="password"
                          maxLength={3}
                          placeholder="•••"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className={`w-full px-3 py-1.5 border rounded-xl text-xs focus:outline-none ${
                            errors.cardCvv ? "border-red-500 bg-red-50/10" : "border-slate-250 bg-white"
                          }`}
                        />
                        {errors.cardCvv && <p className="text-red-500 text-[9px]">{errors.cardCvv}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Delivery Instructions */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <h2 className="text-lg font-black tracking-tight text-slate-800 flex items-center gap-2">
                <span className="text-amber-500">🔔</span> Instructions for Delivery
              </h2>
              <textarea
                placeholder="e.g. Leave it with the guard, ring the bell, do not call, etc."
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
              />
            </div>

          </div>

          {/* Cart Summary Sidebar (ColSpan 1) */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-base border-b border-slate-100 pb-3 text-slate-800">
                Order Summary
              </h3>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {cart.map((cartItem) => (
                  <div key={cartItem.item.id} className="flex justify-between items-start text-xs gap-3">
                    <div className="flex-grow">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px]">{cartItem.item.isVeg ? "🟢" : "🔴"}</span>
                        <span className="font-bold text-slate-700">{cartItem.item.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Qty: {cartItem.quantity} • ₹{cartItem.item.price} each</span>
                    </div>
                    <span className="font-bold text-slate-700">₹{cartItem.item.price * cartItem.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Totals Section */}
              <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-700">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Delivery Charge</span>
                  <span className="font-semibold text-slate-700">₹{deliveryCharge}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>GST (5%)</span>
                  <span className="font-semibold text-slate-700">₹{gstAmount}</span>
                </div>
                
                <div className="flex justify-between font-black text-sm pt-2 border-t border-slate-100 text-amber-500">
                  <span>Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100 text-amber-800 text-[10px] leading-relaxed">
                🚀 <b>Estimated Delivery:</b> 25-35 mins. Your food is cooked fresh on order.
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-250 disabled:cursor-not-allowed text-slate-950 font-black text-center rounded-xl transition block shadow-lg text-sm cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-950"></div>
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  `Place Order (₹${grandTotal})`
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
