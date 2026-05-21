import { StripeMesh } from "./StripeMesh";

export function HeroMesh() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 top-[72px] overflow-hidden"
      aria-hidden
    >
      <div className="hero-mesh-css absolute inset-0 opacity-60" />
      <StripeMesh variant="hero-right" />
      <div className="absolute inset-x-0 top-0 z-[2] h-32 bg-gradient-to-b from-[var(--canvas)] to-transparent" />
    </div>
  );
}
