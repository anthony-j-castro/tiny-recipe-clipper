import {
  createEmptyTab,
  getCurrentTab,
  getTab,
  setExtensionIcon,
  setTabUrl,
} from "~/chrome-helpers";
import config from "~/config";
import {
  receivableServiceWorkerMessageDecoder,
  recipeImporterReadyMessageDecoder,
} from "~/messages/decoders";
import type { SendResponseFn } from "~/messages/types";
import exceptionLogger from "~/service-worker/exception-logger";
import { setUserId } from "~/storage";
import assertIsError from "~/utils/assertIsError";
import isRecipePage from "~/utils/isRecipePage";

const WEB_APP_URL = new URL(config.WEB_APP.ORIGIN);

chrome.runtime.onMessage.addListener(async (rawMessage) => {
  try {
    const message = receivableServiceWorkerMessageDecoder.verify(rawMessage);

    switch (message.type) {
      case "LOG_INFO": {
        exceptionLogger.info(
          message.payload.message,
          message.payload.properties,
        );

        break;
      }

      case "SEND_RECIPE_DATA": {
        const tab = await createEmptyTab();

        const newTabListener = (
          newTabRawMessage: unknown,
          newTabSender: chrome.runtime.MessageSender,
          sendResponse: SendResponseFn,
        ) => {
          const readyMessage =
            recipeImporterReadyMessageDecoder.value(newTabRawMessage);

          if (
            readyMessage !== undefined &&
            tab.id !== undefined &&
            newTabSender.tab?.id === tab.id
          ) {
            const { recipe } = message.payload;

            sendResponse({
              type: "RECIPE_DATA",
              sender: "service-worker",
              payload: { recipe },
            });

            chrome.runtime.onMessageExternal.removeListener(newTabListener);
          }
        };

        if (tab.id) {
          chrome.runtime.onMessageExternal.addListener(newTabListener);

          setTabUrl(
            tab.id,
            `${config.WEB_APP.ORIGIN}${config.WEB_APP.IMPORT_RECIPE_PATH}?enabled=true`,
          );
        }

        break;
      }
    }
  } catch (error) {
    assertIsError(error);
    exceptionLogger.error(error.message);
  }
});

chrome.runtime.onMessageExternal.addListener(
  (rawMessage, sender, sendResponse: SendResponseFn) => {
    try {
      if (sender.origin !== WEB_APP_URL.origin) {
        throw new Error("Unknown sender origin.");
      }

      const message = receivableServiceWorkerMessageDecoder.verify(rawMessage);

      switch (message.type) {
        case "PING": {
          setUserId(message.payload.userId);

          sendResponse({
            type: "PONG",
            sender: "service-worker",
            payload: { extensionVersion: config.VERSION },
          });

          break;
        }
      }
    } catch (error) {
      assertIsError(error);
      exceptionLogger.error(error.message);
    }
  },
);

// Messages used in E2E tests
chrome.runtime.onMessageExternal.addListener(
  async (rawMessage, sender, sendResponse: SendResponseFn) => {
    try {
      if (config.ENVIRONMENT !== "test") {
        return;
      }

      if (sender.origin !== WEB_APP_URL.origin) {
        throw new Error("Unknown sender origin.");
      }

      const message = receivableServiceWorkerMessageDecoder.verify(rawMessage);

      switch (message.type) {
        case "OPEN_URL_FOR_E2E_TEST": {
          const tab = await createEmptyTab();

          if (tab.id) {
            setTabUrl(tab.id, message.payload.url);

            sendResponse({
              type: "OPEN_URL_FOR_E2E_TEST_SUCCESS",
              payload: {
                tabId: tab.id,
              },
              sender: "service-worker",
            });
          } else {
            sendResponse({
              type: "OPEN_URL_FOR_E2E_TEST_FAILURE",
              sender: "service-worker",
            });
          }

          break;
        }

        case "SET_USER_ID_FOR_E2E_TEST": {
          setUserId(message.payload.userId);

          sendResponse({
            type: "SET_USER_ID_FOR_E2E_TEST_SUCCESS",
            sender: "service-worker",
          });

          break;
        }
      }
    } catch (error) {
      assertIsError(error);
      exceptionLogger.error(error.message);
    }
  },
);

const updateExtensionIcon = (tab: chrome.tabs.Tab) => {
  if (!tab.id) {
    return;
  }

  if (tab.url && isRecipePage(tab.url)) {
    setExtensionIcon(tab.id, "active-icon");

    return;
  }

  setExtensionIcon(tab.id, "inactive-icon");
};

chrome.tabs.onCreated.addListener((tab) => {
  updateExtensionIcon(tab);
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await getTab(activeInfo.tabId);
  updateExtensionIcon(tab);
});

chrome.tabs.onUpdated.addListener((_tabId, _changeInfo, tab) => {
  if (tab.active) {
    updateExtensionIcon(tab);
  }
});

chrome.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId !== chrome.windows.WINDOW_ID_NONE) {
    const tab = await getCurrentTab({ focused: true });
    updateExtensionIcon(tab);
  }
});

const setIconsOnStartup = async () => {
  const tabs = await chrome.tabs.query({
    active: true,
  });

  tabs.forEach((tab) => {
    updateExtensionIcon(tab);
  });
};

chrome.runtime.onInstalled.addListener(setIconsOnStartup);

chrome.runtime.onStartup.addListener(setIconsOnStartup);
