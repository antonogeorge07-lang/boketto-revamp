import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORY_META, useStore, type Category, type Modifier, type OrderLine, type Product } from "../lib/store";
import { LanguageSwitcher } from "../lib/i18n";
import galleryInterior from "../assets/gallery-interior.jpg";
import galleryMatcha from "../assets/gallery-matcha.jpg";
import galleryCroissant from "../assets/gallery-croissant.jpg";
import galleryPistachio from "../assets/gallery-pistachio.jpg";

const BOKETTO_PASTRY_HERO = "https://bokettopastry.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-27-at-12.18.01.jpeg";
const BOKETTO_SIGNATURE = "https://bokettopastry.com/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-28-at-13.04.17-1024x768.jpeg";
const MAPS_URL = "https://www.google.com/maps/place/Boketto+Specialty+Coffee/@39.4725533,-0.3824784,17z";

export const Route = createFileRoute("/")({
  component: PublicStorefront,
});

// ============================================================================
// PUBLIC STOREFRONT — no admin surfaces, no staff links
// ============================================================================

type DraftLine = OrderLine;

function PublicStorefront() {
  const { products, createOrder } = useStore();
  const [cat, setCat] = useState<Category>("bokematchas");
  const [drawerFor, setDrawerFor] = useState<Product | null>(null);
  const [cart, setCart] = useState<DraftLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState<{ name: string; table: string } | null>(null);
  const [confirmed, setConfirmed] = useState<{ ref: string; name: string } | null>(null);

  const specials = useMemo(() => products.filter((p) => p.featured), [products]);
  const regulars = useMemo(() => products.filter((p) => p.regular), [products]);
  const catalog = useMemo(() => products.filter((p) => p.category === cat), [products, cat]);

  const cartCount = cart.reduce((n, l) => n + l.qty, 0);
  const cartTotal = cart.reduce(
    (s, l) => s + (l.price + l.modifiers.reduce((m, x) => m + x.price, 0)) * l.qty,
    0,
  );

  const addLine = (line: DraftLine) => {
    setCart((prev) => [...prev, line]);
    setDrawerFor(null);
    setCartOpen(true);
  };

  const submitOrder = () => {
    if (!checkout || cart.length === 0) return;
    const order = createOrder({ customer: checkout.name, table: checkout.table, lines: cart });
    setConfirmed({ ref: order.ref, name: checkout.name || "Barra" });
    setCart([]);
    setCheckout(null);
    setCartOpen(false);
  };

  return (
    <div className="min-h-screen text-foreground pb-40">
      <FloatingNav />

      <Hero />

      <SpecialsCarousel items={specials} onOpen={(p) => setDrawerFor(p)} />

      <RegularsGrid items={regulars} onOpen={(p) => setDrawerFor(p)} />

      <MenuSection cat={cat} setCat={setCat} items={catalog} onOpen={(p) => setDrawerFor(p)} />

      <Footer />

      {drawerFor && (
        <CustomizerDrawer
          product={drawerFor}
          onClose={() => setDrawerFor(null)}
          onAdd={addLine}
        />
      )}

      {cartCount > 0 && !checkout && !confirmed && (
        <CartDrawer
          open={cartOpen}
          setOpen={setCartOpen}
          lines={cart}
          total={cartTotal}
          onRemove={(idx) => setCart((prev) => prev.filter((_, i) => i !== idx))}
          onCheckout={() => setCheckout({ name: "", table: "" })}
        />
      )}

      {checkout && (
        <CheckoutSheet
          value={checkout}
          setValue={setCheckout}
          total={cartTotal}
          onSubmit={submitOrder}
          onCancel={() => setCheckout(null)}
        />
      )}

      {confirmed && (
        <ConfirmSheet
          ref_={confirmed.ref}
          name={confirmed.name}
          onDone={() => setConfirmed(null)}
        />
      )}
    </div>
  );
}

// ============================================================================
// FLOATING GLASS NAV
// ============================================================================
function FloatingNav() {
  return (
    <header className="fixed top-4 inset-x-4 z-40 flex justify-center pointer-events-none">
      <div className="glass shimmer pointer-events-auto flex items-center gap-6 px-5 py-2.5 rounded-full">
        <span className="font-serif text-lg leading-none tracking-tight">boketto</span>
        <span className="hidden sm:block h-4 w-px bg-foreground/15" />
        <span className="hidden sm:block text-[10px] tracking-editorial uppercase text-foreground/60">
          guillem sorolla 29 · valència
        </span>
        <span className="h-4 w-px bg-foreground/15" />
        <LanguageSwitcher tone="dark" />
      </div>
    </header>
  );
}

