import { Activity, useCallback, useEffect, useEffectEvent, useRef, useState, type CSSProperties, type HTMLAttributes } from "react";
import { FRAME_DATA, PREVIEW_FRAME_KEY, PREVIEW_HTML } from "~/lib/constants";
import { isChoice } from "~/lib/generics/properties/Choice";
import { type BlockData, type FrameData, type MutableCSSProperties } from "~/lib/playground/context/types";
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark-dimmed.min.css';
import { isStyleBlock } from "~/lib/playground/Block";
import isColor from "~/lib/generics/properties/color";

const languages = ['vanilla', 'react', 'svelte'] as const;

export default function Preview() {
  // Local storage preview data

  const [blocks, setBlocks] = useState<FrameData['blocks']>(JSON.parse(localStorage.getItem(PREVIEW_FRAME_KEY) ?? '[]'));
  const previewWindowRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLElement>(null);

  const [showHTML, setShowHTML] = useState(false);
  const [html, setHtml] = useState('');
  const [lang, setLang] = useState<(typeof languages)[number]>('vanilla');

  const updateHighlight = useEffectEvent(() => {
    if (showHTML && codeRef.current) {
      delete codeRef.current.dataset.highlighted;
      hljs.highlightAll();
    }
  });

  const sethtmlbasedOnLang = useCallback(() => {
    if (!previewWindowRef.current) return;
    const html = previewWindowRef.current.innerHTML.replaceAll(/\>([\s\S]*?)\</g, '>\n\t$1\n<');

    // setHtml();
    switch (lang) {
      case "vanilla":
        setHtml(html);
        break;

      case "react":
        // fetch("https://neodev-transpiler.onrender.com/transpile", { method: 'post', body: html }).then(res => res.text()).then(html => setHtml(html));
        fetch("http://127.0.0.1:8000/transpile", {
          method: 'post', body: JSON.stringify({
            framework: 'react',
            body_json: html
          })
        }).then(res => res.text()).then(html => setHtml(html));
        break;

      case "svelte":
        setHtml(html);
        break;
    }

  }, [previewWindowRef])

  useEffect(() => {
    if (!previewWindowRef.current) return;

    const updateBlocks = () => {
      if (!previewWindowRef.current) return;

      setBlocks(JSON.parse(localStorage.getItem(PREVIEW_FRAME_KEY) ?? '[]'));
      sethtmlbasedOnLang();
    }

    sethtmlbasedOnLang();

    window.addEventListener('storage', updateBlocks);
    return () => { window.removeEventListener('storage', updateBlocks) };

  }, [previewWindowRef]);

  useEffect(updateHighlight, [showHTML, codeRef]);
  useEffect(() => {
    localStorage.setItem(PREVIEW_HTML, html);
    updateHighlight();

  }, [html]);

  return (
    <>
      <div className="aspect-4/3 bg-accent overflow-y-auto select-none" onWheel={e => e.stopPropagation()} ref={previewWindowRef}>
        {condenseStyles(blocks).map(block => <RenderedBlock block={block} key={block.id} />)}
      </div>
      <pre className={`fixed inset-0 aspect-4/3 bg-accent overflow-y-auto ${!showHTML && 'opacity-0 pointer-events-none'} text-sm`} onWheel={e => e.stopPropagation()}>
        <code className="language-html h-full" ref={codeRef} dangerouslySetInnerHTML={{ __html: escapeHtml(html) }}></code>
      </pre>
      <button className="fixed bottom-4 right-4 bg-primary" onClick={() => setShowHTML(!showHTML)}>{showHTML ? 'Hide' : 'Show'} HTML</button>
    </>
  );
}

function escapeHtml(unsafe: string) {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function RenderedBlock({ block }: { block: BlockData }) {
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