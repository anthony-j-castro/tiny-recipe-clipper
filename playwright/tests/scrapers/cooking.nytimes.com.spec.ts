import { expect, test } from "@playwright/test";
import TimesScraper from "~/content-scripts/recipe-scraper/scrapers/cooking.nytimes.com";

test.describe("cooking.nytimes.com", () => {
  test("parses a standard recipe", async ({ page }) => {
    await page.goto("https://cooking.nytimes.com/recipes/7131-salmon-burgers");

    const scraper = new TimesScraper({
      customExecuteInPageScope: <T>(instructions: () => T) =>
        page.evaluate(instructions),
    });

    const recipe = await scraper.load();

    expect(recipe.title).toBe("Salmon Burgers");
    expect(recipe.url).toBe(
      "https://cooking.nytimes.com/recipes/7131-salmon-burgers",
    );
  });
});
