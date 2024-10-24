import { expect, test } from "~/playwright/fixtures";
import bananaPudding from "~/playwright/fixtures/cooking.nytimes.com/banana-pudding.json";
import banoffeePie from "~/playwright/fixtures/cooking.nytimes.com/banoffee-pie.json";
import salmonBurgers from "~/playwright/fixtures/cooking.nytimes.com/salmon-burgers.json";
import TimesScraper from "~/src/content-scripts/recipe-scraper/scrapers/cooking.nytimes.com";

const testValues: Array<{
  fixture: unknown;
  testTitle: string;
  url: string;
}> = [
  {
    testTitle: "parses a standard recipe",
    url: "https://cooking.nytimes.com/recipes/7131-salmon-burgers",
    fixture: salmonBurgers,
  },
  {
    testTitle: "parses a recipe with 2 attributions",
    url: "https://cooking.nytimes.com/recipes/1023785-magnolia-bakerys-banana-pudding",
    fixture: bananaPudding,
  },
  {
    testTitle: "parses a recipe with 2 groups of ingredients",
    url: "https://cooking.nytimes.com/recipes/1020360-banoffee-pie",
    fixture: banoffeePie,
  },
];

for (const testValue of testValues) {
  test(testValue.testTitle, async ({ customExecuteInPageScope, page }) => {
    await page.goto(testValue.url);

    const scraper = new TimesScraper({
      customExecuteInPageScope,
    });

    const { recipe } = await scraper.load();

    expect(recipe).toEqual(testValue.fixture);
  });
}
