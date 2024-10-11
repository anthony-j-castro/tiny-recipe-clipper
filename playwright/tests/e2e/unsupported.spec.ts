import { expect, test } from "~/playwright/fixtures";

test("displays an unsupported message", async ({
  context,
  extensionId,
  gotoWithTabIdHelper,
}) => {
  const recipeUrl = "https://www.google.com/";

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
    extensionPopupPage.getByTestId("unsupported-site-message"),
  ).toBeVisible();
});
