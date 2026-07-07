import { createFileRoute, useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useStaffAuth } from "../lib/store";

type Search = { redirect?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  component: LoginPage,
});

function LoginPage() {
  const { authed, ready, signIn } = useStaffAuth();
  const navigate = useNavigate();
  const search = useSearch({ from: "/login" });
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (ready && authed) navigate({ to: search.redirect === "/kds" ? "/kds" : "/admin" });
  }, [ready, authed, navigate, search.redirect]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signIn(pw)) {
      navigate({ to: search.redirect === "/kds" ? "/kds" : "/admin" });
    } else {
      setErr("Incorrect password");
      setPw("");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-serif italic text-3xl">boketto</p>
          <p className="mt-2 text-[10px] tracking-editorial uppercase text-foreground/55">
            Staff access
          </p>
          <div className="hairline w-12 mx-auto mt-5" />
        </div>

        <form onSubmit={submit} className="glass-strong rounded-[28px] p-7">
          <label className="block">
            <span className="text-[10px] tracking-editorial uppercase text-foreground/55">Password</span>
            <input
              autoFocus
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setErr(""); }}
              className="mt-2 w-full glass rounded-2xl px-4 py-3 text-sm bg-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]"
            />
          </label>
          {err && <p className="mt-3 text-xs text-destructive">{err}</p>}
          <button
            type="submit"
            className="mt-6 w-full glass-dark shimmer press rounded-full py-3.5 text-xs tracking-editorial uppercase"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
