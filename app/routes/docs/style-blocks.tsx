export default function StyleBlocks() {
  return (
    <div className="px-4 **:my-4 text-sm">
      <h1 className="text-3xl font-bold border-b pb-2">Style Blocks</h1>
      <p className="text-lg text-gray-600">
        Style Blocks are the visual engine of NeoDev. They allow you to apply design properties—such as layout, typography, and color—to your content blocks without writing CSS code.
      </p>

      <h2 className="text-2xl font-semibold mt-8">The Philosophy of Atomic Styling</h2>
      <p>
        Unlike traditional web design where styles are hidden in stylesheets, NeoDev treats styles as <strong>physical objects</strong> in the playground. This approach makes the relationship between a "rule" and a "result" visible at a glance.
      </p>

      <h3 className="text-xl font-medium mt-6 text-indigo-600">How to Apply Styles</h3>
      <p>
        Styling in NeoDev follows a <strong>Vertical Inheritance</strong> rule. To style a block:
      </p>
      <ol className="list-decimal ml-8 space-y-2">
        <li>Locate a Style Block in the <strong>Template Frame</strong> (identified by solid or gradient fills).</li>
        <li>Drag the Style Block and place it <strong>immediately below</strong> a content block or an import block.</li>
        <li>The content block above will automatically detect and inherit the properties of the Style Block.</li>
      </ol>



      <h2 className="text-2xl font-semibold mt-8">Categories of Style Blocks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 my-4">
        <div className="p-4 border rounded bg-blue-50 *:my-2!">
          <h4 className="font-bold text-blue-800">Layout Blocks</h4>
          <p className="text-xs text-dark">Controls <strong>Alignment, Padding, and Spacing</strong>. Use these to move content to the center, left, or right of a frame.</p>
        </div>
        <div className="p-4 border rounded bg-purple-50 *:my-2!">
          <h4 className="font-bold text-purple-800">Typography Blocks</h4>
          <p className="text-xs text-dark">Controls <strong>Font Family, Weight, and Size</strong>. Note that some text blocks have basic typography built-in, but these blocks extend those capabilities.</p>
        </div>
        <div className="p-4 border rounded bg-orange-50 *:my-2!">
          <h4 className="font-bold text-orange-800">Visual Blocks</h4>
          <p className="text-xs text-dark">Controls <strong>Background Colors, Borders, and Rounded Corners</strong>. These are usually the most colorful blocks in the template.</p>
        </div>
        <div className="p-4 border rounded bg-green-50 *:my-2!">
          <h4 className="font-bold text-green-800">Interaction Blocks</h4>
          <p className="text-xs text-dark">Controls <strong>Hover states and Transitions</strong>, allowing you to define how a block looks when a user interacts with it.</p>
        </div>
      </div>

      <h3 className="text-xl font-medium mt-6">Styling Imports</h3>
      <p>
        A powerful feature of NeoDev is the ability to style an <strong>Imported Frame</strong> as if it were a single block.
      </p>
      <ul className="list-disc ml-8">
        <li>If you import a "Navigation Bar" frame into your "Main Frame," you can place an <strong>Alignment</strong> style block under that import to center your entire navigation system instantly.</li>
      </ul>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 *:my-2!">
        <h4 className="font-bold text-blue-800 flex items-center *:my-2!">
          <span className="mr-2">💡</span> Pro Tip: Stackable Styles
        </h4>
        <p className="text-blue-700">
          You can stack multiple Style Blocks under a single content block. For example, place a <strong>Color</strong> block, then an <strong>Alignment</strong> block, then a <strong>Font</strong> block. The content block will combine all three into a single visual result.
        </p>
      </div>
    </div>
  );
}