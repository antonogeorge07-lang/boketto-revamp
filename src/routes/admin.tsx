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

function SignatureControl({
  signature,
  onChange,
}: {
  signature: { text: string; image?: string; linkedToSocial: boolean };
  onChange: (patch: Partial<{ text: string; image?: string; linkedToSocial: boolean }>) => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("Please choose an image file."); return; }
    if (file.size > 3 * 1024 * 1024) { alert("Please choose an image under 3MB."); return; }
    const url = await fileToDataUrl(file);
    onChange({ image: url });
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <section className="mt-10 glass-strong rounded-[28px] p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[10px] tracking-editorial uppercase text-foreground/55 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[color:var(--gold)]" />
            Today's Specials Control
          </p>
          <h2 className="mt-2 font-serif italic text-2xl">Signature of the Day</h2>
        </div>

        {/* Toggle */}
        <button
          type="button"
          role="switch"
          aria-checked={signature.linkedToSocial}
          onClick={() => onChange({ linkedToSocial: !signature.linkedToSocial })}
          className="press flex items-center gap-3 glass rounded-full pl-3 pr-1.5 py-1.5"
        >
          {signature.linkedToSocial ? (
            <Link2 className="w-3.5 h-3.5 text-[color:var(--gold)]" />
          ) : (
            <Link2Off className="w-3.5 h-3.5 text-foreground/40" />
          )}
          <span className="text-[10px] tracking-editorial uppercase">
            Link to social logins
          </span>
          <span
            className={`relative w-10 h-6 rounded-full transition-colors ${
              signature.linkedToSocial ? "bg-[color:var(--gold)]" : "bg-foreground/15"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-background shadow-sm transition-all ${
                signature.linkedToSocial ? "left-[18px]" : "left-0.5"
              }`}
            />
          </span>
        </button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_320px]">
        {/* Text + preview */}
        <div className="space-y-4">
          <label className="block">
            <span className="text-[10px] tracking-editorial uppercase text-foreground/55">
              Signature copy
            </span>
            <input
              value={signature.text}
              onChange={(e) => onChange({ text: e.target.value })}
              placeholder="e.g. Tarta Nohirita — pera caramelizada & pistacho"
              className="mt-2 w-full glass rounded-2xl px-4 py-3 font-serif italic text-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
            />
          </label>

          {/* Live preview */}
          <div className="glass rounded-2xl p-4 bg-white/40">
            <p className="text-[10px] tracking-editorial uppercase text-foreground/55 mb-2">
              Live preview · social login banner
            </p>
            {signature.linkedToSocial ? (
              <div className="flex items-center gap-4 rounded-xl bg-[color:var(--forest,#1C221F)] text-background p-3">
                {signature.image ? (
                  <img src={signature.image} alt="" className="w-14 h-14 rounded-lg object-cover" />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-background/10 grid place-items-center">
                    <Sparkles className="w-5 h-5 text-[color:var(--gold)]" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-[9px] tracking-editorial uppercase text-background/60">
                    Today at Boketto
                  </p>
                  <p className="font-serif italic text-base truncate">{signature.text || "—"}</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-foreground/50 italic">
                Toggle "Link to social logins" to show this banner on the customer sign-in view.
              </p>
            )}
          </div>
        </div>

        {/* Uploader */}
        <div>
          <span className="text-[10px] tracking-editorial uppercase text-foreground/55">
            Special photograph
          </span>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`mt-2 relative cursor-pointer glass rounded-2xl overflow-hidden aspect-[4/5] flex items-center justify-center transition-all ${
              dragOver ? "ring-2 ring-[color:var(--gold)]" : ""
            }`}
          >
            {signature.image ? (
              <>
                <img src={signature.image} alt="Signature" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onChange({ image: undefined }); }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/90 grid place-items-center press"
                  aria-label="Remove photograph"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <div className="text-center px-6">
                <UploadCloud className="w-8 h-8 mx-auto text-foreground/40" />
                <p className="mt-3 text-[10px] tracking-editorial uppercase text-foreground/60">
                  Drag & drop
                </p>
                <p className="text-[10px] tracking-editorial uppercase text-foreground/40">
                  or tap to browse
                </p>
              </div>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleFile(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
