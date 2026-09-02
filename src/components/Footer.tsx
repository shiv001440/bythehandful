export function Footer() {
  return (
    <footer className="bg-ink text-background/70 px-6 md:px-12 py-20 border-t border-background/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div className="max-w-sm space-y-4">
            <p className="font-serif text-3xl italic text-background">By the Handful</p>
            <p className="text-sm leading-relaxed text-background/55">
              Purveyors of fine heritage dry fruits since 1923. Katra Ishwar Bhavan, Delhi.
            </p>
          </div>
          <div className="flex gap-16 text-[10px] tracking-[0.3em] uppercase font-semibold">
            <div className="flex flex-col gap-4">
              <a href="#" className="hover:text-amber transition">
                The Archive
              </a>
              <a href="#" className="hover:text-amber transition">
                Sourcing
              </a>
              <a href="#" className="hover:text-amber transition">
                Gift Concierge
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <a href="#" className="hover:text-amber transition">
                Journal
              </a>
              <a href="#" className="hover:text-amber transition">
                Shipping
              </a>
              <a href="#" className="hover:text-amber transition">
                Contact
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-[9px] tracking-[0.35em] uppercase text-background/40">
          <p>© {new Date().getFullYear()} Bhagwandas Chamanlal</p>
          <p>Delhi · Mumbai · London</p>
        </div>
      </div>
    </footer>
  );
}
