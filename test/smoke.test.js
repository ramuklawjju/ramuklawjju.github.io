// Smoke tests for the static site. Runs with Node's built-in test runner.
// Verifies every HTML page contains the production-grade boilerplate the
// CI relies on (DOCTYPE, viewport, charset, title, accessible nav, etc.).
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import assert from "node:assert/strict";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const htmlFiles = readdirSync(root).filter((f) => f.endsWith(".html"));

const NAV_PAGES = [
  "home.html",
  "about.html",
  "skill.html",
  "portfolio.html",
  "education.html",
  "blog.html",
  "contact.html",
];

const requireDocBoilerplate = (html, file) => {
  assert.match(html, /<!doctype html>/i, `${file} missing DOCTYPE`);
  assert.match(html, /<html lang="en">/i, `${file} missing lang attribute`);
  assert.match(html, /<meta charset="UTF-8"/i, `${file} missing charset`);
  assert.match(html, /<meta name="viewport"/i, `${file} missing viewport meta`);
  assert.match(html, /<title>[^<]+<\/title>/i, `${file} missing or empty title`);
};

for (const file of htmlFiles) {
  test(`${file} has production HTML boilerplate`, () => {
    const html = readFileSync(join(root, file), "utf8");
    requireDocBoilerplate(html, file);
  });

  test(`${file} has no <img> tags missing alt attributes`, () => {
    const html = readFileSync(join(root, file), "utf8");
    const imgs = html.match(/<img\b[^>]*>/gi) ?? [];
    for (const img of imgs) {
      assert.match(img, /\salt=/i, `${file} has <img> without alt: ${img}`);
    }
  });

  test(`${file} has no duplicate id attributes`, () => {
    const html = readFileSync(join(root, file), "utf8");
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    const seen = new Set();
    for (const id of ids) {
      assert.ok(!seen.has(id), `${file} has duplicate id="${id}"`);
      seen.add(id);
    }
  });

  test(`${file} only uses target="_blank" with rel="noopener"`, () => {
    const html = readFileSync(join(root, file), "utf8");
    const anchors = html.match(/<a\b[^>]*target="_blank"[^>]*>/gi) ?? [];
    for (const a of anchors) {
      assert.match(a, /rel="[^"]*noopener[^"]*"/i, `${file} has target="_blank" without rel="noopener": ${a}`);
    }
  });
}

const navPages = htmlFiles.filter((f) => !["wanderlitt.html"].includes(f));
for (const file of navPages) {
  test(`${file} dock nav links to every primary page`, () => {
    const html = readFileSync(join(root, file), "utf8");
    for (const target of NAV_PAGES) {
      assert.match(html, new RegExp(`href="${target}"`), `${file} dock is missing link to ${target}`);
    }
  });
}

test("index.html boots the YouTube background script", () => {
  const html = readFileSync(join(root, "index.html"), "utf8");
  assert.match(html, /src="js\/index\.js"/);
  assert.match(html, /src="js\/jquery\.min\.js"/);
});

test("contact form posts via POST and includes a submit button", () => {
  const html = readFileSync(join(root, "contact.html"), "utf8");
  assert.match(html, /method="POST"/i);
  assert.match(html, /type="submit"/i);
});

test("404 page exists for GitHub Pages", () => {
  assert.ok(htmlFiles.includes("404.html"), "404.html is required for GitHub Pages");
});
