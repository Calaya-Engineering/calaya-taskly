import { NextRequest, NextResponse } from "next/server";
import { getAuthFromRequest } from "@/lib/jwt";
import {
  subscribeRealtimeEvents,
  type RealtimeEvent,
} from "@/lib/realtime-events";
import { getRedis, REALTIME_STREAM_KEY } from "@/lib/upstash";

const POLL_INTERVAL_MS = 800;
const MAX_CONNECTION_MS = 20_000; // Close before Vercel's 25s limit; client auto-reconnects

/**
 * GET /api/realtime/events
 * Unified Server-Sent Events stream for all dashboard entities.
 *
 * When Upstash Redis is configured the route polls the shared Redis Stream so
 * every serverless instance sees every event regardless of which instance wrote
 * it.  Falls back to in-memory listeners for local dev.
 */
export async function GET(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const redis = getRedis();

  if (redis) {
    // ── Redis Stream mode ────────────────────────────────────────────────────
    const encoder = new TextEncoder();
    const lastEventId = req.headers.get("last-event-id") ?? "$";
    // If the client sends a Last-Event-ID we resume from that stream entry;
    // otherwise we start from "now" ($) so we don't replay history.
    let cursor = lastEventId === "$" ? "$" : lastEventId;

    const stream = new ReadableStream({
      async start(controller) {
        const send = (id: string, event: RealtimeEvent & { ts: number }) => {
          try {
            controller.enqueue(
              encoder.encode(
                `id: ${id}\ndata: ${JSON.stringify(event)}\n\n`
              )
            );
          } catch {
            // Client disconnected — enqueue will throw; ignore
          }
        };

        const deadline = Date.now() + MAX_CONNECTION_MS;

        while (!req.signal?.aborted && Date.now() < deadline) {
          try {
            // XREAD with a short block; REST API doesn't support blocking so we
            // poll manually instead.
            const results = await redis.xread(
              [{ key: REALTIME_STREAM_KEY, id: cursor }],
              { count: 50 }
            );

            if (results && results.length > 0) {
              for (const [, entries] of results as [string, [string, Record<string, string>][]][]) {
                for (const [entryId, fields] of entries) {
                  if (fields.data) {
                    try {
                      const event = JSON.parse(fields.data) as RealtimeEvent & {
                        ts: number;
                      };
                      send(entryId, event);
                    } catch {
                      // Malformed entry — skip
                    }
                  }
                  cursor = entryId;
                }
              }
            }
          } catch (e) {
            console.error("[sse] Redis XREAD error:", e);
          }

          // Wait before next poll (but abort immediately if client disconnects)
          await new Promise<void>((resolve) => {
            const t = setTimeout(resolve, POLL_INTERVAL_MS);
            req.signal?.addEventListener("abort", () => {
              clearTimeout(t);
              resolve();
            });
          });
        }

        // Send a reconnect hint so the client immediately re-establishes
        if (!req.signal?.aborted) {
          try {
            controller.enqueue(encoder.encode(": reconnect\n\n"));
          } catch {
            // ignore
          }
        }

        try {
          controller.close();
        } catch {
          // already closed
        }
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

  // ── In-memory fallback (local dev) ────────────────────────────────────────
  const encoder = new TextEncoder();
  let keepAliveId: ReturnType<typeof setInterval> | null = null;
  let unsubscribe: (() => void) | null = null;

  const stream = new ReadableStream({
    start(controller) {
      const send = (event: { type: string; [k: string]: unknown }) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        } catch {
          // Client disconnected
        }
      };

      unsubscribe = subscribeRealtimeEvents((event) => send(event));
      keepAliveId = setInterval(() => send({ type: "ping", ts: Date.now() }), 30_000);

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
