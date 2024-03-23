export const getLocalStorage = async (key: string) => {
  const data = await chrome.storage.local.get(key);

  return data[key];
};

export const getExtensionUrl = (path: string) => chrome.runtime.getURL(path);
