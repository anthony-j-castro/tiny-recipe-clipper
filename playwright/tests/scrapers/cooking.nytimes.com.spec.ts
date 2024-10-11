import { expect, test } from "~/playwright/fixtures";
import bananaPudding from "~/playwright/fixtures/cooking.nytimes.com/banana-pudding.json";
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
];

testValues.forEach((testValue) => {
  test(testValue.testTitle, async ({ customExecuteInPageScope, page }) => {
    await page.goto(testValue.url);

    const scraper = new TimesScraper({
      customExecuteInPageScope,
    });

    const recipe = await scraper.load();

    expect(recipe).toEqual(testValue.fixture);
  });
});

test("open page", async ({ context, extensionId, gotoWithTabIdHelper }) => {
  const recipeUrl = "https://cooking.nytimes.com/recipes/7131-salmon-burgers";

  const newTabPromise = context.waitForEvent("page");

  const tabId = await gotoWithTabIdHelper(recipeUrl);

  const newTab = await newTabPromise;
  await newTab.waitForURL(recipeUrl);
  await newTab.waitForLoadState();

  const extensionPopupPage = await context.newPage();
  await extensionPopupPage.goto(
    `chrome-extension://${extensionId}/popup.html?active-tab-id=${tabId}`,
  );

  await expect(
    extensionPopupPage.locator('[data-testid="recipe-title"]'),
  ).toHaveText("Salmon Burgers");
});