// ============================================================================
// HERO
// ============================================================================
function Hero() {
  return (
    <section className="relative min-h-[92svh] flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, var(--forest) 1px, transparent 1px), radial-gradient(circle at 80% 60%, var(--forest) 1px, transparent 1px)",
          backgroundSize: "44px 44px, 66px 66px",
        }} />
      </div>

      <div className="animate-rise">
        <p className="text-[10px] tracking-editorial uppercase text-foreground/50">
          Specialty Coffee · Artisan Pastries · All-Day Brunch
        </p>
        <div className="hairline w-16 mx-auto mt-6" />
      </div>

      <h1 className="mt-10 font-serif italic text-5xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight max-w-4xl animate-rise-slow">
        Mirar a la nada
        <br />
        <span className="text-foreground/80">y que te sepa a Boketto.</span>
      </h1>

      <p className="mt-8 max-w-md text-sm leading-relaxed text-foreground/65 animate-rise-slow">
        A small Valencian room where coffee is treated as living matter and pastry as a small edible essay.
      </p>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-3 animate-rise-slow">
        <a
          href="#menu"
          className="glass-dark shimmer press rounded-full px-7 py-3 text-xs tracking-editorial uppercase"
        >
          Explore the menu
        </a>
        <a
          href="https://wa.me/34614191802?text=Hola%20Boketto%2C%20me%20gustar%C3%ADa%20reservar%20mesa."
          target="_blank"
          rel="noreferrer"
          className="glass shimmer press rounded-full px-7 py-3 text-xs tracking-editorial uppercase"
        >
          Book a table →
        </a>
      </div>
    </section>
  );
}

