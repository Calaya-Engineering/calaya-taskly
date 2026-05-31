import { AUTH_TOKEN_KEY } from "@/lib/auth-config";

type FetchWithAuthInit = RequestInit & {
  timeoutMs?: number;
};

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
  init?: FetchWithAuthInit
): Promise<Response> {
  const token = getToken();
  const headers = new Headers(init?.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const isEventStream =
    headers.get("Accept") === "text/event-stream" ||
    input.toString().endsWith("/events");
  const method = (init?.method || "GET").toUpperCase();
  // Reads fail fast; writes get a longer budget to avoid false timeouts on cold DB connections.
  // Generous GET budget: cold Prisma + badge aggregation + Cloudinary-backed APIs often exceed 15s on first hit.
  const defaultTimeoutMs = isEventStream ? 0 : method === "GET" ? 45000 : 45000;
  const timeoutMs = Math.max(0, init?.timeoutMs ?? defaultTimeoutMs);

  const controller = new AbortController();
  const upstreamSignal = init?.signal;

  if (upstreamSignal) {
    if (upstreamSignal.aborted) {
      controller.abort();
    } else {
      upstreamSignal.addEventListener("abort", () => controller.abort(), {
        once: true,
      });
    }
  }

  const timeoutId =
    timeoutMs > 0
      ? setTimeout(() => controller.abort(new Error("Request timeout")), timeoutMs)
      : null;

  try {
    return await fetch(input, {
      ...init,
      headers,
      signal: controller.signal,
    });
  } catch (error) {
    const timedOut = timeoutMs > 0 && controller.signal.aborted && !(upstreamSignal?.aborted);
    if (timedOut) {
      throw new Error("Request timeout");
    }
    throw error;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export async function readApiData<T = unknown>(response: Response): Promise<T> {
  const payload = await response.json();
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

/** Get the current auth token (for manual use). */
export { getToken as getAuthToken };
