export interface Settings {
  restaurantId: string;
  theme: "light" | "dark";
  taxNumber?: string;
  currency: string;
  printReceiptOnOrder: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  description: string;
  bannerImage: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  openingHours: string;
  deliveryTimeEstimate: string;
  deliveryFee: number;
  gstPercentage: number;
  settings: Settings;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
}

export interface Item {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  isNonVeg: boolean;
  spiceLevel: 0 | 1 | 2 | 3; // 0 = None, 1 = Mild, 2 = Medium, 3 = Hot
  isAvailable: boolean;
  isPopular: boolean;
  isRecommended: boolean;
  popularityCount: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  landmark?: string;
  pinCode: string;
  totalOrders: number;
  lifetimeSpend: number;
  orderHistory: string[]; // Order IDs
}

export interface OrderItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  isVeg: boolean;
}

export interface Order {
  id: string;
  restaurantId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  landmark?: string;
  pinCode: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  gstAmount: number;
  grandTotal: number;
  promoCode?: string;
  specialInstructions?: string;
  paymentMethod: "COD" | "UPI" | "CARD";
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  deliveryStatus: "PENDING" | "ACCEPTED" | "REJECTED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED";
  timeOrdered: string; // ISO String
  expectedDeliveryTime: string; // ISO String
  notes?: string;
}

export interface Payment {
  id: string;
  orderId: string;
  method: "COD" | "UPI" | "CARD";
  status: "PENDING" | "PAID" | "FAILED";
  amount: number;
  transactionId?: string;
  timestamp: string;
}

export interface Delivery {
  id: string;
  orderId: string;
  status: "PENDING" | "ASSIGNED" | "PICKED_UP" | "DELIVERED";
  driverName?: string;
  driverPhone?: string;
  estimatedTime?: string;
  actualTime?: string;
}

export interface Employee {
  id: string;
  name: string;
  role: "OWNER" | "MANAGER" | "STAFF" | "DRIVER";
  email: string;
  phone: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiryDate: string;
  active: boolean;
}