// ============================================================================
// TODAY'S SPECIALS CAROUSEL
// ============================================================================
function SpecialsCarousel({ items, onOpen }: { items: Product[]; onOpen: (p: Product) => void }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  if (items.length === 0) return null;

  return (
    <section className="px-4 sm:px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8 px-2">
          <div>
            <p className="text-[10px] tracking-editorial uppercase text-foreground/55">
              Today's Specials
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl italic">Signature del día</h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scrollerRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
              className="glass press rounded-full w-10 h-10 grid place-items-center text-lg"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={() => scrollerRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
              className="glass press rounded-full w-10 h-10 grid place-items-center text-lg"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4"
        >
          {items.map((p) => (
            <button
              key={p.id}
              onClick={() => !p.soldOut && onOpen(p)}
              disabled={p.soldOut}
              className={`snap-start shrink-0 w-[82%] sm:w-[380px] text-left group ${p.soldOut ? "opacity-40 blur-[1px] pointer-events-none" : ""}`}
            >
              <div className="glass-strong shimmer press rounded-[28px] p-6 h-full transition-transform group-hover:-translate-y-1">
                <div className="aspect-[4/3] rounded-2xl mb-5 relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--gold) 25%, transparent), color-mix(in oklab, var(--forest) 30%, transparent))" }}>
                  <div className="absolute inset-0 opacity-40" style={{
                    backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), transparent 45%)"
                  }} />
                  <span className="absolute top-3 left-3 text-[9px] tracking-editorial uppercase glass rounded-full px-2.5 py-1">
                    signature
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl leading-tight">{p.name}</h3>
                  <span className="font-serif text-xl text-foreground/70">€{p.price.toFixed(2)}</span>
                </div>
                <p className="mt-1 text-[10px] tracking-editorial uppercase text-foreground/50">{p.origin}</p>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed line-clamp-3">{p.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// REGULARS
// ============================================================================
function RegularsGrid({ items, onOpen }: { items: Product[]; onOpen: (p: Product) => void }) {
  if (items.length === 0) return null;
  return (
    <section className="px-4 sm:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-6 px-2">
          <div>
            <p className="text-[10px] tracking-editorial uppercase text-foreground/55">The Regulars</p>
            <h2 className="mt-3 font-serif text-2xl italic">Daily staples · quick tap</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((p) => (
            <button
              key={p.id}
              onClick={() => !p.soldOut && onOpen(p)}
              disabled={p.soldOut}
              className={`glass shimmer press rounded-2xl p-4 text-left transition-transform hover:-translate-y-0.5 ${p.soldOut ? "opacity-40 blur-[1px] pointer-events-none" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-base leading-tight">{p.name}</span>
                <span className="text-xs text-foreground/60">€{p.price.toFixed(2)}</span>
              </div>
              <p className="mt-1 text-[9px] tracking-editorial uppercase text-foreground/45 line-clamp-1">{p.origin}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MENU
// ============================================================================
function MenuSection({
  cat, setCat, items, onOpen,
}: {
  cat: Category; setCat: (c: Category) => void; items: Product[]; onOpen: (p: Product) => void;
}) {
  const cats: Category[] = ["bokematchas", "coffee", "bakery", "brunch"];
  return (
    <section id="menu" className="px-4 sm:px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-editorial uppercase text-foreground/55">The Menu</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl italic">La carta</h2>
          <div className="hairline w-16 mx-auto mt-6" />
        </div>

        {/* Tab bar */}
        <div className="glass rounded-full p-1.5 inline-flex flex-wrap gap-1 mx-auto mb-10 sticky top-20 z-30" style={{ display: "flex" }}>
          {cats.map((c) => {
            const active = c === cat;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`glass-tab shimmer press rounded-full px-5 py-2.5 text-[10px] tracking-editorial uppercase transition-all ${
                  active ? "glass-dark" : "bg-transparent border-transparent"
                }`}
              >
                {CATEGORY_META[c].label}
              </button>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((p) => (
            <button
              key={p.id}
              onClick={() => !p.soldOut && onOpen(p)}
              disabled={p.soldOut}
              className={`glass shimmer press text-left rounded-3xl p-6 transition-all hover:-translate-y-0.5 ${p.soldOut ? "opacity-40 blur-[1px] pointer-events-none" : ""}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-xl leading-tight">{p.name}</h3>
                <span className="font-serif text-lg text-foreground/70">€{p.price.toFixed(2)}</span>
              </div>
              <p className="mt-1 text-[9px] tracking-editorial uppercase text-foreground/45">{p.origin}</p>
              <p className="mt-3 text-sm text-foreground/65 leading-relaxed">{p.desc}</p>
              {p.modifiers && p.modifiers.length > 0 && (
                <p className="mt-3 text-[10px] tracking-editorial uppercase text-foreground/45">
                  {p.modifiers.length} option{p.modifiers.length > 1 ? "s" : ""}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FOOTER
// ============================================================================
function Footer() {
  return (
    <footer className="px-6 py-16 text-center">
      <div className="hairline w-16 mx-auto mb-6" />
      <p className="font-serif text-lg italic">boketto</p>
      <p className="mt-2 text-[10px] tracking-editorial uppercase text-foreground/50">
        guillem sorolla 29 · valència · es
      </p>
      <p className="mt-1 text-[10px] tracking-editorial uppercase text-foreground/40">
        est · 2021
      </p>
    </footer>
  );
}

// ============================================================================
// CUSTOMIZER DRAWER
// ============================================================================
function CustomizerDrawer({
  product, onClose, onAdd,
}: {
  product: Product; onClose: () => void; onAdd: (l: DraftLine) => void;
}) {
  const [milk, setMilk] = useState<string>("");
  const [dietary, setDietary] = useState<Record<string, boolean>>({});
  const [qty, setQty] = useState(1);

  const milkOpts = (product.modifiers ?? []).filter((m) => m.group === "milk");
  const dietOpts = (product.modifiers ?? []).filter((m) => m.group === "diet");
  const otherOpts = (product.modifiers ?? []).filter((m) => !m.group);
  const [others, setOthers] = useState<Record<string, boolean>>({});

  const chosen: Modifier[] = [
    ...(milk ? [milkOpts.find((m) => m.id === milk)!].filter(Boolean) : []),
    ...dietOpts.filter((m) => dietary[m.id]),
    ...otherOpts.filter((m) => others[m.id]),
  ];
  const unit = product.price + chosen.reduce((s, m) => s + m.price, 0);
  const total = unit * qty;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 animate-rise">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
      />
      <div className="glass-strong relative w-full sm:max-w-lg rounded-t-[32px] sm:rounded-[32px] p-7 max-h-[85svh] overflow-y-auto">
        <div className="mx-auto h-1 w-10 rounded-full bg-foreground/15 sm:hidden mb-5" />
        <p className="text-[10px] tracking-editorial uppercase text-foreground/50">Customize</p>
        <h3 className="mt-2 font-serif text-3xl">{product.name}</h3>
        <p className="mt-1 text-[10px] tracking-editorial uppercase text-foreground/45">{product.origin}</p>
        <p className="mt-4 text-sm text-foreground/70 leading-relaxed">{product.desc}</p>

        {milkOpts.length > 0 && (
          <div className="mt-6">
            <p className="text-[10px] tracking-editorial uppercase text-foreground/55 mb-3">Milk</p>
            <div className="grid grid-cols-3 gap-2">
              {milkOpts.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMilk(m.id === milk ? "" : m.id)}
                  className={`glass shimmer press rounded-2xl py-3 text-xs transition-all ${
                    milk === m.id ? "glass-dark" : ""
                  }`}
                >
                  <div className="font-medium">{m.label.replace(" milk", "")}</div>
                  {m.price > 0 && <div className="text-[10px] opacity-70 mt-0.5">+€{m.price.toFixed(2)}</div>}
                </button>
              ))}
            </div>
          </div>
        )}

        {dietOpts.length > 0 && (
          <div className="mt-5">
            <p className="text-[10px] tracking-editorial uppercase text-foreground/55 mb-3">Dietary</p>
            <div className="flex flex-wrap gap-2">
              {dietOpts.map((m) => (
                <label key={m.id} className={`glass press shimmer rounded-full px-4 py-2 text-xs cursor-pointer ${dietary[m.id] ? "glass-dark" : ""}`}>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={!!dietary[m.id]}
                    onChange={(e) => setDietary((d) => ({ ...d, [m.id]: e.target.checked }))}
                  />
                  {m.label} {m.price > 0 && <span className="opacity-70">+€{m.price.toFixed(2)}</span>}
                </label>
              ))}
            </div>
          </div>
        )}

        {otherOpts.length > 0 && (
          <div className="mt-5">
            <p className="text-[10px] tracking-editorial uppercase text-foreground/55 mb-3">Add-ons</p>
            <div className="flex flex-wrap gap-2">
              {otherOpts.map((m) => (
                <label key={m.id} className={`glass press shimmer rounded-full px-4 py-2 text-xs cursor-pointer ${others[m.id] ? "glass-dark" : ""}`}>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={!!others[m.id]}
                    onChange={(e) => setOthers((d) => ({ ...d, [m.id]: e.target.checked }))}
                  />
                  {m.label} {m.price > 0 && <span className="opacity-70">+€{m.price.toFixed(2)}</span>}
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="mt-7 flex items-center justify-between">
          <div className="glass rounded-full inline-flex items-center gap-1 p-1">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="press w-9 h-9 rounded-full text-lg">−</button>
            <span className="w-8 text-center text-sm font-medium">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="press w-9 h-9 rounded-full text-lg">+</button>
          </div>
          <div className="text-right">
            <p className="text-[10px] tracking-editorial uppercase text-foreground/50">Subtotal</p>
            <p className="font-serif text-2xl">€{total.toFixed(2)}</p>
          </div>
        </div>

        <button
          onClick={() =>
            onAdd({
              id: `l_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
              productId: product.id,
              name: product.name,
              price: product.price,
              modifiers: chosen.map((m) => ({ id: m.id, label: m.label, price: m.price })),
              qty,
            })
          }
          className="mt-6 w-full glass-dark shimmer press rounded-full py-4 text-xs tracking-editorial uppercase"
        >
          Add to order · €{total.toFixed(2)}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// CART DRAWER
// ============================================================================
function CartDrawer({
  open, setOpen, lines, total, onRemove, onCheckout,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  lines: DraftLine[];
  total: number;
  onRemove: (idx: number) => void;
  onCheckout: () => void;
}) {
  const count = lines.reduce((n, l) => n + l.qty, 0);
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 pointer-events-none`}>
      <div className={`mx-auto max-w-2xl px-4 pb-4 pointer-events-auto transition-transform duration-500 ${open ? "translate-y-0" : "translate-y-[calc(100%-84px)]"}`}>
        <div className="glass-strong rounded-[32px] overflow-hidden">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between px-6 py-5 press"
          >
            <div className="flex items-center gap-3">
              <span className="glass-dark rounded-full w-10 h-10 grid place-items-center text-xs font-medium">
                {count}
              </span>
              <div className="text-left">
                <p className="text-[10px] tracking-editorial uppercase text-foreground/55">Your order</p>
                <p className="font-serif text-lg">€{total.toFixed(2)}</p>
              </div>
            </div>
            <span className="text-[10px] tracking-editorial uppercase text-foreground/60">
              {open ? "Collapse ▾" : "Expand ▴"}
            </span>
          </button>

          {open && (
            <div className="px-6 pb-6 max-h-[50svh] overflow-y-auto">
              <div className="hairline mb-4" />
              <ul className="space-y-3">
                {lines.map((l, i) => {
                  const lineTotal = (l.price + l.modifiers.reduce((s, m) => s + m.price, 0)) * l.qty;
                  return (
                    <li key={l.id} className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-serif text-base leading-tight">
                          <span className="text-foreground/50 text-sm mr-1">{l.qty}×</span>{l.name}
                        </p>
                        {l.modifiers.length > 0 && (
                          <p className="text-[10px] text-foreground/50 mt-0.5">
                            {l.modifiers.map((m) => m.label).join(" · ")}
                          </p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm">€{lineTotal.toFixed(2)}</p>
                        <button
                          onClick={() => onRemove(i)}
                          className="text-[10px] tracking-editorial uppercase text-foreground/40 hover:text-destructive"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <button
                onClick={onCheckout}
                className="mt-6 w-full glass-dark shimmer press rounded-full py-4 text-xs tracking-editorial uppercase"
              >
                Checkout · €{total.toFixed(2)}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CHECKOUT
// ============================================================================
function CheckoutSheet({
  value, setValue, total, onSubmit, onCancel,
}: {
  value: { name: string; table: string };
  setValue: (v: { name: string; table: string }) => void;
  total: number;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 animate-rise">
      <button aria-label="Close" onClick={onCancel} className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />
      <div className="glass-strong relative w-full sm:max-w-md rounded-t-[32px] sm:rounded-[32px] p-8">
        <p className="text-[10px] tracking-editorial uppercase text-foreground/55">Checkout</p>
        <h3 className="mt-2 font-serif text-3xl">Almost yours</h3>
        <p className="mt-2 text-sm text-foreground/60">Pickup at the bar or drop-off at your table.</p>

        <div className="mt-6 space-y-3">
          <label className="block">
            <span className="text-[10px] tracking-editorial uppercase text-foreground/55">Name</span>
            <input
              autoFocus
              value={value.name}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              placeholder="e.g. María"
              className="mt-1 w-full glass rounded-2xl px-4 py-3 text-sm bg-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
            />
          </label>
          <label className="block">
            <span className="text-[10px] tracking-editorial uppercase text-foreground/55">Table (or leave blank for bar)</span>
            <input
              value={value.table}
              onChange={(e) => setValue({ ...value, table: e.target.value })}
              placeholder="e.g. 4"
              className="mt-1 w-full glass rounded-2xl px-4 py-3 text-sm bg-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
            />
          </label>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-[10px] tracking-editorial uppercase text-foreground/55">Total</p>
          <p className="font-serif text-2xl">€{total.toFixed(2)}</p>
        </div>

        <button
          onClick={onSubmit}
          className="mt-6 w-full glass-dark shimmer press rounded-full py-4 text-xs tracking-editorial uppercase"
        >
          Send to bar
        </button>
        <button
          onClick={onCancel}
          className="mt-2 w-full text-[10px] tracking-editorial uppercase text-foreground/50 py-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// CONFIRM
// ============================================================================
function ConfirmSheet({ ref_, name, onDone }: { ref_: string; name: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 6000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-rise">
      <button aria-label="Close" onClick={onDone} className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />
      <div className="glass-strong relative w-full max-w-sm rounded-[32px] p-8 text-center">
        <div className="mx-auto w-16 h-16 rounded-full glass-dark grid place-items-center animate-pulse-ring">
          <span className="text-[color:var(--gold)] text-2xl">✓</span>
        </div>
        <p className="mt-6 text-[10px] tracking-editorial uppercase text-foreground/55">Order received</p>
        <h3 className="mt-2 font-serif text-3xl">{ref_}</h3>
        <p className="mt-3 text-sm text-foreground/70">
          Thank you, <span className="italic">{name}</span>. We're preparing it now.
        </p>
        <button
          onClick={onDone}
          className="mt-6 w-full glass press rounded-full py-3 text-xs tracking-editorial uppercase"
        >
          Done
        </button>
      </div>
    </div>
  );
}
