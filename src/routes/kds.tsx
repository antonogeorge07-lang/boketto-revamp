import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useStaffAuth, useStore, type Order, type OrderStatus } from "../lib/store";

export const Route = createFileRoute("/kds")({
  component: KdsPage,
});


const STATUS_META: Record<OrderStatus, { label: string; next: string; color: string }> = {
  received: { label: "Received", next: "Start preparing", color: "var(--gold)" },
  preparing: { label: "Preparing", next: "Mark ready", color: "#e08a3c" },
  ready: { label: "Ready", next: "Archive", color: "#5aa66a" },
  archived: { label: "Archived", next: "—", color: "var(--ash)" },
};

function KdsPage() {
  const { orders, advanceOrder } = useStore();
  const { signOut } = useStaffAuth();
  const navigate = useNavigate();

  // live tick for elapsed timers
  const [, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const columns = useMemo(() => {
    const buckets: Record<OrderStatus, Order[]> = {
      received: [], preparing: [], ready: [], archived: [],
    };
    for (const o of orders) buckets[o.status].push(o);
    for (const k of Object.keys(buckets) as OrderStatus[]) {
      buckets[k].sort((a, b) => a.createdAt - b.createdAt);
    }
    return buckets;
  }, [orders]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 glass-strong border-b border-foreground/5">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <span className="font-serif italic text-xl">boketto</span>
            <span className="text-[10px] tracking-editorial uppercase text-foreground/60">
              Kitchen Display · Barista
            </span>
          </div>
          <nav className="flex items-center gap-2">
            <Link to="/admin" className="glass press rounded-full px-4 py-2 text-[10px] tracking-editorial uppercase">
              Admin
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

      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 h-full">
          {(["received", "preparing", "ready", "archived"] as OrderStatus[]).map((status) => (
            <section key={status} className="glass rounded-[24px] flex flex-col min-h-[70svh]">
              <header className="px-5 py-4 flex items-center justify-between border-b border-foreground/5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: STATUS_META[status].color }} />
                  <span className="text-[10px] tracking-editorial uppercase text-foreground/70">
                    {STATUS_META[status].label}
                  </span>
                </div>
                <span className="text-[10px] tracking-editorial uppercase text-foreground/50">
                  {columns[status].length}
                </span>
              </header>
              <div className="p-3 space-y-3 overflow-y-auto flex-1">
                {columns[status].map((o) => (
                  <TicketCard key={o.id} order={o} onAdvance={() => advanceOrder(o.id)} />
                ))}
                {columns[status].length === 0 && (
                  <div className="text-center text-xs text-foreground/40 py-8">—</div>
                )}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

function TicketCard({ order, onAdvance }: { order: Order; onAdvance: () => void }) {
  const elapsed = Math.floor((Date.now() - order.createdAt) / 1000);
  const mm = Math.floor(elapsed / 60);
  const ss = elapsed % 60;
  const stale = order.status !== "archived" && elapsed > 60 * 8;

  return (
    <article className={`glass-strong rounded-2xl p-4 animate-rise ${stale ? "ring-2 ring-destructive/50" : ""}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-serif text-xl leading-none">{order.ref}</p>
          <p className="mt-1 text-[10px] tracking-editorial uppercase text-foreground/55">
            {order.customer} · Table {order.table}
          </p>
        </div>
        <div className="text-right">
          <p className={`font-mono text-sm ${stale ? "text-destructive" : "text-foreground/70"}`}>
            {String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
          </p>
          <p className="text-[10px] tracking-editorial uppercase text-foreground/45">elapsed</p>
        </div>
      </div>

      <ul className="mt-3 space-y-1.5">
        {order.lines.map((l) => (
          <li key={l.id} className="text-sm">
            <span className="text-foreground/50 text-xs mr-1">{l.qty}×</span>
            {l.name}
            {l.modifiers.length > 0 && (
              <span className="block pl-5 text-[10px] tracking-editorial uppercase text-foreground/50">
                {l.modifiers.map((m) => m.label).join(" · ")}
              </span>
            )}
          </li>
        ))}
      </ul>

      {order.status !== "archived" && (
        <button
          onClick={onAdvance}
          className="mt-4 w-full glass-dark shimmer press rounded-full py-2.5 text-[10px] tracking-editorial uppercase"
        >
          {STATUS_META[order.status].next} →
        </button>
      )}
    </article>
  );
}
