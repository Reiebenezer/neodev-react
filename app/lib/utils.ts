const keys: Record<string, string[]> = {};

export function uniqueKeyedString(prefix = 'key') {
  let val = Math.random().toString().substring(2, 10);

  while (prefix in keys && keys[prefix].includes(val)) {
    val = Math.random().toString().substring(2, 10);
  }

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
