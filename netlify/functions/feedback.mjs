/* Feedback inbox backed by Netlify Blobs.
   POST   /api/feedback        body: { user, page, section, category, message }
   GET    /api/feedback        -> { items: [{ key, ...entry }] }  (newest first)
   DELETE /api/feedback?key=…  -> resolve (remove) an entry */
import { getStore } from "@netlify/blobs";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

export default async (req) => {
  if (req.headers.get("x-fpqp-pin") !== (process.env.FPQP_PIN || "2026")) {
    return json({ error: "unauthorized" }, 401);
  }
  const store = getStore({ name: "fpqp-feedback", consistency: "strong" });

  if (req.method === "POST") {
    let body;
    try {
      body = await req.json();
    } catch {
      return json({ error: "bad json" }, 400);
    }
    const message = String(body.message || "").slice(0, 4000).trim();
    if (!message) return json({ error: "empty message" }, 400);
    const entry = {
      user: String(body.user || "?").slice(0, 40),
      page: String(body.page || "").slice(0, 120),
      section: String(body.section || "").slice(0, 200),
      category: String(body.category || "other").slice(0, 40),
      message,
      at: new Date().toISOString(),
    };
    // Sortable key: newest first when listed in reverse.
    const key = "fb-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
    await store.setJSON(key, entry);
    return json({ ok: true, key });
  }

  if (req.method === "GET") {
    const { blobs } = await store.list({ prefix: "fb-" });
    const keys = blobs.map((b) => b.key).sort().reverse().slice(0, 200);
    const items = await Promise.all(
      keys.map(async (key) => ({ key, ...(await store.get(key, { type: "json" })) }))
    );
    return json({ items });
  }

  if (req.method === "DELETE") {
    const key = new URL(req.url).searchParams.get("key") || "";
    if (!key.startsWith("fb-")) return json({ error: "bad key" }, 400);
    await store.delete(key);
    return json({ ok: true });
  }

  return json({ error: "method not allowed" }, 405);
};

export const config = { path: "/api/feedback" };
