import { useState, useEffect } from "react";
import { AUTHORITATIVE_PRODUCTS } from "@/lib/products";
import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-3d-dryfruits.jpg";
import heritageImg from "@/assets/heritage-family.jpg";
import founder from "@/assets/founder-image.png";
import cofounder from "@/assets/cofounder-image.jpeg";
import {
  menuCategories,
  hamperCategories,
  type Product,
  shagunENoorImg,
  moonstoneCharmImg,
  sapphireChestImg,
  roseateGraceImg,
  amethystEleganceImg,
  maroonMajestyImg
} from "@/lib/catalog";
import { HealthAdvisor } from "@/components/HealthAdvisor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "By The Handful — Sun-cured dry fruits & nuts" },
      { name: "description", content: "Premium quality dry fruits, nuts, and hampers." },
    ],
  }),
  component: Index,
});

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
  const [currentHamperIdx, setCurrentHamperIdx] = useState(0);

  const luxuryHamperItems =
    hamperCategories.find((c) => c.id === "hampers-luxury")?.items || [];

  useEffect(() => {
    if (luxuryHamperItems.length === 0) return;
    const interval = setInterval(() => {
      setCurrentHamperIdx((prev) => (prev + 1) % luxuryHamperItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [luxuryHamperItems.length]);

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
    <div className="relative min-h-screen bg-background text-foreground selection:bg-amber/40 selection:text-ink">
      {/* Floating luxury hampers background (Spans entire page) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <img
          src={shagunENoorImg}
          alt=""
          className="absolute top-[5%] left-[5%] w-24 md:w-32 rounded-xl opacity-30 shadow-xl blur-[1px] animate-drift-a"
        />
        <img
          src={moonstoneCharmImg}
          alt=""
          className="absolute top-[15%] right-[8%] w-20 md:w-28 rounded-xl opacity-30 shadow-xl animate-drift-b"
          style={{ animationDelay: "-2s" }}
        />
        <img
          src={sapphireChestImg}
          alt=""
          className="absolute top-[25%] left-[10%] w-24 md:w-36 rounded-xl opacity-30 shadow-xl blur-[1px] animate-drift-c"
          style={{ animationDelay: "-4s" }}
        />
        <img
          src={roseateGraceImg}
          alt=""
          className="absolute top-[35%] right-[12%] w-20 md:w-28 rounded-xl opacity-30 shadow-xl animate-drift-a"
          style={{ animationDelay: "-6s" }}
        />
        <img
          src={amethystEleganceImg}
          alt=""
          className="absolute top-[45%] left-[45%] w-16 md:w-24 rounded-xl opacity-20 shadow-xl blur-[1px] animate-drift-b"
          style={{ animationDelay: "-8s" }}
        />
        <img
          src={maroonMajestyImg}
          alt=""
          className="absolute top-[55%] right-[20%] w-20 md:w-32 rounded-xl opacity-25 shadow-xl animate-drift-c"
          style={{ animationDelay: "-1s" }}
        />
        <img
          src={shagunENoorImg}
          alt=""
          className="absolute top-[65%] left-[15%] w-24 md:w-28 rounded-xl opacity-30 shadow-xl blur-[1px] animate-drift-a"
          style={{ animationDelay: "-3s" }}
        />
        <img
          src={moonstoneCharmImg}
          alt=""
          className="absolute top-[75%] right-[5%] w-24 md:w-32 rounded-xl opacity-30 shadow-xl animate-drift-b"
          style={{ animationDelay: "-5s" }}
        />
        <img
          src={sapphireChestImg}
          alt=""
          className="absolute top-[85%] left-[25%] w-20 md:w-36 rounded-xl opacity-25 shadow-xl blur-[1px] animate-drift-c"
          style={{ animationDelay: "-7s" }}
        />
        <img
          src={roseateGraceImg}
          alt=""
          className="absolute top-[95%] right-[15%] w-20 md:w-28 rounded-xl opacity-30 shadow-xl animate-drift-a"
          style={{ animationDelay: "-9s" }}
        />
      </div>

      {/* NAV */}
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-center px-6 md:px-12 border-b border-black/5 overflow-hidden">

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
              A century of sourcing the world's most exceptional dry fruits — elevated into
              breathtaking luxury keepsakes. Heritage-grade quality, curated for the art of premium
              gifting.
            </p>
            <div className="mt-10 flex flex-wrap gap-6 items-center">
              <a
                href="/collections/hampers-luxury"
                className="px-7 py-3 text-sm bg-primary text-secondary font-semibold uppercase tracking-[0.2em] shadow-elegant hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)] transition-all duration-300"
              >
                Shop Luxury Hampers
              </a>
              <a
                href="#about"
                className="group relative text-[9.5px] uppercase tracking-[0.25em] font-semibold text-foreground transition-colors duration-300 hover:text-primary"
              >
                Explore 100-year history
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-secondary scale-x-100 group-hover:bg-primary transition-colors duration-300" />
              </a>
            </div>
          </div>

          <div className="md:col-span-5 relative group">
            <div className="aspect-[4/5] bg-gradient-warm rounded-sm ring-1 ring-secondary/20 p-4">
              <div className="relative w-full h-full overflow-hidden">
                {luxuryHamperItems.map((hamper, idx) => (
                  <img
                    key={hamper.id}
                    src={hamper.img}
                    alt={hamper.name}
                    className={`absolute inset-0 w-full h-full object-cover animate-float-slow transition-all duration-1000 group-hover:scale-105 ${idx === currentHamperIdx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                      }`}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gradient-warm p-6 shadow-elegant max-w-[240px] ring-1 ring-secondary/30 rounded-sm z-20">
              <p className="text-[10px] uppercase tracking-[0.28em] font-bold mb-3 text-primary">
                Featured Collection
              </p>
              <div className="relative h-14">
                {luxuryHamperItems.map((hamper, idx) => (
                  <p
                    key={hamper.id}
                    className={`absolute inset-0 text-base italic font-serif leading-snug text-foreground transition-opacity duration-1000 ${idx === currentHamperIdx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                      }`}
                  >
                    The {hamper.name}.
                    <br />
                    <span className="text-sm font-sans italic opacity-80">{hamper.unit || "Luxury Gift Hamper"}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE / VALUES */}
      {/* <section className="relative z-10 border-b border-black/5 py-6">
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
      </section> */}

      {/* SHOP BY COLLECTION */}
      <section id="collections" className="relative z-10 py-16 lg:py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="mb-4">
                <span className="inline-block text-[10px] tracking-[0.35em] uppercase font-semibold text-secondary border-b border-secondary/40 pb-2">
                  01 — Collections
                </span>
              </div>
              <h2 className="mt-3 text-4xl md:text-5xl font-serif">Shop by Collection.</h2>
              <p className="mt-3 italic text-foreground/60 max-w-2xl">
                An exquisite selection of premium dried fruits, exotic fruits, nuts, saffron, seeds,
                and luxury hampers, carefully sourced for superior quality and taste.
              </p>
            </div>
            <a
              href="#advisor"
              className="group relative text-[11px] uppercase tracking-[0.25em] font-semibold text-foreground transition-colors duration-300 hover:text-primary"
            >
              Need help choosing? →
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-secondary scale-x-100 group-hover:bg-primary transition-colors duration-300" />
            </a>
          </div>

          <div className="mb-8">
            <h3 className="font-serif text-3xl md:text-4xl italic text-foreground mb-8">
              Luxury Hampers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12">
              {hamperCategories.map((category) => (
                <a
                  key={category.id}
                  href={`/collections/${category.id}`}
                  className="group flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-1"
                >
                  <div className="relative aspect-square bg-gradient-warm overflow-hidden mb-5 ring-1 ring-secondary/30 shadow-inner p-4 group-hover:shadow-elegant transition-all duration-300">
                    <img
                      src={category.items[0]?.img}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-primary/5 transition-colors duration-500" />
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </h3>
                    <span className="text-secondary transform transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary">
                      →
                    </span>
                  </div>
                  <p className="px-1 mt-2 text-[13px] leading-relaxed italic text-muted-foreground line-clamp-2">
                    {category.tagline}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <h3 className="font-serif text-3xl md:text-4xl italic text-foreground mb-8">
              Premium Dry Fruits
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12">
              {menuCategories.map((category) => (
                <a
                  key={category.id}
                  href={`/collections/${category.id}`}
                  className="group flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-1"
                >
                  <div className="relative aspect-square bg-gradient-warm overflow-hidden mb-5 ring-1 ring-secondary/30 shadow-inner p-4 group-hover:shadow-elegant transition-all duration-300">
                    <img
                      src={category.items[0]?.img}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-primary/5 transition-colors duration-500" />
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </h3>
                    <span className="text-secondary transform transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary">
                      →
                    </span>
                  </div>
                  <p className="px-1 mt-2 text-[13px] leading-relaxed italic text-muted-foreground line-clamp-2">
                    {category.tagline}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* HERITAGE / ABOUT */}
      <section id="about" className="relative z-10 py-16 lg:py-20 px-6 md:px-12 bg-transparent">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <div className="w-full max-w-md aspect-[3/4] bg-stone relative overflow-hidden">
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
            <div className="mb-2">
              <span className="inline-block text-[10px] tracking-[0.35em] uppercase font-semibold text-secondary border-b border-secondary/40 pb-2">
                02 — Our Heritage
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl italic leading-tight text-balance text-foreground">
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
        <div className="max-w-7xl mx-auto mt-16 lg:mt-20">
          <div className="text-center space-y-3 mb-16">
            <div className="mb-6">
              <span className="inline-block text-[10px] tracking-[0.35em] uppercase font-semibold text-secondary border-b border-secondary/40 pb-2">
                Leadership
              </span>
            </div>
            <h3 className="font-serif text-4xl md:text-5xl italic text-foreground">The hands behind the handful</h3>
            <p className="text-foreground/65 max-w-xl mx-auto italic">
              A mother-and-son duo carrying a century-old legacy into its next chapter.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16">
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
              <div key={p.role} className="group">
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
