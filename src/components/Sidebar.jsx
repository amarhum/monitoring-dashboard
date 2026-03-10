import {
  LayoutDashboard,
  Folder,
  Server,
  Cpu,
  Router,
  Bell,
  BarChart3,
  Settings,
  ChevronLeft
} from "lucide-react"

import { NavLink } from "react-router-dom"

export default function Sidebar({ open, setOpen }) {

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Projects", icon: Folder, path: "/projects" },
    { name: "APIs", icon: Server, path: "/api" },
    { name: "Alerts", icon: Bell, path: "/alerts" },
    { name: "Analytics", icon: BarChart3, path: "/analytics" },
    { name: "Settings", icon: Settings, path: "/settings" }
  ]

  return (
    <div
      className={`fixed h-screen bg-slate-900 text-white flex flex-col transition-all duration-300
      ${open ? "w-64" : "w-20"}`}
    >

      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b border-slate-800">

        {open && (
          <span className="text-xl font-semibold">
            MonitoringHub
          </span>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="p-1 hover:bg-slate-800 rounded"
        >
          <ChevronLeft
            className={`transition-transform ${!open ? "rotate-180" : ""}`}
            size={20}
          />
        </button>

      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1">

        {menu.map((item, index) => {

          const Icon = item.icon

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={18} />

              {open && item.name}
            </NavLink>
          )
        })}

      </nav>

      {/* Footer */}
      {open && (
        <div className="p-4 border-t border-slate-800 text-sm text-gray-400">
          Monitoring System v1
        </div>
      )}

    </div>
  )
}