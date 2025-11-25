import { TransformWrapper } from "react-zoom-pan-pinch";
import Vector from '@reiebenezer/ts-utils/vector';
import { useCallback, useEffect, useState } from "react";
import { PlaygroundContext, type PlaygroundContextProps } from "./context";
import { createFrame, isTemplateFrame } from "./Frame";
import { cloneObject, uniqueKeyedString as id } from "../utils";
import Block, { createBlock, createTemplateBlock, isTemplateBlock } from "./Block";
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent, type Modifier } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { type Tool, type BlockData } from "~/lib/playground/context/types";
import Toolbar from "./panels/Toolbar";
import Preview from "./panels/Preview";
import templateFrames from "./template";
import Properties from "./panels/Properties";
import InputLogger from "./InputLogger";

export default function PlaygroundContextProvider({ children }: { children: (frames: PlaygroundContextProps['frames']) => React.ReactNode }) {
  const [frames, setFrames] = useState(templateFrames);
  const [activeBlock, setActiveBlock] = useState<BlockData>();
  const [activeBlockIndex, setActiveBlockIndex] = useState(-1);
  const [currentTool, setCurrentTool] = useState<Tool>('move');

  // Pan and zoom
  const [scale, setScale] = useState(1);
  const [canvasOffset, setCanvasOffset] = useState(Vector.ZERO);

  // Selection for properties
  const [selectedBlock, setSelectedBlock] = useState<BlockData>();

  // Focused frame for rendering
  const [focusedFrame, setFocusedFrame] = useState<string>(frames[1].id);

  const updateFrame: PlaygroundContextProps['updateFrame'] = useCallback((id, dataOrUpdater) => {

    setFrames(prev => {
      return prev.map(frame => frame.id === id ? { id, ...(typeof dataOrUpdater === 'function' ? dataOrUpdater(frame) : dataOrUpdater) } : frame);
    });

  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragStart = (e: DragEndEvent) => {
    // Find the block somewhere where it exists
    for (const { blocks } of frames) {
      const block = blocks.find(b => b.id === e.active.id.toString());

      if (block) {
        setActiveBlock(block);
        setActiveBlockIndex(blocks.indexOf(block));
      }
    }
  }

  const handleDragOver = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!activeBlock) return;

    const hoveredBlockId = over?.id.toString(); // The block id it is hovering
    const hoveredFrame = frames.find(f => f.blocks.some(b => b.id === hoveredBlockId));

    const sourceFrame = frames.find(f => f.blocks.some(b => b.id === activeBlock.id));

    if (!hoveredFrame || isTemplateFrame(hoveredFrame)) {
      return;
    }

    if (!sourceFrame) {
      throw new Error('Active block does not belong to a specific frame.');
    }

    // Sorting between different frames is handled here
    if (sourceFrame && sourceFrame !== hoveredFrame) {

      // Remove the active block from the previous frame
      updateFrame(sourceFrame.id, prev => ({ ...prev, blocks: prev.blocks.filter(b => b.id !== activeBlock.id) }));

      // New list index
      const newIndex = hoveredFrame.blocks.findIndex(b => hoveredBlockId === b.id);

      if (!hoveredFrame.blocks.some(b => isTemplateBlock(b)))
        updateFrame(hoveredFrame.id, prev => ({
          ...prev,
          blocks: [
            ...prev.blocks.slice(0, newIndex),
            activeBlock,
            ...prev.blocks.slice(newIndex)
          ]
        }))
    }
  }

  const resetActiveBlock = () => {
    setActiveBlock(undefined);
    setActiveBlockIndex(-1);
  }

  const handleDragEnd = (e: DragEndEvent) => {
    const { over } = e;
    if (!activeBlock) return;

    const clonedBlock = cloneObject(activeBlock);
    const sourceFrame = frames.find(f => f.blocks.some(b => b.id === clonedBlock.id));
    const isActiveTemplateBlock = isTemplateBlock(clonedBlock);

    if (!sourceFrame) {
      console.error('Active block does not belong to any existing frame.');
      return resetActiveBlock();
    }

    /** The original position index of the block */
    const sourceBlockIndex = sourceFrame.blocks.findIndex(b => b.id === clonedBlock.id);

    // Reassign the id if it is a template
    if (isActiveTemplateBlock) {
      clonedBlock.id = id(clonedBlock.label);
    }

    // This is dragged over an empty space (only executed when there is more than one item in the previous frame)
    if (!over) {
      if (sourceFrame.blocks.length <= 1) {
        console.warn('Source frame has only 1 block available. No need to create a new instance.');
        return resetActiveBlock();
      }

      // If the source is not the template frame, remove the block from this frame
      if (!isTemplateBlock(clonedBlock))
        updateFrame(sourceFrame.id, prev => ({ ...prev, blocks: prev.blocks.filter(b => b.id !== clonedBlock.id) }));

      setFrames(prev => [...prev, createFrame(
        id('frame'),
        [clonedBlock],
        Vector.from(e.delta.x, e.delta.y)
          .add(Vector.from((e.activatorEvent as MouseEvent).clientX / scale, (e.activatorEvent as MouseEvent).clientY / scale))
          .subtract(canvasOffset)
      )]);

      return resetActiveBlock();
    }

    // Move the array to the new index
    const destBlockIndex = sourceFrame.blocks.findIndex(b => b.id === over.id);

    updateFrame(sourceFrame.id, prev => ({ ...prev, blocks: arrayMove(prev.blocks, sourceBlockIndex, destBlockIndex) }));

    // Handle return to template frame here
    // Restore the active block back to the template frame, and put the cloned block in its place
    if (isActiveTemplateBlock && !isTemplateFrame(sourceFrame)) {
      updateFrame(sourceFrame.id, prev => {
        const result = { ...prev };

        result.blocks[destBlockIndex] = clonedBlock;
        return result;
      });

      // Only do this if the destination frame is not the template frame
      updateFrame('template', prev => ({
        ...prev,
        blocks: [
          ...prev.blocks.slice(0, activeBlockIndex),
          activeBlock,
          ...prev.blocks.slice(activeBlockIndex)
        ]
      }));
    }

    return resetActiveBlock();
  }

  /** Modifier to reduce the movement to scaled coordinates */
  const adjustToScale = useCallback<Modifier>(({ transform }) => ({
    ...transform,
    x: transform.x / scale,
    y: transform.y / scale
  }), [scale]);

  // Remove the frames with no blocks inside it
  useEffect(() => {
    if (frames.some(f => f.blocks.length === 0))
      setFrames(frames => frames.filter(f => f.blocks.length > 0));
    
  }, [frames]);

  /** Reset the focused frame to the nearest one with existing blocks */
  useEffect(() => {
    if (frames.find(f => f.id === focusedFrame)?.blocks.length === 0) {
      setFocusedFrame(frames.filter(f => f.blocks.length > 0)[1].id);
    }

  }, [frames, focusedFrame]);

  return (
    <PlaygroundContext.Provider value={{
      frames,
      updateFrame,
      tool: currentTool,
      setTool: setCurrentTool,
      scale,
      selectedBlock,
      setSelectedBlock,
      focusedFrame,
      setFocusedFrame,
    }}>
      <TransformWrapper
        minScale={0.5}
        maxScale={2}
        limitToBounds={false}
        onTransformed={(ref, { scale, positionX, positionY }) => {
          setScale(scale);
          setCanvasOffset(Vector.from(positionX, positionY));
        }}

        wheel={{
          disabled: true
        }}

        panning={{
          disabled: currentTool !== 'hand'
        }}

        doubleClick={{ disabled: true }}
      >
        {(utils) => (
          <div className={`fixed inset-0 ${currentTool === 'hand' ? 'cursor-move' : 'cursor-default'}`}>
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              {children(frames)}
              <DragOverlay style={{ scale: `${utils.instance.transformState.scale}` }} className="origin-top-left w-auto!" modifiers={[adjustToScale]} >
                {activeBlock && <Block {...activeBlock} />}
              </DragOverlay>
            </DndContext>
            <Toolbar {...utils} />
            <InputLogger />
          </div>
        )}
      </TransformWrapper>
      <div className="fixed inset-y-4 right-4 w-lg flex flex-col gap-4">
        <Preview />
        <Properties />
      </div>
    </PlaygroundContext.Provider>
  );

}
