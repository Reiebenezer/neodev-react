import { useCallback, useContext, useEffect, useRef, useState, type ChangeEvent, type ChangeEventHandler, type FormEvent } from "react";
import { PlaygroundContext } from "../context";
import type { BlockData, BlockProperties } from "../context/types";
import { cloneObject } from "~/lib/utils";
import { Choice, isChoice } from "~/lib/generics/properties/Choice";
import { Color } from "@reiebenezer/ts-utils/color";
import isColor, { type JSONColorValue } from "~/lib/generics/properties/color";
import { ColorPicker, type ColorPickerChangeEvent } from 'primereact/colorpicker';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';

export default function Properties() {
  const context = useContext(PlaygroundContext);
  const propertiesPanelRef = useRef<HTMLDivElement>(null);

  // Update the containing frame whenever this block's properties change
  const updateContainingFrame = useCallback((subset: string, prop: string, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | DropdownChangeEvent | ColorPickerChangeEvent) => {
    if (!context?.frames) return;
    if (!context?.selectedBlock) return;

    let found = false;

    for (const frame of context.frames) {
      for (const blockIndex in frame.blocks) {
        const block = frame.blocks[blockIndex];

        if (block.id === context.selectedBlock.id) {
          // console.log(frame.id);

          context.updateFrame(frame.id, prev => {
            const updated = { ...prev };
            const props = updated.blocks[blockIndex].properties as any;

            if (props?.[subset]) {
              const type = typeof props[subset][prop];
              const clonedPropertySubset = { ...props[subset] };

              switch (type) {
                case "number":
                case "bigint":
                  clonedPropertySubset[prop] = (e.target as HTMLInputElement).valueAsNumber;
                  break;

                case "boolean":
                  clonedPropertySubset[prop] = (e.target as HTMLInputElement).checked;
                  break;

                case "string":
                case "undefined":
                  clonedPropertySubset[prop] = e.target.value;
                  break;

                case "object":
                  if (isChoice(props[subset][prop])) {
                    clonedPropertySubset[prop].value = (e as DropdownChangeEvent).value;
                  }

                  else if (isColor(props[subset][prop])) {
                    clonedPropertySubset[prop].value = `#${(e as ColorPickerChangeEvent).value}`;
                  }

                  else {
                    throw new Error(`Unrecognized object found: ${JSON.stringify(props[subset][prop])}`);
                  }

                  break;

                case "symbol":
                case "function":
                  throw new Error('Unknown type found at property value');
              }

              props[subset] = clonedPropertySubset;

            }

            updated.blocks[blockIndex].properties = props;
            return updated;
          });

          found = true;
          break;
        }
      }

      if (found) break;
    }

    if (!found) {
      context.setSelectedBlock(undefined);
    }

  }, [context?.frames, context?.selectedBlock]);

  useEffect(() => {
    const allBlocks = context?.frames.map(f => f.blocks).flat();
    if (!allBlocks || allBlocks.length === 0) return;

    if (allBlocks.every(b => b.id !== context?.selectedBlock?.id)) {
      context?.setSelectedBlock(undefined);
    }

  }, [context?.frames, context?.selectedBlock]);

  useEffect(() => {
    if (!propertiesPanelRef.current) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!propertiesPanelRef.current?.contains(e.target as Node | null) && e.target !== propertiesPanelRef.current && propertiesPanelRef.current?.contains(document.activeElement)) {
        (document.activeElement as HTMLElement).blur();
      }
    }

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    }

  }, [propertiesPanelRef])

  if (!context) return;
  const properties = context.selectedBlock?.properties;

  return (
    <div
      className="flex flex-col gap-6 p-4"
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === 'Escape') (e.target as HTMLElement).blur();
      }}
      onWheel={e => e.stopPropagation()}
      ref={propertiesPanelRef}
    >
      {properties?.image && (
        <>
          <p className="text-xs bg-primary p-1.5 rounded-sm">Image Properties</p>
          <div className="flex flex-col gap-4">
            {Object.entries(properties.image).map(([prop, val]) => (
              <div className="flex flex-col gap-2" key={`property-${prop}`}>
                <label htmlFor={`property-${prop}`}>{prop}</label>
                {isChoice(val)
                  ? (
                    <Dropdown id={`property-${prop}`} value={val.value} options={val.choices} onChange={e => updateContainingFrame('style', prop, e)} placeholder={prop} />
                    // <select id={`property-${prop}`} value={val.value} onChange={e => updateContainingFrame('image', prop, e)} >
                    //   {val.choices.map(c => <option value={c} key={c}>{c}</option>)}
                    // </select>
                  )
                  : <input type="text" id={`property-${prop}`} value={val} onChange={e => updateContainingFrame('image', prop, e)} />
                }
              </div>
            ))}
          </div>
        </>
      )}

      {properties?.text && (
        <>
          <p className="text-xs bg-primary p-1.5 rounded-sm">Text Properties</p>
          <div className="flex flex-col gap-4">
            {Object.entries(properties.text).map(([prop, val]) => (
              <div className="flex flex-col gap-2" key={`property-${prop}`}>
                <label htmlFor={`property-${prop}`}>{prop}</label>
                {isChoice(val)
                  ? (
                    <Dropdown id={`property-${prop}`} value={val.value} options={val.choices} onChange={e => updateContainingFrame('style', prop, e)} placeholder={prop} />
                    // <select id={`property-${prop}`} value={val.value} onChange={e => updateContainingFrame('text', prop, e)}>
                    //   {val.choices.map(c => <option value={c} key={c}>{c}</option>)}
                    // </select>
                  )

                  : <textarea id={`property-${prop}`} value={val} onChange={e => updateContainingFrame('text', prop, e)}></textarea>
                }
              </div>
            ))}
          </div>
        </>
      )}

      {properties?.style && (
        <>
          <p className="text-xs bg-primary p-1.5 rounded-sm">Style Properties</p>
          <div className="flex flex-col gap-4">
            {Object.entries(properties.style).map(([prop, val]) => (
              <div className="flex flex-col gap-2" key={`property-${prop}`}>
                <label htmlFor={`property-${prop}`}>{prop}</label>
                {
                  isColor(val)
                    ? (
                      <ColorPicker id={`property-${prop}`} value={val.value} onChange={e => updateContainingFrame('style', prop, e)} inline />
                    )
                    : (isChoice(val)
                      ? (
                        <Dropdown id={`property-${prop}`} value={val.value} options={val.choices} onChange={e => updateContainingFrame('style', prop, e)} placeholder={prop} />
                        // <select id={`property-${prop}`} value={val.value} onChange={e => updateContainingFrame('style', prop, e)}>
                        //   {val.choices.map(c => <option value={c} key={c}>{c}</option>)}
                        // </select>
                      )
                      : (
                        <input min={-32768} max={32767} step={4} type={typeof val === 'number' ? 'number' : 'text'} id={`property-${prop}`} value={val as string | number} onChange={e => updateContainingFrame('style', prop, e)} ></input>
                      ))
                }
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}