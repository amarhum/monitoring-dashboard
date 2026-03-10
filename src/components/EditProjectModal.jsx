import { useState, useEffect } from "react"
import { updateProject } from "../services/projectApi"
import Swal from "sweetalert2"

export default function EditProjectModal({ open, onClose, project, refresh }) {

  const [form, setForm] = useState({
    name: "",
    description: "",
    project_url: "",
    api_health_url: ""
  })

  useEffect(() => {

    if (project) {
      setForm(project)
    }

  }, [project])

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async () => {

    try {

      await updateProject(project.id, form)

      Swal.fire({
        icon: "success",
        title: "Project updated"
      })

      refresh()
      onClose()

    } catch {

      Swal.fire({
        icon: "error",
        title: "Failed to update project"
      })

    }

  }

  if (!open) return null

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-420px p-6 shadow-lg">

        <h2 className="text-lg font-semibold mb-4">
          Edit Project
        </h2>

        <div className="space-y-3">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />

          <input
            name="project_url"
            value={form.project_url}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />

          <input
            name="api_health_url"
            value={form.api_health_url}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />

        </div>

        <div className="flex justify-end gap-2 mt-5">

          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Update
          </button>

        </div>

      </div>

    </div>

  )
}