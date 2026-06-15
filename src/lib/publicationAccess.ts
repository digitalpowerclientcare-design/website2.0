const STORAGE_KEY = "o3xs-publication-access-v2";

export type PublicationAccessGrant = {
  token: string;
  grantedAt: string;
};

type AccessStore = Record<string, PublicationAccessGrant>;

function readStore(): AccessStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as AccessStore;
  } catch {
    return {};
  }
}

function writeStore(store: AccessStore): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function generatePublicationAccessToken(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function storePublicationAccessGrant(
  publicationId: string,
  token: string,
): void {
  const store = readStore();
  store[publicationId] = {
    token,
    grantedAt: new Date().toISOString(),
  };
  writeStore(store);
}

export function getPublicationAccessGrant(
  publicationId: string,
): PublicationAccessGrant | null {
  return readStore()[publicationId] ?? null;
}

export function validatePublicationAccessToken(
  publicationId: string,
  token: string | null | undefined,
): boolean {
  if (!token) return false;
  const grant = getPublicationAccessGrant(publicationId);
  return grant?.token === token;
}

export function hasPublicationAccess(publicationId: string): boolean {
  return getPublicationAccessGrant(publicationId) !== null;
}
