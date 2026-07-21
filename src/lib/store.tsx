import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

// ============================================================================
// TYPES
// ============================================================================

export type Category = "bokematchas" | "coffee" | "bakery" | "brunch";
export type ModifierGroup = "milk" | "diet";
export type Modifier = { id: string; label: string; price: number; group?: ModifierGroup };

export type Product = {
  id: string;
  name: string;
  origin: string;
  desc: string;
  price: number;
  category: Category;
  soldOut: boolean;
  featured: boolean; // Today's specials
  regular: boolean; // Regulars grid
  image?: string; // data URL or remote URL
  modifiers?: Modifier[];
};


export type OrderLine = {
  id: string;
  productId: string;
  name: string;
  price: number;
  modifiers: { id: string; label: string; price: number }[];
  qty: number;
};

export type OrderStatus = "received" | "preparing" | "ready" | "archived";

export type Order = {
  id: string;
  ref: string; // human short ref like #A47
  customer: string;
  table: string; // table number or "Barra"
  lines: OrderLine[];
  total: number;
  status: OrderStatus;
  createdAt: number;
  updatedAt: number;
};

// ============================================================================
// SEED DATA
// ============================================================================

const SEED_PRODUCTS: Product[] = [
  // ── Today's Specials (signature)
  {
    id: "tarta-nohirita",
    name: "Tarta Nohirita",
    origin: "Signature · pera caramelizada",
    desc: "Pera caramelizada lentamente sobre lecho de crema de pistacho siciliano. Base de sablé bretón.",
    price: 5.8,
    category: "bakery",
    soldOut: false,
    featured: true,
    regular: false,
  },
  {
    id: "galleta-valenciana",
    name: "Galleta Valenciana",
    origin: "Signature · crema de naranja torcheada",
    desc: "Galleta artesana de mantequilla con crema pastelera de naranja de València, torcheada al momento.",
    price: 4.6,
    category: "bakery",
    soldOut: false,
    featured: true,
    regular: false,
  },
  {
    id: "rollo-canela",
    name: "Rollo de Canela",
    origin: "Signature · anacardos caramelizados",
    desc: "Masa laminada de canela con crumble de anacardos caramelizados y glaseado ligero de cardamomo.",
    price: 4.9,
    category: "bakery",
    soldOut: false,
    featured: true,
    regular: false,
  },

  // ── Regulars
  {
    id: "croissant",
    name: "Croissant de Mantequilla",
    origin: "Beurre AOP Charentes · 72 capas",
    desc: "Laminado a tres vueltas. Corteza fina, miga aireada, aroma a mantequilla noisette.",
    price: 2.6,
    category: "bakery",
    soldOut: false,
    featured: false,
    regular: true,
  },
  {
    id: "flat-white",
    name: "Flat White",
    origin: "Etiopía Sidamo · microfoam",
    desc: "Doble shot ristretto sobre leche emulsionada sedosa. Textura microespuma.",
    price: 3.2,
    category: "coffee",
    soldOut: false,
    featured: false,
    regular: true,
    modifiers: [
      { id: "oat", label: "Oat milk", price: 0.4, group: "milk" },
      { id: "almond", label: "Almond milk", price: 0.4, group: "milk" },
      { id: "whole", label: "Whole milk", price: 0, group: "milk" },
    ],
  },
  {
    id: "matcha-puro",
    name: "Pure Green Matcha",
    origin: "Uji, Kioto · ceremonial",
    desc: "Matcha ceremonial batido a mano. Notas vegetales, umami largo, sin dulzor añadido.",
    price: 3.8,
    category: "bokematchas",
    soldOut: false,
    featured: false,
    regular: true,
    modifiers: [
      { id: "oat", label: "Oat milk", price: 0.4, group: "milk" },
      { id: "almond", label: "Almond milk", price: 0.4, group: "milk" },
      { id: "whole", label: "Whole milk", price: 0, group: "milk" },
    ],
  },

  // ── Bokematchas
  {
    id: "iced-matcha-yuzu",
    name: "Iced Matcha Yuzu",
    origin: "Bokematcha · cítrico japonés",
    desc: "Matcha ceremonial batido con toque de yuzu sobre hielo.",
    price: 4.6,
    category: "bokematchas",
    soldOut: false,
    featured: false,
    regular: false,
    modifiers: [
      { id: "oat", label: "Oat milk", price: 0.4, group: "milk" },
      { id: "almond", label: "Almond milk", price: 0.4, group: "milk" },
    ],
  },
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    origin: "Bokematcha · doble punto",
    desc: "Matcha ceremonial con leche vaporizada a doble punto.",
    price: 4.2,
    category: "bokematchas",
    soldOut: false,
    featured: false,
    regular: false,
    modifiers: [
      { id: "oat", label: "Oat milk", price: 0.4, group: "milk" },
      { id: "almond", label: "Almond milk", price: 0.4, group: "milk" },
      { id: "whole", label: "Whole milk", price: 0, group: "milk" },
    ],
  },

  // ── Specialty Coffee
  {
    id: "v60",
    name: "V60 Origami",
    origin: "Etiopía Guji · lavado",
    desc: "Filtrado artesanal en cerámica, 15g / 250ml. Notas florales, cítricas y té negro al final.",
    price: 4.5,
    category: "coffee",
    soldOut: false,
    featured: false,
    regular: false,
  },
  {
    id: "iced-v60",
    name: "Iced V60",
    origin: "Colombia Huila · natural",
    desc: "Filtrado sobre hielo. Cuerpo limpio, acidez balanceada, retrogusto a frutos rojos.",
    price: 4.8,
    category: "coffee",
    soldOut: false,
    featured: false,
    regular: false,
  },
  {
    id: "espresso",
    name: "Espresso",
    origin: "Blend de casa · doble",
    desc: "Extracción calibrada cada mañana. Cuerpo denso, retrogusto a cacao.",
    price: 2.2,
    category: "coffee",
    soldOut: false,
    featured: false,
    regular: false,
  },

  // ── Artisan Bakery
  {
    id: "pain-choc",
    name: "Pain au Chocolat",
    origin: "Valrhona 70%",
    desc: "Dos barras de chocolate negro dentro de masa laminada. Crujiente por fuera, tierno dentro.",
    price: 3.2,
    category: "bakery",
    soldOut: false,
    featured: false,
    regular: false,
  },
  {
    id: "brioche-pistacho",
    name: "Brioche de Pistacho",
    origin: "24h ferment · sourdough",
    desc: "Brioche laminado relleno al momento con crema de pistacho. Se sirve templado.",
    price: 5.2,
    category: "bakery",
    soldOut: false,
    featured: false,
    regular: false,
  },

  // ── Brunch
  {
    id: "tostada",
    name: "Tostada de Aguacate",
    origin: "Masa madre 48h",
    desc: "Aguacate, AOVE picual, ralladura de limón, escamas de sal.",
    price: 8.5,
    category: "brunch",
    soldOut: false,
    featured: false,
    regular: false,
    modifiers: [
      { id: "egg", label: "Poached egg", price: 1.5 },
      { id: "salmon", label: "Cured salmon", price: 3.5 },
      { id: "gf", label: "Gluten-free bread", price: 1.0, group: "diet" },
    ],
  },
  {
    id: "granola",
    name: "House Granola",
    origin: "Yogur griego colado",
    desc: "Avena tostada con miel de azahar, frutos secos, semillas y frutas de temporada.",
    price: 7.5,
    category: "brunch",
    soldOut: false,
    featured: false,
    regular: false,
    modifiers: [
      { id: "vegan", label: "Vegan (coconut yogurt)", price: 0.8, group: "diet" },
    ],
  },
];

