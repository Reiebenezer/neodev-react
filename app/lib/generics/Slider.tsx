import interact from "interactjs";
import { useEffect, useRef, type Dispatch, type HTMLProps, type SetStateAction } from "react";

interface SliderAttributes extends HTMLProps<HTMLDivElement> {
  min: number;
  max: number;
  step: number;
  value: number;
  setValue?: Dispatch<SetStateAction<number>>;
  axis?: 'x' | 'y';
}

export default function Slider({ min, max, step, value, setValue, axis = 'x', ...props }: SliderAttributes) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;
    if (!sliderRef.current) return;

    const { width } = sliderRef.current.getBoundingClientRect();
    const stepIntervalInPixels = (step / (max - min)) * width;

    interact(buttonRef.current)
      .draggable({
        modifiers: [
          interact.modifiers.restrictRect({
            elementRect: {
              top: 0.4,
              left: 0.4,
              bottom: 0.6,
              right: 0.6
            }
          }),
          interact.modifiers.snap({
            targets: [
              interact.createSnapGrid({
                x: stepIntervalInPixels,
                y: 0
              })
            ]
          })
        ],
        startAxis: axis,
        lockAxis: axis,
        listeners: {
          move(e: Interact.DragEvent) {
            const currentStepOffset = ((axis === 'x' ? e.dx : e.dy) / width);
            setValue?.(prev => prev + currentStepOffset);
          }
        }
      })
  }, [buttonRef, sliderRef]);

  return (
    <div {...props} className={`flex gap-2 items-center min-w-48 ${props.className}`}>
      <span className="text-sm px-2">{min}</span>
      <div className="flex-1 bg-violet-400 h-1 relative flex items-center" ref={sliderRef}>
        <button style={{ transform: `translate3d(${axis === 'x' ? value: 0}px, 0, 0)`}} className="size-6 bg-blue-500 border-2 border-white rounded-full" ref={buttonRef}></button>
      </div>
      <span className="text-sm px-2">{max}</span>
    </div>
  );
}