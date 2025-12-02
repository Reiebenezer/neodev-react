import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { BlockData, FrameData, Tool, TrimmedFrameData } from './types';

export interface PlaygroundContextProps {
  frames: FrameData[];
  updateFrame(id: string, data: TrimmedFrameData | ((prev: TrimmedFrameData) => TrimmedFrameData)): void;
  tool: Tool;
  setTool: Dispatch<SetStateAction<Tool>>;
  scale: number;
  selectedBlock?: BlockData;
  setSelectedBlock: Dispatch<SetStateAction<BlockData | undefined>>;
  focusedFrame: string;
  setFocusedFrame: Dispatch<SetStateAction<string>>;
  isDragging: boolean;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  resetTransform(): void;

  readonly isPreviewShown: boolean;
  readonly isInfoPanelShown: boolean;

  togglePreview(): void;
  toggleInfo(): void;
}

export const PlaygroundContext = createContext<PlaygroundContextProps | null>(null);