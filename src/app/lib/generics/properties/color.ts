import type { Color } from "@reiebenezer/ts-utils/color";

export default function isColor(colorOrNot: any): colorOrNot is JSONColorValue {
  return !!colorOrNot && colorOrNot.__colorType__ === true;
} 

export interface JSONColorValue {
  value: string;
  __colorType__: true;
}