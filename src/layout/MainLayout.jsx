import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

export default function MainLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (

    <div className="min-h-screen bg-slate-100">

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <main
        className={`transition-all duration-300
        ${sidebarOpen ? "ml-64" : "ml-20"}`}
      >

        <Outlet />

      </main>

    </div>

  )

}