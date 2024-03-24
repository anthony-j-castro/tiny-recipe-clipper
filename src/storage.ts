import { getLocalStorage, setLocalStorage } from "~/chrome-helpers";

const USER_ID_STORAGE_KEY = "settings.userId";

export const getUserId = () => getLocalStorage(USER_ID_STORAGE_KEY);

export const setUserId = (userId: string) => {
  setLocalStorage(USER_ID_STORAGE_KEY, userId);
};
