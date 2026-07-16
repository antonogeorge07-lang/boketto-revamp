import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getMenu from "./tools/get-menu";
import getVenue from "./tools/get-venue";
import whoami from "./tools/whoami";

// The OAuth issuer must be the direct Supabase host — mcp-js validates the
// discovery document's issuer against this value. Read the project ref from a
// Vite-inlined env so it survives the published Worker runtime.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "boketto-mcp",
  title: "Boketto Specialty Coffee",
  version: "0.1.0",
  instructions:
    "Tools for Boketto Specialty Coffee (València). Use `get_menu` to browse the menu, `get_venue_info` for address and hours, and `whoami` to confirm the signed-in user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getMenu, getVenue, whoami],
});
