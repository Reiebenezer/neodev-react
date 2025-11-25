import { useContext, useEffect, type KeyboardEventHandler } from "react";
import type { ReactZoomPanPinchContentRef, ReactZoomPanPinchProps } from "react-zoom-pan-pinch";
import { PlaygroundContext } from "../context";
import { CursorIcon, HandIcon } from "@phosphor-icons/react";
import { tools, type Tool } from "../context/types";
import Slider from "~/lib/generics/Slider";

const toolMap: Record<Tool, React.ReactNode> = {
  move: <CursorIcon className="text-xl" />,
  hand: <HandIcon className="text-xl" />,
}

export default function Toolbar({ zoomIn, zoomOut, resetTransform }: ReactZoomPanPinchContentRef) {
  const context = useContext(PlaygroundContext);
  if (!context) return;

  return (
    <div className="fixed bottom-4 left-[50vw] -translate-x-1/2 border border-gray-700 rounded-xl p-2 flex gap-2">
      {tools.map(tool => (
        <button
          key={tool}
          className={`${context.tool === tool && 'bg-primary'}`}
          onClick={() => context.setTool(tool)}
        >
          {toolMap[tool]}
        </button>
      ))}
      <button className="px-4 py-2" onClick={() => resetTransform()}>Reset Transform</button>
      <Slider min={0.1} max={2} step={0.1} value={1} />
    </div>
  );
}