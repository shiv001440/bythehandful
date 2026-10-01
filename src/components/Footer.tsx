export function Footer() {
  return (
    <footer
      className="relative text-background/70 px-6 md:px-12 pt-16 pb-10 border-t border-primary/20"
      style={{
        background: "linear-gradient(160deg, oklch(0.135 0.014 52) 0%, oklch(0.155 0.022 58) 40%, oklch(0.13 0.012 48) 100%)",
      }}
    >
      {/* Gold shimmer rule at top */}
      <div className="absolute top-0 inset-x-0 h-px gold-rule" />
      <div className="max-w-7xl mx-auto">

        {/* ── Top grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand blurb */}
          <div className="lg:col-span-2 space-y-4 max-w-sm">
            <p className="font-serif text-3xl italic text-background">By the Handful</p>
            <p className="text-sm leading-relaxed text-background/55">
              Purveyors of fine heritage dry fruits since 1923. Katra Ishwar Bhavan, Delhi.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 pt-2">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/bythehandfulofficial/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-background/20 text-background/60 hover:text-amber hover:border-amber transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/919810020801"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-background/20 text-background/60 hover:text-amber hover:border-amber transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase font-bold text-background/40 mb-5">
              Quick Links
            </p>
            <div className="flex flex-col gap-3 text-[10px] tracking-[0.25em] uppercase font-semibold">
              <a href="/" className="hover:text-amber transition">Home</a>
              <a href="/#about" className="hover:text-amber transition">About Us</a>
              <a href="/orders" className="hover:text-amber transition">Orders</a>
              <a href="/collections/hampers-luxury" className="hover:text-amber transition">Luxury Hampers</a>
              <a href="/collections/hampers-corporate" className="hover:text-amber transition">Corporate Hampers</a>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase font-bold text-background/40 mb-5">
              Contact Us
            </p>
            <div className="flex flex-col gap-4 text-sm">
              {/* Phone */}
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase font-semibold text-background/40 mb-1">Phone</p>
                <a
                  href="tel:+919810020801"
                  className="text-background/75 hover:text-amber transition"
                >
                  +91 98100 20801
                </a>
              </div>
              {/* Email */}
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase font-semibold text-background/40 mb-1">Email</p>
                <a
                  href="mailto:kushmalhotra29@gmail.com"
                  className="text-background/75 hover:text-amber transition break-all"
                >
                  kushmalhotra29@gmail.com
                </a>
              </div>
              {/* Address */}
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase font-semibold text-background/40 mb-1">Address</p>
                <p className="text-background/60 leading-relaxed text-sm">
                  Katra Ishwar Bhavan,<br />
                  Chandni Chowk, Delhi
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ── Legal links ── */}
        <div className="mb-4 flex flex-wrap gap-x-6 gap-y-2 text-[9px] tracking-[0.3em] uppercase font-semibold text-background/35">
          <a href="/privacy-policy" className="hover:text-amber transition">Privacy Policy</a>
          <a href="/terms-and-conditions" className="hover:text-amber transition">Terms & Conditions</a>
          <a href="/shipping-policy" className="hover:text-amber transition">Shipping Policy</a>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-[9px] tracking-[0.35em] uppercase text-background/40">
          <p>© {new Date().getFullYear()} Bhagwandas Chamanlal</p>
          {/* <p>Delhi · Mumbai · London</p> */}
        </div>

      </div>
    </footer>
  );
}
