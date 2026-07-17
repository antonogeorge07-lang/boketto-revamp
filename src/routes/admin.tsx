import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState, type ChangeEvent } from "react";
import { CATEGORY_META, useStaffAuth, useStore, type Category } from "../lib/store";


export const Route = createFileRoute("/admin")({
  component: AdminPage,
});


function AdminPage() {
  const { products, updateProduct, toggleSoldOut, toggleFeatured, addProduct, removeProduct, orders } = useStore();

  const { signOut } = useStaffAuth();
  const navigate = useNavigate();
  const [cat, setCat] = useState<Category | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (search && !`${p.name} ${p.origin}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [products, cat, search]);

  const activeOrders = orders.filter((o) => o.status !== "archived").length;
  const soldOutCount = products.filter((p) => p.soldOut).length;

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-30 glass-strong border-b border-foreground/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <span className="font-serif italic text-xl">boketto</span>
            <span className="hidden sm:block h-4 w-px bg-foreground/15" />
            <span className="hidden sm:block text-[10px] tracking-editorial uppercase text-foreground/60">
              owner control
            </span>
          </div>
          <nav className="flex items-center gap-2">
            <Link to="/kds" className="glass press rounded-full px-4 py-2 text-[10px] tracking-editorial uppercase">
              KDS
            </Link>
            <button
              onClick={() => { signOut(); navigate({ to: "/" }); }}
              className="glass press rounded-full px-4 py-2 text-[10px] tracking-editorial uppercase"
            >
              Sign out
            </button>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-[10px] tracking-editorial uppercase text-foreground/55">Dashboard</p>
        <h1 className="mt-3 font-serif text-4xl italic">Control center</h1>

        {/* KPI tier */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPI label="Active orders" value={activeOrders} />
          <KPI label="Sold-out items" value={soldOutCount} />
          <KPI label="Menu items" value={products.length} />
          <KPI label="Featured" value={products.filter((p) => p.featured).length} />
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <div className="glass rounded-full p-1 inline-flex flex-wrap gap-1">
            {(["all", "bokematchas", "coffee", "bakery", "brunch"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`glass-tab press rounded-full px-4 py-2 text-[10px] tracking-editorial uppercase ${
                  cat === c ? "glass-dark" : "border-transparent bg-transparent"
                }`}
              >
                {c === "all" ? "All" : CATEGORY_META[c].label}
              </button>
            ))}
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="glass rounded-full px-5 py-2 text-sm bg-white/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
          />
        </div>

        {/* Table */}
        <div className="mt-6 glass-strong rounded-[28px] overflow-hidden">
          <div className="grid grid-cols-[1fr_100px_120px_130px_120px] gap-4 px-6 py-4 text-[10px] tracking-editorial uppercase text-foreground/55 border-b border-foreground/5">
            <div>Item</div>
            <div className="text-right">Price €</div>
            <div className="text-center">Featured</div>
            <div className="text-center">86 switch</div>
            <div className="text-center">Category</div>
          </div>
          <ul className="divide-y divide-foreground/5">
            {filtered.map((p) => (
              <li
                key={p.id}
                className={`grid grid-cols-[1fr_100px_120px_130px_120px] gap-4 items-center px-6 py-4 transition-opacity ${p.soldOut ? "opacity-60" : ""}`}
              >
                <div className="min-w-0">
                  <p className="font-serif text-base leading-tight">{p.name}</p>
                  <input
                    value={p.origin}
                    onChange={(e) => updateProduct(p.id, { origin: e.target.value })}
                    className="mt-1 w-full bg-transparent text-[10px] tracking-editorial uppercase text-foreground/50 focus:outline-none focus:text-foreground"
                  />
                </div>
                <input
                  type="number"
                  step={0.1}
                  value={p.price}
                  onChange={(e) => updateProduct(p.id, { price: parseFloat(e.target.value) || 0 })}
                  className="glass rounded-xl px-3 py-2 text-sm text-right bg-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
                />
                <div className="flex justify-center">
                  <Toggle on={p.featured} onChange={() => toggleFeatured(p.id)} labelOn="Special" labelOff="Regular" />
                </div>
                <div className="flex justify-center">
                  <Toggle on={!p.soldOut} onChange={() => toggleSoldOut(p.id)} labelOn="In stock" labelOff="86'd" />
                </div>
                <div className="text-center text-[10px] tracking-editorial uppercase text-foreground/60">
                  {CATEGORY_META[p.category].label}
                </div>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-6 py-10 text-center text-sm text-foreground/50">No items match.</li>
            )}
          </ul>
        </div>

        <p className="mt-8 text-[10px] tracking-editorial uppercase text-foreground/40 text-center">
          Changes sync in real-time to the public storefront and KDS.
        </p>
      </div>
    </div>
  );
}

function KPI({ label, value }: { label: string; value: number }) {
  return (
    <div className="glass rounded-2xl px-5 py-4">
      <p className="text-[10px] tracking-editorial uppercase text-foreground/55">{label}</p>
      <p className="mt-2 font-serif text-3xl">{value}</p>
    </div>
  );
}

function Toggle({
  on, onChange, labelOn, labelOff,
}: { on: boolean; onChange: () => void; labelOn: string; labelOff: string }) {
  return (
    <button
      onClick={onChange}
      className={`press shimmer rounded-full flex items-center gap-2 px-3 py-1.5 text-[10px] tracking-editorial uppercase transition-all ${
        on ? "glass-dark" : "glass"
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${on ? "bg-[color:var(--gold)]" : "bg-foreground/30"}`} />
      {on ? labelOn : labelOff}
    </button>
  );
}
