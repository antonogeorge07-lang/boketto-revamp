import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import heroImg from "../assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: BokettoApp,
});

type Modifier = { id: string; label: string; price: number };
type Category = "cafeteria" | "reposteria" | "brunch";
type Product = {
  id: string;
  name: string;
  origin: string;
  desc: string;
  price: number;
  category: Category;
  modifiers?: Modifier[];
};

const CATS: { id: Category; label: string; sub: string }[] = [
  { id: "cafeteria", label: "Cafetería", sub: "de especialidad" },
  { id: "reposteria", label: "Boulangerie", sub: "de autor" },
  { id: "brunch", label: "Brunch", sub: "fermentación lenta" },
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "flat-white",
    name: "Flat White",
    origin: "Etiopía Sidamo",
    desc: "Doble shot ristretto sobre leche emulsionada sedosa de una sola pasada. Textura microespuma.",
    price: 3.2,
    category: "cafeteria",
    modifiers: [{ id: "oat", label: "Leche de avena barista", price: 0.4 }],
  },
  {
    id: "v60",
    name: "V60 Origami",
    origin: "Etiopía Guji · lavado",
    desc: "Filtrado artesanal en cerámica, 15g / 250ml. Notas florales, cítricas y té negro al final.",
    price: 4.5,
    category: "cafeteria",
  },
  {
    id: "iced-v60",
    name: "Iced V60",
    origin: "Colombia Huila · natural",
    desc: "Filtrado sobre hielo. Cuerpo limpio, acidez balanceada, retrogusto a frutos rojos.",
    price: 4.8,
    category: "cafeteria",
  },
  {
    id: "matcha",
    name: "Green Flag Matcha",
    origin: "Uji, Kioto",
    desc: "Matcha ceremonial batido a mano. Notas vegetales, umami largo, sin dulzor añadido.",
    price: 3.8,
    category: "cafeteria",
    modifiers: [{ id: "oat", label: "Leche de avena barista", price: 0.4 }],
  },
  {
    id: "pistacho-rosas",
    name: "Bizcocho de Pistacho",
    origin: "Con agua de rosas de Damasco",
    desc: "Bizcocho húmedo de pistacho siciliano, perfumado con agua de rosas. Glaseado mate.",
    price: 4.5,
    category: "reposteria",
    modifiers: [{ id: "crunch", label: "Extra crujiente de pistacho", price: 0.5 }],
  },
  {
    id: "brioche-pistacho",
    name: "Brioche de Pistacho",
    origin: "Fermentación 24h · masa madre",
    desc: "Brioche laminado relleno al momento de crema de pistacho. Servir templado.",
    price: 3.9,
    category: "reposteria",
  },
  {
    id: "croissant",
    name: "Croissant de Mantequilla",
    origin: "Beurre AOP Charentes",
    desc: "Laminado a tres vueltas, 72 capas. Corteza fina, miga aireada, aroma a mantequilla noisette.",
    price: 2.8,
    category: "reposteria",
  },
  {
    id: "pain-choc",
    name: "Pain au Chocolat",
    origin: "Chocolate Valrhona 70%",
    desc: "Dos barras de chocolate negro dentro de masa laminada. Crujiente por fuera, tierno dentro.",
    price: 3.5,
    category: "reposteria",
  },
  {
    id: "tostada",
    name: "Tostada de Aguacate",
    origin: "Pan de masa madre 48h",
    desc: "Aguacate, aceite de oliva virgen extra picual, ralladura de limón, escamas de sal.",
    price: 8.5,
    category: "brunch",
    modifiers: [
      { id: "egg", label: "Huevo poché", price: 1.5 },
      { id: "salmon", label: "Salmón noruego marinado", price: 3.5 },
    ],
  },
  {
    id: "granola",
    name: "Granola de la Casa",
    origin: "Con yogur griego colado",
    desc: "Avena tostada con miel de azahar, frutos secos, semillas y frutas de temporada.",
    price: 6.9,
    category: "brunch",
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
    <div className="min-h-screen bg-background text-foreground pb-32 transition-colors">
      <div key={view} className="animate-rise">
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
      </div>
      <BottomNav view={view} setView={setView} />
    </div>
  );
}

