import Vector from '@reiebenezer/ts-utils/vector';
import { AnimatePresence, motion } from 'motion/react';
import { createContext, useEffect, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

interface ContextMenuAttributes {
  isOpen?: boolean;
  setOptions: Dispatch<SetStateAction<[ReactNode, () => void][]>>;
  setPosition: Dispatch<SetStateAction<Vector>>;
}

export const ContextMenuContext = createContext<ContextMenuAttributes | null>(null);
export default function ContextMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<[ReactNode, () => void][]>([
    // [<div></div>, () => { }]
  ]);
  const [position, setPosition] = useState(Vector.ZERO);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleContextMenuClick = (e: PointerEvent) => {
      e.preventDefault();

      setPosition(Vector.from(e.pageX, e.pageY));
      setIsOpen(true);
    }

    window.addEventListener('contextmenu', handleContextMenuClick);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenuClick);
    }
  }, []);

  useEffect(() => {
    const closeOnClickOutside = (e: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setOptions([]);
      }
    }

    document.addEventListener('mousedown', closeOnClickOutside);

    return () => {
      document.removeEventListener('mousedown', closeOnClickOutside);
    }

  }, [contextMenuRef])

  return (
    <ContextMenuContext.Provider value={{ isOpen, setOptions, setPosition }}>
      {children}

      <AnimatePresence>
        {isOpen &&
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="rounded-md border border-primary fixed overflow-x-hidden flex flex-col *:rounded-none"
            style={{ top: position.y.px(), left: position.x.px() }}
            ref={contextMenuRef}
          >
            {options.map(([node, action], i) => (
              <button key={`context-menu-${i}`} className="px-4 py-2 bg-bg hover:bg-accent" onClick={() => { action(); setIsOpen(false); setOptions([]); }}>{node}</button>
            ))}
          </motion.div>
        }
      </AnimatePresence>
    </ContextMenuContext.Provider>
  );
}