/**
 * A clean abstraction layer for client-side storage using LocalStorage.
 * Designed to satisfy the 'Data Handling' module requirement for EasyBiz.
 */

const getStorageKey = (key: string) => `easybiz_${key}`;

export const saveData = <T>(key: string, data: T): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    const serializedData = JSON.stringify(data);
    localStorage.setItem(getStorageKey(key), serializedData);
    return true;
  } catch (error) {
    console.error('Error saving data to local storage', error);
    return false;
  }
};

export const getData = <T>(key: string, defaultValue: T): T => {
  try {
    if (typeof window === 'undefined') return defaultValue;
    const serializedData = localStorage.getItem(getStorageKey(key));
    if (serializedData === null) {
      return defaultValue;
    }
    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error('Error retrieving data from local storage', error);
    return defaultValue;
  }
};

export const updateData = <T extends Record<string, any>>(key: string, dataUpdates: Partial<T>): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    const currentData = getData<T>(key, {} as T);
    const updatedData = { ...currentData, ...dataUpdates };
    return saveData(key, updatedData);
  } catch (error) {
    console.error('Error updating data in local storage', error);
    return false;
  }
};

export const deleteData = (key: string): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    localStorage.removeItem(getStorageKey(key));
    return true;
  } catch (error) {
    console.error('Error deleting data from local storage', error);
    return false;
  }
};
