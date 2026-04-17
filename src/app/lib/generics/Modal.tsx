import { XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { createContext, useState, type ReactNode } from "react";

interface ModalAttributes {
  open(content: ReactNode | ((close: () => void) => ReactNode)): void;
}

export const ModalContext = createContext<ModalAttributes | null>(null);
export default function ModalContextProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<(ReactNode | ((close: () => void) => ReactNode))[]>([]);

  const open = (content: ReactNode | ((close: () => void) => ReactNode)) => {
    setModals(prev => [...prev, content]);
  }

  const close = (i: number) => {
    setModals(prev => [...prev.slice(0, i), ...prev.slice(i + 1)])
  }

  return (
    <ModalContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {modals.map((content, i) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { when: 'afterChildren', duration: 0.2 } }}
            className={`fixed inset-0 size-full z-9999 grid place-items-center bg-black/50 backdrop-blur-md`} key={`modal-${i}`}>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="rounded-xl bg-bg shadow-2xl p-8 relative min-w-sm min-h-48">
              <button className="absolute top-4 right-4 bg-transparent" onClick={() => close(i)}><XIcon /></button>
              {typeof content === 'function' ? content(() => close(i)) : content}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}