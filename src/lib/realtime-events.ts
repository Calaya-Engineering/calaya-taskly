/**
 * Unified pub/sub for app-wide real-time events.
 *
 * In production (UPSTASH_REDIS_REST_URL set): events are written to a Redis
 * Stream so every serverless function instance can receive them via the SSE
 * polling route — solving the in-memory isolation problem.
 *
 * In local dev (no Upstash env vars): falls back to the original in-memory
 * Set so the dev server still works without any external services.
 */

import { getRedis, REALTIME_STREAM_KEY, STREAM_MAXLEN } from "./upstash";

export type RealtimeEvent = {
  type: string;
  entity: string;
  action: string;
  entityId?: number | string;
  ts?: number;
  payload?: Record<string, unknown>;
};

type Listener = (event: RealtimeEvent & { ts: number }) => void;

// In-memory listeners — used as the local-dev fallback only.
const listeners = new Set<Listener>();

export function subscribeRealtimeEvents(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function emitRealtimeEvent(event: RealtimeEvent): void {
  const normalized = { ...event, ts: event.ts ?? Date.now() };

  const redis = getRedis();
  if (redis) {
    // Fire-and-forget to Redis Stream. All SSE connections poll this stream
    // regardless of which serverless instance handled the write.
    redis
      .xadd(
        REALTIME_STREAM_KEY,
        "*",
        { data: JSON.stringify(normalized) },
        { trim: { type: "MAXLEN", comparison: "~", threshold: STREAM_MAXLEN } }
      )
      .catch((e) => console.error("[realtime] Redis XADD error:", e));
    return;
  }

  // Local dev fallback: broadcast to in-memory listeners.
  listeners.forEach((fn) => {
    try {
      fn(normalized);
    } catch (e) {
      console.error("[realtime] Listener error:", e);
    }
  });
}
