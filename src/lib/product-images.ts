import almonds from "@/assets/product-almonds.jpg";
import cashews from "@/assets/product-cashews.jpg";
import pistachios from "@/assets/product-pistachios.jpg";
import walnuts from "@/assets/product-walnuts.jpg";
import dates from "@/assets/product-dates.jpg";
import apricots from "@/assets/product-apricots.jpg";
import kishmishImg from "@/assets/product-kishmish.jpg";
import mixVegImg from "@/assets/product-mix-veg-masala.jpg";
import paanKishmishImg from "@/assets/product-paan-kishmish.jpg";
import paanDatesImg from "@/assets/product-paan-dates.jpg";
import trailMix from "@/assets/trail-mix.jpeg";
import chocoDip from "@/assets/choco-dip-almonds.jpeg";
import blueberryAlmonds from "@/assets/blueberry-almonds.jpeg";
import kajuThaiPuff from "@/assets/kaju-thai-puff.jpeg";
import kajuPeriPeri from "@/assets/kaju-peri-peri.jpeg";
import paanShots from "@/assets/paan-shots.jpeg";
import khattaMeetha from "@/assets/breakfast-khatta-meetha.jpeg";
import panchrattan from "@/assets/panchrattan.jpeg";
import hamperLavenderSilver from "@/assets/hamper-lavender-silver.jpg";
import hamperRoseFiligree from "@/assets/hamper-rose-filigree.jpg";
import hamperSageSilver from "@/assets/hamper-sage-silver.jpg";
import hamperCrimsonGold from "@/assets/hamper-crimson-gold.jpg";

export const PRODUCT_IMAGE_MAP: Record<string, string> = {
  kaju: cashews,
  badam: almonds,
  kishmish: kishmishImg,
  akrot: walnuts,
  pista: pistachios,
  "medjoul-dates": dates,
  apricots: apricots,
  "breakfast-khatta-meetha": khattaMeetha,
  "mix-vegetable-masala": mixVegImg,
  "kaju-thai-puff": kajuThaiPuff,
  "trail-mix": trailMix,
  "peri-peri-kaju": kajuPeriPeri,
  panchrattan: panchrattan,
  "paan-kishmish": paanKishmishImg,
  "blueberry-almond": blueberryAlmonds,
  "paan-shots": paanShots,
  "paan-dates": paanDatesImg,
  "choco-dip-almonds": chocoDip,
  "royal-amethyst-casket": hamperLavenderSilver,
  "gulab-filigree-casket": hamperRoseFiligree,
  "imperial-silver-basket": hamperSageSilver,
  "zari-crimson-basket": hamperCrimsonGold,
};

/**
 * Returns a valid, production-bundled asset URL for a product or order item.
 * Automatically resolves dev URLs (e.g. /src/assets/...) to production hashed assets.
 */
export function getProductImage(
  productId?: string | null,
  imageUrl?: string | null,
  name?: string | null,
): string {
  if (productId && PRODUCT_IMAGE_MAP[productId]) {
    return PRODUCT_IMAGE_MAP[productId];
  }

  // If a valid remote image URL or production asset URL is passed and it's not a dev path
  if (
    imageUrl &&
    !imageUrl.startsWith("/src/assets/") &&
    (imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://") ||
      imageUrl.startsWith("data:") ||
      imageUrl.startsWith("/assets/"))
  ) {
    return imageUrl;
  }

  // Fallback by name lookup if product_id is missing or doesn't match directly
  if (name) {
    const lower = name.toLowerCase();
    for (const [key, asset] of Object.entries(PRODUCT_IMAGE_MAP)) {
      if (lower.includes(key.replace(/-/g, " ")) || key.replace(/-/g, " ").includes(lower)) {
        return asset;
      }
    }
  }

  // Default fallback image
  return cashews;
}
