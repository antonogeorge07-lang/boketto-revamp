import type { Lang } from "./i18n";

type Tri = { es: string; en: string; ja: string };
type ProductI18n = { name: Tri; origin: Tri; desc: Tri };

const PRODUCTS: Record<string, ProductI18n> = {
  "flat-white": {
    name: { es: "Flat White", en: "Flat White", ja: "フラットホワイト" },
    origin: { es: "Etiopía Sidamo", en: "Ethiopia Sidamo", ja: "エチオピア シダモ" },
    desc: {
      es: "Doble shot ristretto sobre leche emulsionada sedosa de una sola pasada. Textura microespuma.",
      en: "Double ristretto over silky, single-pour steamed milk. Microfoam texture.",
      ja: "リストレット・ダブルショットにシルキーなスチームミルク。マイクロフォーム。",
    },
  },
  v60: {
    name: { es: "V60 Origami", en: "V60 Origami", ja: "V60 オリガミ" },
    origin: { es: "Etiopía Guji · lavado", en: "Ethiopia Guji · washed", ja: "エチオピア グジ · ウォッシュド" },
    desc: {
      es: "Filtrado artesanal en cerámica, 15g / 250ml. Notas florales, cítricas y té negro al final.",
      en: "Hand-poured ceramic filter, 15g / 250ml. Floral, citrus notes with a black-tea finish.",
      ja: "セラミックでハンドドリップ、15g / 250ml。花・柑橘、余韻は紅茶。",
    },
  },
  "iced-v60": {
    name: { es: "Iced V60", en: "Iced V60", ja: "アイス V60" },
    origin: { es: "Colombia Huila · natural", en: "Colombia Huila · natural", ja: "コロンビア ウイラ · ナチュラル" },
    desc: {
      es: "Filtrado sobre hielo. Cuerpo limpio, acidez balanceada, retrogusto a frutos rojos.",
      en: "Poured over ice. Clean body, balanced acidity, red-fruit aftertaste.",
      ja: "氷上抽出。クリーンな口当たり、バランスの取れた酸味、赤い果実の余韻。",
    },
  },
  matcha: {
    name: { es: "Green Flag Matcha", en: "Green Flag Matcha", ja: "グリーンフラッグ抹茶" },
    origin: { es: "Uji, Kioto", en: "Uji, Kyoto", ja: "宇治, 京都" },
    desc: {
      es: "Matcha ceremonial batido a mano. Notas vegetales, umami largo, sin dulzor añadido.",
      en: "Ceremonial matcha whisked by hand. Vegetal notes, long umami, no added sugar.",
      ja: "手点ての儀式用抹茶。植物的な香り、長い旨味、無糖。",
    },
  },
  "pistacho-rosas": {
    name: { es: "Bizcocho de Pistacho", en: "Pistachio Cake", ja: "ピスタチオケーキ" },
    origin: { es: "Con agua de rosas de Damasco", en: "With Damascus rose water", ja: "ダマスクローズウォーター使用" },
    desc: {
      es: "Bizcocho húmedo de pistacho siciliano, perfumado con agua de rosas. Glaseado mate.",
      en: "Moist Sicilian pistachio cake, perfumed with rose water. Matte glaze.",
      ja: "しっとりしたシチリア産ピスタチオのケーキ、ローズウォーターの香り。マットな艶。",
    },
  },
  "brioche-pistacho": {
    name: { es: "Brioche de Pistacho", en: "Pistachio Brioche", ja: "ピスタチオ ブリオッシュ" },
    origin: { es: "Fermentación 24h · masa madre", en: "24h ferment · sourdough", ja: "24時間発酵 · サワードウ" },
    desc: {
      es: "Brioche laminado relleno al momento de crema de pistacho. Servir templado.",
      en: "Laminated brioche filled to order with pistachio cream. Serve warm.",
      ja: "折り込みブリオッシュに注文毎にピスタチオクリーム。温めて。",
    },
  },
  croissant: {
    name: { es: "Croissant de Mantequilla", en: "Butter Croissant", ja: "バタークロワッサン" },
    origin: { es: "Beurre AOP Charentes", en: "Beurre AOP Charentes", ja: "AOP シャラント産バター" },
    desc: {
      es: "Laminado a tres vueltas, 72 capas. Corteza fina, miga aireada, aroma a mantequilla noisette.",
      en: "Three-turn lamination, 72 layers. Thin crust, airy crumb, noisette butter aroma.",
      ja: "三つ折り、72層。薄いクラスト、軽やかな内相、ノワゼットバターの香り。",
    },
  },
  "pain-choc": {
    name: { es: "Pain au Chocolat", en: "Pain au Chocolat", ja: "パン・オ・ショコラ" },
    origin: { es: "Chocolate Valrhona 70%", en: "Valrhona 70% chocolate", ja: "ヴァローナ 70% チョコレート" },
    desc: {
      es: "Dos barras de chocolate negro dentro de masa laminada. Crujiente por fuera, tierno dentro.",
      en: "Two dark chocolate batons in laminated dough. Crisp outside, tender inside.",
      ja: "折り込み生地にダークチョコレートを二本。外は軽く、中はしっとり。",
    },
  },
  tostada: {
    name: { es: "Tostada de Aguacate", en: "Avocado Toast", ja: "アボカドトースト" },
    origin: { es: "Pan de masa madre 48h", en: "48h sourdough bread", ja: "48時間発酵サワードウ" },
    desc: {
      es: "Aguacate, aceite de oliva virgen extra picual, ralladura de limón, escamas de sal.",
      en: "Avocado, picual extra virgin olive oil, lemon zest, salt flakes.",
      ja: "アボカド、ピクアル種EVOO、レモンの皮、塩フレーク。",
    },
  },
  granola: {
    name: { es: "Granola de la Casa", en: "House Granola", ja: "自家製グラノーラ" },
    origin: { es: "Con yogur griego colado", en: "With strained Greek yogurt", ja: "水切りギリシャヨーグルト添え" },
    desc: {
      es: "Avena tostada con miel de azahar, frutos secos, semillas y frutas de temporada.",
      en: "Toasted oats with orange-blossom honey, nuts, seeds and seasonal fruit.",
      ja: "オレンジフラワー蜂蜜のグラノーラ、ナッツ、種、季節のフルーツ。",
    },
  },
};

const MODIFIERS: Record<string, Tri> = {
  oat: { es: "Leche de avena barista", en: "Barista oat milk", ja: "バリスタオーツミルク" },
  crunch: { es: "Extra crujiente de pistacho", en: "Extra pistachio crunch", ja: "追加ピスタチオクランチ" },
  egg: { es: "Huevo poché", en: "Poached egg", ja: "ポーチドエッグ" },
  salmon: { es: "Salmón noruego marinado", en: "Cured Norwegian salmon", ja: "ノルウェー産マリネサーモン" },
};

export function tProduct(id: string, field: "name" | "origin" | "desc", lang: Lang, fallback: string) {
  return PRODUCTS[id]?.[field]?.[lang] ?? fallback;
}

export function tModifier(id: string, lang: Lang, fallback: string) {
  return MODIFIERS[id]?.[lang] ?? fallback;
}
