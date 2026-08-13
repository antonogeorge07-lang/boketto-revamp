import { useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useStaffAuth } from "@/lib/store";

/**
 * Blocks rendering of staff-only screens until a real Supabase session has been
 * verified server-side as belonging to a staff/admin user.
 */
export function StaffGate({ children, redirectTo }: { children: ReactNode; redirectTo: string }) {
  const { ready, authed, isStaff } = useStaffAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ready) return;
    if (!authed) {
      navigate({ to: "/auth", search: { next: redirectTo }, replace: true });
    }
  }, [ready, authed, navigate, redirectTo]);

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center">
        <p className="text-[10px] tracking-editorial uppercase text-foreground/55">Verifying access…</p>
      </div>
    );
  }

  if (!authed) return null;

  if (!isStaff) {
    return (
      <div className="min-h-screen grid place-items-center px-6">
        <div className="glass-strong rounded-[28px] p-8 max-w-sm text-center">
          <p className="font-serif italic text-2xl">Restricted</p>
          <p className="mt-3 text-sm text-foreground/70">
            This screen is limited to Boketto staff. Ask the owner to grant your account staff access.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
