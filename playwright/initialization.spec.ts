import { expect, test } from "./fixtures";

test("popup page", async ({ extensionId, page }) => {
  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  await expect(page.getByTestId("initialization-message")).toContainText(
    "Finish setting up this extension by syncing with the web app.",
  );
});
