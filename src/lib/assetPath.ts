/** Prefix public asset paths when built for GitHub Pages subpath hosting. */
export function assetPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const useBasePath =
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_CUSTOM_DOMAIN !== "true";
  const base = useBasePath ? "/website2.0" : "";
  return `${base}${normalized}`;
}
