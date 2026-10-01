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
  const [currentLuxuryIdx, setCurrentLuxuryIdx] = useState(0);
  const [currentCorporateIdx, setCurrentCorporateIdx] = useState(0);

  const luxuryHamperItems =
    hamperCategories.find((c) => c.id === "hampers-luxury")?.items || [];
  const corporateHamperItems =
    hamperCategories.find((c) => c.id === "hampers-corporate")?.items || [];

  useEffect(() => {
    if (luxuryHamperItems.length === 0) return;
    const interval = setInterval(() => {
      setCurrentLuxuryIdx((prev) => (prev + 1) % luxuryHamperItems.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [luxuryHamperItems.length]);

  useEffect(() => {
    if (corporateHamperItems.length === 0) return;
    const interval = setInterval(() => {
      setCurrentCorporateIdx((prev) => (prev + 1) % corporateHamperItems.length);
    }, 2700);
    return () => clearInterval(interval);
  }, [corporateHamperItems.length]);

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
      <section className="relative min-h-[92vh] md:min-h-[92vh] flex flex-col justify-center px-4 md:px-8 border-b border-black/5 overflow-hidden">


        <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-6 items-center pt-6 pb-16 animate-reveal-up">

          {/* LEFT — Luxury Hampers Carousel */}
          <div className="hidden md:flex flex-col gap-3">
            <p className="text-[9px] tracking-[0.4em] uppercase font-bold text-primary/80 text-center">Luxury Hampers</p>
            <a
              href="/collections/hampers-luxury"
              className="group relative block aspect-[3/4] w-full mx-auto bg-gradient-warm ring-1 ring-primary/20 overflow-hidden shadow-elegant"
            >
              {luxuryHamperItems.map((hamper, idx) => (
                <img
                  key={hamper.id}
                  src={hamper.img}
                  alt={hamper.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-[1.04] ${
                    idx === currentLuxuryIdx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                />
              ))}
              {/* Label strip */}
              <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-ink/80 to-transparent px-4 py-4">
                <div className="relative h-9 overflow-hidden">
                  {luxuryHamperItems.map((hamper, idx) => (
                    <p
                      key={hamper.id}
                      className={`absolute inset-0 font-serif italic text-base text-background leading-tight transition-all duration-700 ${
                        idx === currentLuxuryIdx
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-3 pointer-events-none"
                      }`}
                    >
                      {hamper.name}
                    </p>
                  ))}
                </div>
                {/* Dot indicators */}
                <div className="flex gap-1 mt-2">
                  {luxuryHamperItems.slice(0, 8).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-[2px] flex-1 rounded-full transition-all duration-500 ${
                        idx === currentLuxuryIdx % 8 ? "bg-primary" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </a>
          </div>

          {/* CENTER — Hero Text */}
          <div className="flex flex-col items-center text-center w-[300px] lg:w-[340px] mx-auto px-2">
            <h1 className="font-serif text-5xl md:text-5xl lg:text-6xl leading-[0.88] tracking-tighter italic text-balance">
              By the <br />
              Handful.
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-foreground/70">
              A century of sourcing the world's most exceptional dry fruits — elevated into
              breathtaking luxury keepsakes.
            </p>
            <div className="mt-6 flex flex-col gap-3 items-center justify-center">
              <a
                href="#about"
                className="group relative text-[9px] uppercase tracking-[0.25em] font-semibold text-foreground transition-colors duration-300 hover:text-primary"
              >
                Explore 100-year history
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary/40 scale-x-100 group-hover:bg-primary transition-colors duration-300" />
              </a>
            </div>
            {/* Stats strip */}
            <div className="mt-8 flex gap-5 items-center border-t border-ink/10 pt-6">
              <div className="text-center">
                <p className="font-serif text-2xl">100+</p>
                <p className="text-[8px] tracking-[0.2em] uppercase text-foreground/50 mt-1 font-semibold">Years</p>
              </div>
              <div className="w-px h-6 bg-ink/15" />
              <div className="text-center">
                <p className="font-serif text-2xl">4</p>
                <p className="text-[8px] tracking-[0.2em] uppercase text-foreground/50 mt-1 font-semibold">Generations</p>
              </div>
              <div className="w-px h-6 bg-ink/15" />
              <div className="text-center">
                <p className="font-serif text-2xl italic">Est.</p>
                <p className="text-[8px] tracking-[0.2em] uppercase text-foreground/50 mt-1 font-semibold">1923</p>
              </div>
            </div>
          </div>

          {/* RIGHT — Corporate Hampers Carousel (desktop) */}
          <div className="hidden md:flex flex-col gap-3">
            <p className="text-[9px] tracking-[0.4em] uppercase font-bold text-primary/80 text-center">Corporate Hampers</p>
            <a
              href="/collections/hampers-corporate"
              className="group relative block aspect-[3/4] w-full mx-auto bg-gradient-warm ring-1 ring-primary/20 overflow-hidden shadow-elegant"
            >
              {corporateHamperItems.map((hamper, idx) => (
                <img
                  key={hamper.id}
                  src={hamper.img}
                  alt={hamper.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-[1.04] ${
                    idx === currentCorporateIdx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                />
              ))}
              {/* Label strip */}
              <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-ink/80 to-transparent px-4 py-4">
                <div className="relative h-9 overflow-hidden">
                  {corporateHamperItems.map((hamper, idx) => (
                    <p
                      key={hamper.id}
                      className={`absolute inset-0 font-serif italic text-base text-background leading-tight transition-all duration-700 ${
                        idx === currentCorporateIdx
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-3 pointer-events-none"
                      }`}
                    >
                      {hamper.name}
                    </p>
                  ))}
                </div>
                {/* Dot indicators */}
                <div className="flex gap-1 mt-2">
                  {corporateHamperItems.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-[2px] flex-1 rounded-full transition-all duration-500 ${
                        idx === currentCorporateIdx ? "bg-primary" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </a>
          </div>

          {/* ── MOBILE ONLY: Side-by-side carousels below text ── */}
          <div className="md:hidden col-span-full mt-6 grid grid-cols-2 gap-3">
            {/* Luxury */}
            <div className="flex flex-col gap-2">
              <p className="text-[8px] tracking-[0.35em] uppercase font-bold text-primary/80 text-center">Luxury</p>
              <a
                href="/collections/hampers-luxury"
                className="group relative block aspect-[3/4] w-full bg-gradient-warm ring-1 ring-primary/20 overflow-hidden shadow-elegant"
              >
                {luxuryHamperItems.map((hamper, idx) => (
                  <img
                    key={hamper.id}
                    src={hamper.img}
                    alt={hamper.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                      idx === currentLuxuryIdx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  />
                ))}
                <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-ink/70 to-transparent px-3 py-3">
                  <div className="relative h-7 overflow-hidden">
                    {luxuryHamperItems.map((hamper, idx) => (
                      <p key={hamper.id} className={`absolute inset-0 font-serif italic text-sm text-background leading-tight transition-all duration-700 ${
                        idx === currentLuxuryIdx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                      }`}>{hamper.name}</p>
                    ))}
                  </div>
                  <div className="flex gap-1 mt-1">
                    {luxuryHamperItems.slice(0, 8).map((_, idx) => (
                      <div key={idx} className={`h-[2px] flex-1 rounded-full transition-all duration-500 ${
                        idx === currentLuxuryIdx % 8 ? "bg-primary" : "bg-white/30"
                      }`} />
                    ))}
                  </div>
                </div>
              </a>
            </div>

            {/* Corporate */}
            <div className="flex flex-col gap-2">
              <p className="text-[8px] tracking-[0.35em] uppercase font-bold text-primary/80 text-center">Corporate</p>
              <a
                href="/collections/hampers-corporate"
                className="group relative block aspect-[3/4] w-full bg-gradient-warm ring-1 ring-primary/20 overflow-hidden shadow-elegant"
              >
                {corporateHamperItems.map((hamper, idx) => (
                  <img
                    key={hamper.id}
                    src={hamper.img}
                    alt={hamper.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                      idx === currentCorporateIdx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  />
                ))}
                <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-ink/70 to-transparent px-3 py-3">
                  <div className="relative h-7 overflow-hidden">
                    {corporateHamperItems.map((hamper, idx) => (
                      <p key={hamper.id} className={`absolute inset-0 font-serif italic text-sm text-background leading-tight transition-all duration-700 ${
                        idx === currentCorporateIdx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                      }`}>{hamper.name}</p>
                    ))}
                  </div>
                  <div className="flex gap-1 mt-1">
                    {corporateHamperItems.map((_, idx) => (
                      <div key={idx} className={`h-[2px] flex-1 rounded-full transition-all duration-500 ${
                        idx === currentCorporateIdx ? "bg-primary" : "bg-white/30"
                      }`} />
                    ))}
                  </div>
                </div>
              </a>
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
                <span className="inline-block text-[10px] tracking-[0.35em] uppercase font-bold text-primary border-b border-primary/40 pb-2">
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
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary/40 scale-x-100 group-hover:bg-primary transition-colors duration-300" />
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
                  <div className="relative aspect-square bg-gradient-warm overflow-hidden mb-5 ring-1 ring-primary/20 shadow-inner p-4 group-hover:shadow-elegant transition-all duration-300">
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
                    <span className="text-primary/70 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary">
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
                  <div className="relative aspect-square bg-gradient-warm overflow-hidden mb-5 ring-1 ring-primary/20 shadow-inner p-4 group-hover:shadow-elegant transition-all duration-300">
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
                    <span className="text-primary/70 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary">
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
              <span className="inline-block text-[10px] tracking-[0.35em] uppercase font-bold text-primary border-b border-primary/40 pb-2">
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
              <span className="inline-block text-[10px] tracking-[0.35em] uppercase font-bold text-primary border-b border-primary/40 pb-2">
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
