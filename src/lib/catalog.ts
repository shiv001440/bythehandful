import { AUTHORITATIVE_PRODUCTS } from "./products";

export type Product = {
  id: string;
  name: string;
  origin?: string;
  price: number;
  img: string;
  unit?: string;
  category?: string;
  variants?: { idSuffix: string; unit: string; price: number }[];
};

import kajuPeriPeri from "@/assets/cashew/kaju-peri-peri.jpeg";
import paanShots from "@/assets/special/paan-shots.jpeg";
import anjeerImg from "@/assets/special/anjeer.jpeg";
import fardDatesImg from "@/assets/special/fard-dates.jpeg";
import medjoulDatesImg from "@/assets/special/medjoul-dates.jpeg";
import medjoulDatesJumboImg from "@/assets/special/medjoul-dates-jumbo.jpeg";
import paanMedjoulDatesImg from "@/assets/special/paan-mejoul-dates.jpeg";
import dryFruitLaddooImg from "@/assets/healthy-bites/dry-fruit-laddoo.jpeg";
// Luxury Hampers
import roseateGraceImg from "@/assets/luxury-hampers/roseate-grace.jpeg";
import amethystEleganceImg from "@/assets/luxury-hampers/amethyst-elegance.jpeg";
import silverEmpressImg from "@/assets/luxury-hampers/the-silver-empress.jpeg";
import floralJewelImg from "@/assets/luxury-hampers/the-floral-jewel.jpeg";
import ovalRubyImg from "@/assets/luxury-hampers/the-oval-ruby.jpeg";
import sapphireChestImg from "@/assets/luxury-hampers/sapphire-chest.jpeg";
import gajrajRoyaleImg from "@/assets/luxury-hampers/gajraj-royale.jpeg";
import emeraldGraceImg from "@/assets/luxury-hampers/emerald-grace.jpeg";
import blushRoyaleImg from "@/assets/luxury-hampers/the-blush-royale.jpeg";
import gildedBirdImg from "@/assets/luxury-hampers/the-gilded-bird.jpeg";
import shagunENoorImg from "@/assets/luxury-hampers/shagun-e-noor.jpeg";
import luxeRoyaleImg from "@/assets/luxury-hampers/luxe-florale.jpeg";
import gajrajGrandeurImg from "@/assets/luxury-hampers/gajraj-grandeur.jpeg";
import maroonMajestyImg from "@/assets/luxury-hampers/maroon-majesty.jpeg";
import thePeachAffairImg from "@/assets/luxury-hampers/the-peach-affair.jpeg";
import oliveGardenImg from "@/assets/luxury-hampers/olive-garden.jpeg";
import lavenderOpulenceImg from "@/assets/luxury-hampers/lavender-opulence.jpeg";
import theSilverHeirloomImg from "@/assets/luxury-hampers/the-silver-heirloom.jpeg";
import theRoyalDynastyImg from "@/assets/luxury-hampers/the-royal-dynasty.jpeg";
import circleOfAbundanceImg from "@/assets/luxury-hampers/circle-of-abundance.jpeg";
import thePearlGardenImg from "@/assets/luxury-hampers/the-pearl-garden.jpeg";
import theSilverMajesticImg from "@/assets/luxury-hampers/the-silver-majestic.jpeg";
import moonstoneCharmImg from "@/assets/luxury-hampers/moonstone-charm.jpeg";
import lilacGraceImg from "@/assets/luxury-hampers/lilac-grace.jpeg";
// Corporate Hampers
import ivoryBloomImg from "@/assets/corporate-hampers/ivory-bloom.jpeg";
import noorMahalImg from "@/assets/corporate-hampers/noor-mahal.jpeg";
import lotusLegacyImg from "@/assets/corporate-hampers/the-lotus-legacy.jpeg";
import mintMahalImg from "@/assets/corporate-hampers/mint-mahal.jpeg";
import royalHeritageImg from "@/assets/corporate-hampers/the-royal-heritage.jpeg";
import regalTrioImg from "@/assets/corporate-hampers/the-regal-trio.jpeg";
import blueDynastyImg from "@/assets/corporate-hampers/the-blue-dynasty.jpeg";
import peacockBlushImg from "@/assets/corporate-hampers/the-peacock-blush.jpeg";
import navyDynastyImg from "@/assets/corporate-hampers/navy-dynasty.jpeg";
import midnightBasketImg from "@/assets/corporate-hampers/the-midnight-basket.jpeg";
// Exotic Nuts
import brazilNutsImg from "@/assets/exotic-nuts/brazil-nuts.jpeg";
import macadamiaNutsImg from "@/assets/exotic-nuts/macadamia-nuts.jpeg";
import pecanNutsImg from "@/assets/exotic-nuts/pecan-nuts.jpeg";
import pecanVanillaImg from "@/assets/exotic-nuts/pecan-vanilla.jpeg";
import pineNutsImg from "@/assets/exotic-nuts/pine-nuts.jpeg";
import hazelnutImg from "@/assets/exotic-nuts/hazelnut.jpeg";
// Cashew Varieties
import cashewBreakfastKhattaMeethaImg from "@/assets/cashew/breakfast-khatta-meetha.jpeg";
import cashewKaliMirchImg from "@/assets/cashew/cashew-kali-mirch.jpeg";
import cashewKoreanChilliImg from "@/assets/cashew/cashew-korean-chilli.jpeg";
import cashewNutCrackerImg from "@/assets/cashew/cashew-nut-cracker.jpeg";
import cashewPudinaImg from "@/assets/cashew/cashew-pudina.jpeg";
import cashewKajuThaiPuffImg from "@/assets/cashew/kaju-thai-puff.jpeg";
import cashewPanchratnaMixtureImg from "@/assets/cashew/panchratna-mixture.jpeg";
import cashewPeriPeriImg from "@/assets/cashew/peri-peri-cashew.jpeg";
import roastedCashew240Img from "@/assets/cashew/roasted-cashew-240.jpeg";
import cashew2TukdaImg from "@/assets/cashew/cashew-2-tukda.jpeg";
import cashew240Img from "@/assets/cashew/cashew-240.jpeg";
import cashew320Img from "@/assets/cashew/cashew-320.jpeg";
import cashew210Img from "@/assets/cashew/cashew-210.jpeg";
// Seeds
import chiaSeedsImg from "@/assets/seeds/chia-seeds.jpeg";
import flaxSeedsImg from "@/assets/seeds/flax-seeds.jpeg";
import melonSeedsImg from "@/assets/seeds/melon-seeds.jpeg";
import mixedSeedsWithBerriesImg from "@/assets/seeds/mixed-seeds-with-berries.jpeg";
import pumpkinSeedsImg from "@/assets/seeds/pumpkin-seeds.jpeg";
import sunflowerSeedsImg from "@/assets/seeds/sunflower-seeds.jpeg";
// Dehydrated / Dried Fruits
import driedBlueberryImg from "@/assets/dehydrated/dried-blueberry.jpeg";
import driedCranberryImg from "@/assets/dehydrated/dried-cranberry.jpeg";
import mangoSlicesImg from "@/assets/dehydrated/mango-slices.jpeg";
import mixedBerriesImg from "@/assets/dehydrated/mixed-berries.jpeg";
import blackCurrantImg from "@/assets/dehydrated/black-current.jpeg";
import driedCherryImg from "@/assets/dehydrated/dried-cherry.jpeg";
import fruitAndNutMuesliImg from "@/assets/dehydrated/fruit-and-nut-muesli.jpeg";
import fruitCocktailImg from "@/assets/dehydrated/fruit-cocktail.jpeg";
import kiwiCoinImg from "@/assets/dehydrated/kiwi-coin.jpeg";
import mixFruitMilkChocoDipImg from "@/assets/dehydrated/mix-fruit-milk-choco-dip.jpeg";
import pineappleCoinImg from "@/assets/dehydrated/pineapple-coin.jpeg";
import driedStrawberryImg from "@/assets/dehydrated/dried-strawberry.jpeg";
import prunesImg from "@/assets/dehydrated/prunes.jpeg";
import mixFruitChatpataImg from "@/assets/dehydrated/mix-fruit-chatpata.jpeg";
import driedApricotImg from "@/assets/dehydrated/dried-apricot.jpeg";
// Raisins
import raisinKalaKhattaImg from "@/assets/raisin/raisin-kala-khatta.jpeg";
import raisinPaanImg from "@/assets/raisin/raisin-paan.jpeg";
import munakkaImg from "@/assets/raisin/munakka.jpeg";
import raisinsPlainImg from "@/assets/raisin/raisins.jpeg";
import roseMalaiKishmishImg from "@/assets/raisin/rose-malai-kishmish.jpeg";
import blackRaisinImg from "@/assets/raisin/black-raisin.jpeg";
import mangoRaisinImg from "@/assets/raisin/mango-raisin.jpeg";
// Walnuts
import walnutChilleImg from "@/assets/walnut/walnut-chille.jpeg";
import walnutShellImg from "@/assets/walnut/walnut-shell.jpeg";
// Almonds
import almondThaiPuffImg from "@/assets/almond/almond-thai-puff.jpeg";
import barbequeAlmondImg from "@/assets/almond/barbeque-almond.jpeg";
import almondBlueberryImg from "@/assets/almond/blueberry-almond.jpeg";
import gurbandiAlmondImg from "@/assets/almond/gurbandi-almond.jpeg";
import kaliMirchAlmondsImg from "@/assets/almond/kali-mirch-almonds.jpeg";
import mamraAlmondImg from "@/assets/almond/mamra-almond.jpeg";
import paanAlmondImg from "@/assets/almond/paan-almond.jpeg";
import pudinaAlmondImg from "@/assets/almond/pudina-almond.jpeg";
import rainbowAlmondImg from "@/assets/almond/rainbow-almond.jpeg";
import roastedAlmondImg from "@/assets/almond/roasted-almond.jpeg";
import roseAlmondImg from "@/assets/almond/rose-almond.jpeg";
import californiaAlmondImg from "@/assets/almond/california-almond.jpeg";
import chocolateAlmondImg from "@/assets/almond/chocolate-almond.jpeg";
import kulfiAlmondImg from "@/assets/almond/kulfi-almond.jpeg";
import sanoraAlmondImg from "@/assets/almond/sanora-almond.jpeg";
import pistaShellImg from "@/assets/pista/pista-shell.jpeg";

