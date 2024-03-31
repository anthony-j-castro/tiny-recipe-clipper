import { Message } from "~/messages/types";

export const getCurrentTab = async () => {
  const [currentTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  return currentTab;
};

export const createEmptyTab = () => chrome.tabs.create({ active: false });

export const setTabUrl = (tabId: number, url: string) =>
  chrome.tabs.update(tabId, {
    active: true,
    url,
  });

export const sendMessageToBackground = (message: Message) =>
  chrome.runtime.sendMessage(message);

export const getLocalStorage = async (key: string) => {
  const data = await chrome.storage.local.get(key);

  return data[key];
};

export const setLocalStorage = (key: string, value: unknown) =>
  chrome.storage.local.set({ [key]: value });

export const getExtensionUrl = (path: string) => chrome.runtime.getURL(path);
