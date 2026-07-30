import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { mockCategories, mockMenuItems, mockOrders, mockRestaurant } from "../data/mockData";
import { Order, Item } from "../types";

const DB_PATH = path.join(process.cwd(), "test-db.json");

export const dynamic = "force-dynamic";

// Helper to initialize and retrieve the JSON database
function getDb() {
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

// Helper to save state changes to the JSON database
function saveDb(data: unknown) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to JSON database:", error);
  }
}

// GET handler: Returns the entire current store database
export async function GET() {
  const db = getDb();
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
    const db = getDb();

    switch (action) {
      case "place_order": {
        const { order } = body;
        db.orders = [order, ...db.orders]; // Add newest order first
        saveDb(db);
        break;
      }
      case "update_status": {
        const { orderId, status } = body;
        db.orders = db.orders.map((o: Order) =>
          o.id === orderId ? { ...o, deliveryStatus: status, paymentStatus: status === "DELIVERED" ? "PAID" : o.paymentStatus } : o
        );
        saveDb(db);
        break;
      }
      case "add_item": {
        const { item } = body;
        db.menuItems = [...db.menuItems, item];
        saveDb(db);
        break;
      }
      case "update_item": {
        const { item } = body;
        db.menuItems = db.menuItems.map((i: Item) => (i.id === item.id ? item : i));
        saveDb(db);
        break;
      }
      case "delete_item": {
        const { itemId } = body;
        db.menuItems = db.menuItems.filter((i: Item) => i.id !== itemId);
        saveDb(db);
        break;
      }
      case "add_category": {
        const { category } = body;
        db.categories = [...db.categories, category];
        saveDb(db);
        break;
      }
      case "reset": {
        const resetData = {
          restaurant: mockRestaurant,
          categories: mockCategories,
          menuItems: mockMenuItems,
          orders: [],
        };
        saveDb(resetData);
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
