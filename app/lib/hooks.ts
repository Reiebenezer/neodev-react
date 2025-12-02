import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

/**
 * The useStorage hook allows for access to the local storage.
 * Listens to changes to specific local storage key and updates values appropriately
 */
export function useStorage<T extends string | undefined>(key: string): [T, Dispatch<SetStateAction<T>>];
export function useStorage<T extends string>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>];
export function useStorage<T extends string | undefined>(key: string, defaultValue?: T) {
  const [val, setVal] = useState(() => {
    if (!localStorage)
      throw new Error(
        'useStorage cannot be used in server context where localStorage might not be defined.'
      );

    return localStorage.getItem(key) ?? defaultValue;
  });

  useEffect(() => {
    function handleStorageChange(e: StorageEvent) {
      setVal(localStorage.getItem(key) ?? defaultValue);
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (val === null) localStorage.removeItem(key);
    localStorage.setItem(key, val!);

  }, [val]);

  if (defaultValue) {
    return [val!, setVal as Dispatch<SetStateAction<string>>];
  }

  return [val, setVal] as const;
}

/** For debugging purposes. Automatic console logging of hooks. Uses useEffect */
export function useInspect<T>(hook: T, producer = (hook: T): any => hook) {
  useEffect(() => console.log(producer(hook)), [hook]);
}