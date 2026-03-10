import { Bell } from "lucide-react"

export default function Topbar() {
  return (
    <div className="flex justify-between items-center mb-6">

      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 text-sm">
          Welcome back! Here's what's happening with your projects.
        </p>
      </div>

      <div className="flex items-center gap-4">

        <input
          className="border rounded-lg px-4 py-2 w-64"
          placeholder="Search projects..."
        />

        <Bell className="text-gray-600"/>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
          + New Project
        </button>

      </div>

    </div>
  )
}