/* ============================ HOME =================================== */
function HomeView({ onEnter }: { onEnter: () => void }) {
  return (
    <div>
      {/* Cinematic hero */}
      <section className="relative h-[92svh] min-h-[560px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Boketto — interior al atardecer"
          width={1280}
          height={1600}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--forest)]/40 via-[color:var(--forest)]/20 to-[color:var(--forest)]" />
        <div className="absolute inset-0 flex flex-col justify-between px-6 sm:px-10 py-10 sm:py-14 max-w-6xl mx-auto text-[color:var(--primary-foreground)]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-editorial uppercase text-[color:var(--gold)]">
              Est · 2021
            </span>
            <span className="text-[10px] tracking-editorial uppercase opacity-80">
              València · ES
            </span>
          </div>

          <div className="animate-rise-slow max-w-2xl">
            <p className="text-[10px] tracking-editorial uppercase text-[color:var(--gold)] mb-4">
              Specialty Coffee & Pastry
            </p>
            <h1 className="font-serif italic text-6xl sm:text-8xl leading-[0.9]">
              Boketto
            </h1>
            <div className="hairline w-24 my-6" />
            <p className="font-serif italic text-xl sm:text-2xl max-w-lg leading-snug opacity-95">
              "Mirar a la nada y que te sepa a Boketto."
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                onClick={onEnter}
                className="group inline-flex items-center gap-3 bg-[color:var(--gold)] text-[color:var(--forest)] rounded-full pl-6 pr-3 py-3 text-[10px] tracking-editorial uppercase font-medium hover:bg-[color:var(--primary-foreground)] transition-colors"
              >
                Explorar la carta
                <span className="grid place-items-center w-8 h-8 rounded-full bg-[color:var(--forest)] text-[color:var(--gold)] transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </button>
              <a
                href="https://wa.me/34614191802?text=Hola%20Boketto%2C%20quiero%20reservar%20mesa"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] tracking-editorial uppercase border-b border-[color:var(--gold)]/60 pb-1 hover:border-[color:var(--gold)]"
              >
                Reservar mesa →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Manifiesto */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 pt-24 pb-16 text-center">
        <p className="text-[10px] tracking-editorial uppercase text-[color:var(--gold)] mb-6">
          Manifiesto
        </p>
        <p className="font-serif italic text-3xl sm:text-4xl leading-tight">
          Pastelería pensada como un pequeño ensayo comestible.
          Café tratado como materia viva.
        </p>
        <div className="hairline w-16 mx-auto mt-10" />
      </section>

      {/* Two-pillar editorial split */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 pb-20 grid md:grid-cols-2 gap-px bg-border">
        <Pillar
          eyebrow="01 — Café"
          title="De especialidad, taza a taza"
          body="Granos de origen único, tostados lentamente. Extracción calibrada cada mañana. Ristrettos densos, filtrados limpios, matchas ceremoniales."
        />
        <Pillar
          eyebrow="02 — Pastelería"
          title="De autor, sin excesos"
          body="Masas de fermentación larga, mantequilla AOP y azúcares justos. Si el postre empalaga, no es de Boketto."
        />
      </section>

      {/* Reserva */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 pb-24">
        <div className="border border-border rounded-3xl p-10 text-center bg-card">
          <p className="text-[10px] tracking-editorial uppercase text-[color:var(--gold)] mb-4">
            Reserva
          </p>
          <h3 className="font-serif italic text-3xl">Aforo reducido, servicio pausado.</h3>
          <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">
            Guillem Sorolla 29, València. Escríbenos por WhatsApp y confirmamos al instante.
          </p>
          <a
            href="https://wa.me/34614191802?text=Hola%20Boketto%2C%20quiero%20reservar%20mesa"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 border border-foreground rounded-full px-6 py-3 text-[10px] tracking-editorial uppercase font-medium hover:bg-foreground hover:text-background transition-colors"
          >
            Reservar por WhatsApp
          </a>
        </div>
      </section>

      <p className="text-[10px] tracking-editorial uppercase text-center text-muted-foreground pb-16">
        Boketto · Guillem Sorolla 29 · València
      </p>
    </div>
  );
}

function Pillar({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="bg-background p-10">
      <p className="text-[10px] tracking-editorial uppercase text-[color:var(--gold)]">{eyebrow}</p>
      <h3 className="font-serif italic text-3xl mt-4">{title}</h3>
      <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{body}</p>
    </div>
  );
}

