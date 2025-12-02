import { useContext, useEffect, type KeyboardEventHandler } from "react";
import { useControls, type ReactZoomPanPinchContentRef, type ReactZoomPanPinchProps } from "react-zoom-pan-pinch";
import { PlaygroundContext } from "../context";
import { CursorIcon, FileCodeIcon, HandIcon, InfoIcon } from "@phosphor-icons/react";
import { tools, type Tool } from "../context/types";
import Slider from "~/lib/generics/Slider";
import { MAX_ZOOM, MIN_ZOOM } from "~/lib/constants";

const toolMap: Record<Tool, React.ReactNode> = {
  move: <CursorIcon className="text-xl" />,
  hand: <HandIcon className="text-xl" />,
}

export default function Toolbar() {
  const context = useContext(PlaygroundContext);
  const { zoomIn, zoomOut, instance, setTransform, resetTransform } = useControls();

  if (!context) return;

  return (
    <div className="fixed bottom-4 left-[50vw] -translate-x-1/2 rounded-xl p-3 flex gap-2 bg-bg">
      {tools.map(tool => (
        <button
          key={tool}
          className={`${context.tool === tool && 'bg-primary'} px-3`}
          onClick={() => context.setTool(tool)}
        >
          {toolMap[tool]}
        </button>
      ))}
      <button className="px-4 py-2" onClick={() => {
        context.resetTransform();
        setTimeout(() => resetTransform(0), 1);
      }}>Reset Transform</button>
      <div className="flex items-center p-2 bg-accent rounded-sm">
        <span className="ml-2 text-sm">Zoom</span>
        <Slider
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={0.2}
          value={instance.transformState.scale}
          onChange={val => setTransform(instance.transformState.positionX, instance.transformState.positionY, val, 0)} />
      </div>
      <button
        className={`${context.isPreviewShown && 'bg-primary'} px-3`}
        onClick={context.togglePreview}
        title="Show/Hide the Preview Panel (The website view)"
      >
        <FileCodeIcon className="text-xl" />
      </button>
      <button
        className={`${context.isInfoPanelShown && 'bg-primary'} px-3`}
        onClick={context.toggleInfo}
        title="Show/Hide the Info Panel (The one with the Properties, AI Insights, and Preview Code)"
      >
        <InfoIcon className="text-xl" />
      </button>
    </div>
  );
}