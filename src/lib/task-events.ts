/**
 * Simple in-memory pub/sub for real-time task events.
 * When tasks are created or assigned, subscribers receive updates.
 */
import { emitRealtimeEvent } from "@/lib/realtime-events";

export type TaskEvent =
  | { type: "task:created"; taskId: number }
  | { type: "task:assigned"; taskId: number; userId: number }
  | { type: "task:unassigned"; taskId: number; userId: number }
  | { type: "task:updated"; taskId: number }
  | { type: "task:escalated"; taskId: number };


type Listener = (event: TaskEvent) => void;

const listeners = new Set<Listener>();

export function subscribeTaskEvents(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function emitTaskEvent(event: TaskEvent): void {
  emitRealtimeEvent({
    type: event.type,
    entity: "task",
    action: event.type.split(":")[1] || "updated",
    entityId: event.taskId,
    payload: event as unknown as Record<string, unknown>,
  });

  listeners.forEach((fn) => {
    try {
      fn(event);
    } catch (e) {
      console.error("Task event listener error:", e);
    }
  });
}
