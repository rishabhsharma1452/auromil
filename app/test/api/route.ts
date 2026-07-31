import { NextRequest, NextResponse } from "next/server";
import { mockCategories, mockMenuItems, mockRestaurant } from "../data/mockData";
import { getSupabase } from "../lib/supabase";

export const dynamic = "force-dynamic";

// GET handler: Returns the entire current store database from Supabase
export async function GET() {
  try {
    const db = getSupabase();

    // 1. Fetch categories sorted by sortOrder
    const { data: categories, error: catError } = await db
      .from("categories")
      .select("*")
      .order("sortOrder", { ascending: true });

    if (catError) {
      console.error("Supabase categories query failed:", catError);
      throw new Error(`Failed to fetch categories: ${catError.message}`);
    }

    // 2. Fetch menu items
    const { data: menuItems, error: itemsError } = await db
      .from("menu_items")
      .select("*");

    if (itemsError) {
      console.error("Supabase menu_items query failed:", itemsError);
      throw new Error(`Failed to fetch menu items: ${itemsError.message}`);
    }

    // 3. Fetch orders (newest first)
    const { data: orders, error: ordersError } = await db
      .from("orders")
      .select("*")
      .order("timeOrdered", { ascending: false });

    if (ordersError) {
      console.error("Supabase orders query failed:", ordersError);
      throw new Error(`Failed to fetch orders: ${ordersError.message}`);
    }

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
    const message = error instanceof Error ? error.message : "Failed to load database";
    console.error("GET /test/api error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST handler: Performs database mutations on Supabase
export async function POST(req: NextRequest) {
  try {
    const db = getSupabase();
    const body = await req.json();
    const { action } = body;

    switch (action) {
      case "place_order": {
        const { order } = body;

        if (!order || !order.id) {
          return NextResponse.json(
            { error: "Invalid order data: missing order object or order ID" },
            { status: 400 }
          );
        }

        // Use .select() to return the inserted row and confirm persistence
        const { data: insertedRows, error } = await db
          .from("orders")
          .insert([order])
          .select();

        if (error) {
          console.error("Supabase order insert failed:", error);
          return NextResponse.json(
            { error: `Order insert failed: ${error.message}`, code: error.code },
            { status: 500 }
          );
        }

        if (!insertedRows || insertedRows.length === 0) {
          console.error("Order insert returned no rows — possible RLS issue");
          return NextResponse.json(
            { error: "Order insert returned no data. Check RLS policies." },
            { status: 500 }
          );
        }

        // Return the confirmed order from the database
        return NextResponse.json({ success: true, order: insertedRows[0] });
      }

      case "update_status": {
        const { orderId, status } = body;

        if (!orderId || !status) {
          return NextResponse.json(
            { error: "Missing orderId or status" },
            { status: 400 }
          );
        }

        const updateData: Record<string, string> = { deliveryStatus: status };
        if (status === "DELIVERED") {
          updateData.paymentStatus = "PAID";
        }

        const { data: updatedRows, error } = await db
          .from("orders")
          .update(updateData)
          .eq("id", orderId)
          .select();

        if (error) {
          console.error("Supabase order status update failed:", error);
          return NextResponse.json(
            { error: `Status update failed: ${error.message}` },
            { status: 500 }
          );
        }

        if (!updatedRows || updatedRows.length === 0) {
          return NextResponse.json(
            { error: `Order not found: ${orderId}` },
            { status: 404 }
          );
        }

        return NextResponse.json({ success: true, order: updatedRows[0] });
      }

      case "add_item": {
        const { item } = body;
        const { error } = await db
          .from("menu_items")
          .insert([item]);
        if (error) {
          console.error("Supabase menu item insert failed:", error);
          return NextResponse.json(
            { error: `Add item failed: ${error.message}` },
            { status: 500 }
          );
        }
        return NextResponse.json({ success: true });
      }

      case "update_item": {
        const { item } = body;
        const { error } = await db
          .from("menu_items")
          .update(item)
          .eq("id", item.id);
        if (error) {
          console.error("Supabase menu item update failed:", error);
          return NextResponse.json(
            { error: `Update item failed: ${error.message}` },
            { status: 500 }
          );
        }
        return NextResponse.json({ success: true });
      }

      case "delete_item": {
        const { itemId } = body;
        const { error } = await db
          .from("menu_items")
          .delete()
          .eq("id", itemId);
        if (error) {
          console.error("Supabase menu item delete failed:", error);
          return NextResponse.json(
            { error: `Delete item failed: ${error.message}` },
            { status: 500 }
          );
        }
        return NextResponse.json({ success: true });
      }

      case "add_category": {
        const { category } = body;
        const { error } = await db
          .from("categories")
          .insert([category]);
        if (error) {
          console.error("Supabase category insert failed:", error);
          return NextResponse.json(
            { error: `Add category failed: ${error.message}` },
            { status: 500 }
          );
        }
        return NextResponse.json({ success: true });
      }

      case "reset": {
        // Delete orders first, then menu_items, then categories
        const { error: delOrdersError } = await db.from("orders").delete().neq("id", "keep-none");
        if (delOrdersError) {
          console.error("Reset: delete orders failed:", delOrdersError);
          throw new Error(`Reset failed at orders: ${delOrdersError.message}`);
        }

        const { error: delItemsError } = await db.from("menu_items").delete().neq("id", "keep-none");
        if (delItemsError) {
          console.error("Reset: delete menu_items failed:", delItemsError);
          throw new Error(`Reset failed at menu_items: ${delItemsError.message}`);
        }

        const { error: delCatsError } = await db.from("categories").delete().neq("id", "keep-none");
        if (delCatsError) {
          console.error("Reset: delete categories failed:", delCatsError);
          throw new Error(`Reset failed at categories: ${delCatsError.message}`);
        }

        // Insert default categories and menu items
        const { error: insCatsError } = await db.from("categories").insert(mockCategories);
        if (insCatsError) {
          console.error("Reset: insert categories failed:", insCatsError);
          throw new Error(`Reset failed seeding categories: ${insCatsError.message}`);
        }

        const { error: insItemsError } = await db.from("menu_items").insert(mockMenuItems);
        if (insItemsError) {
          console.error("Reset: insert menu_items failed:", insItemsError);
          throw new Error(`Reset failed seeding menu_items: ${insItemsError.message}`);
        }

        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: `Invalid action: ${action}` }, { status: 400 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    console.error("POST /test/api error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
