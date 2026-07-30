import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { mockCategories, mockMenuItems, mockOrders, mockRestaurant } from "../data/mockData";
import { Order, Item } from "../types";

const DB_PATH = path.join(process.cwd(), "test-db.json");
const BUCKET_ID = "Xjx1pt8d9L4sUbWYN13rsh";
const KVDB_URL = `https://kvdb.io/${BUCKET_ID}/auromil_momo_db`;

export const dynamic = "force-dynamic";

// Helper to initialize and retrieve the database (Vercel KVdb in production, local JSON file in dev)
async function getDb() {
  if (process.env.VERCEL) {
    try {
      const res = await fetch(KVDB_URL, {
        next: { revalidate: 0 },
        headers: { "Cache-Control": "no-cache" }
      });
      if (res.status === 404) {
        const initial = {
          restaurant: mockRestaurant,
          categories: mockCategories,
          menuItems: mockMenuItems,
          orders: mockOrders,
        };
        await saveDb(initial);
        return initial;
      }
      if (!res.ok) throw new Error(`KVdb error: ${res.statusText}`);
      return await res.json();
    } catch (error) {
      console.error("Error reading from KVdb:", error);
      return {
        restaurant: mockRestaurant,
        categories: mockCategories,
        menuItems: mockMenuItems,
        orders: mockOrders,
      };
    }
  }

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
  if (process.env.VERCEL) {
    try {
      const res = await fetch(KVDB_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`KVdb write failed: ${text}`);
      }
    } catch (error) {
      console.error("Error writing to KVdb:", error);
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
