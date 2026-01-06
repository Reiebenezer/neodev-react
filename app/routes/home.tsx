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
    <div className="fixed inset-0 flex flex-col">
      <div className="flex-1 pt-64 flex flex-col items-center">
        <h1 className="text-7xl md:text-9xl font-bold">NeoDev</h1>
        <p className="my-12">Learning Web Development, Without the Code.</p>
        <div className="flex gap-4  ">
          <Link data-button to="/playground">Open Playground</Link>
          <Link data-button to="/docs" className='bg-transparent'>Docs</Link>
        </div>
      </div>
    </div>
  );
}
