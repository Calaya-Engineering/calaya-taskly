import { AUTH_TOKEN_KEY } from "@/lib/auth-config";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Fetch with Bearer token attached when user is logged in.
 * Use for all authenticated API requests.
 */
export async function fetchWithAuth(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const token = getToken();
  const headers = new Headers(init?.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(input, {
    ...init,
    headers,
  });
}

/** Get the current auth token (for manual use). */
export { getToken as getAuthToken };
