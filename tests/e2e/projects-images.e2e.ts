import { expect, test } from "@playwright/test";

test("project cards render images from projects.json", async ({ page }) => {
  await page.goto("/");
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await expect(page.locator("#projects article").first()).toBeVisible({ timeout: 15000 });

  const srcs = await page.locator("#projects article img").evaluateAll((imgs) =>
    imgs.map((i) => (i as HTMLImageElement).getAttribute("src")),
  );

  // eslint-disable-next-line no-console
  console.log("PROJECT_IMG_SRCS", JSON.stringify(srcs, null, 2));

  // Cards must use the absolute URLs declared in projects.json.
  expect(srcs.length).toBeGreaterThan(0);
  for (const src of srcs) {
    expect(src).toMatch(/^https:\/\/[a-z]+\.lucasvmigotto\.me\//);
  }
});
