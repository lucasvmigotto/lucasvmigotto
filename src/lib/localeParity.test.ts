import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const NAMESPACES = ["translation", "resume", "projects"] as const;

function loadLocale(locale: string, ns: string) {
  const path = join(process.cwd(), "public", "locales", locale, `${ns}.json`);
  return JSON.parse(readFileSync(path, "utf-8"));
}

function getAllKeys(obj: Record<string, unknown>, prefix = ""): Set<string> {
  const keys = new Set<string>();
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    keys.add(fullKey);
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const nestedKeys = getAllKeys(value as Record<string, unknown>, fullKey);
      for (const nk of nestedKeys) keys.add(nk);
    }
  }
  return keys;
}

describe("Locale key parity", () => {
  for (const ns of NAMESPACES) {
    test(`${ns}.json has identical keys in en and pt-BR`, () => {
      const enKeys = getAllKeys(loadLocale("en", ns));
      const ptBrKeys = getAllKeys(loadLocale("pt-BR", ns));

      const missingInPtBr = [...enKeys].filter((k) => !ptBrKeys.has(k));
      const missingInEn = [...ptBrKeys].filter((k) => !enKeys.has(k));

      expect(missingInPtBr).toEqual([]);
      expect(missingInEn).toEqual([]);
    });
  }
});
