import { useState } from "react";
import { AUTHORITATIVE_PRODUCTS } from "@/lib/products";
import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-3d-dryfruits.jpg";
import heritageImg from "@/assets/heritage-family.jpg";
import founder from "@/assets/founder-image.png";
import cofounder from "@/assets/cofounder-image.jpeg";
import almonds from "@/assets/product-almonds.jpg";
import cashews from "@/assets/product-cashews.jpg";
import pistachios from "@/assets/product-pistachios.jpg";
import walnuts from "@/assets/product-walnuts.jpg";
import dates from "@/assets/product-dates.jpg";
import apricots from "@/assets/product-apricots.jpg";
import storyPour from "@/assets/story-pour.jpg";
import kishmishImg from "@/assets/product-kishmish.jpg";
import mixVegImg from "@/assets/product-mix-veg-masala.jpg";
import paanKishmishImg from "@/assets/product-paan-kishmish.jpg";
import paanDatesImg from "@/assets/product-paan-dates.jpg";
import trailMix from "@/assets/trail-mix.jpeg";
import chocoDip from "@/assets/choco-dip-almonds.jpeg";
import kajuPeriPeri from "@/assets/kaju-peri-peri.jpeg";
import paanShots from "@/assets/special/paan-shots.jpeg";
import anjeerImg from "@/assets/special/anjeer.jpeg";
import fardDatesImg from "@/assets/special/fard-dates.jpeg";
import medjoulDatesImg from "@/assets/special/medjoul-dates.jpeg";
import medjoulDatesJumboImg from "@/assets/special/medjoul-dates-jumbo.jpeg";
import paanMedjoulDatesImg from "@/assets/special/paan-mejoul-dates.jpeg";
import panchrattan from "@/assets/panchrattan.jpeg";
import dryFruitLaddooImg from "@/assets/healthy-bites/dry-fruit-laddoo.jpeg";
// Luxury Hampers
import roseateGraceImg from "@/assets/luxury-hampers/roseate-grace.png";
import amethystEleganceImg from "@/assets/luxury-hampers/amethyst-elegance.png";
import silverEmpressImg from "@/assets/luxury-hampers/the-silver-empress.png";
import floralJewelImg from "@/assets/luxury-hampers/the-floral-jewel.png";
import ovalRubyImg from "@/assets/luxury-hampers/the-overall-ruby.png";
import sapphireChestImg from "@/assets/luxury-hampers/sapphire-chest.png";
import gajrajRoyaleImg from "@/assets/luxury-hampers/gajraj-royale.png";
import emeraldGraceImg from "@/assets/luxury-hampers/emerald-grace.png";
import blushRoyaleImg from "@/assets/luxury-hampers/the-blush-royale.png";
import gildedBirdImg from "@/assets/luxury-hampers/the-gilded-bird.png";
import shagunENoorImg from "@/assets/luxury-hampers/shagun-e-noor.png";
import luxeRoyaleImg from "@/assets/luxury-hampers/luxe-florale.png";
import gajrajGrandeurImg from "@/assets/luxury-hampers/gajraj-grandeur.png";
import maroonMajestyImg from "@/assets/luxury-hampers/maroon-majesty.png";
import thePeachAffairImg from "@/assets/luxury-hampers/the-peach-affair.png";
import oliveGardenImg from "@/assets/luxury-hampers/olive-garden.png";
import lavenderOpulenceImg from "@/assets/luxury-hampers/lavender-opulence.png";
import theSilverHeirloomImg from "@/assets/luxury-hampers/the-silver-heirloom.png";
import theRoyalDynastyImg from "@/assets/luxury-hampers/the-royal-dynasty.png";
import circleOfAbundanceImg from "@/assets/luxury-hampers/circle-of-abundance.png";
import thePearlGardenImg from "@/assets/luxury-hampers/the-pearl-garden.png";
import theSilverMajesticImg from "@/assets/luxury-hampers/the-silver-majestic.png";
import moonstoneCharmImg from "@/assets/luxury-hampers/moonstone-charm.png";
import lilacGraceImg from "@/assets/luxury-hampers/lilac-grace.png";
// Corporate Hampers
import ivoryBloomImg from "@/assets/corporate-hampers/ivory-bloom.png";
import noorMahalImg from "@/assets/corporate-hampers/noor-mahal.png";
import lotusLegacyImg from "@/assets/corporate-hampers/the-lotus-legacy.png";
import mintMahalImg from "@/assets/corporate-hampers/mint-mahal.png";
import royalHeritageImg from "@/assets/corporate-hampers/the-royal-heritage.png";
import regalTrioImg from "@/assets/corporate-hampers/the-regal-trio.png";
import blueDynastyImg from "@/assets/corporate-hampers/the-blue-dynasty.png";
import peacockBlushImg from "@/assets/corporate-hampers/the-peacock-blush.png";
import navyDynastyImg from "@/assets/corporate-hampers/navy-dynasty.png";
import midnightBasketImg from "@/assets/corporate-hampers/the-midnight-basket.png";
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
// Pistachio
import pistaShellImg from "@/assets/pista/pista-shell.jpeg";
import { HealthAdvisor } from "@/components/HealthAdvisor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "By The Handful — Sun-cured dry fruits & nuts" },
      {
        name: "description",
        content:
          "Premium, hand-picked dry fruits and nuts from heritage groves. No sulfites, no added sugar — just nature, by the handful.",
      },
      { property: "og:title", content: "By The Handful — Sun-cured dry fruits & nuts" },
      {
        property: "og:description",
        content:
          "Premium, hand-picked dry fruits and nuts from heritage groves. No sulfites, no added sugar — just nature, by the handful.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Index,
});

