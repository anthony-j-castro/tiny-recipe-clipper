import { Message } from "~/messages/types";

const NO_TAB_ERROR_REGEX = /^No tab with id:/;

export const getTab = async (tabId: number) => chrome.tabs.get(tabId);

export const getCurrentTab = async ({
  focused,
}: { focused?: boolean } = {}) => {
  const [currentTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
    lastFocusedWindow: focused,
  });

  return currentTab;
};

export const createEmptyTab = () => chrome.tabs.create({ active: false });

export const setTabUrl = (tabId: number, url: string) =>
  chrome.tabs.update(tabId, {
    active: true,
    url,
  });

export const sendMessageToServiceWorker = (message: Message) =>
  chrome.runtime.sendMessage(message);

export const sendMessageToTab = (tabId: number, message: Message) =>
  chrome.tabs.sendMessage(tabId, message);

export const setExtensionIcon = (
  tabId: number,
  icon: "active-icon" | "inactive-icon",
) =>
  chrome.action.setIcon(
    {
      path: `/images/${icon}.png`,
      tabId,
    },
    () => {
      const error = chrome.runtime.lastError;

      if (error !== undefined) {
        // It's possible that a tab no longer exists when we try
        // to set the icon, so we expect that error to exist here.
        if (error.message !== undefined) {
          if (!NO_TAB_ERROR_REGEX.test(error.message)) {
            // eslint-disable-next-line no-console
            console.error(error.message);
          }
        } else {
          // eslint-disable-next-line no-console
          console.error("Unknown chrome.runtime.lastError occurred.");
        }
      }
    },
  );

export const getLocalStorage = async (key: string) => {
  const data = await chrome.storage.local.get(key);

  return data[key];
};

export const setLocalStorage = (key: string, value: unknown) =>
  chrome.storage.local.set({ [key]: value });

export const getExtensionUrl = (path: string) => chrome.runtime.getURL(path);
