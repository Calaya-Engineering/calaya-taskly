/**
 * useSSE — lightweight Server-Sent Events hook.
 *
 * Opens a ReadableStream against `endpoint` (authenticated via fetchWithAuth)
 * and calls `onEvent(parsedData)` whenever a `data:` line arrives.
 * Automatically reconnects on drop using exponential back-off (up to 30 s).
 *
 * Usage
 * -----
 *   useSSE("/api/tasks/events", (ev) => {
 *     if (ev.type === "task:created") refetch();
 *   });
 */

import { useEffect, useRef } from "react";
import { fetchWithAuth } from "@/lib/api";

const INITIAL_DELAY = 2_000;
const MAX_DELAY = 30_000;

/**
 * @param {string} endpoint          – API path, e.g. "/api/tasks/events"
 * @param {(data: object) => void} onEvent – called for every non-ping SSE message
 * @param {boolean} [enabled=true]   – pass false to skip connecting (e.g. no token)
 */
export function useSSE(endpoint, onEvent, enabled = true) {
    const onEventRef = useRef(onEvent);
    useEffect(() => { onEventRef.current = onEvent; }, [onEvent]);

    useEffect(() => {
        if (!enabled) return;

        let cancelled = false;
        let delay = INITIAL_DELAY;
        let timeoutId = null;
        let currentReader = null;

        async function connect() {
            if (cancelled) return;
            try {
                const res = await fetchWithAuth(endpoint, {
                    headers: { Accept: "text/event-stream" },
                    timeoutMs: 0,
                });
                if (!res.ok || !res.body) throw new Error(`SSE ${res.status}`);

                delay = INITIAL_DELAY; // reset back-off on successful connect
                const reader = res.body.getReader();
                currentReader = reader;
                const decoder = new TextDecoder();
                let buf = "";

                while (!cancelled) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    buf += decoder.decode(value, { stream: true });
                    const parts = buf.split("\n\n");
                    buf = parts.pop() ?? "";
                    for (const part of parts) {
                        const m = part.match(/^data: (.+)$/m);
                        if (m) {
                            try {
                                const ev = JSON.parse(m[1]);
                                if (ev.type !== "ping") onEventRef.current(ev);
                            } catch { /* malformed JSON — ignore */ }
                        }
                    }
                }
            } catch {
                /* connection error — schedule reconnect */
            } finally {
                currentReader = null;
                if (!cancelled) {
                    timeoutId = setTimeout(() => {
                        delay = Math.min(delay * 2, MAX_DELAY);
                        connect();
                    }, delay);
                }
            }
        }

        connect();

        return () => {
            cancelled = true;
            if (timeoutId) clearTimeout(timeoutId);
            currentReader?.cancel().catch(() => { });
        };
    }, [endpoint, enabled]);
}