/* ============================ CARTA ================================== */
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
  const [cat, setCat] = useState<Category>("cafeteria");
  const filtered = products.filter((p) => p.category === cat);

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
    <div className="max-w-2xl mx-auto px-6 sm:px-10 pt-14">
      <header className="text-center">
        <p className="text-[10px] tracking-editorial uppercase text-[color:var(--gold)]">
          La Carta
        </p>
        <h2 className="font-serif italic text-5xl mt-3">Selección del día</h2>
        <div className="hairline w-16 mx-auto mt-6" />
      </header>

      {/* Category tabs */}
      <nav className="sticky top-0 z-30 bg-background/90 backdrop-blur pt-8 pb-4 -mx-6 sm:-mx-10 px-6 sm:px-10 mt-8 border-b border-border">
        <div className="flex justify-between gap-4">
          {CATS.map((c) => {
            const active = cat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`flex-1 text-center pb-2 transition-all ${
                  active
                    ? "border-b border-[color:var(--gold)]"
                    : "border-b border-transparent opacity-40 hover:opacity-70"
                }`}
              >
                <p className={`text-[10px] tracking-editorial uppercase font-medium`}>
                  {c.label}
                </p>
                <p className="font-serif italic text-xs opacity-70 mt-0.5">{c.sub}</p>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Menu list */}
      <div className="mt-10 space-y-10 animate-rise">
        {filtered.map((p, i) => {
          const out = soldOut[p.id];
          const linesForProduct = basket
            .map((l, i2) => ({ l, i: i2 }))
            .filter((x) => x.l.productId === p.id);
          const count = linesForProduct.length;
          return (
            <article
              key={p.id}
              className={`group transition-all ${
                out ? "opacity-30 blur-[1.5px] pointer-events-none select-none" : ""
              }`}
            >
              <div className="flex justify-between items-baseline gap-6">
                <div className="min-w-0">
                  <h3 className="font-serif text-2xl leading-tight">{p.name}</h3>
                  <p className="font-serif italic text-xs text-[color:var(--gold)] mt-1">
                    {p.origin}
                  </p>
                </div>
                <span className="shrink-0 text-sm tracking-wider tabular-nums text-muted-foreground">
                  {p.price.toFixed(2)} €
                </span>
              </div>
              <p className="text-[12px] leading-relaxed text-muted-foreground mt-3 max-w-md">
                {p.desc}
              </p>

              {out ? (
                <p className="mt-4 text-[10px] tracking-editorial uppercase text-destructive">
                  Agotado hoy
                </p>
              ) : (
                <>
                  {count > 0 && p.modifiers && p.modifiers.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {linesForProduct.map(({ l, i: lineIdx }, n) => (
                        <div
                          key={lineIdx}
                          className="border-l border-[color:var(--gold)]/40 pl-4 py-1 space-y-1.5"
                        >
                          <p className="text-[10px] tracking-editorial uppercase text-muted-foreground">
                            Unidad {n + 1}
                          </p>
                          {p.modifiers!.map((m) => (
                            <label
                              key={m.id}
                              className="flex items-center justify-between gap-3 text-xs cursor-pointer group/mod"
                            >
                              <span className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={!!l.modifiers[m.id]}
                                  onChange={() => toggleMod(lineIdx, m.id)}
                                  className="accent-[color:var(--forest)]"
                                />
                                <span className="font-serif italic">{m.label}</span>
                              </span>
                              <span className="text-[color:var(--gold)] tabular-nums">
                                +{m.price.toFixed(2)} €
                              </span>
                            </label>
                          ))}
                          <button
                            onClick={() => removeLine(lineIdx)}
                            className="text-[9px] tracking-editorial uppercase text-destructive hover:underline"
                          >
                            Quitar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 flex items-center gap-4">
                    <button
                      onClick={() => addLine(p.id)}
                      className="inline-flex items-center gap-3 border border-foreground rounded-full pl-4 pr-2 py-1.5 text-[10px] tracking-editorial uppercase hover:bg-foreground hover:text-background transition-colors"
                    >
                      Añadir
                      <span className="grid place-items-center w-6 h-6 rounded-full border border-current">
                        +
                      </span>
                    </button>
                    {count > 0 && (
                      <span className="text-[10px] tracking-editorial uppercase text-[color:var(--gold)]">
                        × {count} en el pedido
                      </span>
                    )}
                  </div>
                </>
              )}

              {i < filtered.length - 1 && <div className="hairline w-full mt-10 opacity-40" />}
            </article>
          );
        })}
      </div>

      {/* Sticky order bar */}
      {totals.count > 0 && (
        <div className="fixed left-0 right-0 bottom-24 z-40 px-4 pointer-events-none">
          <div className="max-w-2xl mx-auto pointer-events-auto animate-rise">
            <button
              onClick={onConfirm}
              className="w-full bg-[color:var(--forest)] text-[color:var(--primary-foreground)] rounded-full pl-6 pr-2 py-2 flex items-center justify-between shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-transform"
            >
              <div className="text-left">
                <p className="text-[9px] tracking-editorial uppercase text-[color:var(--gold)]">
                  {totals.count} {totals.count === 1 ? "unidad" : "unidades"} · Pedido directo
                </p>
                <p className="font-serif italic text-lg leading-tight">
                  Confirmar · {totals.total.toFixed(2)} €
                </p>
              </div>
              <span className="grid place-items-center w-12 h-12 rounded-full bg-[color:var(--gold)] text-[color:var(--forest)]">
                →
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================ ESTADO ================================= */
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
  const orderId = useMemo(
    () => "BKT-" + Math.floor(100 + Math.random() * 900),
    [],
  );

  const waMessage = useMemo(() => {
    const header = `*BOKETTO — NUEVO PEDIDO*\n_Guillem Sorolla 29, València_\nRef: ${orderId}\n\n`;
    const body = detail
      .map(
        (l) =>
          `• *${l.name}* — ${l.base.toFixed(2)} €\n` +
          l.mods.map((m) => `   ↳ ${m.label} (+${m.price.toFixed(2)} €)`).join("\n"),
      )
      .join("\n\n");
    const footer = `\n\n———\n*TOTAL:* ${total.toFixed(2)} €\n_0% comisiones · directo a la barra_`;
    return header + body + footer;
  }, [detail, total, orderId]);

  const waUrl = `https://wa.me/34614191802?text=${encodeURIComponent(waMessage)}`;

  if (lines.length === 0) {
    return (
      <div className="max-w-md mx-auto px-6 pt-32 text-center animate-rise">
        <p className="text-[10px] tracking-editorial uppercase text-[color:var(--gold)]">
          Ticket
        </p>
        <h2 className="font-serif italic text-4xl mt-3">Aún sin pedido</h2>
        <p className="text-sm text-muted-foreground mt-4">
          Añade productos desde la carta para generar tu recibo digital.
        </p>
        <button
          onClick={onBack}
          className="mt-8 inline-flex items-center gap-3 border border-foreground rounded-full pl-5 pr-2 py-2 text-[10px] tracking-editorial uppercase hover:bg-foreground hover:text-background transition-colors"
        >
          Ir a la carta
          <span className="grid place-items-center w-7 h-7 rounded-full bg-foreground text-background">
            →
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 pt-14">
      <header className="text-center">
        <p className="text-[10px] tracking-editorial uppercase text-[color:var(--gold)]">
          Ticket digital
        </p>
        <h2 className="font-serif italic text-4xl mt-3">Tu recibo Boketto</h2>
        <div className="hairline w-16 mx-auto mt-6" />
      </header>

      {/* Editorial dark ticket */}
      <div className="mt-10 bg-[color:var(--forest)] text-[color:var(--primary-foreground)] rounded-3xl p-8 ticket-shadow">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-[9px] tracking-editorial uppercase text-[color:var(--gold)] mb-1">
              Ticket activo
            </p>
            <h3 className="font-serif italic text-3xl leading-none">Boketto</h3>
            <p className="text-[10px] opacity-60 mt-2">Guillem Sorolla 29 · València</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] tracking-editorial uppercase opacity-60">Orden</p>
            <p className="font-serif text-xl mt-1">#{orderId}</p>
          </div>
        </div>

        <div className="space-y-4 border-y border-white/10 py-6">
          {detail.map((l, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline">
                <span className="font-serif italic text-lg pr-2 leading-tight">
                  1× {l.name}
                </span>
                <span className="text-xs tabular-nums opacity-90">
                  {l.base.toFixed(2)} €
                </span>
              </div>
              {l.mods.map((m, mi) => (
                <div
                  key={mi}
                  className="flex justify-between text-[11px] pl-4 mt-1 opacity-70"
                >
                  <span>↳ {m.label}</span>
                  <span className="tabular-nums">+{m.price.toFixed(2)} €</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)] animate-pulse" />
            <span className="text-[10px] tracking-editorial uppercase text-[color:var(--gold)]">
              En barra
            </span>
          </div>
          <span className="font-serif italic text-3xl">{total.toFixed(2)} €</span>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <a
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 flex items-center justify-between w-full bg-foreground text-background rounded-full pl-6 pr-2 py-2 shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-transform"
      >
        <div className="text-left">
          <p className="text-[9px] tracking-editorial uppercase text-[color:var(--gold)]">
            Sin comisiones
          </p>
          <p className="font-serif italic text-base leading-tight">Enviar por WhatsApp</p>
        </div>
        <span className="grid place-items-center w-11 h-11 rounded-full bg-[color:var(--gold)] text-[color:var(--forest)]">
          →
        </span>
      </a>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={onBack}
          className="border border-border rounded-full py-3 text-[10px] tracking-editorial uppercase hover:border-foreground transition-colors"
        >
          Editar
        </button>
        <button
          onClick={onNew}
          className="border border-border rounded-full py-3 text-[10px] tracking-editorial uppercase hover:border-foreground transition-colors"
        >
          Nuevo ticket
        </button>
      </div>
    </div>
  );
}

/* ============================ ADMIN ================================== */
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
    <div className="max-w-2xl mx-auto px-6 sm:px-10 pt-14">
      <header className="text-center">
        <p className="text-[10px] tracking-editorial uppercase text-[color:var(--gold)]">
          Panel interno
        </p>
        <h2 className="font-serif italic text-4xl mt-3">Barra & stock</h2>
        <div className="hairline w-16 mx-auto mt-6" />
      </header>

      {/* Dark mode toggle */}
      <div className="mt-10 border border-border rounded-2xl p-6 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="font-serif italic text-xl">Modo nocturno</p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Cambia la piel pública al instante.
          </p>
        </div>
        <button
          onClick={() => setDark(!dark)}
          aria-label="Toggle dark mode"
          className={`relative shrink-0 w-16 h-8 rounded-full transition-colors ${
            dark ? "bg-[color:var(--gold)]" : "bg-muted"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-background border border-border transition-transform ${
              dark ? "translate-x-8" : ""
            }`}
          />
        </button>
      </div>

      {/* Product rows */}
      <div className="mt-8 space-y-px bg-border rounded-2xl overflow-hidden border border-border">
        {products.map((p) => {
          const out = soldOut[p.id];
          return (
            <div
              key={p.id}
              className="bg-background p-5 grid grid-cols-[minmax(0,1fr)_auto] gap-4 items-center"
            >
              <div className="min-w-0">
                <p className="font-serif text-lg truncate">{p.name}</p>
                <p className="font-serif italic text-[11px] text-[color:var(--gold)] truncate">
                  {p.origin}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <label className="text-[9px] tracking-editorial uppercase text-muted-foreground">
                    Precio €
                  </label>
                  <input
                    type="number"
                    step="0.10"
                    value={p.price}
                    onChange={(e) =>
                      setProducts((arr) =>
                        arr.map((x) =>
                          x.id === p.id
                            ? { ...x, price: parseFloat(e.target.value) || 0 }
                            : x,
                        ),
                      )
                    }
                    className="w-20 bg-transparent border-b border-border tabular-nums text-sm py-1 focus:outline-none focus:border-[color:var(--gold)]"
                  />
                </div>
              </div>
              <button
                onClick={() => setSoldOut((s) => ({ ...s, [p.id]: !s[p.id] }))}
                className={`shrink-0 text-[10px] tracking-editorial uppercase rounded-full px-4 py-2.5 transition-colors ${
                  out
                    ? "bg-destructive text-destructive-foreground"
                    : "border border-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                {out ? "Agotado" : "Disponible"}
              </button>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] tracking-editorial uppercase text-muted-foreground text-center mt-10">
        Boketto · POS interno
      </p>
    </div>
  );
}

/* ============================ NAV ==================================== */
function BottomNav({ view, setView }: { view: View; setView: (v: View) => void }) {
  const items: { id: View; label: string }[] = [
    { id: "home", label: "Inicio" },
    { id: "carta", label: "Carta" },
    { id: "estado", label: "Ticket" },
    { id: "admin", label: "Admin" },
  ];
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(94%,26rem)]">
      <div className="bg-[color:var(--forest)] text-[color:var(--primary-foreground)] rounded-full px-3 py-2 flex items-center justify-between shadow-2xl backdrop-blur">
        {items.map((it) => {
          const active = view === it.id;
          return (
            <button
              key={it.id}
              onClick={() => setView(it.id)}
              className={`flex-1 py-2 rounded-full text-[10px] tracking-editorial uppercase transition-all ${
                active
                  ? "bg-[color:var(--gold)] text-[color:var(--forest)] font-medium"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {it.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ============================ HELPERS ================================ */
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
