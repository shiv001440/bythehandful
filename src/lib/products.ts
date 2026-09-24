import type { SupabaseClient } from "@supabase/supabase-js";

export interface AuthoritativeProduct {
  id: string;
  name: string;
  origin?: string;
  price: number; // Price in INR
  category?: string;
}

export const AUTHORITATIVE_PRODUCTS: Record<string, AuthoritativeProduct> = {
  // Legacy / Existing Items
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
  // --- LUXURY GIFT HAMPERS ---
  "roseate-grace": {
    id: "roseate-grace",
    name: "Roseate Grace",
    origin: "250g Almonds · 250g Cashews",
    price: 2030,
    category: "hampers-luxury",
  },
  "amethyst-elegance": {
    id: "amethyst-elegance",
    name: "Amethyst Elegance",
    origin: "250g Almonds · 250g Raisins · 250g Breakfast Khatta Meetha",
    price: 2525,
    category: "hampers-luxury",
  },
  "the-silver-empress": {
    id: "the-silver-empress",
    name: "The Silver Empress",
    origin: "500g Breakfast Khatta Meetha · 200g Almonds",
    price: 2750,
    category: "hampers-luxury",
  },
  "the-floral-jewel": {
    id: "the-floral-jewel",
    name: "The Floral Jewel",
    origin: "500g Almonds",
    price: 2030,
    category: "hampers-luxury",
  },
  "the-oval-ruby": {
    id: "the-oval-ruby",
    name: "The Oval Ruby",
    origin: "9 Chocolates · 250g Trail Mix · 250g Almonds",
    price: 2075,
    category: "hampers-luxury",
  },
  "sapphire-chest": {
    id: "sapphire-chest",
    name: "Sapphire Chest",
    origin: "9 Chocolates · 200g Almonds · 250g Raisins",
    price: 2435,
    category: "hampers-luxury",
  },
  "gajraj-royale": {
    id: "gajraj-royale",
    name: "Gajraj Royale",
    origin: "500g Almonds",
    price: 3200,
    category: "hampers-luxury",
  },
  "emerald-grace": {
    id: "emerald-grace",
    name: "Emerald Grace",
    origin: "250g Almonds · 250g Kishmish · 250g Trail Mix",
    price: 2300,
    category: "hampers-luxury",
  },
  "the-blush-royale": {
    id: "the-blush-royale",
    name: "The Blush Royale",
    origin:
      "9 Chocolates · 200g Chocolate · 200g Almonds · 200g Raisins · 250g Breakfast Khatta Meetha",
    price: 2660,
    category: "hampers-luxury",
  },
  "the-gilded-bird": {
    id: "the-gilded-bird",
    name: "The Gilded Bird",
    origin: "500g Almonds",
    price: 2435,
    category: "hampers-luxury",
  },
  "shagun-e-noor": {
    id: "shagun-e-noor",
    name: "Shagun-E-Noor",
    origin: "250g Almonds · 250g Breakfast Khatta Meetha",
    price: 3300,
    category: "hampers-luxury",
  },
  "luxe-royale": {
    id: "luxe-royale",
    name: "Luxe Royale",
    origin: "500g Breakfast Khatta Meetha",
    price: 1950,
    category: "hampers-luxury",
  },
  /* Left out for now:
  "gajraj-grandeur": {
    id: "gajraj-grandeur",
    name: "Gajraj Grandeur",
    origin: "500g Almonds · 250g Breakfast Khatta Meetha",
    price: 3200,
    category: "hampers-luxury",
  },
  */
  "maroon-majesty": {
    id: "maroon-majesty",
    name: "Maroon Majesty",
    origin: "250 gm Almonds · 250 gm Breakfast Khatta Meetha · 9 Paan Dates",
    price: 2750,
    category: "hampers-luxury",
  },
  "the-peach-affair": {
    id: "the-peach-affair",
    name: "The Peach Affair",
    origin: "250 gms Almonds · 250 gms Cashews",
    price: 3175,
    category: "hampers-luxury",
  },
  "olive-garden": {
    id: "olive-garden",
    name: "Olive Garden",
    origin: "250 gms Almonds · 250 gms Cashews",
    price: 3175,
    category: "hampers-luxury",
  },
  "lavender-opulence": {
    id: "lavender-opulence",
    name: "Lavender Opulence",
    origin: "9 Piece Chocolates · 250 gms Almonds · 250 gms Cashews",
    price: 3075,
    category: "hampers-luxury",
  },
  "the-silver-heirloom": {
    id: "the-silver-heirloom",
    name: "The Silver Heirloom",
    origin: "250 gms Almonds · 350 gms Trail mix",
    price: 3200,
    category: "hampers-luxury",
  },
  "the-royal-dynasty": {
    id: "the-royal-dynasty",
    name: "The Royal Dynasty",
    origin: "250 gms Breakfast Khatta Meetha · 250 gm Raisins · 250 gm Barari Chocolate Dates",
    price: 3750,
    category: "hampers-luxury",
  },
  "circle-of-abundance": {
    id: "circle-of-abundance",
    name: "Circle of Abundance",
    origin: "200 gms Almonds · 200 gms Raisins · 200 gms Cashews · 200 gms Pistachios",
    price: 2400,
    category: "hampers-luxury",
  },
  "the-pearl-garden": {
    id: "the-pearl-garden",
    name: "The Pearl Garden",
    origin: "9 pieces Chocolates · 200 gms Breakfast Khatta Meetha",
    price: 2400,
    category: "hampers-luxury",
  },
  "the-silver-majestic": {
    id: "the-silver-majestic",
    name: "The Silver Majestic",
    origin: "250 gms Raisins · 250 gms Almonds · 250 gms Cashews",
    price: 3200,
    category: "hampers-luxury",
  },
  "moonstone-charm": {
    id: "moonstone-charm",
    name: "Moonstone Charm",
    origin: "1/2 kg Breakfast Khatta Meetha",
    price: 1950,
    category: "hampers-luxury",
  },
  "lilac-grace": {
    id: "lilac-grace",
    name: "Lilac Grace",
    origin: "200 gms Almonds · 200 gms Trail mix",
    price: 2400,
    category: "hampers-luxury",
  },

  // --- CORPORATE GIFT HAMPERS ---
  "ivory-bloom": {
    id: "ivory-bloom",
    name: "Ivory Bloom",
    origin: "200g Almonds · 200g Trail Mix",
    price: 1000,
    category: "hampers-corporate",
  },
  "noor-mahal": {
    id: "noor-mahal",
    name: "Noor Mahal",
    origin: "250g Almonds · 250g Raisins",
    price: 975,
    category: "hampers-corporate",
  },
  "the-lotus-legacy": {
    id: "the-lotus-legacy",
    name: "The Lotus Legacy",
    origin: "200g Almonds · 200g Breakfast Khatta Meetha",
    price: 1000,
    category: "hampers-corporate",
  },
  "mint-mahal": {
    id: "mint-mahal",
    name: "Mint Mahal",
    origin: "200g Almonds · 200g Breakfast Khatta Meetha · 9 Paan Dates",
    price: 1500,
    category: "hampers-corporate",
  },
  "the-royal-heritage": {
    id: "the-royal-heritage",
    name: "The Royal Heritage",
    origin: "200g Almonds · 200g Breakfast Khatta Meetha · 9 Paan Dates",
    price: 1575,
    category: "hampers-corporate",
  },
  "the-regal-trio": {
    id: "the-regal-trio",
    name: "The Regal Trio",
    origin: "200g Almonds · 200g Cashews · 200g Raisins",
    price: 1575,
    category: "hampers-corporate",
  },
  "the-blue-dynasty": {
    id: "the-blue-dynasty",
    name: "The Blue Dynasty",
    origin: "200g Almonds · 200g Cashews · 200g Raisins · 200g Trail Mixture",
    price: 1725,
    category: "hampers-corporate",
  },
  "the-peacock-blush": {
    id: "the-peacock-blush",
    name: "The Peacock Blush",
    origin: "½ kg Trail Mixture",
    price: 2100,
    category: "hampers-corporate",
  },
  "navy-dynasty": {
    id: "navy-dynasty",
    name: "Navy Dynasty",
    origin: "250g Almonds · 250g Cashews · 250g Raisins",
    price: 1575,
    category: "hampers-corporate",
  },
  "the-midnight-basket": {
    id: "the-midnight-basket",
    name: "The Midnight Basket",
    origin: "250g Almonds · 250g Raisins · 250g Cashews",
    price: 2340,
    category: "hampers-corporate",
  },

  // --- WEDDING GIFT HAMPERS ---
  "shehnai-silver-casket": {
    id: "shehnai-silver-casket",
    name: "Shehnai Silver Trousseau Casket",
    origin: "Pure Silver Filigree Box · Saffron, Mamra & Medjool Dates",
    price: 4250,
    category: "hampers-wedding",
  },
  "maharaja-vivah-hamper": {
    id: "maharaja-vivah-hamper",
    name: "Maharaja Vivah Keepsake Hamper",
    origin: "Velvet Embroidered Chest · 4 Jars Heritage Nuts & Mithai",
    price: 4850,
    category: "hampers-wedding",
  },
  "gulab-shagun-potli-box": {
    id: "gulab-shagun-potli-box",
    name: "Gulab Shagun Potli Box",
    origin: "Gilded Floral Casket · Zari Silk Potlis with Mamra & Pistachios",
    price: 3650,
    category: "hampers-wedding",
  },
  "ananta-wedding-casket": {
    id: "ananta-wedding-casket",
    name: "Ananta Royal Wedding Casket",
    origin: "Handcrafted Lattice Basket · Dry Fruits & Cardamom",
    price: 3950,
    category: "hampers-wedding",
  },

  // --- Category: ALMONDS ---
  "california-almonds": {
    id: "california-almonds",
    name: "California Almonds",
    origin: "Premium Grade · California Orchards",
    price: 1200,
    category: "almonds",
  },
  "cal-almonds-sanora": {
    id: "cal-almonds-sanora",
    name: "Cal Almonds (Sanora)",
    origin: "Sanora Variety · California Orchards",
    price: 1800,
    category: "almonds",
  },
  "mamra-almonds": {
    id: "mamra-almonds",
    name: "Mamra Almonds",
    origin: "High-Oil Heritage Kernels · Kashmir / Iran",
    price: 4200,
    category: "almonds",
  },
  "gurbandi-almonds": {
    id: "gurbandi-almonds",
    name: "Gurbandi Almonds",
    origin: "Chhoti Giri · Rich in Natural Oils",
    price: 1500,
    category: "almonds",
  },
  "roasted-almonds": {
    id: "roasted-almonds",
    name: "Roasted Almonds",
    origin: "Slow Roasted & Lightly Salted",
    price: 1350,
    category: "almonds",
  },

  // --- Category: FLAVOURED ALMONDS ---
  "flavoured-blueberry-almonds": {
    id: "flavoured-blueberry-almonds",
    name: "Blueberry Almonds",
    origin: "Sun-Dried Wild Blueberry Glaze",
    price: 1250,
    category: "flavoured-almonds",
  },
  "flavoured-chocolate-almonds": {
    id: "flavoured-chocolate-almonds",
    name: "Chocolate Almonds",
    origin: "Artisanal Rich Dark Cocoa Coating",
    price: 1250,
    category: "flavoured-almonds",
  },
  // "flavoured-brownie-almonds": {
  //   id: "flavoured-brownie-almonds",
  //   name: "Brownie Almonds",
  //   origin: "Fudge Brownie Dusted Roasted Almonds",
  //   price: 1250,
  //   category: "flavoured-almonds",
  // },
  "flavoured-paan-almonds": {
    id: "flavoured-paan-almonds",
    name: "Paan Almonds",
    origin: "Meetha Paan & Rose Petal Glaze",
    price: 1250,
    category: "flavoured-almonds",
  },
  "flavoured-thai-puff-almonds": {
    id: "flavoured-thai-puff-almonds",
    name: "Thai Puff Almonds",
    origin: "Sweet Chilli & Kaffir Crunch",
    price: 1250,
    category: "flavoured-almonds",
  },
  "flavoured-rainbow-almonds": {
    id: "flavoured-rainbow-almonds",
    name: "Rainbow Almonds",
    origin: "Multi-Fruit Glazed Crisp Almonds",
    price: 1250,
    category: "flavoured-almonds",
  },
  "flavoured-barbeque-almonds": {
    id: "flavoured-barbeque-almonds",
    name: "Barbeque Almonds",
    origin: "Smoky Paprika & Herbs Infusion",
    price: 1250,
    category: "flavoured-almonds",
  },
  // "flavoured-gur-saunf-almonds": {
  //   id: "flavoured-gur-saunf-almonds",
  //   name: "Gur Saunf Almonds",
  //   origin: "Organic Jaggery & Fennel Seed Coating",
  //   price: 1250,
  //   category: "flavoured-almonds",
  // },
  // "flavoured-rasmalai-almonds": {
  //   id: "flavoured-rasmalai-almonds",
  //   name: "Rasmalai Almonds",
  //   origin: "Cardamom, Saffron & Cream Infused",
  //   price: 1250,
  //   category: "flavoured-almonds",
  // },
  "flavoured-rose-almonds": {
    id: "flavoured-rose-almonds",
    name: "Rose Almonds",
    origin: "Kashmiri Rose Petal Glaze",
    price: 1250,
    category: "flavoured-almonds",
  },
  "flavoured-pudina-almonds": {
    id: "flavoured-pudina-almonds",
    name: "Pudina Almonds",
    origin: "Zesty Mint & Tangy Spices",
    price: 1250,
    category: "flavoured-almonds",
  },
  "flavoured-kulfi-almonds": {
    id: "flavoured-kulfi-almonds",
    name: "Kulfi Almonds",
    origin: "Traditional Desi Kulfi Flavoured",
    price: 1250,
    category: "flavoured-almonds",
  },
  "flavoured-kali-mirch-almonds": {
    id: "flavoured-kali-mirch-almonds",
    name: "Kali Mirch Almonds",
    origin: "Fresh Crushed Malabar Black Pepper",
    price: 1250,
    category: "flavoured-almonds",
  },

  // --- Category: PISTACHIO ---
  "pista-roasted-salted-shell": {
    id: "pista-roasted-salted-shell",
    name: "Pista Roasted & Salted (Shell)",
    origin: "Jumbo In-Shell · Iranian Salted",
    price: 1900,
    category: "pistachio",
  },
  // "pista-without-shell": {
  //   id: "pista-without-shell",
  //   name: "Pista (Without Shell)",
  //   origin: "Raw Green Kernels · Premium Quality",
  //   price: 2400,
  //   category: "pistachio",
  // },

  // --- Category: CASHEW NUT ---
  "cashew-w320": {
    id: "cashew-w320",
    name: "Cashew Nuts (W 320)",
    origin: "Standard Whole Cashews · Mangalore",
    price: 1300,
    category: "cashew-nut",
  },
  "cashew-w240": {
    id: "cashew-w240",
    name: "Cashew Nuts (W 240)",
    origin: "Large Whole Kernels · Selected Grade",
    price: 1400,
    category: "cashew-nut",
  },
  "cashew-w210": {
    id: "cashew-w210",
    name: "Cashew Nuts (W 210)",
    origin: "Jumbo Whole Cashews · Superior Grade",
    price: 1600,
    category: "cashew-nut",
  },
  "cashew-w180": {
    id: "cashew-w180",
    name: "Cashew Nuts (W 180)",
    origin: "King Sized Cashews · Highest Grade",
    price: 1800,
    category: "cashew-nut",
  },
  "cashew-2-tukda": {
    id: "cashew-2-tukda",
    name: "Cashew (2 Tukda)",
    origin: "Split Halves · Clean & Sorted",
    price: 1050,
    category: "cashew-nut",
  },
  "cashew-4-tukda": {
    id: "cashew-4-tukda",
    name: "Cashew (4 Tukda)",
    origin: "Quarter Pieces · Culinary & Snacking",
    price: 950,
    category: "cashew-nut",
  },
  "cashew-roasted-salted": {
    id: "cashew-roasted-salted",
    name: "Roasted Salted Cashew",
    origin: "Slow Toasted with Sea Salt",
    price: 1350,
    category: "cashew-nut",
  },
  "cashew-peri-peri": {
    id: "cashew-peri-peri",
    name: "Peri Peri Cashew",
    origin: "Zesty Bird's Eye Chilli Seasoning",
    price: 1300,
    category: "cashew-nut",
  },
  "cashew-nut-cracker": {
    id: "cashew-nut-cracker",
    name: "Cashew Nut Cracker",
    origin: "Spiced Crisp Coated Cashews",
    price: 1300,
    category: "cashew-nut",
  },
  // "cashew-herb-cheese": {
  //   id: "cashew-herb-cheese",
  //   name: "Cashew Herb & Cheese",
  //   origin: "Italian Herbs & Aged Cheese Dusting",
  //   price: 1300,
  //   category: "cashew-nut",
  // },
  "cashew-breakfast-khatta-meetha": {
    id: "cashew-breakfast-khatta-meetha",
    name: "Breakfast Khatta Meetha",
    origin: "Sweet & Tangy Medley with Cashews",
    price: 1100,
    category: "cashew-nut",
  },
  "cashew-panchratna-mixture": {
    id: "cashew-panchratna-mixture",
    name: "Panchratna Mixture",
    origin: "Masala Roasted 5-Gem Luxury Blend",
    price: 1400,
    category: "cashew-nut",
  },
  "cashew-kaju-thai-puff": {
    id: "cashew-kaju-thai-puff",
    name: "Kaju Thai Puff",
    origin: "Thai Sweet Chilli Glaze & Crispy Crunch",
    price: 1300,
    category: "cashew-nut",
  },
  "cashew-masala": {
    id: "cashew-masala",
    name: "Cashew Masala",
    origin: "Rich Chaat Masala & Roasted Kernels",
    price: 1350,
    category: "cashew-nut",
  },
  "cashew-pudina": {
    id: "cashew-pudina",
    name: "Cashew Pudina",
    origin: "Refreshing Mint & Coriander Crust",
    price: 1350,
    category: "cashew-nut",
  },
  "cashew-kali-mirch": {
    id: "cashew-kali-mirch",
    name: "Cashew Kali Mirch",
    origin: "Crushed Black Pepper & Rock Salt",
    price: 1350,
    category: "cashew-nut",
  },
  "cashew-korean-chilli": {
    id: "cashew-korean-chilli",
    name: "Cashew Korean Chilli",
    origin: "Gochugaru Spiced Savoury Cashews",
    price: 1350,
    category: "cashew-nut",
  },

  // --- Category: RAISINS ---
  "raisins-plain": {
    id: "raisins-plain",
    name: "Raisins Plain",
    origin: "Sun-Dried Sweet Green Raisins · Nashik",
    price: 850,
    category: "raisins",
  },
  "raisins-paan-flavour": {
    id: "raisins-paan-flavour",
    name: "Raisins Paan Flavour",
    origin: "Refreshing Betel & Rose Infused",
    price: 900,
    category: "raisins",
  },
  "raisins-kala-khatta": {
    id: "raisins-kala-khatta",
    name: "Raisins Kala-Khatta Flavour",
    origin: "Tangy Jamun & Kala Khatta Dusting",
    price: 900,
    category: "raisins",
  },
  "raisins-black-kali-darak": {
    id: "raisins-black-kali-darak",
    name: "Raisins Black (Kali Darak)",
    origin: "Seedless Black Grapes · Antioxidant Rich",
    price: 750,
    category: "raisins",
  },
  "raisins-rose-malai": {
    id: "raisins-rose-malai",
    name: "Rose Malai Kishmish",
    origin: "Gulkand & Cream Glazed Raisins",
    price: 1000,
    category: "raisins",
  },
  "raisins-munakka": {
    id: "raisins-munakka",
    name: "Munakka",
    origin: "Large Seeded Ayurvedic Golden Raisins",
    price: 1200,
    category: "raisins",
  },
  "raisins-mango-kishmish": {
    id: "raisins-mango-kishmish",
    name: "Mango Kishmish",
    origin: "Alphonso Mango Pulped Raisins",
    price: 1000,
    category: "raisins",
  },

  // --- Category: WALNUT ---
  "walnuts-chille": {
    id: "walnuts-chille",
    name: "Walnuts (Chille)",
    origin: "Extra Light Halves Kernels · Kashmir",
    price: 1900,
    category: "walnut",
  },
  "walnuts-tukde": {
    id: "walnuts-tukde",
    name: "Walnuts (Tukde)",
    origin: "Broken Walnut Pieces · Kashmir",
    price: 1500,
    category: "walnut",
  },
  "walnuts-shell": {
    id: "walnuts-shell",
    name: "Walnuts (Shell)",
    origin: "Whole In-Shell Kagzi Walnuts",
    price: 1200,
    category: "walnut",
  },

  // --- Category: SAFFRON ---
  "saffron-indian-kesar": {
    id: "saffron-indian-kesar",
    name: "Indian Saffron (Kesar)",
    origin: "Pure Mongra Grade · Pampore, Kashmir",
    price: 300,
    category: "saffron",
  },
  "saffron-afghani-kesar": {
    id: "saffron-afghani-kesar",
    name: "Afghani Saffron (Kesar)",
    origin: "Super Negin Grade · Herat Valley",
    price: 350,
    category: "saffron",
  },

  // --- Category: DRIED FRUITS ---
  "df-blueberry": {
    id: "df-blueberry",
    name: "Blueberry",
    origin: "Plump Whole Dried Blueberries",
    price: 1700,
    category: "dried-fruits",
  },
  "df-black-currant": {
    id: "df-black-currant",
    name: "Black Current",
    origin: "Tart & Sweet Sun-Dried Currants",
    price: 900,
    category: "dried-fruits",
  },
  "df-cranberry": {
    id: "df-cranberry",
    name: "Cranberry",
    origin: "Whole Sliced Dried Cranberries",
    price: 750,
    category: "dried-fruits",
  },
  "df-kiwi-coin": {
    id: "df-kiwi-coin",
    name: "Kiwi Coin",
    origin: "Dehydrated Kiwi Slices",
    price: 650,
    category: "dried-fruits",
  },
  "df-mango-slices": {
    id: "df-mango-slices",
    name: "Mango Slices",
    origin: "Sweet Dehydrated Mango Strips",
    price: 850,
    category: "dried-fruits",
  },
  "df-pineapple-coin": {
    id: "df-pineapple-coin",
    name: "Pineapple Coin",
    origin: "Naturally Sweet Pineapple Rings",
    price: 850,
    category: "dried-fruits",
  },
  "df-strawberries": {
    id: "df-strawberries",
    name: "Strawberries",
    origin: "Whole Sun-Dried Sweet Strawberries",
    price: 900,
    category: "dried-fruits",
  },
  "df-cherry": {
    id: "df-cherry",
    name: "Cherry",
    origin: "Sweet Dried Red Cherries",
    price: 800,
    category: "dried-fruits",
  },
  "df-fruit-cocktail": {
    id: "df-fruit-cocktail",
    name: "Fruit Cocktail",
    origin: "Medley of Exotic Dehydrated Fruits",
    price: 800,
    category: "dried-fruits",
  },
  "df-mixed-berries": {
    id: "df-mixed-berries",
    name: "Mixed Berries",
    origin: "Cranberry, Blueberry, Strawberry Blend",
    price: 1000,
    category: "dried-fruits",
  },
  "df-mix-fruit-milk-chocodip": {
    id: "df-mix-fruit-milk-chocodip",
    name: "Mix Fruit Milk Chocodip",
    origin: "Dehydrated Fruits in Creamy Milk Chocolate",
    price: 1000,
    category: "dried-fruits",
  },
  "df-dried-apricot": {
    id: "df-dried-apricot",
    name: "Dried Apricot",
    origin: "Sun-Cured Turkish Khubani",
    price: 1200,
    category: "dried-fruits",
  },
  "df-prunes": {
    id: "df-prunes",
    name: "Prunes",
    origin: "Pitted Californian Sun-Dried Prunes",
    price: 1100,
    category: "dried-fruits",
  },
  "df-mix-fruit-chatpata": {
    id: "df-mix-fruit-chatpata",
    name: "Mix Fruit Chatpata",
    origin: "Spiced & Tangy Dried Fruit Chunks",
    price: 1000,
    category: "dried-fruits",
  },

  // --- Category: EXOTIC NUTS ---
  "exotic-brazil-nuts": {
    id: "exotic-brazil-nuts",
    name: "Brazil Nuts",
    origin: "Whole Amazonian Brazil Nuts · Selenium Rich",
    price: 3400,
    category: "exotic-nuts",
  },
  "exotic-pine-nuts-shell": {
    id: "exotic-pine-nuts-shell",
    name: "Pine Nuts (Shell)",
    origin: "Chilgoza In-Shell · Himalayan Pine",
    price: 3600,
    category: "exotic-nuts",
  },
  "exotic-pine-nuts-without-shell": {
    id: "exotic-pine-nuts-without-shell",
    name: "Pine Nuts (Without Shell)",
    origin: "Raw Chilgoza Kernels · Pristine Quality",
    price: 6500,
    category: "exotic-nuts",
  },
  "exotic-hazelnut": {
    id: "exotic-hazelnut",
    name: "Hazelnut",
    origin: "Roasted Filbert Kernels · Turkey",
    price: 2600,
    category: "exotic-nuts",
  },
  "exotic-pecan-nuts": {
    id: "exotic-pecan-nuts",
    name: "Pecan Nuts",
    origin: "Buttery American Pecan Halves",
    price: 2200,
    category: "exotic-nuts",
  },
  "exotic-macadamia-nut": {
    id: "exotic-macadamia-nut",
    name: "Macadamia Nut",
    origin: "Rich Creamy Whole Macadamias · Australia",
    price: 2900,
    category: "exotic-nuts",
  },
  "exotic-pecan-vanilla": {
    id: "exotic-pecan-vanilla",
    name: "Pecan Vanilla",
    origin: "Vanilla Glazed Crunchy Pecans",
    price: 1300,
    category: "exotic-nuts",
  },
  "exotic-tiger-nut": {
    id: "exotic-tiger-nut",
    name: "Tiger Nut",
    origin: "Nutritious Sweet Earthy Chufa",
    price: 1100,
    category: "exotic-nuts",
  },

  // --- Category: SEEDS ---
  "seeds-pumpkin": {
    id: "seeds-pumpkin",
    name: "Pumpkin Seeds",
    origin: "AAA Grade Green Pepitas",
    price: 800,
    category: "seeds",
  },
  "seeds-sunflower": {
    id: "seeds-sunflower",
    name: "Sunflower Seeds",
    origin: "Raw Shelled Sunflower Kernels",
    price: 500,
    category: "seeds",
  },
  "seeds-flax": {
    id: "seeds-flax",
    name: "Flax Seeds",
    origin: "Golden Brown Omega-3 Rich Seeds",
    price: 400,
    category: "seeds",
  },
  "seeds-chia": {
    id: "seeds-chia",
    name: "Chia Seeds",
    origin: "Organic Black Chia Seeds",
    price: 600,
    category: "seeds",
  },
  "seeds-quinoa": {
    id: "seeds-quinoa",
    name: "Quinoa Seeds",
    origin: "Whole White Royal Quinoa Grain",
    price: 350,
    category: "seeds",
  },
  "seeds-watermelon": {
    id: "seeds-watermelon",
    name: "Watermelon Seeds",
    origin: "Magaz Kernels · Shelled Watermelon Seeds",
    price: 950,
    category: "seeds",
  },
  "seeds-melon": {
    id: "seeds-melon",
    name: "Melon Seeds",
    origin: "Shelled Kharbooza Seeds",
    price: 950,
    category: "seeds",
  },
  "seeds-mixed-with-berries": {
    id: "seeds-mixed-with-berries",
    name: "Mixed Seeds With Berries",
    origin: "7-Seed & Berry Superfood Power Mix",
    price: 800,
    category: "seeds",
  },

  // --- Category: SPECIAL ---
  "special-cardamom-8mm-bold": {
    id: "special-cardamom-8mm-bold",
    name: "Cardamom (8mm Bold)",
    origin: "Extra Bold Green Elaichi · Idukki, Kerala",
    price: 4500,
    category: "special",
  },
  "special-silver-cardamom": {
    id: "special-silver-cardamom",
    name: "Silver Cardamom",
    origin: "Silver Leaf Coated Royal Cardamom",
    price: 2700,
    category: "special",
  },
  "special-dry-dates": {
    id: "special-dry-dates",
    name: "Dry Dates",
    origin: "Yellow & Brown Chuara",
    price: 500,
    category: "special",
  },
  "special-anjeer": {
    id: "special-anjeer",
    name: "Anjeer",
    origin: "Handpicked Large Afghani Figs",
    price: 1950,
    category: "special",
  },
  "special-mishri-kesar": {
    id: "special-mishri-kesar",
    name: "Mishri Kesar",
    origin: "Rock Sugar Infused with Pure Saffron",
    price: 400,
    category: "special",
  },
  "special-khurbani": {
    id: "special-khurbani",
    name: "Khurbani",
    origin: "Dried Wild Mountain Apricots",
    price: 800,
    category: "special",
  },
  "special-amla-candy": {
    id: "special-amla-candy",
    name: "Amla Candy",
    origin: "Sweet & Tangy Indian Gooseberry Chunks",
    price: 600,
    category: "special",
  },
  "special-paan-khajoor-box": {
    id: "special-paan-khajoor-box",
    name: "Paan Khajoor (400gms in Box)",
    origin: "Meetha Paan Stuffed Dates Box",
    price: 400,
    category: "special",
  },
  "special-amla-muraba-1kg": {
    id: "special-amla-muraba-1kg",
    name: "Amla Muraba 1kg",
    origin: "Traditional Sweet Herbal Preserve",
    price: 375,
    category: "special",
  },
  "special-paanshots": {
    id: "special-paanshots",
    name: "Paanshots",
    origin: "Refreshing Paan Chocolate Bombs",
    price: 900,
    category: "special",
  },
  "special-dates-frad": {
    id: "special-dates-frad",
    name: "Dates (Frad)",
    origin: "Oman Fardh Sweet Dark Dates",
    price: 700,
    category: "special",
  },
  "special-dates-medjoul": {
    id: "special-dates-medjoul",
    name: "Dates (Medjoul)",
    origin: "Large Meaty King Medjool Dates",
    price: 1400,
    category: "special",
  },
  "special-dates-paan": {
    id: "special-dates-paan",
    name: "Dates (Paan)",
    origin: "Stuffed with Gulkand & Paan Masala",
    price: 1200,
    category: "special",
  },
  "special-dates-dryfruit": {
    id: "special-dates-dryfruit",
    name: "Dates Dryfruit",
    origin: "Pitted Dates Stuffed with Almonds & Cashews",
    price: 1200,
    category: "special",
  },
  "special-shahi-nut": {
    id: "special-shahi-nut",
    name: "Shahi Nut",
    origin: "Royal Saffron Flavoured Nut Blend",
    price: 1000,
    category: "special",
  },

  // --- Category: HEALTHY BITES ---
  "hb-granola-bites": {
    id: "hb-granola-bites",
    name: "Granola Bites",
    origin: "Oats, Honey & Dry Fruit Energy Clusters",
    price: 900,
    category: "healthy-bites",
  },
  "hb-stone-chocolate": {
    id: "hb-stone-chocolate",
    name: "Stone Chocolate",
    origin: "River Stone Shaped Milk Chocolate Candy",
    price: 750,
    category: "healthy-bites",
  },
  "hb-fruit-nut-muesli": {
    id: "hb-fruit-nut-muesli",
    name: "Fruit & Nut Muesli",
    origin: "Rolled Grains with Fruits & Nuts",
    price: 800,
    category: "healthy-bites",
  },
  "hb-dry-fruit-laddoo": {
    id: "hb-dry-fruit-laddoo",
    name: "Dry Fruit Laddoo",
    origin: "Sugar-Free Pure Ghee Dry Fruit Bites",
    price: 1000,
    category: "healthy-bites",
  },
  "hb-mixed-vegetable-masala": {
    id: "hb-mixed-vegetable-masala",
    name: "Mixed Vegetable Masala",
    origin: "Vacuum-Fried Crispy Spiced Veggies",
    price: 1200,
    category: "healthy-bites",
  },
  "hb-dried-fruit-masala": {
    id: "hb-dried-fruit-masala",
    name: "Dried Fruit Masala",
    origin: "Spiced Masala Roasted Fruit & Nut Medley",
    price: 1400,
    category: "healthy-bites",
  },

  // --- Category: MAKHANAS ---
  "makhana-plain": {
    id: "makhana-plain",
    name: "Makhana Plain",
    origin: "Jumbo Fox Nuts (Phool Makhana) · Bihar",
    price: 1600,
    category: "makhanas",
  },

  // --- Category: OIL ---
  "oil-almond-100ml": {
    id: "oil-almond-100ml",
    name: "Almond Oil (100ml)",
    origin: "100% Pure Cold Pressed Roghan Badam Shirin",
    price: 1200,
    category: "oil",
  },
};

export const STANDARD_SHIPPING_FEE = 99; // Fixed flat shipping fee in INR

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
