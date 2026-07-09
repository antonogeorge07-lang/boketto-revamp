import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// TanStack Router escapes literal dots with [.] so the URL becomes
// /.lovable/oauth/consent — the path Supabase redirects to for consent.
export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      const next = location.pathname + location.searchStr;
      throw redirect({ to: "/auth", search: { next } });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyAuth = (supabase.auth as any).oauth;
    const { data, error } = await anyAuth.getAuthorizationDetails(authorizationId);
    if (error) throw error;
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) {
      window.location.href = immediate;
      return data;
    }
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center px-6">
      <div className="glass-strong rounded-[28px] p-7 max-w-md text-center">
        <p className="font-serif text-2xl italic">Authorization error</p>
        <p className="mt-3 text-sm text-foreground/70">
          {String((error as Error)?.message ?? error)}
        </p>
      </div>
    </div>
  ),
});

function Consent() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const details = Route.useLoaderData() as any;
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  const decide = async (approve: boolean) => {
    setBusy(true);
    setError(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyAuth = (supabase.auth as any).oauth;
    const { data, error } = approve
      ? await anyAuth.approveAuthorization(authorization_id)
      : await anyAuth.denyAuthorization(authorization_id);
    if (error) {
      setBusy(false);
      setError(error.message ?? "Authorization failed");
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  };

  const clientName = details?.client?.name ?? details?.client?.client_name ?? "an app";
  const redirectUri = details?.client?.redirect_uri ?? details?.client?.redirect_uris?.[0];

  return (
    <div className="min-h-screen grid place-items-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <p className="font-serif italic text-3xl">boketto</p>
          <p className="mt-2 text-[10px] tracking-editorial uppercase text-foreground/55">
            Authorize connection
          </p>
          <div className="hairline w-12 mx-auto mt-4" />
        </div>

        <div className="glass-strong rounded-[28px] p-7 space-y-5">
          <div>
            <p className="font-serif text-2xl italic leading-tight">
              Connect {clientName} to your Boketto account
            </p>
            <p className="mt-3 text-sm text-foreground/70">
              This lets <span className="font-medium">{clientName}</span> use Boketto tools as you.
            </p>
          </div>

          {email && (
            <div className="glass rounded-2xl px-4 py-3">
              <p className="text-[10px] tracking-editorial uppercase text-foreground/50">Signed in as</p>
              <p className="text-sm mt-1">{email}</p>
            </div>
          )}

          {redirectUri && (
            <div className="glass rounded-2xl px-4 py-3">
              <p className="text-[10px] tracking-editorial uppercase text-foreground/50">Redirect</p>
              <p className="text-xs mt-1 break-all font-mono text-foreground/70">{redirectUri}</p>
            </div>
          )}

          <p className="text-xs text-foreground/60">
            This does not bypass Boketto's own permissions or backend policies.
          </p>

          {error && <p role="alert" className="text-xs text-destructive">{error}</p>}

          <div className="flex gap-2">
            <button
              disabled={busy}
              onClick={() => decide(false)}
              className="flex-1 glass press rounded-full py-3 text-xs tracking-editorial uppercase disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              disabled={busy}
              onClick={() => decide(true)}
              className="flex-1 glass-dark shimmer press rounded-full py-3 text-xs tracking-editorial uppercase disabled:opacity-50"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
