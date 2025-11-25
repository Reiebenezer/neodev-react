import type { HTMLProps } from "react";

interface UnitSelectorProps extends HTMLProps<HTMLInputElement> {
  unit: 'pixels' | 'rem' | 'vh';
}

export default function UnitSelector({ unit, value, onChange, ...props}: UnitSelectorProps) {
  
  return (
    <div className="flex">
      <input type="number" {...props} value={value} />
      
    </div>
  );
}