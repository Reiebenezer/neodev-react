import { useEffect, useState, type HTMLAttributes } from "react";
import { FRAME_DATA, PREVIEW_FRAME_KEY } from "~/lib/constants";
import { isChoice } from "~/lib/generics/properties/Choice";
import { type BlockData, type FrameData } from "~/lib/playground/context/types";

export default function Preview() {
  // Local storage preview data
  const [blocks, setBlocks] = useState<FrameData['blocks']>(JSON.parse(localStorage.getItem(PREVIEW_FRAME_KEY) ?? '[]'));

  useEffect(() => {
    const updateBlocks = () => {
      setBlocks(JSON.parse(localStorage.getItem(PREVIEW_FRAME_KEY) ?? '[]'));
    }

    window.addEventListener('storage', updateBlocks);

    return () => { window.removeEventListener('storage', updateBlocks) };

  }, []);

  return (
    <div className="aspect-4/3 bg-accent overflow-y-auto select-none" onWheel={e => e.stopPropagation()}>
      {blocks.map(block => <RenderedBlock block={block} key={block.id} />)}
    </div>
  );
}

export function RenderedBlock({ block }: { block: BlockData }) {
  const frames: FrameData[] = JSON.parse(localStorage.getItem(FRAME_DATA) ?? '[]');
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

  if (Element === 'frame') {
    const referencedFrame = frames.find(f => f.id === properties?.referencedFrame);

    // console.log(referencedFrame);

    if (!referencedFrame) return;
    return <div>{referencedFrame.blocks.map(block => <RenderedBlock key={`ref-${Element}-${block.id}`} block={block} />)}</div>;
  }

  if ('content' in compiledProperties)
    return <Element {...compiledProperties}>{compiledProperties.content as string}</Element>

  return (
    <Element {...compiledProperties} />
  )
}