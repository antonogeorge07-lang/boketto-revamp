import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  component: BokettoApp,
});

type Modifier = { id: string; label: string; price: number };
type Product = {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: "reposteria" | "cafeteria";
  emoji: string;
  modifiers?: Modifier[];
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "pistacho-rosas",
    name: "Bizcocho de Pistacho con Agua de Rosas",
    desc: "Bizcocho húmedo de pistacho siciliano, perfumado con agua de rosas de Damasco.",
    price: 4.5,
    category: "reposteria",
    emoji: "🌸",
    modifiers: [{ id: "crujiente", label: "Extra de Pistacho Crujiente", price: 0.5 }],
  },
  {
    id: "brioche-pistacho",
    name: "Brioche Relleno de Crema de Pistacho",
    desc: "Fermentación lenta 24h con masa madre. Relleno cremoso al momento.",
    price: 3.9,
    category: "reposteria",
    emoji: "🥐",
  },
  {
    id: "green-flag-matcha",
    name: "Green Flag Matcha Latte",
    desc: "Matcha ceremonial japonés batido a mano. Notas vegetales y umami.",
    price: 3.8,
    category: "cafeteria",
    emoji: "🍵",
    modifiers: [{ id: "avena", label: "Leche de Avena Barista", price: 0.4 }],
  },
  {
    id: "flat-white",
    name: "Flat White de Especialidad",
    desc: "Doble ristretto sobre leche texturizada. Grano de origen único.",
    price: 2.8,
    category: "cafeteria",
    emoji: "☕",
    modifiers: [{ id: "avena2", label: "Leche de Avena Barista", price: 0.4 }],
  },
];

type BasketLine = { productId: string; modifiers: Record<string, boolean> };
type View = "home" | "carta" | "estado" | "admin";

function BokettoApp() {
  const [view, setView] = useState<View>("home");
  const [dark, setDark] = useState(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [soldOut, setSoldOut] = useState<Record<string, boolean>>({});
  const [basket, setBasket] = useState<BasketLine[]>([]);
  const [confirmed, setConfirmed] = useState<BasketLine[] | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const totals = useMemo(() => calcTotals(basket, products), [basket, products]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-28 transition-colors">
      {view === "home" && <HomeView onEnter={() => setView("carta")} />}
      {view === "carta" && (
        <CartaView
          products={products}
          soldOut={soldOut}
          basket={basket}
          setBasket={setBasket}
          onConfirm={() => {
            setConfirmed(basket);
            setView("estado");
          }}
          totals={totals}
        />
      )}
      {view === "estado" && (
        <EstadoView
          lines={confirmed ?? basket}
          products={products}
          onBack={() => setView("carta")}
          onNew={() => {
            setBasket([]);
            setConfirmed(null);
            setView("carta");
          }}
        />
      )}
      {view === "admin" && (
        <AdminView
          products={products}
          setProducts={setProducts}
          soldOut={soldOut}
          setSoldOut={setSoldOut}
          dark={dark}
          setDark={setDark}
        />
      )}
      <BottomNav view={view} setView={setView} />
    </div>
  );
}

/* ------------------------------- HOME ---------------------------------- */
function HomeView({ onEnter }: { onEnter: () => void }) {
  return (
    <div>
      <section className="bg-[var(--forest)] text-[color:var(--primary-foreground)] px-6 pt-14 pb-16 rounded-b-[2rem] relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] tracking-[0.4em] text-[var(--gold)] uppercase mb-4">
            Since 2021 · València
          </p>
          <h1 className="font-extrabold tracking-[0.25em] text-4xl sm:text-6xl leading-none">
            BOKETTO
          </h1>
          <p className="mt-4 text-sm sm:text-base opacity-90">
            Pastelería de Autor & Café de Especialidad
          </p>
          <p className="font-serif text-2xl sm:text-3xl mt-8 text-[var(--gold)]">
            "Mirar a la nada y que te sepa a Boketto"
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Badge>⭐ 5,0 en Google · no lo decimos nosotros</Badge>
            <Badge>📍 Calle de Guillem Sorolla 29, València</Badge>
          </div>
          <button
            onClick={onEnter}
            className="mt-10 inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--forest)] font-semibold px-6 py-3 rounded-full hover:scale-[1.03] active:scale-95 transition-transform"
          >
            Ver la carta →
          </button>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 mt-12 grid sm:grid-cols-2 gap-4">
        <Pillar
          title="Pastelería de autor"
          body="Texturas crujientes y sabores equilibrados. Cada pieza pensada como un pequeño ensayo comestible."
          icon="🥐"
        />
        <Pillar
          title="Café de especialidad"
          body="Granos seleccionados y tostados lentamente. Extracciones cuidadas taza a taza."
          icon="☕"
        />
      </section>

      <section className="max-w-3xl mx-auto px-6 mt-10">
        <div className="rounded-2xl border border-[var(--gold)]/40 bg-card p-6">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)]">
            Reserva
          </p>
          <h3 className="font-serif text-2xl mt-1">Reserva tu Mesa</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Aforo reducido, servicio pausado. Escríbenos por WhatsApp y te confirmamos al instante.
          </p>
          <a
            href="https://wa.me/34614191802?text=Hola%20Boketto%2C%20quiero%20reservar%20mesa"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 border border-foreground rounded-full px-5 py-2.5 text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
          >
            Reservar por WhatsApp
          </a>
        </div>
      </section>

      <p className="font-serif text-center text-lg text-muted-foreground mt-12 px-6">
        "Si el postre empalaga, no es de Boketto."
      </p>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs border border-[var(--gold)]/50 text-[var(--gold)] rounded-full px-3 py-1.5">
      {children}
    </span>
  );
}

