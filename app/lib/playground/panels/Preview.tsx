import { useContext, useLayoutEffect, useRef } from "react";
import { PlaygroundContext } from "../context";

export default function Preview() {
  const context = useContext(PlaygroundContext);
  const ref = useRef<HTMLIFrameElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const handler = (e: Event) => {
      // console.log(e.target, (e.target as HTMLElement)?.tagName);

      if (
        (e.target as HTMLElement)?.tagName === "A" &&
        confirm(`WARNING: Visiting unknown links could pose security risks. Only open this link if you trust it. Are you sure you want to open ${(e.target as HTMLAnchorElement).href}?`)
      ) {
        const link = document.createElement('a');
        link.href = (e.target as HTMLAnchorElement).href;
        link.target = "_blank";

        link.click();
      }

      e.preventDefault();
      e.stopPropagation();

      window.focus();
    }

    ref.current.contentWindow?.addEventListener('click', handler);

    return () => ref.current?.contentWindow?.removeEventListener('click', handler);
  }, [ref])

  if (!context) return;

  return (
    <iframe src="/preview" className="aspect-4/3" tabIndex={-1} ref={ref}></iframe>
  );
}