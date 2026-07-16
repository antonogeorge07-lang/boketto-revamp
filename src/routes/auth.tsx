import { createFileRoute, redirect, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

type Search = { next?: string };

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    next: typeof s.next === "string" && s.next.startsWith("/") ? s.next : undefined,
  }),
  component: AuthPage,
});

function AuthPage() {
  const { next } = useSearch({ from: "/auth" });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const forgotPassword = async () => {
    setErr(null);
    setInfo(null);
    if (!email) { setErr("Enter your email above, then tap Forgot password."); return; }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });
    setBusy(false);
    if (error) setErr(error.message);
    else setInfo("Password reset email sent. Check your inbox.");
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: next ?? "/" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: next ?? "/" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, next]);

  const signInGoogle = async () => {
    setErr(null);
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/auth" + (next ? `?next=${encodeURIComponent(next)}` : ""),
    });
    if (result.error) {
      setErr(result.error.message ?? "Google sign-in failed");
      setBusy(false);
    }
  };

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    const fn = mode === "signin"
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + "/auth" + (next ? `?next=${encodeURIComponent(next)}` : ""),
          },
        });
    const { error } = await fn;
    if (error) setErr(error.message);
    setBusy(false);
  };

  return (
    <div className="min-h-screen grid place-items-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-serif italic text-3xl">boketto</p>
          <p className="mt-2 text-[10px] tracking-editorial uppercase text-foreground/55">
            {mode === "signin" ? "Sign in" : "Create account"}
          </p>
          <div className="hairline w-12 mx-auto mt-5" />
        </div>

        <div className="glass-strong rounded-[28px] p-7 space-y-4">
          <button
            onClick={signInGoogle}
            disabled={busy}
            className="w-full glass press rounded-full py-3 text-xs tracking-editorial uppercase disabled:opacity-50"
          >
            Continue with Google
          </button>

          <div className="flex items-center gap-3 text-[10px] tracking-editorial uppercase text-foreground/40">
            <div className="flex-1 h-px bg-foreground/10" />
            or
            <div className="flex-1 h-px bg-foreground/10" />
          </div>

          <form onSubmit={submitEmail} className="space-y-3">
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full glass rounded-2xl px-4 py-3 text-sm bg-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
            />
            <input
              type="password"
              required
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full glass rounded-2xl px-4 py-3 text-sm bg-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
            />
            {err && <p className="text-xs text-destructive">{err}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full glass-dark shimmer press rounded-full py-3.5 text-xs tracking-editorial uppercase disabled:opacity-50"
            >
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <button
            onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setErr(null); }}
            className="w-full text-[10px] tracking-editorial uppercase text-foreground/55 hover:text-foreground"
          >
            {mode === "signin" ? "Create an account" : "Have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
