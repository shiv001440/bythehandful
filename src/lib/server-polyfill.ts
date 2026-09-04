/**
 * Server-side Runtime Polyfills
 *
 * Polyfills native WebSocket in Node.js < 22 runtimes for @supabase/supabase-js.
 */
import WebSocket from "ws";

if (typeof globalThis.WebSocket === "undefined") {
  globalThis.WebSocket = WebSocket as unknown as typeof globalThis.WebSocket;
}
