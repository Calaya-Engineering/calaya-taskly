/**
 * Unified in-memory pub/sub for app-wide real-time events.
 * Used by all write APIs so dashboards can subscribe once.
 */

export type RealtimeEvent = {
  type: string;
  entity: string;
  action: string;
  entityId?: number | string;
  ts?: number;
  payload?: Record<string, unknown>;
};

type Listener = (event: RealtimeEvent & { ts: number }) => void;

const listeners = new Set<Listener>();

export function subscribeRealtimeEvents(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function emitRealtimeEvent(event: RealtimeEvent): void {
  const normalized = { ...event, ts: event.ts ?? Date.now() };
  listeners.forEach((fn) => {
    try {
      fn(normalized);
    } catch (e) {
      console.error("Realtime event listener error:", e);
    }
  });
}