export const CATEGORY_META: Record<Category, { label: string; sub: string }> = {
  bokematchas: { label: "Bokematchas", sub: "matcha ceremonial" },
  coffee: { label: "Specialty Coffee", sub: "single origin" },
  bakery: { label: "Artisan Bakery", sub: "hand-laminated" },
  brunch: { label: "Brunch", sub: "all-day" },
};

// ============================================================================
// STORAGE
// ============================================================================

const LS_PRODUCTS = "boketto.products.v2";
const LS_ORDERS = "boketto.orders.v2";
const LS_AUTH = "boketto.staff.session";
const STAFF_PASSWORD = "boketto2026"; // client-side gate; documented to the owner

function loadProducts(): Product[] {
  if (typeof window === "undefined") return SEED_PRODUCTS;
  try {
    const raw = localStorage.getItem(LS_PRODUCTS);
    if (!raw) return SEED_PRODUCTS;
    const parsed = JSON.parse(raw) as Product[];
    // merge in any new seed items
    const map = new Map(parsed.map((p) => [p.id, p]));
    for (const s of SEED_PRODUCTS) if (!map.has(s.id)) map.set(s.id, s);
    return Array.from(map.values());
  } catch {
    return SEED_PRODUCTS;
  }
}
function saveProducts(p: Product[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_PRODUCTS, JSON.stringify(p));
  } catch (e) {
    // Quota exceeded — retry without image data URLs so edits still persist.
    try {
      const stripped = p.map((x) =>
        x.image && x.image.startsWith("data:") ? { ...x, image: undefined } : x,
      );
      localStorage.setItem(LS_PRODUCTS, JSON.stringify(stripped));
      if (typeof console !== "undefined") console.warn("Product images dropped from storage due to quota.", e);
      alert("Storage full — item photos were not saved. Use smaller images or fewer uploads.");
    } catch {
      // give up silently; in-memory state remains intact
    }
  }
}
function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_ORDERS);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}
function saveOrders(o: Order[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_ORDERS, JSON.stringify(o));
  } catch {
    // ignore
  }
}

