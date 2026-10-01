import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { getProductImage } from "@/lib/product-images";
import { getProductPacketUnit, getCleanProductName } from "@/lib/product-units";

function fmt(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function CartDrawer() {
  const { items, isOpen, setOpen, setQty, remove, subtotal, clear } = useCart();
  const totalPackets = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <aside
        role="dialog"
        aria-label="Your pouch"
        className={`fixed top-0 right-0 z-[70] h-full w-full sm:w-[420px] bg-background border-l border-border shadow-2xl transition-transform duration-300 ease-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between px-6 h-16 border-b border-border">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/55">Your Pouch</p>
            <p className="font-serif text-xl italic flex items-baseline gap-2">
              <span>{items.length} {items.length === 1 ? "selection" : "selections"}</span>
              {totalPackets > 0 && (
                <span className="text-xs font-sans font-normal text-foreground/50 not-italic">
                  ({totalPackets} {totalPackets === 1 ? "packet" : "packets"})
                </span>
              )}
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="size-9 rounded-full hover:bg-secondary flex items-center justify-center transition"
          >
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 text-foreground/60">
              <div className="size-16 rounded-full bg-secondary flex items-center justify-center">
                <svg
                  className="size-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                  />
                </svg>
              </div>
              <p className="font-serif text-xl italic">Your pouch is empty.</p>
              <p className="text-sm max-w-[26ch]">
                Add a varietal from The Harvest to begin your selection.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((it) => {
                const packetUnit = getProductPacketUnit(it);
                const cleanName = getCleanProductName(it.name);
                return (
                  <li key={it.id} className="py-5 flex gap-4">
                    <img
                      src={it.img || getProductImage(it.id, it.img, it.name)}
                      alt={cleanName}
                      onError={(e) => {
                        e.currentTarget.src = getProductImage(it.id, null, it.name);
                      }}
                      className="size-20 rounded-lg object-cover bg-secondary"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <p className="font-serif text-lg leading-tight truncate">{cleanName}</p>
                        <button
                          onClick={() => remove(it.id)}
                          aria-label="Remove"
                          className="text-foreground/45 hover:text-primary text-xs"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="inline-flex items-center text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-xs bg-primary/10 text-primary border border-primary/20">
                          Packet: {packetUnit}
                        </span>
                        {it.origin && (
                          <span className="text-[10px] tracking-[0.15em] uppercase text-foreground/50 truncate">
                            · {it.origin}
                          </span>
                        )}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center ring-1 ring-border rounded-full">
                          <button
                            onClick={() => setQty(it.id, it.qty - 1)}
                            aria-label="Decrease"
                            className="size-7 hover:bg-secondary rounded-full transition"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm tabular-nums">{it.qty}</span>
                          <button
                            onClick={() => setQty(it.id, it.qty + 1)}
                            aria-label="Increase"
                            className="size-7 hover:bg-secondary rounded-full transition"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{fmt(it.price * it.qty)}</span>
                          <p className="text-[10px] text-foreground/50 tabular-nums">
                            {it.qty} × {packetUnit}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-border px-6 py-5 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/65">Subtotal</span>
              <span className="font-medium">{fmt(subtotal)}</span>
            </div>
            <p className="text-[11px] text-foreground/50">
              Shipping & taxes calculated at checkout.
            </p>
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="block w-full py-3.5 bg-foreground text-background rounded-full text-sm font-medium text-center hover:bg-foreground/90 transition"
            >
              Proceed to checkout
            </Link>
            <button
              onClick={clear}
              className="w-full text-[11px] tracking-[0.18em] uppercase text-foreground/55 hover:text-primary transition"
            >
              Empty pouch
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