type Product = {
  id: string;
  name: string;
  origin?: string;
  price: number;
  img: string;
  unit?: string;
  category?: string;
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
    ...AUTHORITATIVE_PRODUCTS["california-almonds"],
    img: californiaAlmondImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["cal-almonds-sanora"],
    img: sanoraAlmondImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["mamra-almonds"],
    img: mamraAlmondImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["gurbandi-almonds"],
    img: gurbandiAlmondImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["roasted-almonds"],
    img: roastedAlmondImg,
    unit: "1 kg",
  },
];

const flavouredAlmondsMenu: Product[] = [
  {
    ...AUTHORITATIVE_PRODUCTS["flavoured-blueberry-almonds"],
    img: almondBlueberryImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["flavoured-chocolate-almonds"],
    img: chocolateAlmondImg,
    unit: "1 kg",
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
    ...AUTHORITATIVE_PRODUCTS["flavoured-paan-almonds"],
    img: paanAlmondImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["flavoured-thai-puff-almonds"],
    img: almondThaiPuffImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["flavoured-rainbow-almonds"],
    img: rainbowAlmondImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["flavoured-barbeque-almonds"],
    img: barbequeAlmondImg,
    unit: "1 kg",
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
    ...AUTHORITATIVE_PRODUCTS["flavoured-rose-almonds"],
    img: roseAlmondImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["flavoured-pudina-almonds"],
    img: pudinaAlmondImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["flavoured-kulfi-almonds"],
    img: kulfiAlmondImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["flavoured-kali-mirch-almonds"],
    img: kaliMirchAlmondsImg,
    unit: "1 kg",
  },
];

const pistachioMenu: Product[] = [
  {
    ...AUTHORITATIVE_PRODUCTS["pista-roasted-salted-shell"],
    img: pistaShellImg,
    unit: "1 kg",
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
    ...AUTHORITATIVE_PRODUCTS["cashew-w320"],
    img: cashew320Img,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["cashew-w240"],
    img: cashew240Img,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["cashew-w210"],
    img: cashew210Img,
    unit: "1 kg",
  },
  /*
  {
    ...AUTHORITATIVE_PRODUCTS["cashew-w180"],
    img: cashews,
    unit: "1 kg",
  },
  */
  {
    ...AUTHORITATIVE_PRODUCTS["cashew-2-tukda"],
    img: cashew2TukdaImg,
    unit: "1 kg",
  },
  /*
  {
    ...AUTHORITATIVE_PRODUCTS["cashew-4-tukda"],
    img: cashews,
    unit: "1 kg",
  },
  */
  {
    ...AUTHORITATIVE_PRODUCTS["cashew-roasted-salted"],
    img: roastedCashew240Img,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["cashew-peri-peri"],
    img: cashewPeriPeriImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["cashew-nut-cracker"],
    img: cashewNutCrackerImg,
    unit: "1 kg",
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
    ...AUTHORITATIVE_PRODUCTS["cashew-breakfast-khatta-meetha"],
    img: cashewBreakfastKhattaMeethaImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["cashew-panchratna-mixture"],
    img: cashewPanchratnaMixtureImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["cashew-kaju-thai-puff"],
    img: cashewKajuThaiPuffImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["cashew-masala"],
    img: kajuPeriPeri,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["cashew-pudina"],
    img: cashewPudinaImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["cashew-kali-mirch"],
    img: cashewKaliMirchImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["cashew-korean-chilli"],
    img: cashewKoreanChilliImg,
    unit: "1 kg",
  },
];

