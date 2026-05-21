"use client";

export function AmbientShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="home-page relative">
      <div
        className="noise-overlay pointer-events-none fixed inset-0 z-[100] mix-blend-multiply"
        aria-hidden
      />
      {children}
    </div>
  );
}