export {
  shagunENoorImg,
  moonstoneCharmImg,
  sapphireChestImg,
  roseateGraceImg,
  amethystEleganceImg,
  maroonMajestyImg,
};

// --- GIFT HAMPERS: 3 CATEGORIES (Corporate, Luxury, Wedding) ---

const corporateHampers: Product[] = [
  {
    ...AUTHORITATIVE_PRODUCTS["ivory-bloom"],
    img: ivoryBloomImg,
    unit: "Executive Keepsake Box",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["noor-mahal"],
    img: noorMahalImg,
    unit: "Classic Corporate Box",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["the-lotus-legacy"],
    img: lotusLegacyImg,
    unit: "Heritage Corporate Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["mint-mahal"],
    img: mintMahalImg,
    unit: "Signature Festive Box",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["the-royal-heritage"],
    img: royalHeritageImg,
    unit: "Luxury Celebration Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["the-regal-trio"],
    img: regalTrioImg,
    unit: "Trio Grand Gift Box",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["the-blue-dynasty"],
    img: blueDynastyImg,
    unit: "Imperial 4-Jar Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["the-peacock-blush"],
    img: peacockBlushImg,
    unit: "Signature Trail Box",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["navy-dynasty"],
    img: navyDynastyImg,
    unit: "Classic Trio Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["the-midnight-basket"],
    img: midnightBasketImg,
    unit: "Premium Basket",
  },
];

