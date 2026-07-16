import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Supabase parses the recovery token from the URL hash and emits
    // PASSWORD_RECOVERY. We simply allow the form to render once a session
    // (recovery or otherwise) is established, or immediately if the hash
    // indicates a recovery link.
    if (typeof window !== "undefined" && window.location.hash.includes("type=recovery")) {
      setReady(true);
    }
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setInfo(null);
    if (password.length < 6) { setErr("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setErr("Passwords do not match."); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { setErr(error.message); return; }
    setInfo("Password updated. Redirecting…");
    setTimeout(() => navigate({ to: "/auth" }), 1200);
  };

  return (
    <div className="min-h-screen grid place-items-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-serif italic text-3xl">boketto</p>
          <p className="mt-2 text-[10px] tracking-editorial uppercase text-foreground/55">
            Reset password
          </p>
          <div className="hairline w-12 mx-auto mt-5" />
        </div>

        <div className="glass-strong rounded-[28px] p-7 space-y-4">
          {!ready ? (
            <p className="text-xs text-foreground/70 text-center">
              Open this page from the password reset link in your email.
            </p>
          ) : (
            <form onSubmit={submit} className="space-y-3">
              <input
                type="password"
                required
                autoComplete="new-password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass rounded-2xl px-4 py-3 text-sm bg-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
              />
              <input
                type="password"
                required
                autoComplete="new-password"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full glass rounded-2xl px-4 py-3 text-sm bg-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
              />
              {err && <p className="text-xs text-destructive">{err}</p>}
              {info && <p className="text-xs text-foreground/70">{info}</p>}
              <button
                type="submit"
                disabled={busy}
                className="w-full glass-dark shimmer press rounded-full py-3.5 text-xs tracking-editorial uppercase disabled:opacity-50"
              >
                Update password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
