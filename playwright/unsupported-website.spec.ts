import { expect, test } from "./fixtures";

test.beforeEach("Set up userId", async ({ context, extensionId }) => {
  const page = await context.newPage();
  await page.goto(`chrome-extension://${extensionId}/options.html`);
  await page.evaluate(() => {
    chrome.storage.local.set({
      "settings.userId": "054176ae-96b0-440d-b234-6db9d5589279",
    });
  });
  await page.close();
});

test("Unsupported website", async ({ extensionId, page }) => {
  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  await expect(page.getByTestId("display-app-message")).toBeVisible();
});

test.afterEach("Set up userId", async ({ context, extensionId }) => {
  const page = await context.newPage();
  await page.goto(`chrome-extension://${extensionId}/options.html`);
  await page.evaluate(() => {
    chrome.storage.local.remove("settings.userId");
  });
  await page.close();
});
