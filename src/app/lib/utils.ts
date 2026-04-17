const keys: Record<string, string[]> = {};
let lastProducedKey = '';

export function uniqueKeyedString(prefix = 'key') {
  let key = Math.random().toString().substring(2, 10);

  while (prefix in keys && keys[prefix].includes(lastProducedKey)) {
    key = Math.random().toString().substring(2, 10);
  }

  lastProducedKey = key;

  return `${prefix}${key}`;
}

export function getLastKeyedString(prefix = 'key') {
  return `${prefix}${lastProducedKey}`;
}

export function cloneObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export function unfocusActiveElement() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}

/**
 * Source - https://stackoverflow.com/a
 * Posted by SudoPlz, modified by community. See post 'Timeline' for change history
 * Retrieved 2025-12-01, License - CC BY-SA 4.0
 */
export function colorIsDarkAdvanced(bgColor: string): boolean {
  const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  const uicolors = [r / 255, g / 255, b / 255];
  const c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  let L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L <= 0.179;
}
