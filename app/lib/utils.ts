const keys: Record<string, number> = {};

export function uniqueKeyedString(prefix = 'key') {
  const val = prefix in keys ? ++keys[prefix] : 1;

  keys[prefix] = val;
  return `${prefix}${val}`;
}

export function cloneObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export function unfocusActiveElement() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}
