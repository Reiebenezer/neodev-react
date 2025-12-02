import { useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { PlaygroundContext } from "./context";
import Vector from "@reiebenezer/ts-utils/vector";
import { isFrameInstanceBlock } from "./Block";
import { useInspect } from "../hooks";
import { useControls } from "react-zoom-pan-pinch";
import interact from "interactjs";
import { motion } from "motion/react";
import { Unit } from "@reiebenezer/ts-utils/unit";

export default function SVGOverlay() {
  const context = useContext(PlaygroundContext);
  const panAndZoomOffset = useControls();
  const [frameInstanceBlockPositions, setFrameInstanceBlockPositions] = useState<Record<string, { position: Vector, refs: Vector[] }>>({});

  /** Handles references from frame to frame */
  useLayoutEffect(() => {
    if (!context?.frames) return;

    const positions: Record<string, { position: Vector, refs: Vector[] }> = {};

    context.frames.forEach(frame => {
      const frameInstanceBlocks = frame.blocks.filter(b => isFrameInstanceBlock(b));

      frameInstanceBlocks.forEach(block => {
        // console.log(block.id);
        const blockElement = document.querySelector(`[data-neodev-block-id=${block.id}]`);
        const referencedFrame = context.frames.find(f => f.id === block.properties!.referencedFrame!);

        // If this element does not exist, return as it is a ghost block (which should not happen)
        if (!blockElement) {
          console.error('This block does not exist in the DOM space.');
          return;
        }

        // If the referenced frame does not exist in the context, we can ignore this specific block
        if (!referencedFrame) {
          console.warn('This instance block is not referencing any existing frame. It will be ignored.');
          return;
        }

        // Create a new array with the referenced frame's position if it does not yet exist in positions
        if (!(referencedFrame.id in positions))
          positions[referencedFrame.id] = {
            position: referencedFrame.position.multiply(Unit(context.scale)).add(Vector.from(
              panAndZoomOffset.instance.transformState.positionX,
              panAndZoomOffset.instance.transformState.positionY,
            )),
            refs: []
          };

        // Get the bounding block's x1 and yCenter position
        const { x, y, width, height } = blockElement.getBoundingClientRect();
        const blockPosition = Vector.from(x + width, y + height / 2);

        // Append the block's position to the referenced frame
        positions[referencedFrame.id].refs.push(blockPosition);
      });
    });

    setFrameInstanceBlockPositions(positions);
  }, [context]);

  // useInspect(frameInstanceBlockPositions, (pos) => {
  //   return Object.fromEntries(Object.entries(pos).map(([id, { position, refs }]) => [id, { position: position.translate, refs: refs.map(vec => vec.translate) }]))
  // });

  return (
    <svg className="fixed inset-0 size-full">
      {
        !(context?.isDragging) &&
        Object.entries(frameInstanceBlockPositions).map(([id, { position, refs }]) =>
          refs.map(blockPos => <Line vec1={position.add(Vector.from(10, 0))} vec2={blockPos} key={id} isActive={context?.focusedFrame === id} />)
        )
      }

    </svg>
  );
}

/** 
 * vec1 is the source path, vec2 is the destination path
 */
function Line({ vec1, vec2, isActive }: { vec1: Vector, vec2: Vector, isActive: boolean }) {
  const PATH_MARGIN = Unit(16);
  const PATH_DASH_LENGTH = 8;
  const [quadrantX, quadrantY] = getQuadrant(vec1, vec2);

  const sourcePoint = `M${vec1.x.value} ${vec1.y.value}`;
  const midPoints = [];

  // Add midpoints based on quadrant
  if (quadrantX < 0 && quadrantY < 0) {
    midPoints.push(
      [vec1.x, vec2.y]
    )
  }

  if (quadrantX > 0 && quadrantY < 0) {
    midPoints.push(
      [vec1.x, vec1.y.subtract(PATH_MARGIN)],
      [vec2.x.add(PATH_MARGIN), vec1.y.subtract(PATH_MARGIN)]
    )
  }

  if (quadrantX > 0 && quadrantY > 0) {
    midPoints.push(
      [vec1.x, vec1.y.subtract(PATH_MARGIN)],
      [vec2.x.add(PATH_MARGIN), vec1.y.subtract(PATH_MARGIN)],
    )
  }

  if (quadrantX < 0 && quadrantY > 0) {
    midPoints.push(
      [vec1.x, vec1.y.subtract(PATH_MARGIN)],
      [vec2.x.add(PATH_MARGIN), vec1.y.subtract(PATH_MARGIN)],
    )
  }

  // Add the final point before destination
  midPoints.push([vec2.x.add(PATH_MARGIN), vec2.y]);

  // Destination point
  const destPoint = `L${vec2.x.value} ${vec2.y.value}`;

  return (
    <motion.path
      d={`${sourcePoint} ${midPoints.map(([x, y]) => `L${x.value} ${y.value}`).join(' ')} ${destPoint}`}
      strokeDasharray={PATH_DASH_LENGTH}
      initial={{ strokeDashoffset: 0 }}
      animate={{
        strokeDashoffset: PATH_DASH_LENGTH * -2,
        transition: {
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }
      }}
      className={`stroke-2 fill-none ${isActive ? 'stroke-violet-500' : 'stroke-gray-700'}`}
    />
  )
}

function getQuadrant(origin: Vector, point: Vector) {
  const delta = point.subtract(origin);
  return [Math.sign(delta.x.value), Math.sign(delta.y.value)];
}