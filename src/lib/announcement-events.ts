import { emitRealtimeEvent } from "@/lib/realtime-events";

export type AnnouncementEvent =
    | { type: "announcement:created"; announcementId: number }
    | { type: "announcement:updated"; announcementId: number }
    | { type: "announcement:deleted"; announcementId: number };

type Listener = (event: AnnouncementEvent) => void;

const listeners = new Set<Listener>();

export function subscribeAnnouncementEvents(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export function emitAnnouncementEvent(event: AnnouncementEvent): void {
    emitRealtimeEvent({
        type: event.type,
        entity: "announcement",
        action: event.type.split(":")[1] || "updated",
        entityId: event.announcementId,
        payload: event as unknown as Record<string, unknown>,
    });

    listeners.forEach((fn) => {
        try {
            fn(event);
        } catch (e) {
            console.error("Announcement event listener error:", e);
        }
    });
}
