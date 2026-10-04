import { expect, test } from "@playwright/test";

test("project cards render images from projects.json", async ({ page }) => {
  await page.goto("/");
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await expect(page.locator("#projects article").first()).toBeVisible({ timeout: 15000 });

  const srcs = await page.locator("#projects article img").evaluateAll((imgs) =>
    imgs.map((i) => (i as HTMLImageElement).getAttribute("src")),
  );

  // Cards must use the absolute URLs declared in projects.json.
  expect(srcs.length).toBeGreaterThan(0);
  for (const src of srcs) {
    expect(src).toMatch(/^https:\/\/[a-z]+\.lucasvmigotto\.me\//);
  }

  // Every card image must actually load (naturalWidth > 0) — not just point
  // at a valid-looking URL. Lazy images are scrolled into view first.
  const imgs = page.locator("#projects article img");
  const count = await imgs.count();
  for (let i = 0; i < count; i++) {
    const img = imgs.nth(i);
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(async () => img.evaluate((el) => (el as HTMLImageElement).naturalWidth), {
        timeout: 15000,
      })
      .toBeGreaterThan(0);
  }
});
