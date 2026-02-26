import { NextRequest, NextResponse } from "next/server";
import { subscribeAnnouncementEvents } from "@/lib/announcement-events";
import { getAuthFromRequest } from "@/lib/jwt";

/**
 * GET /api/announcements/events - Server-Sent Events stream for real-time announcement updates.
 * Clients connect and receive events when announcements are created/updated/deleted.
 * Requires Bearer token.
 */
export async function GET(req: NextRequest) {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const encoder = new TextEncoder();
    let keepAliveId: ReturnType<typeof setInterval> | null = null;
    let unsubscribe: (() => void) | null = null;

    const stream = new ReadableStream({
        start(controller) {
            const send = (event: { type: string;[k: string]: unknown }) => {
                try {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
                } catch {
                    // Client disconnected
                }
            };

            unsubscribe = subscribeAnnouncementEvents((event) => send(event));

            keepAliveId = setInterval(() => send({ type: "ping", ts: Date.now() }), 30000);

            req.signal?.addEventListener("abort", () => {
                if (keepAliveId) clearInterval(keepAliveId);
                unsubscribe?.();
                controller.close();
            });
        },
        cancel() {
            if (keepAliveId) clearInterval(keepAliveId);
            unsubscribe?.();
        },
    });

    return new NextResponse(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
        },
    });
}