const luxuryHampers: Product[] = [
  {
    ...AUTHORITATIVE_PRODUCTS["roseate-grace"],
    img: roseateGraceImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["amethyst-elegance"],
    img: amethystEleganceImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["the-silver-empress"],
    img: silverEmpressImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["the-floral-jewel"],
    img: floralJewelImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["the-oval-ruby"],
    img: ovalRubyImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["sapphire-chest"],
    img: sapphireChestImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["gajraj-royale"],
    img: gajrajRoyaleImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["emerald-grace"],
    img: emeraldGraceImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["the-blush-royale"],
    img: blushRoyaleImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["the-gilded-bird"],
    img: gildedBirdImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["shagun-e-noor"],
    img: shagunENoorImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["luxe-royale"],
    img: luxeRoyaleImg,
    unit: "Luxury Gift Hamper",
  },
  /* Left out for now:
  {
    ...AUTHORITATIVE_PRODUCTS["gajraj-grandeur"],
    img: gajrajGrandeurImg,
    unit: "Luxury Gift Hamper",
  },
  */
  {
    ...AUTHORITATIVE_PRODUCTS["maroon-majesty"],
    img: maroonMajestyImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["the-peach-affair"],
    img: thePeachAffairImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["olive-garden"],
    img: oliveGardenImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["lavender-opulence"],
    img: lavenderOpulenceImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["the-silver-heirloom"],
    img: theSilverHeirloomImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["the-royal-dynasty"],
    img: theRoyalDynastyImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["circle-of-abundance"],
    img: circleOfAbundanceImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["the-pearl-garden"],
    img: thePearlGardenImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["the-silver-majestic"],
    img: theSilverMajesticImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["moonstone-charm"],
    img: moonstoneCharmImg,
    unit: "Luxury Gift Hamper",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["lilac-grace"],
    img: lilacGraceImg,
    unit: "Luxury Gift Hamper",
  },
];

const weddingHampers: Product[] = [
  {
    ...AUTHORITATIVE_PRODUCTS["shehnai-silver-casket"],
    img: shagunENoorImg,
    unit: "Wedding Trousseau Keepsake",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["maharaja-vivah-hamper"],
    img: gajrajRoyaleImg,
    unit: "Royal Wedding Chest",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["gulab-shagun-potli-box"],
    img: roseateGraceImg,
    unit: "Ceremonial Shagun Box",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["ananta-wedding-casket"],
    img: silverEmpressImg,
    unit: "Bespoke Vivah Hamper",
  },
];

const hamperCategories = [
  {
    id: "hampers-corporate",
    title: "Corporate Gifting",
    tagline:
      "Tailored executive hampers, bespoke bulk branding, and tokens of appreciation for clients & teams.",
    items: corporateHampers,
  },
  {
    id: "hampers-luxury",
    title: "Luxury Gifting",
    tagline:
      "Handcrafted silver filigree caskets, velvet keepsakes, and heirloom-grade gourmet selections.",
    items: luxuryHampers,
  },
  /*
  {
    id: "hampers-wedding",
    title: "Wedding Gifting",
    tagline: "Bespoke wedding invitations, trousseau gifts, and ceremonial shagun hampers customized for grand celebrations.",
    items: weddingHampers,
  },
  */
];

// --- MENU CATALOG COLLECTIONS ---

const almondsMenu: Product[] = [
  {
    ...(AUTHORITATIVE_PRODUCTS["california-almonds"] || { id: "california-almonds", name: "california-almonds", price: 0 }),
    img: californiaAlmondImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["california-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["california-almonds"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["california-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["california-almonds"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["cal-almonds-sanora"] || { id: "cal-almonds-sanora", name: "cal-almonds-sanora", price: 0 }),
    img: sanoraAlmondImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["cal-almonds-sanora"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cal-almonds-sanora"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["cal-almonds-sanora"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cal-almonds-sanora"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["mamra-almonds"] || { id: "mamra-almonds", name: "mamra-almonds", price: 0 }),
    img: mamraAlmondImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["mamra-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["mamra-almonds"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["mamra-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["mamra-almonds"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["gurbandi-almonds"] || { id: "gurbandi-almonds", name: "gurbandi-almonds", price: 0 }),
    img: gurbandiAlmondImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["gurbandi-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["gurbandi-almonds"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["gurbandi-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["gurbandi-almonds"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["roasted-almonds"] || { id: "roasted-almonds", name: "roasted-almonds", price: 0 }),
    img: roastedAlmondImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["roasted-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["roasted-almonds"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["roasted-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["roasted-almonds"].price / 2) : 0) },
    ],
  },
];

const flavouredAlmondsMenu: Product[] = [
  {
    ...(AUTHORITATIVE_PRODUCTS["flavoured-blueberry-almonds"] || { id: "flavoured-blueberry-almonds", name: "flavoured-blueberry-almonds", price: 0 }),
    img: almondBlueberryImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["flavoured-blueberry-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-blueberry-almonds"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["flavoured-blueberry-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-blueberry-almonds"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["flavoured-chocolate-almonds"] || { id: "flavoured-chocolate-almonds", name: "flavoured-chocolate-almonds", price: 0 }),
    img: chocolateAlmondImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["flavoured-chocolate-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-chocolate-almonds"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["flavoured-chocolate-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-chocolate-almonds"].price / 2) : 0) },
    ],
  },
  // {
  //   id: "flavoured-brownie-almonds",
  //   name: "Brownie Almonds",
  //   origin: "Fudge Brownie Dusted Roasted Almonds",
  //   price: 1250,
  //   img: chocoDip,
  //   unit: "1 kg",
  // },
  {
    ...(AUTHORITATIVE_PRODUCTS["flavoured-paan-almonds"] || { id: "flavoured-paan-almonds", name: "flavoured-paan-almonds", price: 0 }),
    img: paanAlmondImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["flavoured-paan-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-paan-almonds"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["flavoured-paan-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-paan-almonds"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["flavoured-thai-puff-almonds"] || { id: "flavoured-thai-puff-almonds", name: "flavoured-thai-puff-almonds", price: 0 }),
    img: almondThaiPuffImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["flavoured-thai-puff-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-thai-puff-almonds"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["flavoured-thai-puff-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-thai-puff-almonds"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["flavoured-rainbow-almonds"] || { id: "flavoured-rainbow-almonds", name: "flavoured-rainbow-almonds", price: 0 }),
    img: rainbowAlmondImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["flavoured-rainbow-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-rainbow-almonds"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["flavoured-rainbow-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-rainbow-almonds"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["flavoured-barbeque-almonds"] || { id: "flavoured-barbeque-almonds", name: "flavoured-barbeque-almonds", price: 0 }),
    img: barbequeAlmondImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["flavoured-barbeque-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-barbeque-almonds"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["flavoured-barbeque-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-barbeque-almonds"].price / 2) : 0) },
    ],
  },
  // {
  //   id: "flavoured-gur-saunf-almonds",
  //   name: "Gur Saunf Almonds",
  //   origin: "Organic Jaggery & Fennel Seed Coating",
  //   price: 1250,
  //   img: almonds,
  //   unit: "1 kg",
  // },
  // {
  //   id: "flavoured-rasmalai-almonds",
  //   name: "Rasmalai Almonds",
  //   origin: "Cardamom, Saffron & Cream Infused",
  //   price: 1250,
  //   img: almonds,
  //   unit: "1 kg",
  // },
  {
    ...(AUTHORITATIVE_PRODUCTS["flavoured-rose-almonds"] || { id: "flavoured-rose-almonds", name: "flavoured-rose-almonds", price: 0 }),
    img: roseAlmondImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["flavoured-rose-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-rose-almonds"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["flavoured-rose-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-rose-almonds"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["flavoured-pudina-almonds"] || { id: "flavoured-pudina-almonds", name: "flavoured-pudina-almonds", price: 0 }),
    img: pudinaAlmondImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["flavoured-pudina-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-pudina-almonds"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["flavoured-pudina-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-pudina-almonds"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["flavoured-kulfi-almonds"] || { id: "flavoured-kulfi-almonds", name: "flavoured-kulfi-almonds", price: 0 }),
    img: kulfiAlmondImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["flavoured-kulfi-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-kulfi-almonds"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["flavoured-kulfi-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-kulfi-almonds"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["flavoured-kali-mirch-almonds"] || { id: "flavoured-kali-mirch-almonds", name: "flavoured-kali-mirch-almonds", price: 0 }),
    img: kaliMirchAlmondsImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["flavoured-kali-mirch-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-kali-mirch-almonds"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["flavoured-kali-mirch-almonds"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["flavoured-kali-mirch-almonds"].price / 2) : 0) },
    ],
  },
];

