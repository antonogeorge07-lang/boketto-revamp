import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Server-verified staff check. The caller's bearer token is validated by
 * requireSupabaseAuth, then the role is read through RLS (users can only
 * read their own rows), so the answer can never be forged by the client.
 */
export const getStaffStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);

    if (error) throw new Error("Unable to verify staff access");

    const roles = (data ?? []).map((r) => r.role as string);
    return {
      userId: context.userId,
      isStaff: roles.includes("staff") || roles.includes("admin"),
      isAdmin: roles.includes("admin"),
    };
  });
