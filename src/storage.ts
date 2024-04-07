import { getLocalStorage, setLocalStorage } from "~/chrome-helpers";

const USER_ID_STORAGE_KEY = "settings.userId";

export const getUserId = () => getLocalStorage(USER_ID_STORAGE_KEY);

export const setUserId = (userId: string) => {
  setLocalStorage(USER_ID_STORAGE_KEY, userId);
};

const ERROR_LOG_STORAGE_KEY = "logs.errors";

export const getErrorLog = () => getLocalStorage(ERROR_LOG_STORAGE_KEY);

export const setErrorLog = (errorLog: unknown) => {
  setLocalStorage(ERROR_LOG_STORAGE_KEY, errorLog);
};
