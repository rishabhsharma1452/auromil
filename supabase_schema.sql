-- 1. Drop existing tables if they exist
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS categories;

-- 2. Create categories table
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  "sortOrder" INTEGER NOT NULL
);

-- 3. Create menu_items table
CREATE TABLE menu_items (
  id TEXT PRIMARY KEY,
  "categoryId" TEXT REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  image TEXT NOT NULL,
  "isVeg" BOOLEAN NOT NULL,
  "isNonVeg" BOOLEAN NOT NULL,
  "spiceLevel" INTEGER NOT NULL,
  "isAvailable" BOOLEAN NOT NULL,
  "isPopular" BOOLEAN NOT NULL,
  "isRecommended" BOOLEAN NOT NULL,
  "popularityCount" INTEGER NOT NULL DEFAULT 0
);

-- 4. Create orders table
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  "restaurantId" TEXT NOT NULL,
  "customerName" TEXT NOT NULL,
  "customerPhone" TEXT NOT NULL,
  "deliveryAddress" TEXT NOT NULL,
  landmark TEXT,
  "pinCode" TEXT NOT NULL,
  items JSONB NOT NULL, -- Array of OrderItem: { itemId, name, price, quantity, notes, isVeg }
  subtotal NUMERIC NOT NULL,
  "deliveryCharge" NUMERIC NOT NULL,
  "gstAmount" NUMERIC NOT NULL,
  "grandTotal" NUMERIC NOT NULL,
  "promoCode" TEXT,
  "specialInstructions" TEXT,
  "paymentMethod" TEXT NOT NULL,
  "paymentStatus" TEXT NOT NULL,
  "deliveryStatus" TEXT NOT NULL,
  "timeOrdered" TIMESTAMP WITH TIME ZONE NOT NULL,
  "expectedDeliveryTime" TIMESTAMP WITH TIME ZONE NOT NULL,
  notes TEXT
);

-- 5. Disable Row Level Security (RLS) for sandbox database simplicity
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;

-- 6. Seed mock data into categories
INSERT INTO categories (id, name, slug, "sortOrder") VALUES
('cat-1', 'Veg Momos', 'veg-momos', 1),
('cat-2', 'Chicken Momos', 'chicken-momos', 2),
('cat-3', 'Steam Momos', 'steam-momos', 3),
('cat-4', 'Fried Momos', 'fried-momos', 4),
('cat-5', 'Sides', 'sides', 5),
('cat-6', 'Drinks', 'drinks', 6),
('cat-7', 'Desserts', 'desserts', 7)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  "sortOrder" = EXCLUDED."sortOrder";

-- 7. Seed mock data into menu_items
INSERT INTO menu_items (id, "categoryId", name, description, price, image, "isVeg", "isNonVeg", "spiceLevel", "isAvailable", "isPopular", "isRecommended", "popularityCount") VALUES
('item-1', 'cat-1', 'Classic Veg Steam Momo', 'Delicately wrapped momos stuffed with finely chopped cabbage, carrots, beans, onion, and paneer, served with spicy red chutney.', 120, 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80', true, false, 1, true, true, true, 245),
('item-2', 'cat-1', 'Paneer & Cheese Momo', 'Stuffed with fresh cottage cheese, melted cheddar, coriander, and herbs. A soft, creamy delight for cheese lovers.', 150, 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=600&auto=format&fit=crop&q=80', true, false, 1, true, true, false, 189),
('item-3', 'cat-1', 'Schezwan Veg Momo', 'Spicy and tangy! Veg momos tossed in chef''s special fiery Schezwan sauce, garnished with spring onions.', 140, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80', true, false, 3, true, false, true, 95),
('item-4', 'cat-2', 'Classic Chicken Steam Momo', 'Traditional Tibetan dumplings stuffed with juicy minced chicken, ginger, garlic, and coriander, served with yellow sesame dip.', 140, 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4d11?w=600&auto=format&fit=crop&q=80', false, true, 1, true, true, true, 412),
('item-5', 'cat-2', 'Butter Chicken Momo', 'Chicken momos submerged in a rich, creamy, buttery tomato gravy (Makhani gravy) with a dollop of fresh cream.', 180, 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4d11?w=600&auto=format&fit=crop&q=80', false, true, 2, true, true, true, 320),
('item-6', 'cat-2', 'Fiery Hot Chicken Momo', 'Packed with red hot ghost pepper paste and chicken mince. Not for the faint-hearted! Extreme heat warning.', 160, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80', false, true, 3, true, false, false, 88),
('item-7', 'cat-3', 'Green Spinach & Veg Steam Momo', 'Healthy spinach-infused dough wraps filled with mushrooms, broccoli, carrots, and tofu. Steamed to perfection.', 135, 'https://images.unsplash.com/photo-1523905330026-b8bd1f5f3ccd?w=600&auto=format&fit=crop&q=80', true, false, 0, true, false, false, 65),
('item-8', 'cat-4', 'Crispy Fried Chicken Momo', 'Juicy chicken momos deep fried to golden crunchy perfection. Super crispy shell, tender inside.', 155, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80', false, true, 1, true, true, false, 294),
('item-9', 'cat-4', 'Kurkure Paneer Momo', 'Momo coated in a crunchy cornflake batter and deep fried. Extremely crunchy exterior served with mint mayonnaise.', 165, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80', true, false, 1, true, true, true, 310),
('item-10', 'cat-5', 'Masala French Fries', 'Crispy potato fries tossed in a spicy peri-peri and Indian chat masala blend.', 90, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80', true, false, 2, true, false, false, 150),
('item-11', 'cat-5', 'Crispy Spring Rolls (4 Pcs)', 'Crunchy wrapper stuffed with stir-fried cabbage, carrots, onions, and glass noodles. Served with sweet chili dip.', 110, 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80', true, false, 1, true, false, false, 110),
('item-12', 'cat-6', 'Virgin Mint Mojito', 'Refreshing summer beverage made with muddled mint leaves, lime juice, simple syrup, and sparkling soda over crushed ice.', 85, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80', true, false, 0, true, true, true, 220),
('item-13', 'cat-6', 'Peach Iced Tea', 'Brewed black tea infused with sweet peach syrup and fresh lemon juice, served chilled.', 80, 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80', true, false, 0, true, false, false, 125),
('item-14', 'cat-7', 'Hot Chocolate Lava Cake', 'Decadent chocolate cake with a rich molten chocolate center. Served warm.', 115, 'https://images.unsplash.com/photo-1564759224907-65b945ff0e84?w=600&auto=format&fit=crop&q=80', true, false, 0, true, true, true, 380)
ON CONFLICT (id) DO UPDATE SET
  "categoryId" = EXCLUDED."categoryId",
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  image = EXCLUDED.image,
  "isVeg" = EXCLUDED."isVeg",
  "isNonVeg" = EXCLUDED."isNonVeg",
  "spiceLevel" = EXCLUDED."spiceLevel",
  "isAvailable" = EXCLUDED."isAvailable",
  "isPopular" = EXCLUDED."isPopular",
  "isRecommended" = EXCLUDED."isRecommended",
  "popularityCount" = EXCLUDED."popularityCount";
