import interact from "interactjs";
import { useEffect, useRef, type Dispatch, type HTMLProps, type SetStateAction } from "react";

interface SliderAttributes extends Omit<HTMLProps<HTMLDivElement>, 'onChange'> {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange?: (val: number) => void
  axis?: 'x' | 'y';
}

export default function Slider({ min, max, step, value, onChange, axis = 'x', ...props }: SliderAttributes) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const percentage = ((value - min) / (max - min)) * 100;

  // console.log(percentage);

  useEffect(() => {
    if (!sliderRef.current) return;

    interact(sliderRef.current).draggable({
      origin: 'self',
      inertia: true,
      lockAxis: 'x',
      modifiers: [
        interact.modifiers.restrict({ restriction: 'self' })
      ],
      listeners: {
        move(e: Interact.DragEvent) {
          const sliderWidth = interact.getElementRect(e.target).width;
          const ratio = e.clientX / sliderWidth;

          const val = min + Math.round(((max - min) * ratio) / step) * step;
          onChange?.(val);
        }
      }
    })

  }, [sliderRef]);

  return (
    <div {...props} className={`flex gap-2 items-center min-w-48 ${props.className}`}>
      <span className="text-sm px-2">{min}</span>
      <div className="flex-1 overflow-visible">
        <div className={`bg-violet-400 h-1 relative flex items-center`} ref={sliderRef}>
          <button className="size-6 bg-blue-500 border-2 border-white rounded-full p-0 absolute -translate-x-1/2" style={{ left: `${percentage}%` }}></button>
        </div>
      </div>
      <span className="text-sm px-2">{max}</span>
    </div>
  );
}