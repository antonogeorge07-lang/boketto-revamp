import { createFileRoute, Navigate, useSearch } from "@tanstack/react-router";

type Search = { redirect?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    redirect: typeof s.redirect === "string" && s.redirect.startsWith("/") ? s.redirect : undefined,
  }),
  component: LoginPage,
});

// Staff sign-in is handled by the real authentication screen at /auth.
// This route only forwards, so no credential ever lives in the frontend bundle.
function LoginPage() {
  const search = useSearch({ from: "/login" });
  return <Navigate to="/auth" search={{ next: search.redirect ?? "/admin" }} replace />;
}
