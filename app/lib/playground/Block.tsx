import { useContext, type HTMLProps } from "react";
import type { BlockData, BlockProperties } from "./context/types";
import { uniqueKeyedString } from "../utils";
import { PlaygroundContext } from "./context";

export default function Block({ id, label, represents, ref, properties, ...props }: BlockData & HTMLProps<HTMLDivElement>) {
  const context = useContext(PlaygroundContext);

  const renderContents = () => {
    if (isFrameInstanceBlock(id)) {
      return <>Instance of <span className={`px-1 py-0.5 ${context?.focusedFrame === properties?.referencedFrame ? 'bg-violet-500' : 'bg-amber-500'}`}>{context?.frames.find(f => f.id === properties?.referencedFrame)?.label}</span></>
    }

    if (isTemplateBlock(id) || !(properties?.text?.content)) return label;
    return (properties.text.content.length > 20 ? `${properties.text.content.slice(0, 20)}...` : properties.text.content);
  }

  return (
    <div
      {...props}
      ref={ref}
      data-id={id}
      className={`p-4 border border-gray-600 rounded-lg min-w-64 ${props.className}`}
    >
      {renderContents()}
      {/* {id} */}
    </div>
  );
}

export function createBlock(label: string, represents: string & keyof HTMLElementTagNameMap, properties?: BlockProperties): BlockData {
  return {
    id: uniqueKeyedString(label),
    label,
    represents,
    properties
  };
}

export function createTemplateBlock(label: string, represents: string & keyof HTMLElementTagNameMap, properties?: BlockProperties): BlockData {
  return {
    id: `${label}-template`,
    label,
    represents,
    properties
  };
}

export function createFrameInstanceBlock(frameId: string, frameLabel: string): BlockData {
  return {
    id: `${frameId}-instance`,
    label: `Instance of ${frameLabel}`,
    represents: 'frame',
    properties: {
      referencedFrame: frameId
    }
  }
}

export function isTemplateBlock(block: BlockData): boolean;
export function isTemplateBlock(blockId: string): boolean;
export function isTemplateBlock(block: BlockData | string): boolean {
  return (typeof block === 'string' ? block : block.id).endsWith('template');
}

export function isFrameInstanceBlock(block: BlockData): boolean;
export function isFrameInstanceBlock(blockId: string): boolean;
export function isFrameInstanceBlock(block: BlockData | string): boolean {
  return (typeof block === 'string' ? block : block.id).endsWith('instance');
}