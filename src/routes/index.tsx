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
  origin: string;
  price: number;
  img: string;
  unit?: string;
};

const dryFruits: Product[] = [
  {
    id: "kaju",
    name: "Kaju",
    origin: "Whole Cashews W-180 · Mangalore Coast",
    price: 880,
    img: cashews,
  },
  {
    id: "badam",
    name: "Badam",
    origin: "Mamra Almonds · Kashmir Valley",
    price: 780,
    img: almonds,
  },
  {
    id: "kishmish",
    name: "Kishmish",
    origin: "Golden Raisins · Nashik",
    price: 420,
    img: kishmishImg,
  },
  { id: "akrot", name: "Akrot", origin: "Walnut Kernels · Kashmir", price: 640, img: walnuts },
  { id: "pista", name: "Pista", origin: "Roasted & Salted · Kerman", price: 1140, img: pistachios },
  {
    id: "medjoul-dates",
    name: "Medjoul Dates",
    origin: "Jumbo Grade · Jordan Valley",
    price: 920,
    img: dates,
  },
];

const flavoured: Product[] = [
  {
    id: "breakfast-khatta-meetha",
    name: "Breakfast Khatta Meetha",
    origin: "Berries, seeds & cashews",
    price: 690,
    img: khattaMeetha,
  },
  {
    id: "mix-vegetable-masala",
    name: "Mixed Vegetable Masala",
    origin: "Savoury spiced medley",
    price: 540,
    img: mixVegImg,
  },
  {
    id: "kaju-thai-puff",
    name: "Kaju Thai Puff",
    origin: "Sweet-chilli crunch coating",
    price: 720,
    img: kajuThaiPuff,
  },
  {
    id: "trail-mix",
    name: "Trail Mix",
    origin: "Seeds, berries & raisins",
    price: 610,
    img: trailMix,
  },
  {
    id: "peri-peri-kaju",
    name: "Peri Peri Kaju",
    origin: "Fiery peri-peri cashews",
    price: 760,
    img: kajuPeriPeri,
  },
  {
    id: "panchrattan",
    name: "Panchrattan",
    origin: "Masala-roasted dry fruit mix",
    price: 700,
    img: panchrattan,
  },
  {
    id: "paan-kishmish",
    name: "Paan Kishmish",
    origin: "Betel-leaf glazed raisins",
    price: 520,
    img: paanKishmishImg,
  },
  {
    id: "blueberry-almond",
    name: "Blueberry Almond",
    origin: "Fruit-dusted almonds",
    price: 840,
    img: blueberryAlmonds,
  },
  {
    id: "paan-shots",
    name: "Paan Shots",
    origin: "Paan-filled chocolate pearls",
    price: 580,
    img: paanShots,
  },
  {
    id: "paan-dates",
    name: "Paan Dates",
    origin: "Dates stuffed with paan",
    price: 880,
    img: paanDatesImg,
  },
  {
    id: "choco-dip-almonds",
    name: "Chocodip Almonds",
    origin: "Dark chocolate coated badam",
    price: 820,
    img: chocoDip,
  },
];

const giftHampers: Product[] = [
  {
    id: "royal-amethyst-casket",
    name: "Royal Amethyst Casket",
    origin: "Handcrafted Silver Frame · Lavender Silk Potlis & Jar",
    price: 3450,
    img: hamperLavenderSilver,
    unit: "Luxury Keepsake Casket",
  },
  {
    id: "gulab-filigree-casket",
    name: "The Gulab Filigree Casket",
    origin: "Intricate Silver Filigree · Rose Silk & Crystal Finial",
    price: 3850,
    img: hamperRoseFiligree,
    unit: "Handcrafted Silver Casket",
  },
  {
    id: "imperial-silver-basket",
    name: "Imperial Silver Leaf Basket",
    origin: "Embossed Leaf Basket · Sage Silk & Zari Potlis with Jar",
    price: 3250,
    img: hamperSageSilver,
    unit: "Curated Gift Basket",
  },
  {
    id: "zari-crimson-basket",
    name: "Zari Crimson Festive Basket",
    origin: "Gilded Lattice Basket · Crimson Velvet Box & Golden Potlis",
    price: 2950,
    img: hamperCrimsonGold,
    unit: "Festive Keepsake Hamper",
  },
];

function fmtPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function ProductCard({ p, i, onAdd }: { p: Product; i: number; onAdd: (p: Product) => void }) {
  return (
    <article className={`group ${i % 3 === 1 ? "md:mt-24" : ""} ${i % 3 === 2 ? "md:mt-12" : ""}`}>
      <div className="relative aspect-square bg-white mb-6 overflow-hidden border border-black/5">
        <img
          src={p.img}
          alt={p.name}
          width={800}
          height={800}
          loading="lazy"
          className="w-full h-full object-cover opacity-95 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
        <button
          onClick={() => onAdd(p)}
          className="absolute bottom-4 right-4 px-4 py-2 bg-ink text-background text-[10px] font-semibold tracking-[0.25em] uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary"
          aria-label={`Add ${p.name} to pouch`}
        >
          Add to pouch
        </button>
      </div>
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-serif text-2xl leading-tight">{p.name}</h3>
          <p className="text-[10px] text-foreground/50 uppercase tracking-[0.2em] mt-2 font-semibold">
            {p.origin} {p.unit ? `· ${p.unit}` : "· 250g"}
          </p>
        </div>
        <span className="font-medium text-sm whitespace-nowrap pt-1 italic text-foreground/70">
          {fmtPrice(p.price)}
        </span>
      </div>
      <button
        onClick={() => onAdd(p)}
        className="md:hidden mt-4 w-full py-3 border border-ink text-[10px] font-semibold tracking-[0.25em] uppercase hover:bg-ink hover:text-background transition"
      >
        Add to pouch
      </button>
    </article>
  );
}

function Index() {
  const { add, count, setOpen } = useCart();
  const onAdd = (p: Product) => {
    add({ id: p.id, name: p.name, origin: p.origin, price: p.price, img: p.img });
    setOpen(true);
  };
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
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[10px] tracking-[0.35em] uppercase font-semibold text-primary">
                01 — The Pantry
              </span>
              <h2 className="mt-3 text-4xl md:text-5xl font-serif">The full catalogue.</h2>
              <p className="mt-3 italic text-foreground/60 max-w-md">
                Classic dry fruits and our flavour-infused specialities — rotating with each
                harvest.
              </p>
            </div>
            <a
              href="#advisor"
              className="text-[11px] uppercase tracking-[0.25em] font-semibold border-b border-ink pb-1 hover:text-primary hover:border-primary transition"
            >
              Need help choosing? →
            </a>
          </div>

          <h3 className="text-[10px] tracking-[0.35em] uppercase font-bold text-foreground/50 border-t border-black/10 pt-5 mb-12">
            Dry Fruits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16">
            {dryFruits.map((p, i) => (
              <ProductCard key={p.id} p={p} i={i} onAdd={onAdd} />
            ))}
          </div>

          <h3 className="mt-28 text-[10px] tracking-[0.35em] uppercase font-bold text-foreground/50 border-t border-black/10 pt-5 mb-12">
            Flavoured
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16">
            {flavoured.map((p, i) => (
              <ProductCard key={p.id} p={p} i={i} onAdd={onAdd} />
            ))}
          </div>

          <h3
            id="hampers"
            className="mt-28 text-[10px] tracking-[0.35em] uppercase font-bold text-foreground/50 border-t border-black/10 pt-5 mb-12"
          >
            Gift Hampers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16">
            {giftHampers.map((p, i) => (
              <ProductCard key={p.id} p={p} i={i} onAdd={onAdd} />
            ))}
          </div>
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
