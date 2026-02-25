/**
 * Simple in-memory pub/sub for real-time task events.
 * When tasks are created or assigned, subscribers receive updates.
 */

export type TaskEvent =
  | { type: "task:created"; taskId: number }
  | { type: "task:assigned"; taskId: number; userId: number }
  | { type: "task:unassigned"; taskId: number; userId: number }
  | { type: "task:updated"; taskId: number };

type Listener = (event: TaskEvent) => void;

const listeners = new Set<Listener>();

export function subscribeTaskEvents(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function emitTaskEvent(event: TaskEvent): void {
  listeners.forEach((fn) => {
    try {
      fn(event);
    } catch (e) {
      console.error("Task event listener error:", e);
    }
  });
}
