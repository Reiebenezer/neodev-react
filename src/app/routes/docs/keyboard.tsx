export default function References() {
  return (
    <div className="px-4 **:my-4 text-sm">
      <h2 className="text-2xl font-semibold border-b pb-2">Navigation Reference</h2>
      <p>NeoDev supports dual-mode navigation to accommodate different workflows.</p>

      <div className="space-y-4">
        <div className="border p-3 rounded shadow-sm">
          <strong>Default Mode (V)</strong>: Standard pointer for selecting, dragging, and editing block properties.
        </div>
        <div className="border p-3 rounded shadow-sm">
          <strong>Pan Mode (H)</strong>: Enables the Hand tool for navigating large playgrounds without accidentally moving blocks.
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-8">Keyboard Shortcuts</h3>
      <table className="min-w-full text-left mt-4 border-collapse">
        <thead>
          <tr className="border-b bg-gray-50 text-dark">
            <th className="py-2 px-4">Command</th>
            <th className="py-2 px-4">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 px-4"><kbd className="bg-gray-100 text-dark p-1 rounded">Ctrl + +/-</kbd></td>
            <td className="py-2 px-4">Adjust Canvas Zoom</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4"><kbd className="bg-gray-100 text-dark p-1 rounded">Ctrl + 0</kbd></td>
            <td className="py-2 px-4">Reset Canvas Origin</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4"><kbd className="bg-gray-100 text-dark p-1 rounded">Ctrl + P</kbd></td>
            <td className="py-2 px-4">Toggle Preview Panel Visibility</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}