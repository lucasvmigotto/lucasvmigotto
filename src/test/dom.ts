import { GlobalWindow } from "happy-dom";

const window = new GlobalWindow();

Object.defineProperty(globalThis, "window", { value: window, writable: true });
Object.defineProperty(globalThis, "document", { value: window.document, writable: true });

for (const key of [
  "navigator",
  "HTMLElement",
  "HTMLAnchorElement",
  "HTMLButtonElement",
  "HTMLDivElement",
  "SVGElement",
  "Element",
  "Node",
  "CustomEvent",
  "Event",
  "IntersectionObserver",
  "MutationObserver",
  "getComputedStyle",
  "requestAnimationFrame",
  "cancelAnimationFrame",
] as const) {
  const value = window[key as keyof typeof window];
  if (typeof value !== "undefined") {
    (globalThis as Record<string, unknown>)[key] = value;
  }
}

Object.defineProperty(globalThis, "matchMedia", {
  value: window.matchMedia.bind(window),
  writable: true,
});

Object.defineProperty(globalThis, "URL", { value: window.URL, writable: true });
Object.defineProperty(globalThis, "Blob", { value: window.Blob, writable: true });

(globalThis as Record<string, unknown>)["__APP_VERSION__"] = "test";
