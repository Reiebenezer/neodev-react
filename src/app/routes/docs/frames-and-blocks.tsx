export default function FramesAndBlocks() {
  return (
    <div className="px-4 **:my-4 text-sm">
      <h1 className="text-3xl font-bold border-b pb-2">Frames & Blocks</h1>
      <p className="text-lg text-gray-600">
        Understanding the relationship between Frames and Blocks is essential to mastering NeoDev. Together, they form the Document Object Model (DOM) of your website.
      </p>



      <h2 className="text-2xl font-semibold mt-8">What are Blocks?</h2>
      <p>
        Blocks are the atomic units of your project. Every piece of visible content on your website—be it a headline, an image, or a button—is represented by a Block.
      </p>
      <ul className="list-disc ml-8">
        <li><strong>Content Blocks:</strong> These hold data, such as the <em>Paragraph</em> or <em>Heading</em> blocks.</li>
        <li><strong>Functional Blocks:</strong> These provide utility, such as the <em>Link</em> or <em>Spacer</em> blocks.</li>
        <li><strong>Style Blocks:</strong> Special blocks that modify the appearance of the blocks placed immediately above them.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8">What are Frames?</h2>
      <p>
        Frames are structural containers. While a Block holds content, a Frame defines <strong>where</strong> that content exists in space and how it is grouped.
      </p>

      <h3 className="text-xl font-medium mt-6 text-indigo-600">Frame Types</h3>
      <div className="space-y-4">
        <div className="p-4 border rounded *:my-2! shadow-sm">
          <h4 className="font-bold">The Main Frame (Root)</h4>
          <p>This is the "Top-Level" container. In web development terms, this is your <code>&lt;body&gt;</code> tag. Only content inside the Main Frame is rendered in the live Preview Panel.</p>
        </div>
        <div className="p-4 border rounded *:my-2! shadow-sm">
          <h4 className="font-bold">Template Frames</h4>
          <p>These act as libraries or "bins." You can create custom Template Frames to organize your components before dragging them into your Main Frame.</p>
        </div>
        <div className="p-4 border rounded *:my-2! shadow-sm">
          <h4 className="font-bold">Nested Frames</h4>
          <p>Through <strong>Imports</strong>, you can place a Frame inside another Frame. This is the foundation of modular web design, allowing you to build complex layouts like grids or navigation menus.</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-8 text-red-600">Visualizing the Hierarchy</h2>
      <p>
        Think of a Frame as a <strong>folder</strong> and Blocks as the <strong>files</strong> inside that folder.
      </p>
      <div className="border border-gray-100 p-6 rounded-lg font-mono text-xs">
        <div>Frame: "Header"</div>
        <div className="ml-6 border-l-2 border-gray-300 pl-4">
          <div>↳ Block: "Site Logo" (Image)</div>
          <div>↳ Block: "Navigation" (Link)</div>
          <div>↳ Block: "Modern Font" (Style Block)</div>
        </div>
      </div>

      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 my-6 *:my-2!">
        <h4 className="font-bold text-indigo-800 flex items-center">
          <span className="mr-2 my-0!">🔧</span> Pro Tip: Frame Labels
        </h4>
        <p className="text-indigo-700">
          Always label your frames (Right-click &gt; Edit Frame Label). As your project grows to dozens of frames, clear labeling helps you navigate the Import list much faster.
        </p>
      </div>
    </div>
  );
}