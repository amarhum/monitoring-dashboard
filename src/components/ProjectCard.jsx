import { deleteProject } from "../services/projectApi"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getDeviceCountByProject } from "../services/deviceService"

export default function ProjectCard({ project, onDelete, onEdit }) {

  const navigate = useNavigate()

  const [deviceCount, setDeviceCount] = useState(0)

  useEffect(() => {
    async function loadCount() {
      const res = await getDeviceCountByProject(project.id)
      setDeviceCount(res.data.total_devices)
    }
    loadCount()
  }, [project.id])

  const statusColor = {
    active: "bg-green-100 text-green-700",
    maintenance: "bg-yellow-100 text-yellow-700",
    inactive: "bg-red-100 text-red-700"
  }

  const handleDelete = async (e) => {

    e.stopPropagation()

    const result = await Swal.fire({
      title: "Delete Project?",
      text: "Project will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Delete"
    })

    if (!result.isConfirmed) return

    try {

      await deleteProject(project.id)

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Project deleted successfully",
        timer: 1500,
        showConfirmButton: false
      })

      if (onDelete) onDelete(project.id)

    } catch {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete project"
      })

    }
  }

  return (

    <div
      onClick={() => navigate(`/projects/${project.id}`)}
      className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 hover:-translate-y-0.5 transition-all cursor-pointer"
    >

      {/* HEADER */}
      <div className="flex justify-between mb-3">

        <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor[project.status] || "bg-gray-100 text-gray-600"}`}>
          {project.status || "unknown"}
        </span>

        <div className="flex gap-2">

          {/* OPEN URL */}
          {project.project_url && (
            <a
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md text-gray-600"
            >
              Open
            </a>
          )}

          {/* EDIT */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit && onEdit(project)
            }}
            className="px-2 py-1 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-md"
          >
            Edit
          </button>

          {/* DELETE */}
          <button
            onClick={handleDelete}
            className="px-2 py-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 rounded-md"
          >
            Delete
          </button>

        </div>
      </div>

      {/* TITLE */}
      <h2 className="text-lg font-semibold text-indigo-700">
        {project.name}
      </h2>

      {/* DESCRIPTION */}
      <p className="text-gray-500 text-sm mt-1">
        {project.description}
      </p>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-400">

        <span>{deviceCount || 0} devices</span>

        <span>
          {project.createdAt
            ? new Date(project.createdAt).toLocaleDateString()
            : "-"
          }
        </span>

      </div>

    </div>
  )
}