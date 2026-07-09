import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_venue_info",
  title: "Get venue info",
  description: "Return Boketto Specialty Coffee's address, hours, and contact info.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "Boketto Specialty Coffee",
      address: "Carrer de Guillem Sorolla 29, 46008 València, España",
      mapsUrl: "https://maps.app.goo.gl/",
      hours: {
        monday: "closed",
        tuesday: "08:30–18:00",
        wednesday: "08:30–18:00",
        thursday: "08:30–18:00",
        friday: "08:30–18:00",
        saturday: "09:00–18:30",
        sunday: "09:00–15:00",
      },
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
