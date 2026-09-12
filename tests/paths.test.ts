import assert from "node:assert/strict";
import { test } from "node:test";
import { withBasePath } from "../src/lib/paths.ts";

test("sin prefijo, la ruta no cambia", () => {
  assert.equal(withBasePath("/cv.pdf", ""), "/cv.pdf");
  assert.equal(withBasePath("/cv.pdf", undefined), "/cv.pdf");
});

test("con prefijo, lo antepone una sola vez", () => {
  assert.equal(withBasePath("/cv.pdf", "/portfolio"), "/portfolio/cv.pdf");
  assert.equal(withBasePath("/sleeve.jpg", "/portfolio"), "/portfolio/sleeve.jpg");
});

test("tolera la barra final del prefijo y la ausencia de barra inicial", () => {
  assert.equal(withBasePath("/cv.pdf", "/portfolio/"), "/portfolio/cv.pdf");
  assert.equal(withBasePath("cv.pdf", "/portfolio"), "/portfolio/cv.pdf");
});
