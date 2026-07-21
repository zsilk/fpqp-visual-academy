/* Per-user progress storage backed by Netlify Blobs.
   GET  /api/state?user=bluffman         -> { data, updatedAt }
   PUT  /api/state?user=bluffman  body: { data, updatedAt }
   Strong consistency so a save is immediately visible on the next read
   (eventual consistency was the classic cause of "my progress didn't save"). */
import { getStore } from "@netlify/blobs";

const USERS = new Set(["bluffman", "rhaley"]);

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

export default async (req) => {
  if (req.headers.get("x-fpqp-pin") !== (process.env.FPQP_PIN || "2026")) {
    return json({ error: "unauthorized" }, 401);
  }
  const user = (new URL(req.url).searchParams.get("user") || "").toLowerCase();
  if (!USERS.has(user)) return json({ error: "unknown user" }, 400);

  const store = getStore({ name: "fpqp-progress", consistency: "strong" });
  const key = "state-" + user;

  if (req.method === "GET") {
    const cur = await store.get(key, { type: "json" });
    return json(cur || { data: {}, updatedAt: 0 });
  }

  if (req.method === "PUT") {
    let body;
    try {
      body = await req.json();
    } catch {
      return json({ error: "bad json" }, 400);
    }
    if (!body || typeof body.data !== "object" || body.data === null) {
      return json({ error: "missing data" }, 400);
    }
    // Last-write-wins with a stale-write guard: if the server copy is newer
    // (edited from another device), hand it back instead of clobbering it.
    const cur = await store.get(key, { type: "json" });
    const updatedAt = Number(body.updatedAt) || Date.now();
    if (cur && Number(cur.updatedAt) > updatedAt) return json(cur, 409);
    await store.setJSON(key, { data: body.data, updatedAt });
    return json({ ok: true, updatedAt });
  }

  return json({ error: "method not allowed" }, 405);
};

export const config = { path: "/api/state" };
