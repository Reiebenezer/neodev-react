import { useContext, useMemo, type HTMLProps } from "react";
import type { BlockData, BlockProperties, MutableCSSProperties } from "./context/types";
import { uniqueKeyedString } from "../utils";
import { PlaygroundContext } from "./context";
import isColor, { type JSONColorValue } from "../generics/properties/color";

export default function Block(data: BlockData & HTMLProps<HTMLDivElement>) {
  const context = useContext(PlaygroundContext);
  const { id, label, represents, ref, properties, type, ...props } = data;

  const renderContents = () => {
    if (isFrameInstanceBlock(data)) {
      return <>Instance of <span className={`px-1 py-0.5 ${context?.focusedFrame === properties?.referencedFrame ? 'bg-violet-500' : 'bg-amber-500'}`}>{context?.frames.find(f => f.id === properties?.referencedFrame)?.label}</span></>
    }

    if (isTemplateBlock(data) || !(properties?.text?.content)) return label;
    return (properties.text.content.length > 20 ? `${properties.text.content.slice(0, 20)}...` : properties.text.content);
  }

  const backgroundColor = useMemo(() =>
    ([...Object.values(properties?.style ?? {})].filter(v => isColor(v))?.at(0) as JSONColorValue)?.value,
    [data]
  );

  return (
    <div
      {...props}
      ref={ref}
      data-id={id}
      className={
        `p-4 border border-gray-600 rounded-lg min-w-64 relative isolate overflow-x-hidden
        ${(isStyleBlock(data) || represents === 'style') && 'bg-accent'} 
        ${isStyleBlock(data) && 'ml-4'} 
        ${props.className}`
      }
    >
      <div className="absolute inset-0 -z-10" style={{ backgroundColor }} ></div>
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
    properties,
    type: 'tag',
  };
}

export function createTemplateBlock(label: string, represents: string & keyof HTMLElementTagNameMap, properties?: BlockProperties): BlockData {
  return {
    id: `${label}-template`,
    label,
    represents,
    properties,
    type: 'template'
  };
}

export function createFrameInstanceBlock(frameId: string, frameLabel: string): BlockData {
  return {
    id: `${uniqueKeyedString(frameId)}-instance`,
    label: `Instance of ${frameLabel}`,
    represents: 'frame',
    properties: {
      referencedFrame: frameId
    },
    type: 'frame-instance'
  }
}

export function createStyleBlock(label: string, style: MutableCSSProperties): BlockData {
  return {
    id: `${uniqueKeyedString(label)}-style`,
    label,
    represents: 'style',
    properties: {
      style
    },
    type: 'style'
  };
}

export function createStyleTemplateBlock(label: string, style: MutableCSSProperties): BlockData {
  return {
    id: `${uniqueKeyedString(label)}-styletemplate`,
    label,
    represents: 'style',
    properties: {
      style
    },
    type: 'template'
  };
}

export function isTemplateBlock(block: BlockData): boolean {
  // return (typeof block === 'string' ? block : block.id).endsWith('template');
  return block.type === 'template';
}

export function isFrameInstanceBlock(block: BlockData): boolean {
  // return (typeof block === 'string' ? block : block.id).endsWith('instance');
  return block.type === 'frame-instance';
}

export function isStyleBlock(block: BlockData): boolean {
  return block.type === 'style';
}