const pistachioMenu: Product[] = [
  {
    ...(AUTHORITATIVE_PRODUCTS["pista-roasted-salted-shell"] || { id: "pista-roasted-salted-shell", name: "pista-roasted-salted-shell", price: 0 }),
    img: pistaShellImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["pista-roasted-salted-shell"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["pista-roasted-salted-shell"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["pista-roasted-salted-shell"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["pista-roasted-salted-shell"].price / 2) : 0) },
    ],
  },
  // {
  //   id: "pista-without-shell",
  //   name: "Pista (Without Shell)",
  //   origin: "Raw Green Kernels · Premium Quality",
  //   price: 2400,
  //   img: pistachios,
  //   unit: "1 kg",
  // },
];

const cashewMenu: Product[] = [
  {
    ...(AUTHORITATIVE_PRODUCTS["cashew-w320"] || { id: "cashew-w320", name: "cashew-w320", price: 0 }),
    img: cashew320Img,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["cashew-w320"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-w320"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["cashew-w320"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-w320"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["cashew-w240"] || { id: "cashew-w240", name: "cashew-w240", price: 0 }),
    img: cashew240Img,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["cashew-w240"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-w240"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["cashew-w240"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-w240"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["cashew-w210"] || { id: "cashew-w210", name: "cashew-w210", price: 0 }),
    img: cashew210Img,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["cashew-w210"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-w210"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["cashew-w210"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-w210"].price / 2) : 0) },
    ],
  },
  /*
  {
    ...(AUTHORITATIVE_PRODUCTS["cashew-w180"] || { id: "cashew-w180", name: "cashew-w180", price: 0 }),
    img: cashews,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["cashew-w180"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-w180"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["cashew-w180"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-w180"].price / 2) : 0) },
    ],
  },
  */
  {
    ...(AUTHORITATIVE_PRODUCTS["cashew-2-tukda"] || { id: "cashew-2-tukda", name: "cashew-2-tukda", price: 0 }),
    img: cashew2TukdaImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["cashew-2-tukda"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-2-tukda"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["cashew-2-tukda"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-2-tukda"].price / 2) : 0) },
    ],
  },
  /*
  {
    ...(AUTHORITATIVE_PRODUCTS["cashew-4-tukda"] || { id: "cashew-4-tukda", name: "cashew-4-tukda", price: 0 }),
    img: cashews,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["cashew-4-tukda"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-4-tukda"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["cashew-4-tukda"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-4-tukda"].price / 2) : 0) },
    ],
  },
  */
  {
    ...(AUTHORITATIVE_PRODUCTS["cashew-roasted-salted"] || { id: "cashew-roasted-salted", name: "cashew-roasted-salted", price: 0 }),
    img: roastedCashew240Img,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["cashew-roasted-salted"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-roasted-salted"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["cashew-roasted-salted"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-roasted-salted"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["cashew-peri-peri"] || { id: "cashew-peri-peri", name: "cashew-peri-peri", price: 0 }),
    img: cashewPeriPeriImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["cashew-peri-peri"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-peri-peri"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["cashew-peri-peri"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-peri-peri"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["cashew-nut-cracker"] || { id: "cashew-nut-cracker", name: "cashew-nut-cracker", price: 0 }),
    img: cashewNutCrackerImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["cashew-nut-cracker"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-nut-cracker"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["cashew-nut-cracker"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-nut-cracker"].price / 2) : 0) },
    ],
  },
  // {
  //   id: "cashew-herb-cheese",
  //   name: "Cashew Herb & Cheese",
  //   origin: "Italian Herbs & Aged Cheese Dusting",
  //   price: 1300,
  //   img: cashews,
  //   unit: "1 kg",
  // },
  {
    ...(AUTHORITATIVE_PRODUCTS["cashew-breakfast-khatta-meetha"] || { id: "cashew-breakfast-khatta-meetha", name: "cashew-breakfast-khatta-meetha", price: 0 }),
    img: cashewBreakfastKhattaMeethaImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["cashew-breakfast-khatta-meetha"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-breakfast-khatta-meetha"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["cashew-breakfast-khatta-meetha"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-breakfast-khatta-meetha"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["cashew-panchratna-mixture"] || { id: "cashew-panchratna-mixture", name: "cashew-panchratna-mixture", price: 0 }),
    img: cashewPanchratnaMixtureImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["cashew-panchratna-mixture"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-panchratna-mixture"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["cashew-panchratna-mixture"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-panchratna-mixture"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["cashew-kaju-thai-puff"] || { id: "cashew-kaju-thai-puff", name: "cashew-kaju-thai-puff", price: 0 }),
    img: cashewKajuThaiPuffImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["cashew-kaju-thai-puff"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-kaju-thai-puff"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["cashew-kaju-thai-puff"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-kaju-thai-puff"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["cashew-masala"] || { id: "cashew-masala", name: "cashew-masala", price: 0 }),
    img: kajuPeriPeri,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["cashew-masala"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-masala"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["cashew-masala"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-masala"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["cashew-pudina"] || { id: "cashew-pudina", name: "cashew-pudina", price: 0 }),
    img: cashewPudinaImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["cashew-pudina"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-pudina"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["cashew-pudina"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-pudina"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["cashew-kali-mirch"] || { id: "cashew-kali-mirch", name: "cashew-kali-mirch", price: 0 }),
    img: cashewKaliMirchImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["cashew-kali-mirch"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-kali-mirch"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["cashew-kali-mirch"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-kali-mirch"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["cashew-korean-chilli"] || { id: "cashew-korean-chilli", name: "cashew-korean-chilli", price: 0 }),
    img: cashewKoreanChilliImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["cashew-korean-chilli"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-korean-chilli"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["cashew-korean-chilli"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["cashew-korean-chilli"].price / 2) : 0) },
    ],
  },
];

