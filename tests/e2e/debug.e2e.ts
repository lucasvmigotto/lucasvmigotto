import { test, expect } from "@playwright/test";

test("debug: check console errors and page content", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => {
    errors.push(err.message);
  });

  await page.goto("/");
  await page.waitForTimeout(5000);
  
  console.log("Errors:", errors);
  console.log("Title:", await page.title());
  console.log("Body HTML:", await page.locator("body").innerHTML());
  
  const response = await page.request.get("/locales/pt-BR/translation.json");
  console.log("Locale fetch status:", response.status());
});