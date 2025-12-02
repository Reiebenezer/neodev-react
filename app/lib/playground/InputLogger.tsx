import { useControls, type ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";
import { PlaygroundContext, type PlaygroundContextProps } from "./context";
import { useCallback, useContext, useEffect, useEffectEvent, useLayoutEffect, useState } from "react";
import type { Tool } from "./context/types";
import { unfocusActiveElement } from "../utils";

export default function InputLogger() {
  const context = useContext(PlaygroundContext);
  const panZoomUtils = useControls();

  const [lastTool, setLastTool] = useState<Tool>();

  if (!context) return;

  const keyboardShortcuts: Record<string, (e: KeyboardEvent) => void> = {
    h: () => context.setTool('hand'),
    v: () => context.setTool('move'),
    'ctrl+=': (e) => {
      e.preventDefault();
      panZoomUtils.zoomIn(0.1, 0);
    },
    'ctrl+-': e => {
      e.preventDefault();
      panZoomUtils.zoomOut(0.1, 0);
    },
    'ctrl+0': e => {
      e.preventDefault();

      context.resetTransform();
      setTimeout(() => panZoomUtils.resetTransform(0), 1);
    },
    'escape': () => {
      context.setSelectedBlock(undefined);
      unfocusActiveElement();
    }
  };

  const handleKeyboardShortcut = (e: KeyboardEvent) => {
    for (const shortcut in keyboardShortcuts) {
      const formattedShortcut = [...shortcut.matchAll(/([^\+]+|\+\+)/g)].map(s => s[1] === '++' ? '+' : s[1].toLowerCase());
      const hasCtrl = formattedShortcut.includes('ctrl');
      const hasShift = formattedShortcut.includes('shift');
      const hasAlt = formattedShortcut.includes('alt');
      const key = formattedShortcut.at(-1);

      // console.log(hasCtrl, hasShift, hasAlt, key, e.key);

      if (key !== e.key.toLowerCase()) continue;
      if (hasCtrl && !e.ctrlKey) continue;
      if (hasShift && !e.shiftKey) continue;
      if (hasAlt && !e.altKey) continue;

      keyboardShortcuts[shortcut](e);
    }
  }

  // ------------------------------------------------------------------------------------
  // Handle panning (auto-hand tool when toggling space)
  // ------------------------------------------------------------------------------------
  const handlePanningSpaceDown = useEffectEvent((e: KeyboardEvent) => {
    if (e.code !== 'Space') return;

    if (!lastTool)
      setLastTool(context.tool);

    context.setTool('hand');
    unfocusActiveElement();
  });

  const handlePanningSpaceUp = useEffectEvent((e: KeyboardEvent) => {
    if (e.code !== 'Space') return;
    if (!lastTool) return;

    context.setTool(lastTool);
    setLastTool(undefined);
  });

  // ------------------------------------------------------------------------------------
  // Handle scrolling
  // ------------------------------------------------------------------------------------
  const handleScrollPanning = useEffectEvent((e: WheelEvent) => {
    const transformState = panZoomUtils.instance.transformState;
    const speedFactor = -0.4;

    if (e.ctrlKey) {
      e.preventDefault();
      panZoomUtils.zoomIn(Math.sign(e.deltaY) * -0.2, 0)
    }

    else if (e.shiftKey) {
      panZoomUtils.setTransform(transformState.positionX + e.deltaY * speedFactor, transformState.positionY + e.deltaX * speedFactor, transformState.scale, 0);
    }

    else
      panZoomUtils.setTransform(transformState.positionX + e.deltaX * speedFactor, transformState.positionY + e.deltaY * speedFactor, transformState.scale, 0);
  });


  useLayoutEffect(() => {
    window.addEventListener('keydown', handleKeyboardShortcut);
    window.addEventListener('keydown', handlePanningSpaceDown);
    window.addEventListener('keyup', handlePanningSpaceUp);
    window.addEventListener('wheel', handleScrollPanning, { passive: false });


    return () => {
      window.removeEventListener('keydown', handleKeyboardShortcut)
      window.removeEventListener('keydown', handlePanningSpaceDown);
      window.removeEventListener('keyup', handlePanningSpaceUp);
      window.removeEventListener('wheel', handleScrollPanning);
    };
  }, []);

  return <></>;
}