/* eslint-disable no-restricted-imports */
import TimesScraper from "~/content-scripts/recipe-scraper/scrapers/cooking.nytimes.com";
import { expect, test } from "../../fixtures";

test.describe("cooking.nytimes.com", () => {
  test("parses a standard recipe", async ({ page, recipeFixtures }) => {
    await page.goto("https://cooking.nytimes.com/recipes/7131-salmon-burgers");

    const scraper = new TimesScraper({
      customExecuteInPageScope: <T>(instructions: () => T) =>
        page.evaluate(instructions),
    });

    const recipe = await scraper.load();

    expect(recipe).toMatchObject(recipeFixtures.salmonBurgers);
  });
});