const raisinsMenu: Product[] = [
  {
    ...AUTHORITATIVE_PRODUCTS["raisins-plain"],
    img: raisinsPlainImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["raisins-paan-flavour"],
    img: raisinPaanImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["raisins-kala-khatta"],
    img: raisinKalaKhattaImg,
    unit: "1 kg",
  },
  /*
  {
    ...AUTHORITATIVE_PRODUCTS["raisins-black-kali-darak"],
    img: kishmishImg,
    unit: "1 kg",
  },
  */
  {
    ...AUTHORITATIVE_PRODUCTS["raisins-rose-malai"],
    img: roseMalaiKishmishImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["raisins-munakka"],
    img: munakkaImg,
    unit: "1 kg",
  },
  /*
  {
    ...AUTHORITATIVE_PRODUCTS["raisins-mango-kishmish"],
    img: kishmishImg,
    unit: "1 kg",
  },
  */
];

const walnutMenu: Product[] = [
  {
    ...AUTHORITATIVE_PRODUCTS["walnuts-chille"],
    img: walnutChilleImg,
    unit: "1 kg",
  },
  /*
  {
    ...AUTHORITATIVE_PRODUCTS["walnuts-tukde"],
    img: walnuts,
    unit: "1 kg",
  },
  */
  {
    ...AUTHORITATIVE_PRODUCTS["walnuts-shell"],
    img: walnutShellImg,
    unit: "1 kg",
  },
];

const saffronMenu: Product[] = [
  {
    ...AUTHORITATIVE_PRODUCTS["saffron-indian-kesar"],
    img: storyPour,
    unit: "1 g",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["saffron-afghani-kesar"],
    img: storyPour,
    unit: "1 g",
  },
];

const driedFruitsMenu: Product[] = [
  {
    ...AUTHORITATIVE_PRODUCTS["df-blueberry"],
    img: driedBlueberryImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["df-black-currant"],
    img: blackCurrantImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["df-cranberry"],
    img: driedCranberryImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["df-kiwi-coin"],
    img: kiwiCoinImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["df-mango-slices"],
    img: mangoSlicesImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["df-pineapple-coin"],
    img: pineappleCoinImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["df-strawberries"],
    img: driedStrawberryImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["df-cherry"],
    img: driedCherryImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["df-fruit-cocktail"],
    img: fruitCocktailImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["df-mixed-berries"],
    img: mixedBerriesImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["df-mix-fruit-milk-chocodip"],
    img: mixFruitMilkChocoDipImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["df-dried-apricot"],
    img: driedApricotImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["df-prunes"],
    img: prunesImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["df-mix-fruit-chatpata"],
    img: mixFruitChatpataImg,
    unit: "1 kg",
  },
];

const exoticNutsMenu: Product[] = [
  {
    ...AUTHORITATIVE_PRODUCTS["exotic-brazil-nuts"],
    img: brazilNutsImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["exotic-pine-nuts-without-shell"],
    img: pineNutsImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["exotic-pecan-nuts"],
    img: pecanNutsImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["exotic-macadamia-nut"],
    img: macadamiaNutsImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["exotic-pecan-vanilla"],
    img: pecanVanillaImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["exotic-hazelnut"],
    img: hazelnutImg,
    unit: "1 kg",
  },
  /* Left out until pictures are added:
  {
    ...AUTHORITATIVE_PRODUCTS["exotic-pine-nuts-shell"],
    img: cashews,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["exotic-tiger-nut"],
    img: almonds,
    unit: "1 kg",
  },
  */
];

const seedsMenu: Product[] = [
  {
    ...AUTHORITATIVE_PRODUCTS["seeds-pumpkin"],
    img: pumpkinSeedsImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["seeds-sunflower"],
    img: sunflowerSeedsImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["seeds-flax"],
    img: flaxSeedsImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["seeds-chia"],
    img: chiaSeedsImg,
    unit: "1 kg",
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
    ...AUTHORITATIVE_PRODUCTS["seeds-melon"],
    img: melonSeedsImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["seeds-mixed-with-berries"],
    img: mixedSeedsWithBerriesImg,
    unit: "1 kg",
  },
];

