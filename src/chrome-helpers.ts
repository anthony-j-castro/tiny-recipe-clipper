import { Message } from "~/messages/types";

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
) => {
  chrome.action.setIcon({
    path: `/images/${icon}.png`,
    tabId,
  });
};

export const getLocalStorage = async (key: string) => {
  const data = await chrome.storage.local.get(key);

  return data[key];
};

export const setLocalStorage = (key: string, value: unknown) =>
  chrome.storage.local.set({ [key]: value });

export const getExtensionUrl = (path: string) => chrome.runtime.getURL(path);
