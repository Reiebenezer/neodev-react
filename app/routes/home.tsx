import Vector from '@reiebenezer/ts-utils/vector';
import { Link } from 'react-router';
import { createTemplateBlock } from '~/lib/playground/Block';
import Frame from "~/lib/playground/Frame";

export default function Home() {
  const randomScrnDim = Vector.from(
    Math.floor(screen.availWidth * Math.random()),
    Math.floor(screen.availHeight * Math.random()),
  )

  return (
    <div className="fixed inset-0 ">
      <div className="min-h-full container mx-auto pt-64 flex flex-col items-center">
        <h1 className="text-7xl md:text-9xl font-bold">NeoDev</h1>
        <p className="my-12">Learning Web Development, Without the Code.</p>
        <Link className="mt-16 px-6 py-3 rounded-lg bg-primary text-sm" to="/playground">Open Playground</Link>
      </div>
    </div>
  );
}
