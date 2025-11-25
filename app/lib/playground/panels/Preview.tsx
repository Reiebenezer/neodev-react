import { useContext, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type HTMLProps } from "react";
import { PlaygroundContext } from "../context";
import Vector from '@reiebenezer/ts-utils/vector';
import type { BlockData } from "../context/types";
import { cloneObject } from "~/lib/utils";
import { Choice, isChoice } from "~/lib/generics/properties/Choice";

export default function Preview() {
  const context = useContext(PlaygroundContext);

  if (!context) return;

  const focusedFrame = context.frames.find(f => f.id === context.focusedFrame);

  return (
    <div className="aspect-4/3 bg-accent overflow-y-auto select-none" onWheel={e => e.stopPropagation()}>
      {focusedFrame?.blocks.map(block => <RenderedBlock block={block} key={block.id} />)}
    </div>
  );
}

function RenderedBlock({ block }: { block: BlockData }) {
  const { represents: Element, properties } = block;
  const compiledProperties: HTMLAttributes<HTMLElement> & Record<string, any> = {};

  if (properties) {
    compiledProperties.style = Object.fromEntries(Object.entries(properties.style ?? {}).map(([k, v]) => [k, isChoice(v) ? v.value : v]))

    // console.log(compiledProperties.style);

    if (compiledProperties.style)
      for (const key in properties.style) {
        if (!(key in compiledProperties.style)) continue;

        switch (key) {
          case 'fontSize':
          case 'width':
          case 'height':
            compiledProperties.style[key] = `${properties.style[key]}px`
        }
      }

    switch (Element) {
      case 'p':
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'a':
        Object.assign(compiledProperties, properties.text)
        break;

      case 'img':
        Object.assign(compiledProperties, properties.image)
        break;
    }
  }

  if ('content' in compiledProperties)
    return <Element {...compiledProperties}>{compiledProperties.content as string}</Element>

  return (
    <Element {...compiledProperties} />
  )
}