function Pillar({ title, body, icon }: { title: string; body: string; icon: string }) {
  return (
    <div className="rounded-2xl bg-card p-6 border border-border hover:border-[var(--gold)] transition-colors">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-3 font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{body}</p>
    </div>
  );
}

/* ------------------------------- CARTA --------------------------------- */
function CartaView({
  products,
  soldOut,
  basket,
  setBasket,
  onConfirm,
  totals,
}: {
  products: Product[];
  soldOut: Record<string, boolean>;
  basket: BasketLine[];
  setBasket: React.Dispatch<React.SetStateAction<BasketLine[]>>;
  onConfirm: () => void;
  totals: { count: number; total: number };
}) {
  const [cat, setCat] = useState<"todo" | "reposteria" | "cafeteria">("todo");
  const filtered = products.filter((p) => cat === "todo" || p.category === cat);

  const addLine = (productId: string) =>
    setBasket((b) => [...b, { productId, modifiers: {} }]);
  const removeLine = (idx: number) =>
    setBasket((b) => b.filter((_, i) => i !== idx));
  const toggleMod = (idx: number, modId: string) =>
    setBasket((b) =>
      b.map((l, i) =>
        i === idx ? { ...l, modifiers: { ...l.modifiers, [modId]: !l.modifiers[modId] } } : l,
      ),
    );

  return (
    <div className="max-w-3xl mx-auto px-5 pt-8">
      <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--gold)]">Carta</p>
      <h2 className="font-serif text-3xl mt-1">Nuestra selección de hoy</h2>

      <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
        {[
          { id: "todo", label: "✨ Todo" },
          { id: "reposteria", label: "🥐 Repostería" },
          { id: "cafeteria", label: "☕ Cafetería" },
        ].map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id as typeof cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm border transition-all ${
              cat === c.id
                ? "bg-foreground text-background border-foreground"
                : "bg-card border-border hover:border-[var(--gold)]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        {filtered.map((p) => {
          const out = soldOut[p.id];
          const linesForProduct = basket
            .map((l, i) => ({ l, i }))
            .filter((x) => x.l.productId === p.id);
          return (
            <div
              key={p.id}
              className={`rounded-2xl bg-card border border-border p-5 flex flex-col transition-all ${
                out ? "opacity-40 blur-[1.5px] pointer-events-none select-none" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-2xl">{p.emoji}</div>
                  <h3 className="font-semibold mt-2 leading-tight">{p.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold border border-[var(--gold)]/50 text-[var(--gold)] rounded-full px-2.5 py-1">
                  €{p.price.toFixed(2)}
                </span>
              </div>

              {out ? (
                <p className="mt-4 text-xs uppercase tracking-widest text-destructive">
                  Agotado
                </p>
              ) : (
                <>
                  {linesForProduct.length > 0 && p.modifiers && (
                    <div className="mt-4 space-y-2">
                      {linesForProduct.map(({ l, i }) => (
                        <div key={i} className="rounded-lg bg-muted/60 p-3 space-y-1.5">
                          <p className="text-[11px] text-muted-foreground">
                            Unidad #{linesForProduct.findIndex((x) => x.i === i) + 1}
                          </p>
                          {p.modifiers!.map((m) => (
                            <label
                              key={m.id}
                              className="flex items-center justify-between gap-2 text-xs cursor-pointer"
                            >
                              <span className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={!!l.modifiers[m.id]}
                                  onChange={() => toggleMod(i, m.id)}
                                  className="accent-[var(--forest)]"
                                />
                                {m.label}
                              </span>
                              <span className="text-[var(--gold)]">+€{m.price.toFixed(2)}</span>
                            </label>
                          ))}
                          <button
                            onClick={() => removeLine(i)}
                            className="text-[10px] uppercase tracking-widest text-destructive hover:underline"
                          >
                            Quitar unidad
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => addLine(p.id)}
                    className="mt-4 self-start bg-[var(--forest)] text-[color:var(--primary-foreground)] text-sm font-medium rounded-full px-4 py-2 hover:scale-[1.03] active:scale-95 transition-transform"
                  >
                    + Añadir
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>

      {totals.count > 0 && (
        <div className="fixed left-0 right-0 bottom-20 z-40 px-4">
          <div className="max-w-3xl mx-auto bg-[var(--forest)] text-[color:var(--primary-foreground)] rounded-2xl px-5 py-4 flex items-center justify-between shadow-2xl">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[var(--gold)]">
                {totals.count} {totals.count === 1 ? "unidad" : "unidades"}
              </p>
              <p className="text-lg font-semibold">€{totals.total.toFixed(2)}</p>
            </div>
            <button
              onClick={onConfirm}
              className="bg-[var(--gold)] text-[var(--forest)] font-semibold rounded-full px-5 py-2.5 hover:scale-[1.03] active:scale-95 transition-transform"
            >
              Confirmar Pedido Directo →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------- ESTADO -------------------------------- */
function EstadoView({
  lines,
  products,
  onBack,
  onNew,
}: {
  lines: BasketLine[];
  products: Product[];
  onBack: () => void;
  onNew: () => void;
}) {
  const detail = useMemo(() => buildLineDetail(lines, products), [lines, products]);
  const total = detail.reduce((s, l) => s + l.total, 0);

  const waMessage = useMemo(() => {
    const header = `*🥐 NUEVO PEDIDO — BOKETTO*\n_Calle de Guillem Sorolla 29, València_\n\n`;
    const body = detail
      .map(
        (l) =>
          `• *${l.name}*  —  €${l.base.toFixed(2)}\n` +
          l.mods.map((m) => `   ↳ ${m.label} (+€${m.price.toFixed(2)})`).join("\n"),
      )
      .join("\n\n");
    const footer = `\n\n---\n*TOTAL:* €${total.toFixed(2)}\n_0% comisiones · directo a la barra ☕_`;
    return header + body + footer;
  }, [detail, total]);

  const waUrl = `https://wa.me/34614191802?text=${encodeURIComponent(waMessage)}`;

  if (lines.length === 0) {
    return (
      <div className="max-w-md mx-auto px-6 pt-24 text-center">
        <p className="font-serif text-2xl">Aún no hay ticket</p>
        <p className="text-sm text-muted-foreground mt-2">
          Añade productos desde la carta para generar tu recibo.
        </p>
        <button
          onClick={onBack}
          className="mt-6 bg-foreground text-background rounded-full px-5 py-2.5 text-sm"
        >
          Ir a la carta
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-5 pt-8">
      <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--gold)]">Ticket</p>
      <h2 className="font-serif text-3xl mt-1">Tu recibo Boketto</h2>

      <div className="mt-6 bg-[#faf6ec] text-[#1c221f] rounded-md p-6 ticket-shadow font-mono text-[13px] leading-relaxed">
        <div className="text-center border-b border-dashed border-[#c2b29d] pb-3 mb-3">
          <p className="font-bold tracking-[0.3em]">BOKETTO</p>
          <p className="text-[10px]">Guillem Sorolla 29 · València</p>
          <p className="text-[10px]">— pre-cuenta —</p>
        </div>
        {detail.map((l, i) => (
          <div key={i} className="mb-2">
            <div className="flex justify-between">
              <span className="pr-2">{l.name}</span>
              <span>€{l.base.toFixed(2)}</span>
            </div>
            {l.mods.map((m, mi) => (
              <div key={mi} className="flex justify-between text-[11px] pl-4 opacity-80">
                <span>+ {m.label}</span>
                <span>€{m.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        ))}
        <div className="border-t border-dashed border-[#c2b29d] mt-3 pt-3 flex justify-between font-bold">
          <span>TOTAL</span>
          <span>€{total.toFixed(2)}</span>
        </div>
        <p className="text-center text-[10px] mt-4 opacity-70">
          — gracias por elegir slow food —
        </p>
      </div>

      <a
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-full py-3.5 font-semibold hover:scale-[1.02] active:scale-95 transition-transform"
      >
        📲 Enviar por WhatsApp
      </a>

      <div className="mt-3 flex gap-2">
        <button
          onClick={onBack}
          className="flex-1 border border-border rounded-full py-2.5 text-sm"
        >
          ← Editar pedido
        </button>
        <button
          onClick={onNew}
          className="flex-1 border border-border rounded-full py-2.5 text-sm"
        >
          Nuevo ticket
        </button>
      </div>
    </div>
  );
}

/* ------------------------------- ADMIN --------------------------------- */
function AdminView({
  products,
  setProducts,
  soldOut,
  setSoldOut,
  dark,
  setDark,
}: {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  soldOut: Record<string, boolean>;
  setSoldOut: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  dark: boolean;
  setDark: (v: boolean) => void;
}) {
  return (
    <div className="max-w-3xl mx-auto px-5 pt-8">
      <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--gold)]">TPV</p>
      <h2 className="font-serif text-3xl mt-1">Panel de barra</h2>

      <div className="mt-6 rounded-2xl bg-card border border-border p-5 flex items-center justify-between">
        <div>
          <p className="font-semibold">Modo oscuro del sitio</p>
          <p className="text-xs text-muted-foreground">
            Cambia la piel pública instantáneamente.
          </p>
        </div>
        <button
          onClick={() => setDark(!dark)}
          className={`relative w-16 h-9 rounded-full transition-colors ${
            dark ? "bg-[var(--gold)]" : "bg-muted"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-7 h-7 rounded-full bg-background border border-border transition-transform ${
              dark ? "translate-x-7" : ""
            }`}
          />
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl bg-card border border-border p-4 grid grid-cols-[minmax(0,1fr)_auto] gap-4 items-center"
          >
            <div className="min-w-0">
              <p className="font-semibold truncate">
                {p.emoji} {p.name}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  €
                </label>
                <input
                  type="number"
                  step="0.10"
                  value={p.price}
                  onChange={(e) =>
                    setProducts((arr) =>
                      arr.map((x) =>
                        x.id === p.id ? { ...x, price: parseFloat(e.target.value) || 0 } : x,
                      ),
                    )
                  }
                  className="w-24 bg-muted rounded-md px-2 py-1 text-sm border border-border focus:outline-none focus:border-[var(--gold)]"
                />
              </div>
            </div>
            <button
              onClick={() => setSoldOut((s) => ({ ...s, [p.id]: !s[p.id] }))}
              className={`shrink-0 text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-2.5 transition-colors ${
                soldOut[p.id]
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-[var(--forest)] text-[color:var(--primary-foreground)]"
              }`}
            >
              {soldOut[p.id] ? "Agotado" : "Disponible"}
            </button>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-muted-foreground text-center mt-8 uppercase tracking-widest">
        Boketto · POS interno
      </p>
    </div>
  );
}

/* ------------------------------- NAV ----------------------------------- */
function BottomNav({ view, setView }: { view: View; setView: (v: View) => void }) {
  const items: { id: View; label: string; icon: string }[] = [
    { id: "home", label: "Inicio", icon: "✨" },
    { id: "carta", label: "Carta", icon: "🥐" },
    { id: "estado", label: "Estado", icon: "⏱️" },
    { id: "admin", label: "Admin", icon: "🔒" },
  ];
  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[min(96%,28rem)] bg-[var(--forest)] text-[color:var(--primary-foreground)] rounded-full px-2 py-2 flex items-center justify-between shadow-2xl">
      {items.map((it) => {
        const active = view === it.id;
        return (
          <button
            key={it.id}
            onClick={() => setView(it.id)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-full text-[10px] font-medium transition-all ${
              active ? "bg-[var(--gold)] text-[var(--forest)] scale-105" : "opacity-70 hover:opacity-100"
            }`}
          >
            <span className="text-base leading-none">{it.icon}</span>
            <span className="tracking-wider uppercase">{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

/* ------------------------------ HELPERS -------------------------------- */
function calcTotals(basket: BasketLine[], products: Product[]) {
  let total = 0;
  for (const line of basket) {
    const p = products.find((x) => x.id === line.productId);
    if (!p) continue;
    total += p.price;
    for (const m of p.modifiers ?? []) if (line.modifiers[m.id]) total += m.price;
  }
  return { count: basket.length, total };
}

function buildLineDetail(basket: BasketLine[], products: Product[]) {
  return basket.map((line) => {
    const p = products.find((x) => x.id === line.productId)!;
    const mods = (p.modifiers ?? []).filter((m) => line.modifiers[m.id]);
    const total = p.price + mods.reduce((s, m) => s + m.price, 0);
    return { name: p.name, base: p.price, mods, total };
  });
}
