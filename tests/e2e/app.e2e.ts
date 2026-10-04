import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const LOCALES = ["", "en"] as const;

for (const locale of LOCALES) {
  const localeLabel = locale || "pt-BR";

  test.describe(`Locale: ${localeLabel}`, () => {
    test.beforeEach(async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });
      page.on("pageerror", (err) => {
        errors.push(err.message);
      });

      await page.goto(`/${locale}`);
      await page.waitForSelector("nav", { state: "visible", timeout: 30000 });
      await page.waitForSelector("#main-content", { state: "attached", timeout: 30000 });
      await page.waitForFunction(() => document.documentElement.lang.length > 0, { timeout: 10000 });
      await page.waitForFunction(() => document.title.length > 0, { timeout: 10000 });
    });

    test("page loads and has correct title", async ({ page }) => {
      await expect(page).toHaveTitle(/Lucas Vidor Migotto/);
    });

    test("has single h1 in hero", async ({ page }) => {
      const h1Count = await page.locator("h1").count();
      expect(h1Count).toBe(1);
    });

    test("navigation links work", async ({ page }) => {
      const sections = ["home", "about", "experience", "skills", "projects", "education", "contact"];

      for (const section of sections) {
        const link = page.locator(`nav a[href="#${section}"]`).first();
        await expect(link).toBeVisible();
        await link.click();
        await page.waitForTimeout(500);
        await expect(page.locator(`#${section}`)).toBeInViewport();
      }
    });

    test("language switcher toggles language", async ({ page }) => {
      const langSwitcher = page.locator('button:has-text("PT"), button:has-text("EN")').first();
      await expect(langSwitcher).toBeVisible();

      const initialLang = await page.locator("html").getAttribute("lang");
      await langSwitcher.click();
      await page.waitForFunction(
        (oldLang) => document.documentElement.lang !== oldLang,
        initialLang,
        { timeout: 10000 }
      );

      const newLang = await page.locator("html").getAttribute("lang");
      expect(newLang).not.toBe(initialLang);
    });

    test("resume PDF download triggers", async ({ page }) => {
      const downloadPromise = page.waitForEvent("download", { timeout: 30000 });
      const downloadBtn = page.locator('button:has-text("Download Resume"), button:has-text("Baixar Currículo")').first();
      await downloadBtn.click();
      const download = await downloadPromise;
      expect(download.suggestedFilename()).toMatch(/lucas-vidor-migotto-cv-/);
    });

    test("Projects section renders", async ({ page }) => {
      await page.locator("#projects").scrollIntoViewIfNeeded();
      await expect(page.locator("#projects")).toBeVisible({ timeout: 10000 });

      const projectCards = page.locator("#projects article");
      await expect(projectCards.first()).toBeVisible({ timeout: 10000 });
    });

    test("Projects filter/view code links work", async ({ page }) => {
      await page.locator("#projects").scrollIntoViewIfNeeded();

      const viewCodeLink = page
        .locator('#projects a[aria-label="View Code"], #projects a[aria-label="Ver Código"]')
        .first();
      await expect(viewCodeLink).toBeVisible({ timeout: 10000 });
      await expect(viewCodeLink).toHaveAttribute("target", "_blank");
      await expect(viewCodeLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    test("external links have correct attributes", async ({ page }) => {
      const externalLinks = page.locator('a[href^="http"]:not([href*="lucasvmigotto"])');
      const count = await externalLinks.count();

      for (let i = 0; i < count; i++) {
        const link = externalLinks.nth(i);
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      }
    });

    test("mobile nav hamburger works", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      await page.waitForSelector("nav", { state: "visible", timeout: 30000 });
      await page.waitForSelector("#main-content", { state: "attached", timeout: 30000 });

      const hamburger = page.locator('button[aria-label="Open menu"]');
      await expect(hamburger).toBeVisible({ timeout: 5000 });

      await hamburger.click();
      await expect(page.locator('button[aria-label="Close menu"]')).toBeVisible({ timeout: 1000 });

      const mobileNavLink = page.locator('.md\\:hidden a[href="#about"]').first();
      await expect(mobileNavLink).toBeVisible({ timeout: 1000 });
      await mobileNavLink.click();
      
      // Wait for menu to close and hamburger to reappear
      await expect(page.locator('button[aria-label="Open menu"]')).toBeVisible({ timeout: 3000 });
    });

    test("accessibility: no critical/serious violations", async ({ page }) => {
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1000);

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

      const criticalViolations = accessibilityScanResults.violations.filter(
        (v) => v.impact === "critical" || v.impact === "serious"
      );

      if (criticalViolations.length > 0) {
        console.log("Critical/Serious violations:", JSON.stringify(criticalViolations, null, 2));
      }

      expect(criticalViolations.length).toBe(0);
    });

    test("skip link works", async ({ page }) => {
      await page.keyboard.press("Tab");
      const skipLink = page.locator('a[href="#main-content"]');
      await expect(skipLink).toBeFocused({ timeout: 1000 });
    });
  });
}