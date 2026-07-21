import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { Sparkles, UploadCloud, X, Link2, Link2Off } from "lucide-react";
import { CATEGORY_META, useStaffAuth, useStore, type Category } from "../lib/store";


export const Route = createFileRoute("/admin")({
  component: AdminPage,
});


function AdminPage() {
  const { products, updateProduct, toggleSoldOut, toggleFeatured, addProduct, removeProduct, orders, signature, updateSignature } = useStore();

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

        {/* Today's Specials Control */}
        <SignatureControl signature={signature} onChange={updateSignature} />



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

        {/* Add new item */}
        <AddItemForm onAdd={(data) => addProduct(data)} />

        {/* Table */}
        <div className="mt-6 glass-strong rounded-[28px] overflow-hidden">
          <div className="grid grid-cols-[72px_1fr_90px_110px_120px_110px_60px] gap-4 px-6 py-4 text-[10px] tracking-editorial uppercase text-foreground/55 border-b border-foreground/5">
            <div>Photo</div>
            <div>Item</div>
            <div className="text-right">Price €</div>
            <div className="text-center">Featured</div>
            <div className="text-center">86 switch</div>
            <div className="text-center">Category</div>
            <div className="text-center">—</div>
          </div>
          <ul className="divide-y divide-foreground/5">
            {filtered.map((p) => (
              <li
                key={p.id}
                className={`grid grid-cols-[72px_1fr_90px_110px_120px_110px_60px] gap-4 items-center px-6 py-4 transition-opacity ${p.soldOut ? "opacity-60" : ""}`}
              >
                <PhotoCell
                  image={p.image}
                  onPick={(dataUrl) => updateProduct(p.id, { image: dataUrl })}
                  onClear={() => updateProduct(p.id, { image: undefined })}
                />
                <div className="min-w-0">
                  <input
                    value={p.name}
                    onChange={(e) => updateProduct(p.id, { name: e.target.value })}
                    className="w-full bg-transparent font-serif text-base leading-tight focus:outline-none"
                  />
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
                <select
                  value={p.category}
                  onChange={(e) => updateProduct(p.id, { category: e.target.value as Category })}
                  className="glass rounded-xl px-2 py-2 text-[10px] tracking-editorial uppercase bg-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
                >
                  {(Object.keys(CATEGORY_META) as Category[]).map((c) => (
                    <option key={c} value={c}>{CATEGORY_META[c].label}</option>
                  ))}
                </select>
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      if (confirm(`Remove "${p.name}" from the menu?`)) removeProduct(p.id);
                    }}
                    aria-label={`Remove ${p.name}`}
                    className="press rounded-full w-8 h-8 flex items-center justify-center text-foreground/60 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    ✕
                  </button>
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

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function PhotoCell({
  image, onPick, onClear,
}: { image?: string; onPick: (dataUrl: string) => void; onClear: () => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handle = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Please choose an image under 2MB.");
      e.target.value = "";
      return;
    }
    const url = await fileToDataUrl(file);
    onPick(url);
    e.target.value = "";
  };
  return (
    <div className="relative group">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="glass press w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center bg-white/50"
        aria-label={image ? "Change photo" : "Upload photo"}
      >
        {image ? (
          <img src={image} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-[9px] tracking-editorial uppercase text-foreground/50">Upload</span>
        )}
      </button>
      {image && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Remove photo"
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-foreground text-background text-[9px] leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handle} />
    </div>
  );
}

function AddItemForm({
  onAdd,
}: {
  onAdd: (input: { name: string; category: Category; price: number; origin: string; image?: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<Category>("bakery");
  const [image, setImage] = useState<string | undefined>(undefined);

  const reset = () => {
    setName(""); setOrigin(""); setPrice(""); setCategory("bakery"); setImage(undefined);
  };

  const submit = () => {
    if (!name.trim()) { alert("Name is required."); return; }
    onAdd({ name: name.trim(), origin: origin.trim(), price: parseFloat(price) || 0, category, image });
    reset();
    setOpen(false);
  };

  if (!open) {
    return (
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setOpen(true)}
          className="glass-dark shimmer press rounded-full px-5 py-2 text-[10px] tracking-editorial uppercase"
        >
          + Add menu item
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 glass-strong rounded-[28px] p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] tracking-editorial uppercase text-foreground/60">New menu item</p>
        <button
          onClick={() => { reset(); setOpen(false); }}
          className="text-[10px] tracking-editorial uppercase text-foreground/50 hover:text-foreground"
        >
          Cancel
        </button>
      </div>
      <div className="grid grid-cols-[72px_1fr_120px_140px_140px_auto] gap-3 items-center">
        <PhotoCell image={image} onPick={setImage} onClear={() => setImage(undefined)} />
        <div className="grid gap-1">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item name"
            className="glass rounded-xl px-3 py-2 text-sm bg-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
          />
          <input
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Origin / short tagline"
            className="glass rounded-xl px-3 py-2 text-[11px] tracking-editorial uppercase bg-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
          />
        </div>
        <input
          type="number"
          step={0.1}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="€ price"
          className="glass rounded-xl px-3 py-2 text-sm text-right bg-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="glass rounded-xl px-3 py-2 text-[10px] tracking-editorial uppercase bg-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
        >
          {(Object.keys(CATEGORY_META) as Category[]).map((c) => (
            <option key={c} value={c}>{CATEGORY_META[c].label}</option>
          ))}
        </select>
        <button
          onClick={submit}
          className="glass-dark shimmer press rounded-full px-5 py-2 text-[10px] tracking-editorial uppercase"
        >
          Save item
        </button>
      </div>
    </div>
  );
}
