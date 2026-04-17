import type { Color } from '@reiebenezer/ts-utils/color';
import Vector from '@reiebenezer/ts-utils/vector';
import type { CSSProperties } from 'react';
import type { Choice } from '~/lib/generics/properties/Choice';

export interface FrameData {
  id: string;
  label: string;
  blocks: BlockData[];
  position: Vector;
}

export interface TrimmedFrameData extends Omit<FrameData, 'id'> {}

export const blockTypes = ['tag', 'template', 'frame-instance', 'style'] as const;
export type BlockType = (typeof blockTypes)[number];

export interface BlockData {
  id: string;
  label: string;
  represents: (string & keyof HTMLElementTagNameMap) | 'frame';
  properties?: BlockProperties;
  type: BlockType;
}

export interface BlockProperties {
  text?: {
    content?: string;
    href?: string;
  };

  image?: {
    src?: string;
    alt?: string;
  };

  style?: MutableCSSProperties;
  referencedFrame?: string;
}

export type MutableCSSProperties = {
  -readonly [K in keyof CSSProperties]:
    | CSSProperties[K]
    | Choice<CSSProperties[K]>
    | Color
};

export const fontFamilies = ['Inter'] as const;

export const tools = ['move', 'hand'] as const;
export type Tool = (typeof tools)[number];
