import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { mockCategories, mockMenuItems, mockOrders, mockRestaurant } from "../data/mockData";
import { Order, Item } from "../types";

const DB_PATH = path.join(process.cwd(), "test-db.json");

// Check if Vercel KV environment variables are injected
const KV_URL = process.env.KV_REST_API_URL || process.env.NEXT_PUBLIC_KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.NEXT_PUBLIC_KV_REST_API_TOKEN;

export const dynamic = "force-dynamic";

// Helper to initialize and retrieve the database (Vercel KV in production, local JSON file in dev)
async function getDb() {
  if (KV_URL && KV_TOKEN) {
    try {
      const res = await fetch(`${KV_URL}/get/auromil_momo_db`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
        next: { revalidate: 0 } // Disable Next.js fetch caching
      });
      if (!res.ok) throw new Error(`Vercel KV error: ${res.statusText}`);
      const data = await res.json();
      if (data.result) {
        return JSON.parse(data.result);
      }
      
      // Initialize KV store with default database if key doesn't exist
      const initial = {
        restaurant: mockRestaurant,
        categories: mockCategories,
        menuItems: mockMenuItems,
        orders: mockOrders,
      };
      await saveDb(initial);
      return initial;
    } catch (error) {
      console.error("Error reading from Vercel KV:", error);
      return {
        restaurant: mockRestaurant,
        categories: mockCategories,
        menuItems: mockMenuItems,
        orders: mockOrders,
      };
    }
  }

  // Local filesystem database (for local dev server)
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initial = {
        restaurant: mockRestaurant,
        categories: mockCategories,
        menuItems: mockMenuItems,
        orders: mockOrders,
      };
      fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const fileContent = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading JSON database:", error);
    return {
      restaurant: mockRestaurant,
      categories: mockCategories,
      menuItems: mockMenuItems,
      orders: mockOrders,
    };
  }
}

// Helper to save state changes to the database
async function saveDb(data: unknown) {
  if (KV_URL && KV_TOKEN) {
    try {
      const res = await fetch(`${KV_URL}/set/auromil_momo_db`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(JSON.stringify(data)) // Redis expects stringified JSON value
      });
      if (!res.ok) {
        throw new Error(`Vercel KV write failed: ${res.statusText}`);
      }
    } catch (error) {
      console.error("Error writing to Vercel KV:", error);
    }
    return;
  }

  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to JSON database:", error);
  }
}

// GET handler: Returns the entire current store database
export async function GET() {
  const db = await getDb();
  return NextResponse.json(db, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}

// POST handler: Performs database mutations (RPC style)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;
    const db = await getDb();

    switch (action) {
      case "place_order": {
        const { order } = body;
        db.orders = [order, ...db.orders]; // Add newest order first
        await saveDb(db);
        break;
      }
      case "update_status": {
        const { orderId, status } = body;
        db.orders = db.orders.map((o: Order) =>
          o.id === orderId ? { ...o, deliveryStatus: status, paymentStatus: status === "DELIVERED" ? "PAID" : o.paymentStatus } : o
        );
        await saveDb(db);
        break;
      }
      case "add_item": {
        const { item } = body;
        db.menuItems = [...db.menuItems, item];
        await saveDb(db);
        break;
      }
      case "update_item": {
        const { item } = body;
        db.menuItems = db.menuItems.map((i: Item) => (i.id === item.id ? item : i));
        await saveDb(db);
        break;
      }
      case "delete_item": {
        const { itemId } = body;
        db.menuItems = db.menuItems.filter((i: Item) => i.id !== itemId);
        await saveDb(db);
        break;
      }
      case "add_category": {
        const { category } = body;
        db.categories = [...db.categories, category];
        await saveDb(db);
        break;
      }
      case "reset": {
        const resetData = {
          restaurant: mockRestaurant,
          categories: mockCategories,
          menuItems: mockMenuItems,
          orders: [],
        };
        await saveDb(resetData);
        break;
      }
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || "Server Error" }, { status: 500 });
  }
}
