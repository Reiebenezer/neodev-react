export default function FrameImports() {
  return (
    <div className="px-4 **:my-4 text-sm">
      <h2 className="text-2xl font-semibold border-b pb-2">Frame Imports & Modular Design</h2>
      <p>
        In modern web development, "Don't Repeat Yourself" (DRY) is a core principle. NeoDev facilitates this through <strong>Frame Imports</strong>.
      </p>

      <h3 className="text-lg font-semibold">How Imports Work</h3>
      <p>By right-clicking a frame's label and selecting "Import to Frame," you create a reference link between two frames. This allows you to build a complex component once (like a Navigation Bar) and sync it across multiple pages or frames.</p>

      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 *:my-0!">
        <h4 className="font-bold text-red-800 flex items-center *:my-2!">
          <span className="mr-2">🚫</span> Technical Constraint: Circular Imports
        </h4>
        <p className="text-red-700">
          To maintain system stability, NeoDev prevents <strong>Circular Dependencies</strong>. A frame cannot be imported into a hierarchy that eventually leads back to itself. This prevents infinite loops that would otherwise lead to browser memory exhaustion or crashes.
        </p>
      </div>
    </div>
  );
}