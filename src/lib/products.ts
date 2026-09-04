import type { SupabaseClient } from "@supabase/supabase-js";

export interface AuthoritativeProduct {
  id: string;
  name: string;
  origin?: string;
  price: number; // Price in INR
  category?: string;
}

export const AUTHORITATIVE_PRODUCTS: Record<string, AuthoritativeProduct> = {
  kaju: {
    id: "kaju",
    name: "Kaju",
    origin: "Whole Cashews W-180 · Mangalore Coast",
    price: 880,
    category: "dry-fruits",
  },
  badam: {
    id: "badam",
    name: "Badam",
    origin: "Mamra Almonds · Kashmir Valley",
    price: 780,
    category: "dry-fruits",
  },
  kishmish: {
    id: "kishmish",
    name: "Kishmish",
    origin: "Golden Raisins · Nashik",
    price: 420,
    category: "dry-fruits",
  },
  akrot: {
    id: "akrot",
    name: "Akrot",
    origin: "Walnut Kernels · Kashmir",
    price: 640,
    category: "dry-fruits",
  },
  pista: {
    id: "pista",
    name: "Pista",
    origin: "Roasted & Salted · Kerman",
    price: 1140,
    category: "dry-fruits",
  },
  "medjoul-dates": {
    id: "medjoul-dates",
    name: "Medjoul Dates",
    origin: "Jumbo Grade · Jordan Valley",
    price: 920,
    category: "dry-fruits",
  },
  "breakfast-khatta-meetha": {
    id: "breakfast-khatta-meetha",
    name: "Breakfast Khatta Meetha",
    origin: "Berries, seeds & cashews",
    price: 690,
    category: "flavoured",
  },
  "mix-vegetable-masala": {
    id: "mix-vegetable-masala",
    name: "Mixed Vegetable Masala",
    origin: "Savoury spiced medley",
    price: 540,
    category: "flavoured",
  },
  "kaju-thai-puff": {
    id: "kaju-thai-puff",
    name: "Kaju Thai Puff",
    origin: "Sweet-chilli crunch coating",
    price: 720,
    category: "flavoured",
  },
  "trail-mix": {
    id: "trail-mix",
    name: "Trail Mix",
    origin: "Seeds, berries & raisins",
    price: 610,
    category: "flavoured",
  },
  "peri-peri-kaju": {
    id: "peri-peri-kaju",
    name: "Peri Peri Kaju",
    origin: "Fiery peri-peri cashews",
    price: 760,
    category: "flavoured",
  },
  panchrattan: {
    id: "panchrattan",
    name: "Panchrattan",
    origin: "Masala-roasted dry fruit mix",
    price: 700,
    category: "flavoured",
  },
  "paan-kishmish": {
    id: "paan-kishmish",
    name: "Paan Kishmish",
    origin: "Betel-leaf glazed raisins",
    price: 520,
    category: "flavoured",
  },
  "blueberry-almond": {
    id: "blueberry-almond",
    name: "Blueberry Almond",
    origin: "Fruit-dusted almonds",
    price: 840,
    category: "flavoured",
  },
  "paan-shots": {
    id: "paan-shots",
    name: "Paan Shots",
    origin: "Paan-filled chocolate pearls",
    price: 580,
    category: "flavoured",
  },
  "paan-dates": {
    id: "paan-dates",
    name: "Paan Dates",
    origin: "Dates stuffed with paan",
    price: 880,
    category: "flavoured",
  },
  "choco-dip-almonds": {
    id: "choco-dip-almonds",
    name: "Chocodip Almonds",
    origin: "Dark chocolate coated badam",
    price: 820,
    category: "flavoured",
  },
  "royal-amethyst-casket": {
    id: "royal-amethyst-casket",
    name: "Royal Amethyst Casket",
    origin: "Handcrafted Silver Frame · Lavender Silk Potlis & Jar",
    price: 3450,
    category: "hampers",
  },
  "gulab-filigree-casket": {
    id: "gulab-filigree-casket",
    name: "The Gulab Filigree Casket",
    origin: "Intricate Silver Filigree · Rose Silk & Crystal Finial",
    price: 3850,
    category: "hampers",
  },
  "imperial-silver-basket": {
    id: "imperial-silver-basket",
    name: "Imperial Silver Leaf Basket",
    origin: "Embossed Leaf Basket · Sage Silk & Zari Potlis with Jar",
    price: 3250,
    category: "hampers",
  },
  "zari-crimson-basket": {
    id: "zari-crimson-basket",
    name: "Zari Crimson Festive Basket",
    origin: "Gilded Lattice Basket · Crimson Velvet Box & Golden Potlis",
    price: 2950,
    category: "hampers",
  },
};

export const STANDARD_SHIPPING_FEE = 10; // Fixed flat shipping fee in INR

export interface VerifiedOrderItem {
  id: string;
  name: string;
  origin?: string;
  price: number; // Authoritative price in INR
  qty: number;
  lineTotal: number;
}

export interface VerifiedOrderCalculation {
  items: VerifiedOrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  amountInPaise: number;
}

/**
 * Calculates authoritative order totals server-side.
 * Looks up product prices from the database `products` table if accessible,
 * falling back to the authoritative catalog.
 * ANY client-provided price, subtotal, shipping fee, or discount is IGNORED.
 */
export async function calculateAuthoritativeOrderPricing(
  items: { id: string; qty: number; price?: number }[],
  supabase?: SupabaseClient,
): Promise<VerifiedOrderCalculation> {
  if (!items || items.length === 0) {
    throw new Error("Cart cannot be empty");
  }

  const productIds = Array.from(new Set(items.map((i) => i.id)));

  // Try fetching authoritative prices from Supabase products table
  const dbPriceMap = new Map<string, { name: string; price: number; origin?: string }>();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, origin, price")
        .in("id", productIds);

      if (!error && data && data.length > 0) {
        for (const row of data) {
          dbPriceMap.set(row.id, {
            name: row.name,
            price: Number(row.price),
            origin: row.origin || undefined,
          });
        }
      }
    } catch {
      // Fall back gracefully to authoritative catalog map
    }
  }

  const verifiedItems: VerifiedOrderItem[] = items.map((item) => {
    if (!item.id) {
      throw new Error("Invalid cart item: missing product ID");
    }

    const qty = Math.floor(Number(item.qty));
    if (isNaN(qty) || qty <= 0) {
      throw new Error(`Invalid quantity for product ${item.id}`);
    }

    // Lookup authoritative price (DB first, then fallback to authoritative catalog)
    const dbProduct = dbPriceMap.get(item.id);
    const catalogProduct = AUTHORITATIVE_PRODUCTS[item.id];

    if (!dbProduct && !catalogProduct) {
      throw new Error(`Product '${item.id}' does not exist in the authoritative catalog.`);
    }

    const authoritativePrice = dbProduct?.price ?? catalogProduct.price;
    const name = dbProduct?.name ?? catalogProduct.name;
    const origin = dbProduct?.origin ?? catalogProduct.origin;

    // Client price is completely ignored; lineTotal computed from authoritativePrice
    const lineTotal = authoritativePrice * qty;

    return {
      id: item.id,
      name,
      origin,
      price: authoritativePrice,
      qty,
      lineTotal,
    };
  });

  const subtotal = verifiedItems.reduce((acc, item) => acc + item.lineTotal, 0);
  const shipping = STANDARD_SHIPPING_FEE;
  const total = subtotal + shipping;
  const amountInPaise = Math.round(total * 100);

  return {
    items: verifiedItems,
    subtotal,
    shipping,
    total,
    amountInPaise,
  };
}
