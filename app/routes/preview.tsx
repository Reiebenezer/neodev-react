import { Activity, useCallback, useEffect, useEffectEvent, useRef, useState, type CSSProperties, type HTMLAttributes } from "react";
import { FRAME_DATA, PREVIEW_FRAME_DATA, PREVIEW_HTML } from "~/lib/constants";
import { isChoice } from "~/lib/generics/properties/Choice";
import { type BlockData, type FrameData, type MutableCSSProperties } from "~/lib/playground/context/types";

import { isStyleBlock } from "~/lib/playground/Block";
import isColor from "~/lib/generics/properties/color";
import '~/preview.css';
import { loadFont, type ProvidedFonts } from "~/lib/font-loader";
import type { Color } from "@reiebenezer/ts-utils/color";

export default function Preview() {
  // Local storage preview data

  const [blocks, setBlocks] = useState<FrameData['blocks']>(JSON.parse(localStorage.getItem(PREVIEW_FRAME_DATA) ?? '[]'));
  const previewWindowRef = useRef<HTMLDivElement>(null);

  // Update the preview list of blocks when localStorage changes
  useEffect(() => {
    const updateBlocks = (e: StorageEvent) => {
      if (e.key === PREVIEW_FRAME_DATA) {
        setBlocks(JSON.parse(localStorage.getItem(PREVIEW_FRAME_DATA) ?? '[]'));
      }
    }

    window.addEventListener('storage', updateBlocks);
    return () => { window.removeEventListener('storage', updateBlocks) };;
  }, []);

  // Update local storage with the produced preview HTML when the list of blocks change
  useEffect(() => {
    if (!previewWindowRef.current) return;

    localStorage.setItem(
      PREVIEW_HTML,
      previewWindowRef.current.innerHTML.replaceAll(/\>([\s\S]*?)\</g, '>\n\t$1\n<')
    );

  }, [blocks, previewWindowRef]);

  return (
    <>
      <div className="aspect-4/3 bg-accent overflow-y-auto select-none" onWheel={e => e.stopPropagation()} ref={previewWindowRef}>
        {condenseStyles(blocks).map(block => <RenderedBlock block={block} key={block.id} />)}
      </div>
    </>
  );
}

function RenderedBlock({ block }: { block: BlockData }) {
  const frames: FrameData[] = JSON.parse(localStorage.getItem(FRAME_DATA) ?? '[]');
  const { represents: Element, properties } = block;
  const compiledProperties: HTMLAttributes<HTMLElement> & Record<string, any> = {};

  if (properties) {
    compiledProperties.style =
      Object.fromEntries(
        Object.entries(properties.style ?? {})
          .map(([k, v]) => [
            k,
            isChoice(v) || isColor(v) ? v.value : v
          ]
          )
      )

    // console.log(compiledProperties.style);

    if (compiledProperties.style)
      for (const key in properties.style) {
        if (!(key in compiledProperties.style)) continue;

        switch (key) {
          case 'fontSize':
          case 'width':
          case 'height':
            compiledProperties.style[key] = `${properties.style[key]}px`;
            break;

          case 'fontFamily':
            loadFont(compiledProperties.style[key] as ProvidedFonts);
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

  if (Element === 'frame') {
    const referencedFrame = frames.find(f => f.id === properties?.referencedFrame);

    // console.log(referencedFrame);

    if (!referencedFrame) return;
    return <div style={{ ...(properties?.style ?? {}) as CSSProperties }}>{referencedFrame.blocks.map(block => <RenderedBlock key={`ref-${Element}-${block.id}`} block={block} />)}</div>;
  }

  if ('content' in compiledProperties)
    return <Element {...compiledProperties}>{compiledProperties.content as string}</Element>

  return (
    <Element {...compiledProperties} />
  )
}

function condenseStyles(blocks: BlockData[]) {
  const result: BlockData[] = [];


  blocks.forEach((block) => {
    if (!isStyleBlock(block)) {
      result.push(block);
      return;
    }

    if (result.length === 0) {
      return;
    }

    const lastBlock = result.at(-1)!;

    if (!lastBlock.properties) {
      lastBlock.properties = {};
    }

    if (!(lastBlock.properties.style)) {
      lastBlock.properties.style = {};
    };

    for (const key in block.properties!.style) {
      const style = block.properties!.style[key as keyof MutableCSSProperties];

      if (isColor(style) || isChoice(style)) {
        Object.assign(lastBlock.properties.style!, { [key]: style.value })
        continue;
      }

      Object.assign(lastBlock.properties.style!, { [key]: style })
    }
  });

  return result;
}