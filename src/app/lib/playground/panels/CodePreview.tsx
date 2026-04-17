import { Html5Plain, ReactOriginal, SveltePlain } from 'devicons-react';
import hljs from 'highlight.js';
import hljs_svelte from "highlightjs-svelte";
import { useRef, useState, useEffectEvent, useCallback, useEffect, useMemo, useLayoutEffect } from 'react';
import { OUTPUT_FRAMEWORK, PREVIEW_FRAME_NAME, PREVIEW_HTML } from '~/lib/constants';
import { useInspect, useStorage } from '~/lib/hooks';
import jsbeautify from 'js-beautify';
import { Color } from '@reiebenezer/ts-utils/color';

hljs_svelte(hljs);
const languages = ['html', 'react', 'svelte'] as const;

const transpilerUrl = "https://neodev-transpiler.onrender.com/transpile";
// const transpilerUrl = "http://127.0.0.1:8000/transpile";

export default function CodePreview() {
  const codeRef = useRef<HTMLElement>(null);

  const [html] = useStorage(PREVIEW_HTML);
  const [focusedFrame] = useStorage(PREVIEW_FRAME_NAME, 'SimpleWebsite');

  const [code, setCode] = useState('');
  const [lang, setLang] = useStorage<(typeof languages)[number]>(OUTPUT_FRAMEWORK, 'html');

  /** Code snippets */
  const [htmlCode, setVanillaCode] = useState<string>();
  const [reactCode, setReactCode] = useState<string>();
  const [svelteCode, setSvelteCode] = useState<string>();

  useEffect(() => {
    const sanitizedHtml = html
      ?.replaceAll(/\>([\s\S]*?)\</g, '>\n\t$1\n<')
      .replaceAll(/rgba?\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/g, (str, r, g, b) => {
        return Color({ r: parseInt(r), g: parseInt(g), b: parseInt(b) }).hex().toLowerCase();
      });
    if (!sanitizedHtml) return;

    setVanillaCode(jsbeautify.html(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${focusedFrame}</title>
      </head>
      <body>
        ${sanitizedHtml}
      </body>
      </html>`, { indent_size: 2, max_preserve_newlines: 0, wrap_attributes: "force-expand-multiline" }));

    fetch(transpilerUrl, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        html: sanitizedHtml,
        framework: "react",
        label_name: focusedFrame
      })
    }).then(res => res.json())
      .then(({ code }) => setReactCode(code));

    fetch(transpilerUrl, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        html: sanitizedHtml,
        framework: "svelte",
        label_name: focusedFrame
      })
    }).then(res => res.json())
      .then(({ code }) => setSvelteCode(code))

  }, [html, focusedFrame]);

  const formatCode = () => {
    switch (lang) {
      case "html":
        setCode(htmlCode ?? 'Loading HTML...');
        break;

      case "react":
        setCode(reactCode ?? "Loading react code...");
        break;

      case "svelte":
        setCode(svelteCode ?? 'Loading svelte code...');
        break;
    }

  };

  useEffect(formatCode, [htmlCode, reactCode, svelteCode, lang]);
  useEffect(() => {
    if (codeRef.current) {
      delete codeRef.current.dataset.highlighted;
      hljs.highlightElement(codeRef.current);
    }
  });


  return (
    <pre className={`text-sm p-4`}>
      <code className={`bg-transparent! ${lang === 'html' ? 'language-html' :
        lang === 'react' ? 'language-jsx' :
          lang === 'svelte' ? 'language-svelte' :
            ''
        }`} ref={codeRef} dangerouslySetInnerHTML={{ __html: escapeHtml(code) }}></code>
      <button title={lang} className="fixed bottom-12 right-12 bg-primary p-3" onClick={() => setLang(prev => languages[(languages.indexOf(prev) + 1) % languages.length])}>{
        lang === 'html' ? <Html5Plain size={24} /> :
          lang === 'react' ? <ReactOriginal size={24} /> :
            lang === 'svelte' ? <SveltePlain size={24} /> :
              ''
      }</button>
    </pre>
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