import { Link, Outlet } from "react-router";
import { NavLink } from "react-router";

const menuItems = [
  {
    section: "Introduction",
    links: [
      { name: "Welcome to NeoDev", path: "/docs/welcome" },
    ],
  },
  {
    section: "The Environment",
    links: [
      { name: "Interface Architecture", path: "/docs/interface" },
    ],
  },
  {
    section: "Core Concepts",
    links: [
      { name: "Frames & Blocks", path: "/docs/frames-and-blocks" },
      { name: "Styling & Style Blocks", path: "/docs/style-blocks" },
    ],
  },
  {
    section: "Advanced Features",
    links: [
      { name: "Frame Imports", path: "/docs/imports" },
    ],
  },
  {
    section: "Reference",
    links: [
      { name: "Keyboard Shortcuts", path: "/docs/keyboard" },
    ],
  },
];

export default function DocsSidebar() {
  return (
    <div className="flex *:p-8 fixed inset-0">
      <nav className="w-xs p-4 pr-12 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-indigo-600">NeoDev Docs</h2>
        </div>

        <div className="space-y-8 flex-1">
          {menuItems.map((group) => (
            <div key={group.section}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {group.section}
              </h3>
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-sm transition-colors ${isActive
                          ? "bg-indigo-100 text-indigo-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link to="/" className="mt-full" data-button>Return to Homepage</Link>
      </nav>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}