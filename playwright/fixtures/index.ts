import path from "path";
import { type BrowserContext, test as base, chromium } from "@playwright/test";
import { integer } from "decoders";

export const test = base.extend<{
  context: BrowserContext;
  customExecuteInPageScope: <T>(instructions: () => T) => Promise<T>;
  extensionId: string;
  gotoWithTabIdHelper: (url: string) => Promise<number>;
}>({
  // eslint-disable-next-line no-empty-pattern
  context: async ({}, use) => {
    const pathToExtension = path.join(__dirname, "../../dist");
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        "--headless=new",
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });

    await use(context);
    await context.close();
  },
  gotoWithTabIdHelper: async ({ context }, use) => {
    const page = await context.newPage();
    await page.goto(
      "https://tinyrecipebox.com/public/extension-test-initializer.html",
    );

    const success = page.locator('[data-testid="initialize-e2e-success"]');
    await success.waitFor();

    const fn = async (url: string) => {
      const response = await page.evaluate(
        async (url) =>
          new Promise((resolve) => {
            window.addEventListener(
              "message",
              (event) => {
                // If event.data is an object and has a type key, assume it has the
                // right shape.
                if (Object.prototype.hasOwnProperty.call(event.data, "type")) {
                  const type = event.data.type;
                  const sender = event.data.sender;
                  const tabId = event.data.payload?.tabId;
                  const openedUrl = event.data.payload?.url;

                  if (
                    type === "OPEN_URL_FOR_E2E_TEST_SUCCESS" &&
                    sender === "web-app" &&
                    openedUrl === url
                  ) {
                    resolve(tabId);
                  }
                }
              },
              false,
            );

            window.postMessage({
              type: "OPEN_URL_FOR_E2E_TEST",
              payload: { url },
              sender: "e2e-test",
            });
          }),
        url,
      );

      const tabId = integer.verify(response);

      return tabId;
    };
    await use(fn);
  },
  extensionId: async ({ context }, use) => {
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent("serviceworker");
    }

    const extensionId = background.url().split("/")[2];
    await use(extensionId);
  },
  customExecuteInPageScope: async ({ page }, use) => {
    const fn = <T>(instructions: () => T) => page.evaluate(instructions);
    await use(fn);
  },
});

export const expect = test.expect;
