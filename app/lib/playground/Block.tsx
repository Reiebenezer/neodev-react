import type { HTMLProps } from "react";
import type { BlockData, BlockProperties } from "./context/types";
import { uniqueKeyedString } from "../utils";

export default function Block({ id, label, represents, ref, properties, ...props }: BlockData & HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      ref={ref}
      data-id={id}
      className={`p-4 border border-gray-600 rounded-lg min-w-64 ${props.className}`}
    >
      {isTemplateBlock(id)
        ? label
        : properties?.text?.content
          ? (properties.text.content.length > 20 ? `${properties.text.content.slice(0, 20)}...` : properties.text.content)
          : label
      }
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

export function isTemplateBlock(block: BlockData): boolean;
export function isTemplateBlock(blockId: string): boolean;
export function isTemplateBlock(block: BlockData | string): boolean {
  return (typeof block === 'string' ? block : block.id).endsWith('template');
}