// ============================================================================
// CONTEXT
// ============================================================================

export type SignatureOfDay = {
  text: string;
  image?: string;
  linkedToSocial: boolean;
};

type StoreCtx = {
  products: Product[];
  orders: Order[];
  signature: SignatureOfDay;
  updateSignature: (patch: Partial<SignatureOfDay>) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  toggleSoldOut: (id: string) => void;
  toggleFeatured: (id: string) => void;
  addProduct: (input: Partial<Product> & { name: string; category: Category }) => Product;
  removeProduct: (id: string) => void;
  createOrder: (input: { customer: string; table: string; lines: OrderLine[] }) => Order;
  advanceOrder: (id: string) => void;
  archiveOrder: (id: string) => void;
};

const LS_SIGNATURE = "boketto.signature.v1";
const DEFAULT_SIGNATURE: SignatureOfDay = {
  text: "Tarta Nohirita — pera caramelizada & pistacho siciliano",
  image: undefined,
  linkedToSocial: false,
};
function loadSignature(): SignatureOfDay {
  if (typeof window === "undefined") return DEFAULT_SIGNATURE;
  try {
    const raw = localStorage.getItem(LS_SIGNATURE);
    return raw ? { ...DEFAULT_SIGNATURE, ...(JSON.parse(raw) as SignatureOfDay) } : DEFAULT_SIGNATURE;
  } catch {
    return DEFAULT_SIGNATURE;
  }
}
function saveSignature(s: SignatureOfDay) {
  if (typeof window !== "undefined") localStorage.setItem(LS_SIGNATURE, JSON.stringify(s));
}


const StoreContext = createContext<StoreCtx | null>(null);

