import path from "path";
import { type BrowserContext, test as base, chromium } from "@playwright/test";
import bananaPudding from "~/playwright/fixtures/cooking.nytimes.com/banana-pudding.json";
import salmonBurgers from "~/playwright/fixtures/cooking.nytimes.com/salmon-burgers.json";

export const test = base.extend<{
  context: BrowserContext;
  customExecuteInPageScope: <T>(instructions: () => T) => Promise<T>;
  extensionId: string;
  recipeFixtures: {
    bananaPudding: typeof bananaPudding;
    salmonBurgers: typeof salmonBurgers;
  };
}>({
  // eslint-disable-next-line no-empty-pattern
  context: async ({}, use) => {
    const pathToExtension = path.join(__dirname, "../dist");
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
  recipeFixtures: {
    bananaPudding,
    salmonBurgers,
  },
});

export const expect = test.expect;
