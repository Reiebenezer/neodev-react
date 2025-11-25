import Vector from '@reiebenezer/ts-utils/vector';
import { CANVAS_LIMIT } from './constants';

const keys: Record<string, number> = {};

export function uniqueKeyedString(prefix = 'key') {
  const val = prefix in keys ? ++keys[prefix] : 1;

  keys[prefix] = val;
  return `${prefix}${val}`;
}

export function relativeToCanvasOrigin(coords: Vector) {
  return coords.add(Vector.from(CANVAS_LIMIT / 2, CANVAS_LIMIT / 2));
}

export function cloneObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export function unfocusActiveElement() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}