function shortRef(n: number) {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const l = letters[n % letters.length];
  const num = String((n * 31) % 999).padStart(2, "0");
  return `#${l}${num}`;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [signature, setSignature] = useState<SignatureOfDay>(DEFAULT_SIGNATURE);

  // hydrate from localStorage after mount (SSR-safe)
  useEffect(() => {
    setProducts(loadProducts());
    setOrders(loadOrders());
    setSignature(loadSignature());
  }, []);

  // cross-tab sync via storage events + BroadcastChannel
  useEffect(() => {
    if (typeof window === "undefined") return;
    const bc = "BroadcastChannel" in window ? new BroadcastChannel("boketto") : null;
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_PRODUCTS) setProducts(loadProducts());
      if (e.key === LS_ORDERS) setOrders(loadOrders());
      if (e.key === LS_SIGNATURE) setSignature(loadSignature());
    };
    const onMsg = (e: MessageEvent) => {
      if (e.data === "products") setProducts(loadProducts());
      if (e.data === "orders") setOrders(loadOrders());
      if (e.data === "signature") setSignature(loadSignature());
    };
    window.addEventListener("storage", onStorage);
    bc?.addEventListener("message", onMsg);
    return () => {
      window.removeEventListener("storage", onStorage);
      bc?.removeEventListener("message", onMsg);
      bc?.close();
    };
  }, []);

  const broadcast = (kind: "products" | "orders" | "signature") => {
    if (typeof window === "undefined") return;
    if ("BroadcastChannel" in window) new BroadcastChannel("boketto").postMessage(kind);
  };

  const persistProducts = (next: Product[]) => {
    setProducts(next);
    saveProducts(next);
    broadcast("products");
  };
  const persistOrders = (next: Order[]) => {
    setOrders(next);
    saveOrders(next);
    broadcast("orders");
  };
  const persistSignature = (next: SignatureOfDay) => {
    setSignature(next);
    saveSignature(next);
    broadcast("signature");
  };

  const value = useMemo<StoreCtx>(
    () => ({
      products,
      orders,
      signature,
      updateSignature: (patch) => persistSignature({ ...signature, ...patch }),
      updateProduct: (id, patch) => {
        persistProducts(products.map((p) => (p.id === id ? { ...p, ...patch } : p)));
      },
      toggleSoldOut: (id) => {
        persistProducts(products.map((p) => (p.id === id ? { ...p, soldOut: !p.soldOut } : p)));
      },
      toggleFeatured: (id) => {
        persistProducts(products.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));
      },
      addProduct: (input) => {
        const id = `custom_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        const product: Product = {
          id,
          name: input.name,
          origin: input.origin ?? "",
          desc: input.desc ?? "",
          price: input.price ?? 0,
          category: input.category,
          soldOut: input.soldOut ?? false,
          featured: input.featured ?? false,
          regular: input.regular ?? false,
          image: input.image,
          modifiers: input.modifiers,
        };
        persistProducts([product, ...products]);
        return product;
      },
      removeProduct: (id) => {
        persistProducts(products.filter((p) => p.id !== id));
      },

      createOrder: ({ customer, table, lines }) => {
        const now = Date.now();
        const order: Order = {
          id: `o_${now}_${Math.random().toString(36).slice(2, 7)}`,
          ref: shortRef(orders.length + 1),
          customer: customer || "—",
          table: table || "Barra",
          lines,
          total: lines.reduce(
            (s, l) => s + (l.price + l.modifiers.reduce((m, x) => m + x.price, 0)) * l.qty,
            0,
          ),
          status: "received",
          createdAt: now,
          updatedAt: now,
        };
        persistOrders([order, ...orders]);
        return order;
      },
      advanceOrder: (id) => {
        const next: Record<OrderStatus, OrderStatus> = {
          received: "preparing",
          preparing: "ready",
          ready: "archived",
          archived: "archived",
        };
        persistOrders(
          orders.map((o) =>
            o.id === id ? { ...o, status: next[o.status], updatedAt: Date.now() } : o,
          ),
        );
      },
      archiveOrder: (id) => {
        persistOrders(
          orders.map((o) =>
            o.id === id ? { ...o, status: "archived", updatedAt: Date.now() } : o,
          ),
        );
      },
    }),
    [products, orders, signature],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

// ============================================================================
// AUTH (client-side staff gate)
// ============================================================================

export function useStaffAuth() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setAuthed(sessionStorage.getItem(LS_AUTH) === "1");
    setReady(true);
  }, []);
  const signIn = (password: string) => {
    if (password === STAFF_PASSWORD) {
      sessionStorage.setItem(LS_AUTH, "1");
      setAuthed(true);
      return true;
    }
    return false;
  };
  const signOut = () => {
    sessionStorage.removeItem(LS_AUTH);
    setAuthed(false);
  };
  return { authed, ready, signIn, signOut };
}

export const STAFF_HINT = "Staff access: password is boketto2026";
