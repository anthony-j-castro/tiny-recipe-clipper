import { expect, test } from "~/playwright/fixtures";

test("detects a recipe", async ({
  context,
  extensionId,
  gotoWithTabIdHelper,
}) => {
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
