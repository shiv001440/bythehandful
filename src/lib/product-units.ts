/**
 * Utility functions to extract, format, and display product packet sizes and quantities.
 */

// Suffixes often present in variant IDs (e.g. -250g, -500g, -1kg)
const VARIANT_SUFFIX_REGEX = /-(250g|500g|100g|200g|50g|1kg|1g|2g|5g)$/i;

// Regex to extract unit/weight in parentheses like (250g), (500g), (1kg), (100g), (1 Box), etc.
const PARENTHESES_UNIT_REGEX =
  /\(((?:\d+\s*(?:g|kg|gm|gms|ml|l|box|jar|piece|pc|pieces|chocolates)|luxury gift hamper|executive keepsake box|classic corporate box|signature festive box|trio grand gift box|classic trio hamper|premium basket|curated hamper|keepsake box).*?)\)$/i;

export interface ProductUnitSource {
  id?: string | null;
  product_id?: string | null;
  name?: string | null;
  unit?: string | null;
  origin?: string | null;
}

/**
 * Returns the packet unit/size for a given item (e.g. "250g", "500g", "1kg", "Luxury Gift Hamper").
 */
export function getProductPacketUnit(item?: ProductUnitSource | null): string {
  if (!item) return "250g";

  // 1. Explicit unit property
  if (item.unit && typeof item.unit === "string" && item.unit.trim()) {
    return item.unit.trim();
  }

  // 2. Unit from name in parentheses if it's an actual weight/unit (e.g. "California Almonds (500g)")
  if (item.name) {
    const match = item.name.match(PARENTHESES_UNIT_REGEX);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  // 3. Variant ID suffix (e.g. "california-almonds-500g")
  const id = item.product_id || item.id || "";
  const variantMatch = id.match(VARIANT_SUFFIX_REGEX);
  if (variantMatch && variantMatch[1]) {
    return variantMatch[1].toLowerCase();
  }

  // 4. Hampers check
  const lowerId = id.toLowerCase();
  const lowerName = (item.name || "").toLowerCase();
  if (
    lowerId.includes("hamper") ||
    lowerName.includes("hamper") ||
    lowerName.includes("chest") ||
    lowerName.includes("basket") ||
    lowerName.includes("trousseau") ||
    lowerName.includes("shagun")
  ) {
    return "Curated Hamper";
  }

  // 5. Default standard packet for dry fruits/nuts/seeds/berries
  return "250g";
}

/**
 * Strips any trailing weight/size unit in parentheses from a product name, returning the clean title.
 * e.g. "California Almonds (250g)" -> "California Almonds", while preserving brand distinctions like "Cal Almonds (Sanora)"
 */
export function getCleanProductName(name?: string | null): string {
  if (!name) return "";
  return name.replace(new RegExp(`\\s*${PARENTHESES_UNIT_REGEX.source}`, "i"), "").trim();
}
