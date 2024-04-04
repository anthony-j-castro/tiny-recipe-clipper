import { expect, test } from "~/playwright/fixtures";
import TimesScraper from "~/src/content-scripts/recipe-scraper/scrapers/cooking.nytimes.com";

test.describe("cooking.nytimes.com", () => {
  test("parses a standard recipe", async ({
    customExecuteInPageScope,
    page,
    recipeFixtures,
  }) => {
    await page.goto("https://cooking.nytimes.com/recipes/7131-salmon-burgers");

    const scraper = new TimesScraper({
      customExecuteInPageScope,
    });

    const recipe = await scraper.load();

    expect(recipe).toEqual(recipeFixtures.salmonBurgers);
  });

  test("parses a recipe with 2 attributions", async ({
    customExecuteInPageScope,
    page,
    recipeFixtures,
  }) => {
    await page.goto(
      "https://cooking.nytimes.com/recipes/1023785-magnolia-bakerys-banana-pudding",
    );

    const scraper = new TimesScraper({
      customExecuteInPageScope,
    });

    const recipe = await scraper.load();

    expect(recipe).toEqual(recipeFixtures.bananaPudding);
  });
});
