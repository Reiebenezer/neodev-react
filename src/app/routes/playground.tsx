import { TransformComponent } from "react-zoom-pan-pinch";
import ContextMenuProvider from "~/lib/generics/ContextMenu";
import ModalContextProvider from "~/lib/generics/Modal";
import Frame from "~/lib/playground/Frame";
import PlaygroundContext from "~/lib/playground/PlaygroundContext";

export default function Playground() {
  return (
    <ModalContextProvider>
      <ContextMenuProvider>
        <PlaygroundContext>
          {frames => (
            <TransformComponent wrapperClass="size-full!" contentClass="relative">
              {frames.map(frame => <Frame {...frame} key={frame.id} />)}
            </TransformComponent>
          )}
        </PlaygroundContext>
      </ContextMenuProvider>
    </ModalContextProvider>
  );
}