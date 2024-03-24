export const getCurrentTab = async () => {
  const [currentTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  return currentTab;
};

export const getLocalStorage = async (key: string) => {
  const data = await chrome.storage.local.get(key);

  return data[key];
};

export const setLocalStorage = (key: string, value: unknown) =>
  chrome.storage.local.set({ [key]: value });

export const getExtensionUrl = (path: string) => chrome.runtime.getURL(path);