const raisinsMenu: Product[] = [
  {
    ...(AUTHORITATIVE_PRODUCTS["raisins-plain"] || { id: "raisins-plain", name: "raisins-plain", price: 0 }),
    img: raisinsPlainImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["raisins-plain"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["raisins-plain"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["raisins-plain"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["raisins-plain"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["raisins-paan-flavour"] || { id: "raisins-paan-flavour", name: "raisins-paan-flavour", price: 0 }),
    img: raisinPaanImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["raisins-paan-flavour"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["raisins-paan-flavour"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["raisins-paan-flavour"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["raisins-paan-flavour"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["raisins-kala-khatta"] || { id: "raisins-kala-khatta", name: "raisins-kala-khatta", price: 0 }),
    img: raisinKalaKhattaImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["raisins-kala-khatta"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["raisins-kala-khatta"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["raisins-kala-khatta"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["raisins-kala-khatta"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["raisins-black-kali-darak"] || { id: "raisins-black-kali-darak", name: "Black Raisin - Kaali Darak", price: 0 }),
    name: "Black Raisin - Kaali Darak",
    img: blackRaisinImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["raisins-black-kali-darak"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["raisins-black-kali-darak"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["raisins-black-kali-darak"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["raisins-black-kali-darak"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["raisins-rose-malai"] || { id: "raisins-rose-malai", name: "raisins-rose-malai", price: 0 }),
    img: roseMalaiKishmishImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["raisins-rose-malai"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["raisins-rose-malai"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["raisins-rose-malai"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["raisins-rose-malai"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["raisins-munakka"] || { id: "raisins-munakka", name: "raisins-munakka", price: 0 }),
    img: munakkaImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["raisins-munakka"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["raisins-munakka"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["raisins-munakka"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["raisins-munakka"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["raisins-mango-kishmish"] || { id: "raisins-mango-kishmish", name: "Mango Raisin", price: 0 }),
    name: "Mango Raisin",
    img: mangoRaisinImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["raisins-mango-kishmish"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["raisins-mango-kishmish"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["raisins-mango-kishmish"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["raisins-mango-kishmish"].price / 2) : 0) },
    ],
  },
];

const walnutMenu: Product[] = [
  {
    ...(AUTHORITATIVE_PRODUCTS["walnuts-chille"] || { id: "walnuts-chille", name: "walnuts-chille", price: 0 }),
    img: walnutChilleImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["walnuts-chille"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["walnuts-chille"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["walnuts-chille"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["walnuts-chille"].price / 2) : 0) },
    ],
  },
  /*
  {
    ...(AUTHORITATIVE_PRODUCTS["walnuts-tukde"] || { id: "walnuts-tukde", name: "walnuts-tukde", price: 0 }),
    img: walnuts,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["walnuts-tukde"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["walnuts-tukde"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["walnuts-tukde"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["walnuts-tukde"].price / 2) : 0) },
    ],
  },
  */
  {
    ...(AUTHORITATIVE_PRODUCTS["walnuts-shell"] || { id: "walnuts-shell", name: "walnuts-shell", price: 0 }),
    img: walnutShellImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["walnuts-shell"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["walnuts-shell"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["walnuts-shell"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["walnuts-shell"].price / 2) : 0) },
    ],
  },
];

const saffronMenu: Product[] = [
  {
    ...AUTHORITATIVE_PRODUCTS["saffron-indian-kesar"],
    img: cashew210Img,
    unit: "1 g",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["saffron-afghani-kesar"],
    img: cashew210Img,
    unit: "1 g",
  },
];

const driedFruitsMenu: Product[] = [
  {
    ...(AUTHORITATIVE_PRODUCTS["df-blueberry"] || { id: "df-blueberry", name: "df-blueberry", price: 0 }),
    img: driedBlueberryImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["df-blueberry"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-blueberry"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["df-blueberry"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-blueberry"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["df-black-currant"] || { id: "df-black-currant", name: "df-black-currant", price: 0 }),
    img: blackCurrantImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["df-black-currant"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-black-currant"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["df-black-currant"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-black-currant"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["df-cranberry"] || { id: "df-cranberry", name: "df-cranberry", price: 0 }),
    img: driedCranberryImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["df-cranberry"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-cranberry"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["df-cranberry"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-cranberry"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["df-kiwi-coin"] || { id: "df-kiwi-coin", name: "df-kiwi-coin", price: 0 }),
    img: kiwiCoinImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["df-kiwi-coin"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-kiwi-coin"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["df-kiwi-coin"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-kiwi-coin"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["df-mango-slices"] || { id: "df-mango-slices", name: "df-mango-slices", price: 0 }),
    img: mangoSlicesImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["df-mango-slices"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-mango-slices"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["df-mango-slices"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-mango-slices"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["df-pineapple-coin"] || { id: "df-pineapple-coin", name: "df-pineapple-coin", price: 0 }),
    img: pineappleCoinImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["df-pineapple-coin"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-pineapple-coin"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["df-pineapple-coin"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-pineapple-coin"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["df-strawberries"] || { id: "df-strawberries", name: "df-strawberries", price: 0 }),
    img: driedStrawberryImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["df-strawberries"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-strawberries"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["df-strawberries"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-strawberries"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["df-cherry"] || { id: "df-cherry", name: "df-cherry", price: 0 }),
    img: driedCherryImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["df-cherry"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-cherry"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["df-cherry"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-cherry"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["df-fruit-cocktail"] || { id: "df-fruit-cocktail", name: "df-fruit-cocktail", price: 0 }),
    img: fruitCocktailImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["df-fruit-cocktail"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-fruit-cocktail"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["df-fruit-cocktail"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-fruit-cocktail"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["df-mixed-berries"] || { id: "df-mixed-berries", name: "df-mixed-berries", price: 0 }),
    img: mixedBerriesImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["df-mixed-berries"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-mixed-berries"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["df-mixed-berries"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-mixed-berries"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["df-mix-fruit-milk-chocodip"] || { id: "df-mix-fruit-milk-chocodip", name: "df-mix-fruit-milk-chocodip", price: 0 }),
    img: mixFruitMilkChocoDipImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["df-mix-fruit-milk-chocodip"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-mix-fruit-milk-chocodip"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["df-mix-fruit-milk-chocodip"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-mix-fruit-milk-chocodip"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["df-dried-apricot"] || { id: "df-dried-apricot", name: "df-dried-apricot", price: 0 }),
    img: driedApricotImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["df-dried-apricot"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-dried-apricot"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["df-dried-apricot"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-dried-apricot"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["df-prunes"] || { id: "df-prunes", name: "df-prunes", price: 0 }),
    img: prunesImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["df-prunes"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-prunes"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["df-prunes"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-prunes"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["df-mix-fruit-chatpata"] || { id: "df-mix-fruit-chatpata", name: "df-mix-fruit-chatpata", price: 0 }),
    img: mixFruitChatpataImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["df-mix-fruit-chatpata"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-mix-fruit-chatpata"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["df-mix-fruit-chatpata"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["df-mix-fruit-chatpata"].price / 2) : 0) },
    ],
  },
];

const exoticNutsMenu: Product[] = [
  {
    ...(AUTHORITATIVE_PRODUCTS["exotic-brazil-nuts"] || { id: "exotic-brazil-nuts", name: "exotic-brazil-nuts", price: 0 }),
    img: brazilNutsImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["exotic-brazil-nuts"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["exotic-brazil-nuts"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["exotic-brazil-nuts"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["exotic-brazil-nuts"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["exotic-pine-nuts-without-shell"] || { id: "exotic-pine-nuts-without-shell", name: "exotic-pine-nuts-without-shell", price: 0 }),
    img: pineNutsImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["exotic-pine-nuts-without-shell"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["exotic-pine-nuts-without-shell"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["exotic-pine-nuts-without-shell"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["exotic-pine-nuts-without-shell"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["exotic-pecan-nuts"] || { id: "exotic-pecan-nuts", name: "exotic-pecan-nuts", price: 0 }),
    img: pecanNutsImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["exotic-pecan-nuts"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["exotic-pecan-nuts"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["exotic-pecan-nuts"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["exotic-pecan-nuts"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["exotic-macadamia-nut"] || { id: "exotic-macadamia-nut", name: "exotic-macadamia-nut", price: 0 }),
    img: macadamiaNutsImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["exotic-macadamia-nut"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["exotic-macadamia-nut"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["exotic-macadamia-nut"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["exotic-macadamia-nut"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["exotic-pecan-vanilla"] || { id: "exotic-pecan-vanilla", name: "exotic-pecan-vanilla", price: 0 }),
    img: pecanVanillaImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["exotic-pecan-vanilla"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["exotic-pecan-vanilla"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["exotic-pecan-vanilla"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["exotic-pecan-vanilla"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["exotic-hazelnut"] || { id: "exotic-hazelnut", name: "exotic-hazelnut", price: 0 }),
    img: hazelnutImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["exotic-hazelnut"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["exotic-hazelnut"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["exotic-hazelnut"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["exotic-hazelnut"].price / 2) : 0) },
    ],
  },
  /* Left out until pictures are added:
  {
    ...(AUTHORITATIVE_PRODUCTS["exotic-pine-nuts-shell"] || { id: "exotic-pine-nuts-shell", name: "exotic-pine-nuts-shell", price: 0 }),
    img: cashews,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["exotic-pine-nuts-shell"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["exotic-pine-nuts-shell"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["exotic-pine-nuts-shell"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["exotic-pine-nuts-shell"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["exotic-tiger-nut"] || { id: "exotic-tiger-nut", name: "exotic-tiger-nut", price: 0 }),
    img: almonds,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["exotic-tiger-nut"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["exotic-tiger-nut"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["exotic-tiger-nut"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["exotic-tiger-nut"].price / 2) : 0) },
    ],
  },
  */
];

const seedsMenu: Product[] = [
  {
    ...(AUTHORITATIVE_PRODUCTS["seeds-pumpkin"] || { id: "seeds-pumpkin", name: "seeds-pumpkin", price: 0 }),
    img: pumpkinSeedsImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["seeds-pumpkin"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["seeds-pumpkin"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["seeds-pumpkin"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["seeds-pumpkin"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["seeds-sunflower"] || { id: "seeds-sunflower", name: "seeds-sunflower", price: 0 }),
    img: sunflowerSeedsImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["seeds-sunflower"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["seeds-sunflower"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["seeds-sunflower"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["seeds-sunflower"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["seeds-flax"] || { id: "seeds-flax", name: "seeds-flax", price: 0 }),
    img: flaxSeedsImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["seeds-flax"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["seeds-flax"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["seeds-flax"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["seeds-flax"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["seeds-chia"] || { id: "seeds-chia", name: "seeds-chia", price: 0 }),
    img: chiaSeedsImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["seeds-chia"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["seeds-chia"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["seeds-chia"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["seeds-chia"].price / 2) : 0) },
    ],
  },
  // {
  //   id: "seeds-quinoa",
  //   name: "Quinoa Seeds",
  //   origin: "Whole White Royal Quinoa Grain",
  //   price: 350,
  //   img: trailMix,
  //   unit: "1 kg",
  // },
  // {
  //   id: "seeds-watermelon",
  //   name: "Watermelon Seeds",
  //   origin: "Magaz Kernels · Shelled Watermelon Seeds",
  //   price: 950,
  //   img: trailMix,
  //   unit: "1 kg",
  // },
  {
    ...(AUTHORITATIVE_PRODUCTS["seeds-melon"] || { id: "seeds-melon", name: "seeds-melon", price: 0 }),
    img: melonSeedsImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["seeds-melon"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["seeds-melon"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["seeds-melon"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["seeds-melon"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["seeds-mixed-with-berries"] || { id: "seeds-mixed-with-berries", name: "seeds-mixed-with-berries", price: 0 }),
    img: mixedSeedsWithBerriesImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["seeds-mixed-with-berries"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["seeds-mixed-with-berries"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["seeds-mixed-with-berries"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["seeds-mixed-with-berries"].price / 2) : 0) },
    ],
  },
];

const specialMenu: Product[] = [
  /*
  {
    ...(AUTHORITATIVE_PRODUCTS["special-cardamom-8mm-bold"] || { id: "special-cardamom-8mm-bold", name: "special-cardamom-8mm-bold", price: 0 }),
    img: almonds,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["special-cardamom-8mm-bold"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-cardamom-8mm-bold"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["special-cardamom-8mm-bold"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-cardamom-8mm-bold"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["special-silver-cardamom"] || { id: "special-silver-cardamom", name: "special-silver-cardamom", price: 0 }),
    img: almonds,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["special-silver-cardamom"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-silver-cardamom"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["special-silver-cardamom"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-silver-cardamom"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["special-dry-dates"] || { id: "special-dry-dates", name: "special-dry-dates", price: 0 }),
    img: dates,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["special-dry-dates"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-dry-dates"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["special-dry-dates"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-dry-dates"].price / 2) : 0) },
    ],
  },
  */
  {
    ...(AUTHORITATIVE_PRODUCTS["special-anjeer"] || { id: "special-anjeer", name: "special-anjeer", price: 0 }),
    img: anjeerImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["special-anjeer"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-anjeer"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["special-anjeer"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-anjeer"].price / 2) : 0) },
    ],
  },
  /*
  {
    ...(AUTHORITATIVE_PRODUCTS["special-mishri-kesar"] || { id: "special-mishri-kesar", name: "special-mishri-kesar", price: 0 }),
    img: storyPour,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["special-mishri-kesar"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-mishri-kesar"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["special-mishri-kesar"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-mishri-kesar"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["special-khurbani"] || { id: "special-khurbani", name: "special-khurbani", price: 0 }),
    img: apricots,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["special-khurbani"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-khurbani"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["special-khurbani"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-khurbani"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["special-amla-candy"] || { id: "special-amla-candy", name: "special-amla-candy", price: 0 }),
    img: trailMix,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["special-amla-candy"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-amla-candy"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["special-amla-candy"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-amla-candy"].price / 2) : 0) },
    ],
  },
  {
    ...AUTHORITATIVE_PRODUCTS["special-paan-khajoor-box"],
    img: paanDatesImg,
    unit: "400g Box",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["special-amla-muraba-1kg"],
    img: apricots,
    unit: "1 kg Jar",
  },
  */
  {
    ...(AUTHORITATIVE_PRODUCTS["special-paanshots"] || { id: "special-paanshots", name: "special-paanshots", price: 0 }),
    img: paanShots,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["special-paanshots"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-paanshots"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["special-paanshots"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-paanshots"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["special-dates-frad"] || { id: "special-dates-frad", name: "special-dates-frad", price: 0 }),
    img: fardDatesImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["special-dates-frad"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-dates-frad"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["special-dates-frad"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-dates-frad"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["special-dates-medjoul"] || { id: "special-dates-medjoul", name: "special-dates-medjoul", price: 0 }),
    img: medjoulDatesJumboImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["special-dates-medjoul"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-dates-medjoul"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["special-dates-medjoul"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-dates-medjoul"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["special-dates-paan"] || { id: "special-dates-paan", name: "special-dates-paan", price: 0 }),
    img: paanMedjoulDatesImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["special-dates-paan"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-dates-paan"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["special-dates-paan"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-dates-paan"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["special-dates-dryfruit"] || { id: "special-dates-dryfruit", name: "special-dates-dryfruit", price: 0 }),
    img: medjoulDatesImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["special-dates-dryfruit"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-dates-dryfruit"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["special-dates-dryfruit"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["special-dates-dryfruit"].price / 2) : 0) },
    ],
  },
  // {
  //   id: "special-shahi-nut",
  //   name: "Shahi Nut",
  //   origin: "Royal Saffron Flavoured Nut Blend",
  //   price: 1000,
  //   img: panchrattan,
  //   unit: "1 kg",
  // },
  {
    ...(AUTHORITATIVE_PRODUCTS["hb-fruit-nut-muesli"] || { id: "hb-fruit-nut-muesli", name: "hb-fruit-nut-muesli", price: 0 }),
    img: fruitAndNutMuesliImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["hb-fruit-nut-muesli"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["hb-fruit-nut-muesli"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["hb-fruit-nut-muesli"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["hb-fruit-nut-muesli"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["hb-dry-fruit-laddoo"] || { id: "hb-dry-fruit-laddoo", name: "hb-dry-fruit-laddoo", price: 0 }),
    img: dryFruitLaddooImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["hb-dry-fruit-laddoo"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["hb-dry-fruit-laddoo"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["hb-dry-fruit-laddoo"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["hb-dry-fruit-laddoo"].price / 2) : 0) },
    ],
  },
];

const healthyBitesMenu: Product[] = [
  {
    ...(AUTHORITATIVE_PRODUCTS["hb-granola-bites"] || { id: "hb-granola-bites", name: "hb-granola-bites", price: 0 }),
    img: mixFruitChatpataImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["hb-granola-bites"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["hb-granola-bites"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["hb-granola-bites"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["hb-granola-bites"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["hb-stone-chocolate"] || { id: "hb-stone-chocolate", name: "hb-stone-chocolate", price: 0 }),
    img: chocolateAlmondImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["hb-stone-chocolate"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["hb-stone-chocolate"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["hb-stone-chocolate"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["hb-stone-chocolate"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["hb-mixed-vegetable-masala"] || { id: "hb-mixed-vegetable-masala", name: "hb-mixed-vegetable-masala", price: 0 }),
    img: mixFruitChatpataImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["hb-mixed-vegetable-masala"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["hb-mixed-vegetable-masala"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["hb-mixed-vegetable-masala"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["hb-mixed-vegetable-masala"].price / 2) : 0) },
    ],
  },
  {
    ...(AUTHORITATIVE_PRODUCTS["hb-dried-fruit-masala"] || { id: "hb-dried-fruit-masala", name: "hb-dried-fruit-masala", price: 0 }),
    img: mixFruitChatpataImg,
    unit: "250g",
    variants: [
      { idSuffix: "-250g", unit: "250g", price: (AUTHORITATIVE_PRODUCTS["hb-dried-fruit-masala"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["hb-dried-fruit-masala"].price / 4) : 0) },
      { idSuffix: "-500g", unit: "500g", price: (AUTHORITATIVE_PRODUCTS["hb-dried-fruit-masala"]?.price ? Math.round(AUTHORITATIVE_PRODUCTS["hb-dried-fruit-masala"].price / 2) : 0) },
    ],
  },
];

// const makhanasMenu: Product[] = [
//   {
//     ...AUTHORITATIVE_PRODUCTS["makhana-plain"],
//     img: cashews,
//     unit: "1 kg",
//   },
// ];

const oilMenu: Product[] = [
  {
    ...AUTHORITATIVE_PRODUCTS["oil-almond-100ml"],
    img: cashew210Img,
    unit: "100ml Bottle",
  },
];

const menuCategories = [
  {
    id: "cat-almonds",
    title: "Almonds",
    tagline:
      "Single-origin almonds from California to Kashmir, sorted by grade and natural oil density.",
    items: almondsMenu,
  },
  {
    id: "cat-flavoured-almonds",
    title: "Flavoured Almonds",
    tagline: "Slow-roasted almonds enrobed in gourmet seasonings, florals, and dessert glazes.",
    items: flavouredAlmondsMenu,
  },
  {
    id: "cat-pistachio",
    title: "Pistachio",
    tagline: "Hand-picked jumbo Iranian pistachios, roasted in-shell and whole green kernels.",
    items: pistachioMenu,
  },
  {
    id: "cat-cashews",
    title: "Cashew Nut",
    tagline:
      "Whole grade cashews from W-320 to King W-180, plus savoury chef-crafted seasoned mixes.",
    items: cashewMenu,
  },
  {
    id: "cat-raisins",
    title: "Raisins",
    tagline:
      "Sun-cured golden grapes, tangy infusions, and medicinal Munakka from Nashik and beyond.",
    items: raisinsMenu,
  },
  {
    id: "cat-walnuts",
    title: "Walnut",
    tagline: "Kashmiri Kagzi walnuts with crisp, buttery kernels rich in natural Omega-3.",
    items: walnutMenu,
  },
  /*
  {
    id: "cat-saffron",
    title: "Saffron",
    tagline: "Finest Mongra & Super Negin saffron threads with intoxicating aroma and rich crimson hue.",
    items: saffronMenu,
  },
  */
  {
    id: "cat-dried-fruits",
    title: "Dried Fruits",
    tagline:
      "Whole dehydrates, berries, apricots, and chocolate-dipped fruits from around the world.",
    items: driedFruitsMenu,
  },
  {
    id: "cat-exotic-nuts",
    title: "Exotic Nuts",
    tagline:
      "Amazonian Brazil nuts, Turkish hazelnuts, Australian macadamias, and American pecans.",
    items: exoticNutsMenu,
  },
  {
    id: "cat-seeds",
    title: "Seeds",
    tagline: "Raw, nutrient-dense superfood seeds and berry power-blends for daily vitality.",
    items: seedsMenu,
  },
  {
    id: "cat-special",
    title: "Special",
    tagline:
      "Royal spices, silvered cardamom, Afghani anjeer, and artisanal stuffed date delicacies.",
    items: specialMenu,
  },
  /*
  {
    id: "cat-healthy-bites",
    title: "Healthy Bites",
    tagline: "Whole grain mueslis, stone chocolates, dry fruit ladoos, and vacuum-crisped vegetables.",
    items: healthyBitesMenu,
  },
  {
    id: "cat-makhanas",
    title: "Makhanas",
    tagline: "Pure, light, and crunchy jumbo fox nuts popped to airy perfection.",
    items: makhanasMenu,
  },
  {
    id: "cat-oil",
    title: "Oil",
    tagline: "100% pure cold-pressed sweet almond oil for wellness and nourishing vitality.",
    items: oilMenu,
  },
  */
];
export { menuCategories, hamperCategories };

export function hydrateCatalog(menuCats: any[], dbPrices: any[]) {
  const priceMap = new Map();
  for (const p of dbPrices) {
    priceMap.set(p.id, p);
  }
  
  return menuCats.map(cat => ({
    ...cat,
    items: cat.items.map((item: any) => {
      const dbInfo = priceMap.get(item.id);
      if (!dbInfo) return item;
      
      const variants = [];
      if (dbInfo.price_250g != null) variants.push({ unit: "250g", price: dbInfo.price_250g, idSuffix: "-250g" });
      if (dbInfo.price_500g != null) variants.push({ unit: "500g", price: dbInfo.price_500g, idSuffix: "-500g" });
      if (dbInfo.price != null && dbInfo.price > 0 && variants.length > 0) variants.push({ unit: "1 kg", price: dbInfo.price, idSuffix: "" });
      
      return {
        ...item,
        price: dbInfo.price || item.price,
        variants: variants.length > 0 ? variants : undefined
      };
    })
  }));
}
