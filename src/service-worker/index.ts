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
import { Message } from "~/messages/types";
import { setUserId } from "~/storage";
import isRecipePage from "~/utils/isRecipePage";

const WEB_APP_URL = new URL(config.WEB_APP.ORIGIN);

chrome.runtime.onMessage.addListener(async (rawMessage) => {
  try {
    const message = receivableServiceWorkerMessageDecoder.verify(rawMessage);

    switch (message.type) {
      case "SEND_RECIPE_DATA": {
        const tab = await createEmptyTab();

        const newTabListener = (
          newTabRawMessage: unknown,
          newTabSender: chrome.runtime.MessageSender,
          sendResponse: (message: Message) => void,
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
    // eslint-disable-next-line no-console
    console.error(error);
  }
});

chrome.runtime.onMessageExternal.addListener(
  (rawMessage, sender, sendResponse) => {
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
            extensionVersion: config.VERSION,
          });

          break;
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
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
