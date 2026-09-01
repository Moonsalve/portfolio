import assert from "node:assert/strict";
import { test } from "node:test";
import { parseAcceptLanguage } from "../src/i18n/acceptLanguage.ts";

test("respeta el orden por calidad, no el orden de aparición", () => {
  assert.equal(parseAcceptLanguage("en;q=0.4,es;q=0.9"), "es");
  assert.equal(parseAcceptLanguage("es;q=0.3,en;q=0.8"), "en");
});

test("sin q explícita, el primero vale 1", () => {
  assert.equal(parseAcceptLanguage("en-US,en;q=0.9,es;q=0.8"), "en");
  assert.equal(parseAcceptLanguage("es-CO,es;q=0.9,en;q=0.5"), "es");
});

test("ignora la región y compara solo el idioma base", () => {
  assert.equal(parseAcceptLanguage("es-419"), "es");
  assert.equal(parseAcceptLanguage("en-GB"), "en");
});

test("salta idiomas no soportados hasta encontrar uno que sí", () => {
  assert.equal(parseAcceptLanguage("fr-FR,fr;q=0.9,en;q=0.4"), "en");
  assert.equal(parseAcceptLanguage("de,ja;q=0.7"), "es");
});

test("descarta entradas con q=0, que significan 'no quiero este idioma'", () => {
  assert.equal(parseAcceptLanguage("en;q=0,es;q=0.1"), "es");
});

test("cae al idioma por defecto ante ausencia o basura", () => {
  assert.equal(parseAcceptLanguage(null), "es");
  assert.equal(parseAcceptLanguage(""), "es");
  assert.equal(parseAcceptLanguage("*"), "es");
  assert.equal(parseAcceptLanguage("en;q=abc"), "es");
});
