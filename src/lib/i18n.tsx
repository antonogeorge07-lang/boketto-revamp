import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "es" | "en" | "ja";

type Dict = Record<string, { es: string; en: string; ja: string }>;

export const UI: Dict = {
  // Nav
  nav_home: { es: "Inicio", en: "Home", ja: "ホーム" },
  nav_carta: { es: "Carta", en: "Menu", ja: "メニュー" },
  nav_estado: { es: "Ticket", en: "Ticket", ja: "伝票" },
  nav_admin: { es: "Admin", en: "Admin", ja: "管理" },

  // Home
  home_eyebrow: { es: "Specialty Coffee & Pastry", en: "Specialty Coffee & Pastry", ja: "スペシャルティコーヒー & ペイストリー" },
  home_est: { es: "Est · 2021", en: "Est · 2021", ja: "創業 · 2021" },
  home_loc: { es: "València · ES", en: "València · ES", ja: "バレンシア · ES" },
  home_tagline: {
    es: '"Mirar a la nada y que te sepa a Boketto."',
    en: '"To gaze at nothing and taste it as Boketto."',
    ja: '「何も見ずに、Bokettoの味がする。」',
  },
  home_cta_explore: { es: "Explorar la carta", en: "Explore the menu", ja: "メニューを見る" },
  home_cta_reserve: { es: "Reservar mesa →", en: "Book a table →", ja: "予約する →" },
  home_manifest_eyebrow: { es: "Manifiesto", en: "Manifesto", ja: "宣言" },
  home_manifest: {
    es: "Pastelería pensada como un pequeño ensayo comestible. Café tratado como materia viva.",
    en: "Pastry conceived as a small edible essay. Coffee treated as living matter.",
    ja: "パティスリーは食べられる小さなエッセイ。コーヒーは生きた素材として。",
  },
  pillar_01: { es: "01 — Café", en: "01 — Coffee", ja: "01 — コーヒー" },
  pillar_01_title: { es: "De especialidad, taza a taza", en: "Specialty, cup by cup", ja: "スペシャルティ、一杯ごとに" },
  pillar_01_body: {
    es: "Granos de origen único, tostados lentamente. Extracción calibrada cada mañana. Ristrettos densos, filtrados limpios, matchas ceremoniales.",
    en: "Single-origin beans, slowly roasted. Extraction dialed in each morning. Dense ristrettos, clean filters, ceremonial matcha.",
    ja: "シングルオリジンの豆を丁寧に焙煎。毎朝抽出を調整。濃厚なリストレット、クリーンなフィルター、儀式用の抹茶。",
  },
  pillar_02: { es: "02 — Pastelería", en: "02 — Pastry", ja: "02 — パティスリー" },
  pillar_02_title: { es: "De autor, sin excesos", en: "Signature, without excess", ja: "作家性、過剰なく" },
  pillar_02_body: {
    es: "Masas de fermentación larga, mantequilla AOP y azúcares justos. Si el postre empalaga, no es de Boketto.",
    en: "Long-fermentation doughs, AOP butter and restrained sugar. If it's cloying, it isn't Boketto.",
    ja: "長時間発酵の生地、AOPバター、控えめな砂糖。甘すぎるならBokettoではない。",
  },
  reserve_eyebrow: { es: "Reserva", en: "Reservation", ja: "予約" },
  reserve_title: { es: "Aforo reducido, servicio pausado.", en: "Small room, unhurried service.", ja: "少人数の空間、ゆっくりとしたサービス。" },
  reserve_body: {
    es: "Guillem Sorolla 29, València. Escríbenos por WhatsApp y confirmamos al instante.",
    en: "Guillem Sorolla 29, València. Message us on WhatsApp — instant confirmation.",
    ja: "Guillem Sorolla 29, バレンシア。WhatsAppで即時ご確認いたします。",
  },
  reserve_cta: { es: "Reservar por WhatsApp", en: "Book via WhatsApp", ja: "WhatsAppで予約" },
  footer: { es: "Boketto · Guillem Sorolla 29 · València", en: "Boketto · Guillem Sorolla 29 · València", ja: "Boketto · Guillem Sorolla 29 · バレンシア" },

  // Carta
  carta_eyebrow: { es: "La Carta", en: "The Menu", ja: "メニュー" },
  carta_title: { es: "Selección del día", en: "Today's selection", ja: "本日のセレクション" },
  cat_cafeteria: { es: "Cafetería", en: "Coffee bar", ja: "コーヒー" },
  cat_cafeteria_sub: { es: "de especialidad", en: "specialty", ja: "スペシャルティ" },
  cat_reposteria: { es: "Boulangerie", en: "Boulangerie", ja: "ブーランジェリー" },
  cat_reposteria_sub: { es: "de autor", en: "signature", ja: "作家性" },
  cat_brunch: { es: "Brunch", en: "Brunch", ja: "ブランチ" },
  cat_brunch_sub: { es: "fermentación lenta", en: "slow fermentation", ja: "低速発酵" },
  unit: { es: "Unidad", en: "Unit", ja: "単位" },
  remove: { es: "Quitar", en: "Remove", ja: "削除" },
  add: { es: "Añadir", en: "Add", ja: "追加" },
  in_order: { es: "en el pedido", en: "in order", ja: "注文中" },
  sold_out: { es: "Agotado hoy", en: "Sold out today", ja: "本日売り切れ" },
  confirm: { es: "Confirmar", en: "Confirm", ja: "確定" },
  units_one: { es: "unidad", en: "item", ja: "点" },
  units_many: { es: "unidades", en: "items", ja: "点" },
  direct_order: { es: "Pedido directo", en: "Direct order", ja: "直接注文" },

  // Estado
  ticket_eyebrow: { es: "Ticket digital", en: "Digital ticket", ja: "デジタル伝票" },
  ticket_title: { es: "Tu recibo Boketto", en: "Your Boketto receipt", ja: "Bokettoレシート" },
  ticket_active: { es: "Ticket activo", en: "Active ticket", ja: "有効な伝票" },
  order: { es: "Orden", en: "Order", ja: "注文" },
  at_bar: { es: "En barra", en: "At the bar", ja: "カウンター" },
  send_wa: { es: "Enviar por WhatsApp", en: "Send via WhatsApp", ja: "WhatsAppで送信" },
  no_fees: { es: "Sin comisiones", en: "No fees", ja: "手数料なし" },
  edit: { es: "Editar", en: "Edit", ja: "編集" },
  new_ticket: { es: "Nuevo ticket", en: "New ticket", ja: "新規伝票" },
  no_order_eyebrow: { es: "Ticket", en: "Ticket", ja: "伝票" },
  no_order_title: { es: "Aún sin pedido", en: "No order yet", ja: "まだ注文なし" },
  no_order_body: {
    es: "Añade productos desde la carta para generar tu recibo digital.",
    en: "Add items from the menu to generate your digital receipt.",
    ja: "メニューから商品を追加して伝票を作成してください。",
  },
  go_menu: { es: "Ir a la carta", en: "Go to menu", ja: "メニューへ" },

  // Admin
  admin_eyebrow: { es: "Panel interno", en: "Internal panel", ja: "内部パネル" },
  admin_title: { es: "Barra & stock", en: "Bar & stock", ja: "バー & 在庫" },
  night_mode: { es: "Modo nocturno", en: "Night mode", ja: "ナイトモード" },
  night_mode_body: { es: "Cambia la piel pública al instante.", en: "Switches the public skin instantly.", ja: "公開スキンを瞬時に切替。" },
  price_eur: { es: "Precio €", en: "Price €", ja: "価格 €" },
  available: { es: "Disponible", en: "Available", ja: "販売中" },
  agotado: { es: "Agotado", en: "Sold out", ja: "売切" },
  pos_footer: { es: "Boketto · POS interno", en: "Boketto · Internal POS", ja: "Boketto · 内部POS" },

  // Storefront hero
  hero_kicker: { es: "Café de Especialidad · Pastelería Artesana · Brunch todo el día", en: "Specialty Coffee · Artisan Pastries · All-Day Brunch", ja: "スペシャルティコーヒー · 職人パティスリー · 終日ブランチ" },
  hero_h1_1: { es: "Mirar a la nada", en: "To gaze at nothing", ja: "何も見ずに" },
  hero_h1_2: { es: "y que te sepa a Boketto.", en: "and taste it as Boketto.", ja: "Bokettoの味がする。" },
  hero_sub: {
    es: "Una pequeña sala valenciana donde el café se trata como materia viva y la pastelería como un pequeño ensayo comestible.",
    en: "A small Valencian room where coffee is treated as living matter and pastry as a small edible essay.",
    ja: "コーヒーを生きた素材、パティスリーを小さな食べるエッセイとして扱う、バレンシアの小さなサロン。",
  },
  hero_cta_menu: { es: "Explorar la carta", en: "Explore the menu", ja: "メニューを見る" },
  hero_cta_book: { es: "Reservar mesa →", en: "Book a table →", ja: "予約する →" },
  place_order: { es: "Hacer pedido", en: "Place your order", ja: "注文する" },

  // Sections
  specials_kicker: { es: "Especiales de hoy", en: "Today's Specials", ja: "本日のスペシャル" },
  specials_title: { es: "Signature del día", en: "Signature of the day", ja: "本日のシグネチャー" },
  signature_badge: { es: "signature", en: "signature", ja: "シグネチャー" },
  prev: { es: "Anterior", en: "Previous", ja: "前へ" },
  next: { es: "Siguiente", en: "Next", ja: "次へ" },
  regulars_kicker: { es: "Los habituales", en: "The Regulars", ja: "定番" },
  regulars_title: { es: "Básicos diarios · un solo toque", en: "Daily staples · quick tap", ja: "毎日の定番 · ワンタップ" },
  menu_kicker: { es: "La carta", en: "The Menu", ja: "メニュー" },
  menu_title: { es: "La carta", en: "Our menu", ja: "メニュー" },
  options_label: { es: "opciones", en: "options", ja: "オプション" },
  option_label: { es: "opción", en: "option", ja: "オプション" },
  gallery_kicker: { es: "Galería", en: "Gallery", ja: "ギャラリー" },
  gallery_title: { es: "Un pequeño diario visual", en: "A small visual diary", ja: "小さなビジュアル日記" },
  gal_pastry: { es: "Pastelería de autor", en: "Signature pastry", ja: "作家性のパティスリー" },
  gal_matcha: { es: "Matcha ceremonial · Uji", en: "Ceremonial matcha · Uji", ja: "儀式用抹茶 · 宇治" },
  gal_interior: { es: "Guillem Sorolla 29", en: "Guillem Sorolla 29", ja: "Guillem Sorolla 29" },
  gal_signature: { es: "La guinda del pastel", en: "The icing on top", ja: "仕上げの一品" },
  gal_croissant: { es: "Laminado 72 capas", en: "72-layer lamination", ja: "72層の折り込み" },
  gal_brioche: { es: "Brioche de pistacho", en: "Pistachio brioche", ja: "ピスタチオ ブリオッシュ" },
  venue_kicker: { es: "Visítanos", en: "Visit", ja: "訪問" },
  venue_addr2: { es: "46008 València · España", en: "46008 València · Spain", ja: "46008 バレンシア · スペイン" },
  mon_fri: { es: "Lun – Vie", en: "Mon – Fri", ja: "月 – 金" },
  sat_sun: { es: "Sáb – Dom", en: "Sat – Sun", ja: "土 – 日" },
  directions: { es: "Cómo llegar →", en: "Directions →", ja: "行き方 →" },
  open_maps: { es: "Abrir en Google Maps", en: "Open in Google Maps", ja: "Google マップで開く" },
  footer_addr: { es: "guillem sorolla 29 · valència · es", en: "guillem sorolla 29 · valència · es", ja: "guillem sorolla 29 · バレンシア · es" },
  footer_est: { es: "est · 2021", en: "est · 2021", ja: "創業 · 2021" },

  // Customizer
  customize: { es: "Personaliza", en: "Customize", ja: "カスタマイズ" },
  milk_label: { es: "Leche", en: "Milk", ja: "ミルク" },
  dietary_label: { es: "Dietético", en: "Dietary", ja: "食事対応" },
  addons_label: { es: "Extras", en: "Add-ons", ja: "追加" },
  subtotal: { es: "Subtotal", en: "Subtotal", ja: "小計" },
  add_to_order: { es: "Añadir al pedido", en: "Add to order", ja: "注文に追加" },

  // Cart / checkout
  your_order: { es: "Tu pedido", en: "Your order", ja: "ご注文" },
  collapse: { es: "Ocultar ▾", en: "Collapse ▾", ja: "閉じる ▾" },
  expand: { es: "Ver ▴", en: "Expand ▴", ja: "開く ▴" },
  checkout_btn: { es: "Finalizar", en: "Checkout", ja: "会計へ" },
  checkout_kicker: { es: "Finalizar", en: "Checkout", ja: "会計" },
  checkout_title: { es: "Casi tuyo", en: "Almost yours", ja: "もうすぐ完了" },
  checkout_sub: { es: "Recogida en barra o entrega en tu mesa.", en: "Pickup at the bar or drop-off at your table.", ja: "カウンター受取または席までお届け。" },
  name_label: { es: "Nombre", en: "Name", ja: "お名前" },
  name_ph: { es: "ej. María", en: "e.g. María", ja: "例: マリア" },
  table_label: { es: "Mesa (o vacío para barra)", en: "Table (or leave blank for bar)", ja: "テーブル(空欄でカウンター)" },
  table_ph: { es: "ej. 4", en: "e.g. 4", ja: "例: 4" },
  total: { es: "Total", en: "Total", ja: "合計" },
  send_bar: { es: "Enviar a la barra", en: "Send to bar", ja: "カウンターへ送信" },
  cancel: { es: "Cancelar", en: "Cancel", ja: "キャンセル" },

  // Confirm
  order_received: { es: "Pedido recibido", en: "Order received", ja: "注文受付" },
  thanks_pre: { es: "Gracias,", en: "Thank you,", ja: "ありがとう、" },
  thanks_post: { es: ". Lo estamos preparando.", en: ". We're preparing it now.", ja: "。ただいまご用意中です。" },
  done: { es: "Listo", en: "Done", ja: "完了" },
};

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "es",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");
  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("boketto-lang") as Lang | null) : null;
    if (stored && ["es", "en", "ja"].includes(stored)) setLangState(stored);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("boketto-lang", l);
  };
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  return useContext(LangCtx);
}

export function useT() {
  const { lang } = useContext(LangCtx);
  return (key: keyof typeof UI) => UI[key][lang];
}

export function tr(v: { es: string; en: string; ja: string }, lang: Lang) {
  return v[lang];
}

export function LanguageSwitcher({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { lang, setLang } = useLang();
  const langs: Lang[] = ["es", "en", "ja"];
  const labels: Record<Lang, string> = { es: "ES", en: "EN", ja: "日本" };
  const base = tone === "light"
    ? "text-[color:var(--primary-foreground)]"
    : "text-foreground";
  return (
    <div className={`inline-flex items-center gap-1 text-[10px] tracking-editorial uppercase ${base}`}>
      {langs.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-30">/</span>}
          <button
            onClick={() => setLang(l)}
            className={`transition-all px-1 ${
              lang === l
                ? "text-[color:var(--gold)] font-medium"
                : "opacity-50 hover:opacity-90"
            }`}
            aria-label={`Switch to ${labels[l]}`}
          >
            {labels[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
