import { NextRequest, NextResponse } from "next/server";
import { mockCategories, mockMenuItems, mockRestaurant } from "../data/mockData";
import { supabase } from "../lib/supabase";

export const dynamic = "force-dynamic";

// GET handler: Returns the entire current store database from Supabase
export async function GET() {
  try {
    if (!supabase) {
      throw new Error("Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to environment variables.");
    }

    // 1. Fetch categories sorted by sortOrder
    const { data: categories, error: catError } = await supabase
      .from("categories")
      .select("*")
      .order("sortOrder", { ascending: true });

    if (catError) throw catError;

    // 2. Fetch menu items
    const { data: menuItems, error: itemsError } = await supabase
      .from("menu_items")
      .select("*");

    if (itemsError) throw itemsError;

    // 3. Fetch orders (newest first)
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("*")
      .order("timeOrdered", { ascending: false });

    if (ordersError) throw ordersError;

    return NextResponse.json({
      restaurant: mockRestaurant,
      categories: categories || [],
      menuItems: menuItems || [],
      orders: orders || [],
    }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error reading from Supabase:", err);
    return NextResponse.json({ error: err.message || "Failed to load database" }, { status: 500 });
  }
}

// POST handler: Performs database mutations (RPC style) on Supabase
export async function POST(req: NextRequest) {
  try {
    if (!supabase) {
      throw new Error("Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to environment variables.");
    }

    const body = await req.json();
    const { action } = body;

    switch (action) {
      case "place_order": {
        const { order } = body;
        const { error } = await supabase
          .from("orders")
          .insert([order]);
        if (error) throw error;
        break;
      }
      case "update_status": {
        const { orderId, status } = body;
        const updateData: Record<string, string> = { deliveryStatus: status };
        if (status === "DELIVERED") {
          updateData.paymentStatus = "PAID";
        }
        const { error } = await supabase
          .from("orders")
          .update(updateData)
          .eq("id", orderId);
        if (error) throw error;
        break;
      }
      case "add_item": {
        const { item } = body;
        const { error } = await supabase
          .from("menu_items")
          .insert([item]);
        if (error) throw error;
        break;
      }
      case "update_item": {
        const { item } = body;
        const { error } = await supabase
          .from("menu_items")
          .update(item)
          .eq("id", item.id);
        if (error) throw error;
        break;
      }
      case "delete_item": {
        const { itemId } = body;
        const { error } = await supabase
          .from("menu_items")
          .delete()
          .eq("id", itemId);
        if (error) throw error;
        break;
      }
      case "add_category": {
        const { category } = body;
        const { error } = await supabase
          .from("categories")
          .insert([category]);
        if (error) throw error;
        break;
      }
      case "reset": {
        // Delete orders first, then menu_items, then categories
        const { error: delOrdersError } = await supabase.from("orders").delete().neq("id", "keep-none");
        if (delOrdersError) throw delOrdersError;

        const { error: delItemsError } = await supabase.from("menu_items").delete().neq("id", "keep-none");
        if (delItemsError) throw delItemsError;

        const { error: delCatsError } = await supabase.from("categories").delete().neq("id", "keep-none");
        if (delCatsError) throw delCatsError;

        // Insert default categories and menu items
        const { error: insCatsError } = await supabase.from("categories").insert(mockCategories);
        if (insCatsError) throw insCatsError;

        const { error: insItemsError } = await supabase.from("menu_items").insert(mockMenuItems);
        if (insItemsError) throw insItemsError;
        break;
      }
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Mutation error on Supabase:", err);
    return NextResponse.json({ error: err.message || "Server Error" }, { status: 500 });
  }
}
