/** Shared motion / animation constants used across the site. */

/** Default ease curve — a smooth overshoot that most reveal animations use. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Common "fade-up" initial state for Framer Motion. */
export const FADE_UP_INITIAL = { opacity: 0, y: 24 } as const;

/** Common "fade-up" animate state for Framer Motion. */
export const FADE_UP_ANIMATE = { opacity: 1, y: 0 } as const;

/** Standard viewport trigger settings. */
export const VIEWPORT_ONCE = { once: true, margin: "-80px" } as const;

/** Shorthand transition preset: 0.7 s ease-out reveal. */
export const REVEAL_TRANSITION = { duration: 0.7, ease: EASE_OUT } as const;
