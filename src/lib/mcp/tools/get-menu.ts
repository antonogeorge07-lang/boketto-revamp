import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

// Boketto's menu is currently held client-side in src/lib/store.tsx.
// This tool returns a curated snapshot suitable for AI clients that want to
// answer questions like "what's on the menu today?".
const MENU = [
  { id: "tarta-nohirita", name: "Tarta Nohirita", category: "bakery", price: 5.8, description: "Pera caramelizada sobre crema de pistacho siciliano, base de sablé bretón.", featured: true },
  { id: "galleta-valenciana", name: "Galleta Valenciana", category: "bakery", price: 4.6, description: "Galleta de mantequilla con crema de naranja de València torcheada.", featured: true },
  { id: "rollo-canela", name: "Rollo de Canela", category: "bakery", price: 4.9, description: "Masa laminada de canela con anacardos caramelizados y glaseado de cardamomo.", featured: true },
  { id: "bokematcha-classic", name: "Bokematcha Classic", category: "bokematchas", price: 4.5, description: "Matcha ceremonial batido con leche fría.", featured: false },
  { id: "espresso", name: "Espresso", category: "coffee", price: 2.0, description: "Espresso de tueste especialidad.", featured: false },
  { id: "cortado", name: "Cortado", category: "coffee", price: 2.4, description: "Espresso cortado con leche caliente.", featured: false },
  { id: "flat-white", name: "Flat White", category: "coffee", price: 3.2, description: "Doble ristretto con microfoam.", featured: false },
];

export default defineTool({
  name: "get_menu",
  title: "Get menu",
  description: "Return Boketto's current menu. Optionally filter by category (bakery, bokematchas, coffee, brunch) or featured specials only.",
  inputSchema: {
    category: z.enum(["bakery", "bokematchas", "coffee", "brunch"]).optional().describe("Filter by category."),
    featuredOnly: z.boolean().optional().describe("Only return today's specials."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, featuredOnly }) => {
    let items = MENU;
    if (category) items = items.filter((i) => i.category === category);
    if (featuredOnly) items = items.filter((i) => i.featured);
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { items },
    };
  },
});
