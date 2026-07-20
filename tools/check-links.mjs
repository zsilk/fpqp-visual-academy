#!/usr/bin/env node
/*
 * check-links.mjs — zero-dependency link & asset checker for the static site.
 *
 * Verifies, across every .html file in the repo:
 *   1. Local href/src targets (pages, css, js, images) actually exist on disk.
 *   2. Internal #anchors point at an id that exists in the target file.
 *   3. Pages listed in js/app.js's PAGES nav all exist.
 *
 * External (http/https/mailto/tel) and in-page "#" links are skipped.
 * Exits 1 if any problem is found so CI can fail the build.
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = normalize(join(dirname(fileURLToPath(import.meta.url)), ".."));
const problems = [];

function htmlFiles(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".html"))
    .map((f) => join(dir, f));
}

// Mirror of app.js slug(): app.js assigns id="sec-<slug>" to each <main> <h2>
// at runtime, so those anchors must be treated as valid even though they are
// not literal ids in the static HTML.
function slug(text) {
  return "sec-" + text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, "-");
}
function decodeEntities(s) {
  return s.replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

// Collect id/name anchors plus runtime heading slugs from a file, memoized.
const idCache = new Map();
function idsOf(file) {
  if (idCache.has(file)) return idCache.get(file);
  const set = new Set();
  if (existsSync(file)) {
    const html = readFileSync(file, "utf8");
    for (const m of html.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)) set.add(m[1]);
    for (const m of html.matchAll(/\bname\s*=\s*["']([^"']+)["']/g)) set.add(m[1]);
    // Runtime section anchors: every <h2> (except the self-quiz one) gets an id.
    for (const m of html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)) {
      const text = decodeEntities(m[1].replace(/<[^>]+>/g, "")).trim();
      if (/self-quiz/i.test(text)) continue;
      set.add(slug(text));
    }
  }
  idCache.set(file, set);
  return set;
}

function isExternal(url) {
  return /^(https?:|mailto:|tel:|data:|javascript:)/i.test(url);
}

function checkFile(file) {
  const html = readFileSync(file, "utf8");
  const refs = [
    ...html.matchAll(/\bhref\s*=\s*["']([^"']+)["']/g),
    ...html.matchAll(/\bsrc\s*=\s*["']([^"']+)["']/g),
  ].map((m) => m[1]);

  for (const raw of refs) {
    const ref = raw.trim();
    if (!ref || isExternal(ref) || ref === "#") continue;

    const [pathPart, anchor] = ref.split("#");
    let targetFile = file; // pure "#anchor" → same file

    if (pathPart) {
      targetFile = normalize(join(root, pathPart));
      if (!existsSync(targetFile)) {
        problems.push(`${rel(file)} → missing target: ${ref}`);
        continue;
      }
      if (statSync(targetFile).isDirectory()) continue;
    }

    if (anchor && !idsOf(targetFile).has(anchor)) {
      problems.push(`${rel(file)} → missing anchor #${anchor} in ${rel(targetFile)}`);
    }
  }
}

// Nav integrity: every page referenced in PAGES should exist.
function checkNav() {
  const appJs = join(root, "js", "app.js");
  if (!existsSync(appJs)) return;
  const src = readFileSync(appJs, "utf8");
  const block = src.match(/const PAGES\s*=\s*\[([\s\S]*?)\];/);
  if (!block) return;
  for (const m of block[1].matchAll(/["']([^"']+\.html)["']/g)) {
    const page = m[1];
    if (!existsSync(join(root, page))) {
      problems.push(`js/app.js PAGES → nav points to missing page: ${page}`);
    }
  }
}

const rel = (f) => f.replace(root + "/", "");

const files = htmlFiles(root);
files.forEach(checkFile);
checkNav();

if (problems.length) {
  console.error(`\n✖ ${problems.length} link problem(s) found:\n`);
  problems.forEach((p) => console.error("  - " + p));
  console.error("");
  process.exit(1);
} else {
  console.log(`✔ Checked ${files.length} HTML files — all links, anchors, and nav targets resolve.`);
}