const specialMenu: Product[] = [
  /*
  {
    ...AUTHORITATIVE_PRODUCTS["special-cardamom-8mm-bold"],
    img: almonds,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["special-silver-cardamom"],
    img: almonds,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["special-dry-dates"],
    img: dates,
    unit: "1 kg",
  },
  */
  {
    ...AUTHORITATIVE_PRODUCTS["special-anjeer"],
    img: anjeerImg,
    unit: "1 kg",
  },
  /*
  {
    ...AUTHORITATIVE_PRODUCTS["special-mishri-kesar"],
    img: storyPour,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["special-khurbani"],
    img: apricots,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["special-amla-candy"],
    img: trailMix,
    unit: "1 kg",
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
    ...AUTHORITATIVE_PRODUCTS["special-paanshots"],
    img: paanShots,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["special-dates-frad"],
    img: fardDatesImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["special-dates-medjoul"],
    img: medjoulDatesJumboImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["special-dates-paan"],
    img: paanMedjoulDatesImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["special-dates-dryfruit"],
    img: medjoulDatesImg,
    unit: "1 kg",
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
    ...AUTHORITATIVE_PRODUCTS["hb-fruit-nut-muesli"],
    img: fruitAndNutMuesliImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["hb-dry-fruit-laddoo"],
    img: dryFruitLaddooImg,
    unit: "1 kg",
  },
];

const healthyBitesMenu: Product[] = [
  {
    ...AUTHORITATIVE_PRODUCTS["hb-granola-bites"],
    img: trailMix,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["hb-stone-chocolate"],
    img: chocoDip,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["hb-mixed-vegetable-masala"],
    img: mixVegImg,
    unit: "1 kg",
  },
  {
    ...AUTHORITATIVE_PRODUCTS["hb-dried-fruit-masala"],
    img: mixVegImg,
    unit: "1 kg",
  },
];

const makhanasMenu: Product[] = [
  {
    ...AUTHORITATIVE_PRODUCTS["makhana-plain"],
    img: cashews,
    unit: "1 kg",
  },
];

const oilMenu: Product[] = [
  {
    ...AUTHORITATIVE_PRODUCTS["oil-almond-100ml"],
    img: storyPour,
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

function fmtPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function ProductCard({ p, onAdd }: { p: Product; i?: number; onAdd: (p: Product) => void }) {
  return (
    <article className="group flex flex-col justify-between">
      <div>
        <div className="relative aspect-square bg-white mb-4 overflow-hidden border border-black/5 shadow-2xs">
          <img
            src={p.img}
            alt={p.name}
            width={600}
            height={600}
            loading="lazy"
            className="w-full h-full object-cover opacity-95 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
          <button
            onClick={() => onAdd(p)}
            className="absolute bottom-3 right-3 px-3.5 py-1.5 bg-ink text-background text-[9px] font-semibold tracking-[0.22em] uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary"
            aria-label={`Add ${p.name} to pouch`}
          >
            Add to pouch
          </button>
        </div>
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0 pr-1">
            <h3 className="font-serif text-lg md:text-xl leading-snug truncate">{p.name}</h3>
            <p className="text-[10px] text-foreground/50 uppercase tracking-[0.15em] mt-1 font-semibold line-clamp-2">
              {p.origin} {p.unit ? `· ${p.unit}` : "· 250g"}
            </p>
          </div>
          <span className="font-medium text-sm whitespace-nowrap pt-0.5 italic text-foreground/80">
            {fmtPrice(p.price)}
          </span>
        </div>
      </div>
      <button
        onClick={() => onAdd(p)}
        className="md:hidden mt-3 w-full py-2.5 border border-ink text-[9px] font-semibold tracking-[0.2em] uppercase hover:bg-ink hover:text-background transition"
      >
        Add to pouch
      </button>
    </article>
  );
}

function Index() {
  const { add, count, setOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const onAdd = (p: Product) => {
    add({ id: p.id, name: p.name, origin: p.origin, price: p.price, img: p.img });
    setOpen(true);
  };

  const visibleCategories = menuCategories.filter(
    (category) => selectedCategory === "all" || selectedCategory === category.id,
  );

  const visibleHamperCategories = hamperCategories.filter(
    (h) =>
      selectedCategory === "all" || selectedCategory === "hampers" || selectedCategory === h.id,
  );
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-amber/40 selection:text-ink">
      {/* NAV */}
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-center px-6 md:px-12 border-b border-black/5 overflow-hidden">
        {/* Floating dry-fruit background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src={almonds}
            alt=""
            className="absolute top-[8%] left-[4%] w-24 md:w-32 rounded-full opacity-20 blur-[1px] animate-drift-a"
          />
          <img
            src={cashews}
            alt=""
            className="absolute top-[18%] right-[6%] w-20 md:w-28 rounded-full opacity-25 animate-drift-b"
            style={{ animationDelay: "-4s" }}
          />
          <img
            src={pistachios}
            alt=""
            className="absolute bottom-[14%] left-[10%] w-24 md:w-36 rounded-full opacity-20 blur-[1px] animate-drift-c"
            style={{ animationDelay: "-8s" }}
          />
          <img
            src={walnuts}
            alt=""
            className="absolute bottom-[8%] right-[14%] w-20 md:w-28 rounded-full opacity-25 animate-drift-a"
            style={{ animationDelay: "-12s" }}
          />
          <img
            src={dates}
            alt=""
            className="absolute top-[45%] left-[42%] w-16 md:w-24 rounded-full opacity-15 blur-[1px] animate-drift-b"
            style={{ animationDelay: "-6s" }}
          />
          <img
            src={apricots}
            alt=""
            className="absolute top-[30%] left-[28%] w-16 md:w-20 rounded-full opacity-20 animate-drift-c"
            style={{ animationDelay: "-14s" }}
          />
          <img
            src={almonds}
            alt=""
            className="absolute bottom-[30%] right-[30%] w-14 md:w-20 rounded-full opacity-15 animate-drift-b"
            style={{ animationDelay: "-18s" }}
          />
        </div>

        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-10">
          <span className="text-[10px] tracking-[0.35em] uppercase font-semibold text-primary">
            Bhagwandas Chamanlal &nbsp;·&nbsp; Est. 1923 &nbsp;·&nbsp; Katra Ishwar Bhavan
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-10 items-center py-24 animate-reveal-up">
          <div className="md:col-span-7">
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter italic text-balance">
              By the <br />
              Handful.
            </h1>
            <p className="mt-10 max-w-md text-lg leading-relaxed text-foreground/70">
              A century of sourcing the world's most exceptional dry fruits — sun-cured on stone,
              hand-sorted by growers we know by name. Heritage-grade quality, poured for the modern
              palate.
            </p>
            <div className="mt-10 flex flex-wrap gap-6 items-center">
              <a
                href="#harvest"
                className="px-8 py-4 bg-ink text-background text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-primary transition-colors"
              >
                Shop the Collection
              </a>
              <a
                href="#about"
                className="text-[11px] uppercase tracking-[0.25em] font-semibold border-b border-ink pb-1 hover:text-primary hover:border-primary transition"
              >
                Explore 100-year history
              </a>
            </div>
          </div>

          <div className="md:col-span-5 relative">
            <div className="aspect-[4/5] overflow-hidden bg-stone">
              <img
                src={heroImg}
                alt="Heritage arrangement of premium dry fruits and nuts"
                width={1280}
                height={1600}
                className="w-full h-full object-cover animate-float-slow"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background p-6 shadow-[var(--shadow-elegant)] max-w-[220px] ring-1 ring-black/5">
              <p className="text-[10px] uppercase tracking-[0.28em] font-bold mb-3 text-primary">
                Featured
              </p>
              <p className="text-base italic font-serif leading-snug">
                Single-origin Mamra almonds from the valleys of Kashmir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE / VALUES */}
      <section className="border-b border-black/5 py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-center gap-x-14 gap-y-3 text-[10px] tracking-[0.3em] uppercase font-semibold text-foreground/55">
          <span>Slow-cured 14 days</span>
          <span>·</span>
          <span>Pesticide-free orchards</span>
          <span>·</span>
          <span>Cold-pack jute pouches</span>
          <span>·</span>
          <span>Carbon-neutral shipping</span>
          <span>·</span>
          <span>Family-run growers</span>
        </div>
      </section>

      {/* PANTRY / PRODUCTS */}
      <section id="harvest" className="py-24 lg:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div>
              <span className="text-[10px] tracking-[0.35em] uppercase font-semibold text-primary">
                01 — The Pantry
              </span>
              <h2 className="mt-3 text-4xl md:text-5xl font-serif">The full catalogue.</h2>
              <p className="mt-3 italic text-foreground/60 max-w-2xl">
                An exquisite selection of premium dried fruits, exotic fruits, nuts, saffron, seeds,
                and makhanas, carefully sourced for superior quality, freshness, and taste.
              </p>
            </div>
            <a
              href="#advisor"
              className="text-[11px] uppercase tracking-[0.25em] font-semibold border-b border-ink pb-1 hover:text-primary hover:border-primary transition"
            >
              Need help choosing? →
            </a>
          </div>

          {/* CATEGORY FILTER DROPDOWN BAR */}
          <div className="sticky top-16 bg-background/95 backdrop-blur-md py-4 z-20 border-y border-black/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <label
                htmlFor="category-dropdown"
                className="text-[10px] tracking-[0.25em] uppercase font-bold text-foreground/60 whitespace-nowrap"
              >
                Category:
              </label>
              <div className="relative flex-1 sm:w-80">
                <select
                  id="category-dropdown"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none bg-white border border-black/20 text-foreground px-4 py-2.5 pr-10 text-[11px] tracking-[0.15em] uppercase font-semibold rounded-none focus:outline-none focus:border-ink cursor-pointer hover:border-black/40 transition shadow-2xs"
                >
                  <option value="all">
                    All Categories ({menuCategories.length + hamperCategories.length} Collections)
                  </option>
                  <optgroup label="Single Origin & Flavoured Dry Fruits">
                    {menuCategories.map((cat, idx) => (
                      <option key={cat.id} value={cat.id}>
                        {String(idx + 1).padStart(2, "0")}. {cat.title} ({cat.items.length})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Gift Hampers & Curations">
                    <option value="hampers">All Gift Hampers (Corporate & Luxury)</option>
                    <option value="hampers-corporate">
                      11. Corporate Gifting ({corporateHampers.length})
                    </option>
                    <option value="hampers-luxury">
                      12. Luxury Gifting ({luxuryHampers.length})
                    </option>
                  </optgroup>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-foreground/60">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-[10px] tracking-[0.2em] uppercase font-semibold text-primary hover:text-ink transition border-b border-primary/40 pb-0.5"
              >
                Show All Categories
              </button>
            )}
          </div>

          {/* SEPARATE SECTION FOR EACH CATEGORY */}
          {visibleCategories.map((category) => {
            const catIndex = menuCategories.findIndex((c) => c.id === category.id);
            return (
              <div key={category.id} id={category.id} className="mt-16 first:mt-10 scroll-mt-36">
                <div className="flex flex-col sm:flex-row justify-between items-baseline border-t border-black/10 pt-6 mb-10 gap-2">
                  <div>
                    <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-primary mr-3">
                      {String(catIndex + 1).padStart(2, "0")}
                    </span>
                    <h3 className="inline-block text-3xl font-serif">{category.title}</h3>
                    <p className="text-xs italic text-foreground/60 mt-1">{category.tagline}</p>
                  </div>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-foreground/40">
                    {category.items.length} {category.items.length === 1 ? "Variety" : "Varieties"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                  {category.items.map((p, i) => (
                    <ProductCard key={p.id} p={p} i={i} onAdd={onAdd} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* GIFT HAMPERS SECTION: 3 CATEGORIES (Corporate, Luxury, Wedding) */}
          {visibleHamperCategories.length > 0 && (
            <div id="hampers" className="mt-28 pt-16 border-t-2 border-black/15 scroll-mt-24">
              <div className="mb-12">
                <span className="text-[10px] tracking-[0.35em] uppercase font-semibold text-primary">
                  02 — Curated Celebrations
                </span>
                <h2 className="mt-2 text-3xl md:text-5xl font-serif">
                  Gift Hampers &amp; Keepsakes
                </h2>
                <p className="mt-2 italic text-foreground/60 max-w-2xl text-sm md:text-base">
                  Thoughtfully curated keepsake caskets and festive hampers crafted for corporate
                  gestures and luxury occasions.
                </p>
              </div>

              {visibleHamperCategories.map((hamperCat) => (
                <div key={hamperCat.id} id={hamperCat.id} className="mt-16 first:mt-6 scroll-mt-36">
                  <div className="flex flex-col sm:flex-row justify-between items-baseline border-t border-black/10 pt-6 mb-10 gap-2">
                    <div>
                      <h3 className="inline-block text-2xl md:text-3xl font-serif">
                        {hamperCat.title}
                      </h3>
                      <p className="text-xs italic text-foreground/60 mt-1">{hamperCat.tagline}</p>
                    </div>
                    <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-foreground/40">
                      {hamperCat.items.length}{" "}
                      {hamperCat.items.length === 1 ? "Curation" : "Curations"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {hamperCat.items.map((p, i) => (
                      <ProductCard key={p.id} p={p} i={i} onAdd={onAdd} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PROCESS — dark editorial band */}
      <section id="story" className="bg-ink text-background/85 py-28 lg:py-36 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8">
            <span className="text-[10px] tracking-[0.35em] uppercase font-semibold text-amber">
              02 — Our Process
            </span>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] text-background text-balance">
              The tactile weight of a <span className="italic">full</span> harvest.
            </h2>
            <p className="text-lg leading-relaxed max-w-[52ch] text-background/70">
              There is a rhythm to the pour. The soft rustle of a jute pouch opening, the sound of
              sun-dried fruit hitting warm stone. We don't flash-dry, we don't sulfite, we don't
              sweeten. We wait — for two weeks, on limestone slabs, under a sky that does the work.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-background/15">
              <div>
                <p className="font-serif text-5xl text-background">14</p>
                <p className="text-[10px] tracking-[0.28em] uppercase text-background/55 mt-2 font-semibold">
                  Days, sun-cured
                </p>
              </div>
              <div>
                <p className="font-serif text-5xl text-background">0</p>
                <p className="text-[10px] tracking-[0.28em] uppercase text-background/55 mt-2 font-semibold">
                  Additives, ever
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src={storyPour}
              alt="Hands pouring mixed dry fruits from a jute pouch onto a warm wooden slab"
              width={1600}
              height={2000}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover grayscale contrast-125 opacity-80"
            />
            <div className="absolute inset-0 border-[16px] border-ink/60 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* HERITAGE / ABOUT */}
      <section id="about" className="py-28 lg:py-36 px-6 md:px-12 bg-stone">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="aspect-[3/4] bg-stone relative overflow-hidden">
              <img
                src={heritageImg}
                alt="Generations of hands sorting almonds and dates with brass scales in a heritage dry fruit shop"
                width={900}
                height={1200}
                loading="lazy"
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute -top-4 -right-4 p-4 bg-ink text-background">
                <p className="text-[10px] tracking-[0.3em] font-bold">EST. 1923</p>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-6">
            <span className="text-[10px] tracking-[0.35em] uppercase font-semibold text-primary">
              03 — Our Heritage
            </span>
            <h2 className="font-serif text-4xl md:text-6xl italic leading-tight text-balance">
              Legacy of the Hand
            </h2>

            <p className="text-lg leading-relaxed text-foreground/80">
              <span className="float-left font-serif text-6xl leading-[0.85] pr-3 pt-1 text-primary">
                F
              </span>
              or over a century, our story has been one of resilience, trust, and excellence. Our
              journey began in Rawalpindi, where our great-grandfather established a business
              dedicated to sourcing and supplying the finest dry fruits.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Following the Partition of India, the family rebuilt its legacy in Delhi at Katra
              Ishwar Bhavan, carrying forward the same commitment to quality, integrity, and
              customer relationships. Today, this proud legacy is being carried forward by the
              fourth generation.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Building on this rich heritage, we introduced{" "}
              <em className="font-serif">By the Handful</em> — our luxury gifting brand that
              reimagines premium dry fruits as sophisticated gifting experiences. Every hamper is
              thoughtfully curated, elegantly designed, and crafted to celebrate life's most
              meaningful occasions.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-ink/15">
              <div>
                <p className="font-serif text-4xl">100+</p>
                <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/55 mt-2 font-semibold">
                  Years of trust
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl">4</p>
                <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/55 mt-2 font-semibold">
                  Generations
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl italic">Rawalpindi</p>
                <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/55 mt-2 font-semibold">
                  → Delhi
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LEADERSHIP */}
        <div className="max-w-7xl mx-auto mt-28 lg:mt-36">
          <div className="text-center space-y-3 mb-16">
            <span className="text-[10px] tracking-[0.35em] uppercase font-semibold text-primary">
              Leadership
            </span>
            <h3 className="font-serif text-4xl md:text-5xl italic">The hands behind the handful</h3>
            <p className="text-foreground/65 max-w-xl mx-auto italic">
              A mother-and-son duo carrying a century-old legacy into its next chapter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {[
              {
                name: "Rachana Malhotra",
                role: "Founder",
                img: founder,
                blurb:
                  "Steward of the family craft — she leads sourcing, quality, and the taste memory of four generations.",
              },
              {
                name: "Kush Malhotra",
                role: "Co-Founder",
                img: cofounder,
                blurb:
                  "Bringing modern design and gifting sensibility to a heritage house — shaping every pouch, hamper, and story.",
              },
            ].map((p, i) => (
              <div key={p.role} className={`group ${i === 1 ? "md:mt-16" : ""}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-white border border-black/5 shadow-[var(--shadow-elegant)]">
                  <img
                    src={p.img}
                    alt={`${p.name}, ${p.role} of By the Handful`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top grayscale contrast-[1.02] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[10px] tracking-[0.3em] uppercase font-semibold text-amber">
                      {p.role}
                    </p>
                    <h4 className="font-serif text-3xl italic text-background">{p.name}</h4>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-start gap-4">
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase font-semibold text-primary">
                      {p.role}
                    </p>
                    <h4 className="font-serif text-3xl italic mt-1">{p.name}</h4>
                  </div>
                </div>
                <p className="mt-3 text-foreground/70 leading-relaxed max-w-md">{p.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HEALTH ADVISOR */}
      <HealthAdvisor />

      {/* NOTES — dark pairing editorial */}
      <section id="notes" className="bg-ink text-background/80 py-28 px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-amber text-[10px] uppercase tracking-[0.35em] font-semibold block mb-4">
              04 — The Daily Ritual
            </span>
            <h2 className="text-background font-serif text-5xl md:text-6xl leading-tight italic mb-10">
              Perfect pairings & tasting notes.
            </h2>
            <ul className="space-y-8">
              <li className="border-b border-background/15 pb-4">
                <p className="text-background font-serif italic text-xl">
                  Anjeer &amp; Blue Cheese
                </p>
                <p className="text-sm mt-2 text-background/60 leading-relaxed">
                  The honeyed depth of our dried figs balances the sharp, creamy profile of an aged
                  Gorgonzola.
                </p>
              </li>
              <li className="border-b border-background/15 pb-4">
                <p className="text-background font-serif italic text-xl">Almonds &amp; Espresso</p>
                <p className="text-sm mt-2 text-background/60 leading-relaxed">
                  Twice-roasted Mamra almonds unlock notes of toasted butter when paired with a dark
                  roast.
                </p>
              </li>
              <li className="border-b border-background/15 pb-4">
                <p className="text-background font-serif italic text-xl">
                  Apricots &amp; Dark Chocolate
                </p>
                <p className="text-sm mt-2 text-background/60 leading-relaxed">
                  Turkish apricots meet 70% Valrhona — bright acidity against deep, bitter cocoa.
                </p>
              </li>
            </ul>
          </div>
          <div className="relative">
            <img
              src={storyPour}
              alt="Editorial flat lay of nuts and dried fruit on dark slate"
              className="w-full aspect-[4/5] object-cover grayscale contrast-125 opacity-70"
            />
            <div className="absolute inset-0 border-[20px] border-ink/70 pointer-events-none" />
            <blockquote className="absolute -bottom-8 -left-8 bg-background text-ink p-6 max-w-[260px] shadow-[var(--shadow-elegant)]">
              <p className="font-serif italic text-lg leading-snug">
                "Tastes like sunlight, weighed."
              </p>
              <p className="mt-2 text-[10px] tracking-[0.28em] uppercase font-bold text-primary">
                — Saveur Magazine
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      {/* <section className="px-6 md:px-12 py-24 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] tracking-[0.35em] uppercase font-semibold text-primary">
            The Dispatch
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl italic leading-tight">
            Join the seasonal dispatch.
          </h2>
          <p className="mt-4 text-foreground/65">
            Harvest dates, limited drops, slow recipes. About once a month — never more.
          </p>
          <form
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 px-5 py-4 bg-transparent border border-ink/25 text-ink placeholder:text-ink/40 focus:outline-none focus:border-primary"
            />
            <button className="px-8 py-4 bg-ink text-background text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary transition">
              Subscribe
            </button>
          </form>
        </div>
      </section> */}

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
