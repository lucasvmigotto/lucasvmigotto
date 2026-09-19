import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("debug accessibility violations", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1000);

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  const criticalViolations = accessibilityScanResults.violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious"
  );

  console.log("Critical/Serious violations:", JSON.stringify(criticalViolations, null, 2));
  
  // Also check all violations
  console.log("All violations:", JSON.stringify(accessibilityScanResults.violations.map(v => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    help: v.help,
    nodes: v.nodes.length
  })), null, 2));
});