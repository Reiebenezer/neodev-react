import { useContext, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type HTMLProps } from "react";
import { PlaygroundContext } from "../context";
import Vector from '@reiebenezer/ts-utils/vector';
import type { BlockData } from "../context/types";
import { cloneObject } from "~/lib/utils";
import { Choice, isChoice } from "~/lib/generics/properties/Choice";

export default function Preview() {
  const context = useContext(PlaygroundContext);

  if (!context) return;

  return (
    <iframe src="/preview" className="aspect-4/3"></iframe>
  );

  // const focusedFrame = context.frames.find(f => f.id === context.focusedFrame);

  // return (
  //   <div className="aspect-4/3 bg-accent overflow-y-auto select-none" onWheel={e => e.stopPropagation()}>
  //     {focusedFrame?.blocks.map(block => <RenderedBlock block={block} key={block.id} />)}
  //   </div>
  // );
}