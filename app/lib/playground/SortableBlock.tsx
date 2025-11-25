import { useContext, useEffect } from "react";
import Block, { isTemplateBlock } from "./Block";
import type { BlockData } from "./context/types";
import { useSortable } from "@dnd-kit/sortable";
import { PlaygroundContext } from "./context";
import { ContextMenuContext } from "../generics/ContextMenu";
import { TrashIcon } from "@phosphor-icons/react";

export default function SortableBlock(data: BlockData) {
  const context = useContext(PlaygroundContext);
  const contextMenuContext = useContext(ContextMenuContext);
  const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: data.id,
  });

  if (!context) return;

  const style = transform ? {
    transform: `translate3d(${transform.x / context.scale}px, ${transform.y / context.scale}px, 0)`,
    transition
  } : undefined;

  const containingFrame = context.frames.find(f => f.blocks.some(b => b.id === data.id));

  return (
    <Block
      {...data}
      ref={setNodeRef} {...listeners} {...attributes}
      style={style}
      className={`${isDragging && 'opacity-0'} ${context.selectedBlock?.id === data.id && 'outline-2 outline-offset-1 outline-green-500'} touch-none`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isTemplateBlock(data)) return;
        context.setSelectedBlock(data);
      }}
      onContextMenu={() => {
        contextMenuContext?.setOptions([
          [
            (<div className='flex gap-2 items-center'><TrashIcon />Delete Block</div>),
            () => {
              if (!containingFrame) return;

              // Prevent action when there is no existing non-template frame after deletion
              if (containingFrame.blocks.length === 1 && context.frames.filter(f => f.blocks.length > 0).length <= 2) {
                alert('Error: Removing this block will remove the only existing frame on this project. Canceling.');
                return;
              }

              context.updateFrame(containingFrame.id, prev => ({ ...prev, blocks: prev.blocks.filter(b => b.id !== data.id) }))
            }
          ]
        ])
      }}
    />
  );
}