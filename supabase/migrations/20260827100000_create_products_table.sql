-- Migration: Authoritative Products Catalog Table
-- Provides single source of truth for product pricing in database

CREATE TABLE IF NOT EXISTS public.products (
  id text PRIMARY KEY,
  name text NOT NULL,
  origin text,
  price integer NOT NULL CHECK (price > 0), -- Price in INR
  category text NOT NULL DEFAULT 'dry-fruits',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public and authenticated read access
CREATE POLICY "Allow public read access to products"
  ON public.products FOR SELECT
  TO public, anon, authenticated
  USING (true);

-- Only admins and service_role can modify products
CREATE POLICY "Admins can insert or update products"
  ON public.products FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

GRANT SELECT ON public.products TO anon, authenticated;

-- Seed all products and gift hampers with authoritative pricing
INSERT INTO public.products (id, name, origin, price, category) VALUES
  ('kaju', 'Kaju', 'Whole Cashews W-180 · Mangalore Coast', 880, 'dry-fruits'),
  ('badam', 'Badam', 'Mamra Almonds · Kashmir Valley', 780, 'dry-fruits'),
  ('kishmish', 'Kishmish', 'Golden Raisins · Nashik', 420, 'dry-fruits'),
  ('akrot', 'Akrot', 'Walnut Kernels · Kashmir', 640, 'dry-fruits'),
  ('pista', 'Pista', 'Roasted & Salted · Kerman', 1140, 'dry-fruits'),
  ('medjoul-dates', 'Medjoul Dates', 'Jumbo Grade · Jordan Valley', 920, 'dry-fruits'),
  ('breakfast-khatta-meetha', 'Breakfast Khatta Meetha', 'Berries, seeds & cashews', 690, 'flavoured'),
  ('mix-vegetable-masala', 'Mixed Vegetable Masala', 'Savoury spiced medley', 540, 'flavoured'),
  ('kaju-thai-puff', 'Kaju Thai Puff', 'Sweet-chilli crunch coating', 720, 'flavoured'),
  ('trail-mix', 'Trail Mix', 'Seeds, berries & raisins', 610, 'flavoured'),
  ('peri-peri-kaju', 'Peri Peri Kaju', 'Fiery peri-peri cashews', 760, 'flavoured'),
  ('panchrattan', 'Panchrattan', 'Masala-roasted dry fruit mix', 700, 'flavoured'),
  ('paan-kishmish', 'Paan Kishmish', 'Betel-leaf glazed raisins', 520, 'flavoured'),
  ('blueberry-almond', 'Blueberry Almond', 'Fruit-dusted almonds', 840, 'flavoured'),
  ('paan-shots', 'Paan Shots', 'Paan-filled chocolate pearls', 580, 'flavoured'),
  ('paan-dates', 'Paan Dates', 'Dates stuffed with paan', 880, 'flavoured'),
  ('choco-dip-almonds', 'Chocodip Almonds', 'Dark chocolate coated badam', 820, 'flavoured'),
  ('royal-amethyst-casket', 'Royal Amethyst Casket', 'Handcrafted Silver Frame · Lavender Silk Potlis & Jar', 3450, 'hampers'),
  ('gulab-filigree-casket', 'The Gulab Filigree Casket', 'Intricate Silver Filigree · Rose Silk & Crystal Finial', 3850, 'hampers'),
  ('imperial-silver-basket', 'Imperial Silver Leaf Basket', 'Embossed Leaf Basket · Sage Silk & Zari Potlis with Jar', 3250, 'hampers'),
  ('zari-crimson-basket', 'Zari Crimson Festive Basket', 'Gilded Lattice Basket · Crimson Velvet Box & Golden Potlis', 2950, 'hampers')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  origin = EXCLUDED.origin,
  price = EXCLUDED.price,
  category = EXCLUDED.category,
  updated_at = now();
