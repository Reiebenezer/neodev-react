import Vector from '@reiebenezer/ts-utils/vector';
import type { BlockData, FrameData } from "./context/types";
import { useContext, useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import { PlaygroundContext } from "./context";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableBlock from './SortableBlock';
import { useDraggable } from '@dnd-kit/core';
import interact from 'interactjs';
import { ContextMenuContext } from '../generics/ContextMenu';
import ModalContextProvider, { ModalContext } from '../generics/Modal';
import { PaperclipIcon, PencilSimpleIcon } from '@phosphor-icons/react';
import { uniqueKeyedString } from '../utils';
import { createBlock, createFrameInstanceBlock } from './Block';

export default function Frame(data: FrameData) {
  const context = useContext(PlaygroundContext);
  const contextMenuContext = useContext(ContextMenuContext);
  const modalContext = useContext(ModalContext);

  const ref = useRef<HTMLDivElement>(null);
  const { blocks, id, position } = data;
  const [pos, setPos] = useState(data.position);

  const updateGlobalPosition = useEffectEvent(() => {
    context?.updateFrame(id, prev => ({
      ...prev,
      position: pos
    }));
  });

  useEffect(() => {
    if (!ref.current) return;
    if (!context) return;

    const instance = interact(ref.current).draggable({
      allowFrom: `[data-neodev-handle]`,
      enabled: context.tool !== 'hand',
      cursorChecker(action, interactable, element, interacting) {
        if (interacting) return 'grabbing';
        return 'grab';
      },

      listeners: {
        move(e: Interact.DragEvent) {
          setPos(prev => prev.add(Vector.from(e.dx / context.scale, e.dy / context.scale)));
        },

        end: updateGlobalPosition
      }
    }).on('tap', (e: Interact.PointerEvent) => {
      if (isTemplateFrame(data)) return;
      context.setFocusedFrame(data.id);
    }).pointerEvents({
      allowFrom: `[data-neodev-handle]`
    });

    return () => {
      instance.unset();
    }

  }, [ref, context])

  if (!context) return;

  return (
    <>
      <div
        ref={ref}
        data-neodev-frame={id}
        className='flex gap-1 select-none touch-none absolute'
        style={{ transform: `translate3d(${pos.x.px()}, ${pos.y.px()}, 0)` }}
      >
        <div
          className={`${isTemplateFrame(data) ? 'bg-orange-700' : context.focusedFrame === data.id ? 'bg-violet-500' : 'bg-amber-500'} px-2 text-sm font-bold [writing-mode:vertical-rl]`}
          data-neodev-handle={id}
          onContextMenu={(e) => {
            if (isTemplateFrame(data)) return;

            contextMenuContext?.setOptions([
              [<div className='flex gap-2 items-center'><PaperclipIcon />Attach to...</div>, () => {
                modalContext?.open((close) => (
                  <div className='flex flex-col min-w-lg'>
                    <h2 className="font-bold text-2xl">Select a frame from the list</h2>
                    <div className="flex flex-col gap-1 mt-4">
                      {context.frames.filter(
                        f => {
                          if (isTemplateFrame(f)) return false;
                          if (f.id === data.id) return false;

                          // Traverse the blocks and find frame instances. Check if it might cause a circular import
                          function traverse(blocks?: BlockData[]): boolean {
                            return blocks?.every(b => {
                              if (b.type !== 'frame-instance') return true;
                              if (b.properties?.referencedFrame === f.id) return false;

                              return traverse(context?.frames.find(f => f.id === b.properties?.referencedFrame)?.blocks);
                            }) ?? false;
                          }

                          return traverse(data.blocks);
                        }
                      ).map(f => (
                        <button
                          key={f.id}
                          className="bg-transparent hover:bg-primary"
                          onClick={() => {
                            context.updateFrame(f.id, prev => ({ ...prev, blocks: [...prev.blocks, createFrameInstanceBlock(data.id, data.label)] }));
                            close();
                          }}
                        >{f.label}</button>
                      ))}
                    </div>
                  </div>
                ))
              }],
              [<div className='flex gap-2 items-center'><PencilSimpleIcon />Edit Frame Label</div>, () => {
                modalContext?.open((close) => (
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-xl">Edit Frame Label</h2>
                    <form className='contents' onSubmit={e => {
                      e.preventDefault();

                      const value = new FormData(e.currentTarget).get('frame');

                      if (!value || value.toString().length === 0) {
                        alert('Label cannot be empty!');
                        return;
                      }

                      // Validate if unique
                      if (context.frames.some(f => f.label === value)) {
                        alert('Label must be unique!');
                        return;
                      }

                      context.updateFrame(data.id, prev => ({ ...prev, label: value.toString() }));
                      close();
                    }}>
                      <input
                        className='mt-2'
                        type="text"
                        placeholder='Frame Name'
                        name="frame"
                        defaultValue={data.label}
                        autoFocus
                        onKeyDown={e => e.stopPropagation()}
                      />
                      <button className='justify-center font-bold'>Confirm and Exit</button>
                    </form>
                  </div>
                ))
              }]
            ])
          }}
        >{data.label}</div>
        <div className="flex flex-col gap-1">
          <SortableContext disabled={context.tool === 'hand'} items={blocks} strategy={verticalListSortingStrategy}>
            {blocks.map((block, index) => (
              <SortableBlock {...block} key={block.id} />
            ))}
          </SortableContext>
        </div>
      </div>
    </>
  );
}

export function createFrame(id: string, blocks: BlockData[], position = Vector.ZERO, label = uniqueKeyedString('Frame')): FrameData {
  return { id, blocks, position, label };
}

export function isTemplateFrame(frame: FrameData) {
  return frame.id === 'template';
}