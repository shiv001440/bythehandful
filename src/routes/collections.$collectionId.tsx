import { useState, useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { menuCategories, hamperCategories, type Product } from "@/lib/catalog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";

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

function CollectionPage() {
  const { category } = Route.useLoaderData();
  const { add, setOpen } = useCart();
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(category.items.length / itemsPerPage);
  
  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [category.id]);

  const currentItems = category.items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const onAdd = (p: Product) => {
    add({ id: p.id, name: p.name, origin: p.origin, price: p.price, img: p.img, unit: p.unit || "250g" });
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
              <span>{category.items.length} Products</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12">
              {currentItems.map((p, i) => (
                <ProductCard key={p.id} p={p} i={i} onAdd={onAdd} />
              ))}
            </div>

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
