import { test, expect } from "@playwright/test";

test("debug en locale: check console errors and page content", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => {
    errors.push(err.message);
  });

  await page.goto("/en");
  await page.waitForTimeout(10000);
  
  console.log("Errors:", errors);
  console.log("Title:", await page.title());
  console.log("Body HTML:", await page.locator("body").innerHTML());
  
  const response = await page.request.get("/locales/en/translation.json");
  console.log("Locale fetch status:", response.status());
  
  const responseResume = await page.request.get("/locales/en/resume.json");
  console.log("Resume fetch status:", responseResume.status());
});