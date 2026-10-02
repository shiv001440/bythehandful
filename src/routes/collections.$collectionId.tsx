import { useState, useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { menuCategories, hamperCategories, type Product } from "@/lib/catalog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const WHATSAPP_NUMBER = "919810020801";

export const Route = createFileRoute("/collections/$collectionId")({
  loader: ({ params: { collectionId } }) => {
    const allCategories = [...menuCategories, ...hamperCategories];
    const category = allCategories.find((c) => c.id === collectionId);
    if (!category) {
      throw notFound();
    }
    return { category };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.category.title || "Collection"} — By The Handful` },
      { name: "description", content: loaderData?.category.tagline },
    ],
  }),
  component: CollectionPage,
});

function fmtPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

// ─── Regular product card (nuts, berries, seeds, etc.) ───────────────────────
function ProductCard({ p, onAdd }: { p: any; i?: number; onAdd: (p: any) => void }) {
  const [selectedVariant, setSelectedVariant] = useState(p.variants ? p.variants[0] : null);
  const activePrice = selectedVariant ? selectedVariant.price : p.price;
  const activeUnit = selectedVariant ? selectedVariant.unit : p.unit;
  const activeId = selectedVariant ? `${p.id}${selectedVariant.idSuffix}` : p.id;

  const handleAdd = () => {
    onAdd({ ...p, id: activeId, price: activePrice, unit: activeUnit });
  };

  return (
    <article className="group flex flex-col justify-between transition-all duration-300 ease-in-out hover:-translate-y-1">
      <div>
        <div className="relative aspect-square bg-gradient-warm p-4 mb-4 overflow-hidden ring-1 ring-secondary/30 shadow-inner group-hover:shadow-elegant transition-all duration-300">
          <img
            src={p.img}
            alt={p.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-ink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <button
            onClick={handleAdd}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 bg-primary text-primary-foreground px-6 py-3 text-[10px] uppercase font-bold tracking-[0.2em] shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-primary/90 hover:text-white"
          >
            Add to Pouch
          </button>
        </div>

        <div className="flex flex-col gap-2 px-1">
          <div className="min-w-0 pr-1 space-y-1">
            <h3 className="font-serif text-lg md:text-xl leading-snug truncate text-foreground group-hover:text-primary transition-colors duration-300">
              {p.name}
            </h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-semibold line-clamp-2">
              {p.origin}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            {p.variants ? (
              <select 
                className="bg-secondary/50 border border-primary/20 text-xs py-1 px-2 rounded-sm focus:outline-none focus:border-primary"
                value={selectedVariant.unit}
                onChange={(e) => {
                  const v = p.variants.find((v: any) => v.unit === e.target.value);
                  if (v) setSelectedVariant(v);
                }}
              >
                {p.variants.map((v: any) => (
                  <option key={v.unit} value={v.unit}>{v.unit}</option>
                ))}
              </select>
            ) : (
              <span className="text-xs text-muted-foreground">{p.unit || "1 kg"}</span>
            )}
            
            <span className="font-medium text-sm whitespace-nowrap italic text-primary">
              {fmtPrice(activePrice)}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={handleAdd}
        className="md:hidden mx-1 mt-3 py-2.5 border border-primary/20 text-[9px] font-semibold tracking-[0.2em] uppercase text-primary hover:bg-primary hover:text-primary-foreground transition"
      >
        Add to pouch
      </button>
    </article>
  );
}

// ─── Hamper detail modal ──────────────────────────────────────────────────────
function HamperModal({
  hamper,
  open,
  onClose,
  onAdd,
}: {
  hamper: Product | null;
  open: boolean;
  onClose: () => void;
  onAdd: (p: Product) => void;
}) {
  if (!hamper) return null;

  const contents = hamper.origin ? hamper.origin.split("·").map((s) => s.trim()) : [];
  const waMessage = encodeURIComponent(
    `Hi, I would like to know more about ${hamper.name} hamper.`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-lg p-0 flex flex-col max-h-[90vh] overflow-hidden bg-background text-foreground border border-black/15 shadow-2xl rounded-none sm:rounded-none">
        {/* Image — fixed height so it never dominates the viewport */}
        <div className="relative w-full shrink-0 overflow-hidden bg-secondary" style={{ height: "min(55vh, 380px)" }}>
          <img
            src={hamper.img}
            alt={hamper.name}
            className="w-full h-full object-contain"
          />
          {/* Subtle gradient overlay at bottom for legibility */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Content — scrollable if tall */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4 pr-7">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/50 font-bold mb-1">
                  {hamper.unit}
                </p>
                <DialogTitle className="font-serif text-2xl md:text-3xl italic leading-tight">
                  {hamper.name}
                </DialogTitle>
              </div>
              <span className="font-serif text-2xl italic text-primary shrink-0 pt-5">
                {fmtPrice(hamper.price)}
              </span>
            </div>
          </DialogHeader>



          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => { onAdd(hamper); onClose(); }}
              className="flex-1 py-3 bg-foreground text-background text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-foreground/85 transition-colors"
            >
              Add to Pouch
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 flex items-center justify-center gap-2 border border-[#25D366] text-[#128C7E] text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#25D366]/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              Order on WhatsApp
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Hamper card (rectangular image, clickable, opens modal) ─────────────────
function HamperCard({ p, onAdd }: { p: Product; onAdd: (p: Product) => void }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <article
        className="group flex flex-col cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1"
        onClick={() => setModalOpen(true)}
        role="button"
        aria-label={`View details for ${p.name}`}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setModalOpen(true); }}
      >
        {/* Rectangular image — aspect-[4/3] so portrait hamper pictures show fully */}
        <div className="relative aspect-[3/4] bg-gradient-warm overflow-hidden ring-1 ring-secondary/30 shadow-inner group-hover:shadow-elegant transition-all duration-300 mb-4">
          <img
            src={p.img}
            alt={p.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-ink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* "View details" hint on hover */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-3 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <span className="bg-background/90 backdrop-blur-sm text-foreground text-[9px] uppercase font-bold tracking-[0.2em] px-3 py-1.5 shadow">
              View Details
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 px-1">
          <h3 className="font-serif text-lg md:text-xl leading-snug text-foreground group-hover:text-primary transition-colors duration-300">
            {p.name}
          </h3>
          {p.origin && (
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.12em] font-semibold line-clamp-2 leading-relaxed">
              {p.origin}
            </p>
          )}
          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] text-foreground/45 uppercase tracking-wider">{p.unit}</span>
            <span className="font-medium text-sm whitespace-nowrap italic text-primary">
              {fmtPrice(p.price)}
            </span>
          </div>
        </div>
      </article>

      <HamperModal
        hamper={p}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={onAdd}
      />
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function CollectionPage() {
  const { category } = Route.useLoaderData();
  const { add, setOpen } = useCart();
  const [page, setPage] = useState(1);

  const isHamperCollection = hamperCategories.some((c) => c.id === category.id);
  const itemsPerPage = isHamperCollection ? 12 : 10;
  const totalPages = Math.ceil(category.items.length / itemsPerPage);

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [category.id]);

  const currentItems = category.items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const onAdd = (p: Product) => {
    add({ id: p.id, name: p.name, origin: p.origin, price: p.price, img: p.img, unit: p.unit || "1 pc" });
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber/40 selection:text-ink">
      <Navbar />

      <main className="flex-1">
        {/* HEADER SECTION */}
        <section className="pt-8 pb-6 px-6 md:px-12 border-b border-secondary/20 bg-gradient-warm">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-4 inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-semibold text-foreground/50">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span>Collections</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl italic leading-tight text-ink mb-2">
              {category.title}
            </h1>
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">{category.tagline}</p>
          </div>
        </section>

        {/* PRODUCTS GRID */}
        <section className="pt-8 pb-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-[11px] uppercase tracking-[0.2em] font-semibold text-foreground/60 border-b border-black/8 pb-4">
              <span>{category.items.length} {isHamperCollection ? "Hampers" : "Products"}</span>
              {isHamperCollection && (
                <span className="ml-3 text-foreground/40 normal-case tracking-normal font-normal">
                  — click any hamper to see its full contents
                </span>
              )}
            </div>

            {isHamperCollection ? (
              // Hamper grid: 2 cols on mobile, 3 on md, 4 on lg
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                {currentItems.map((p) => (
                  <HamperCard key={p.id} p={p} onAdd={onAdd} />
                ))}
              </div>
            ) : (
              // Regular product grid: 2 cols on mobile, 4 on md, 5 on lg
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12">
                {currentItems.map((p, i) => (
                  <ProductCard key={p.id} p={p} i={i} onAdd={onAdd} />
                ))}
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-2">
                <button
                  onClick={() => {
                    setPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={page === 1}
                  className="w-8 h-8 flex items-center justify-center text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 transition-colors"
                  aria-label="Previous page"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setPage(i + 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-8 h-8 flex items-center justify-center text-[11px] font-semibold transition-colors ${
                      page === i + 1
                        ? "bg-ink text-background"
                        : "bg-transparent text-ink border border-black/10 hover:border-ink"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={page === totalPages}
                  className="w-8 h-8 flex items-center justify-center text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 transition-colors"
                  aria-label="Next page"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
