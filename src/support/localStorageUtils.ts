/**
 * Determine if the user's browser API supports
 * local storage.
 */
const localStorageSupported = (): boolean => {
  return typeof window["localStorage"] != "undefined" && window["localStorage"] != null;
};

/**
 * Persist a key-value pair into local storage.
 *
 * @param key
 * @param value
 */
export const setLocalStorageItem = (key: string, value: any): void => {
  if (localStorageSupported()) {
    localStorage.setItem(key, value);
  }
};

/**
 * Retrieve a specific value from local storage.
 *
 * @param key
 */
export const getLocalStorageItem = (key: string): any => {
  return localStorageSupported() ? localStorage.getItem(key) : null;
};

/**
 * Remove a specific value from local storage.
 *
 * @param key
 */
export const removeLocalStorageItem = (key: string): void => {
  if (localStorageSupported()) {
    localStorage.removeItem(key);
  }
};

/**
 * Remove all values from local storage.
 */
export const clearLocalStorage = (): void => {
  if (localStorageSupported()) {
    localStorage.clear();
  }
};
