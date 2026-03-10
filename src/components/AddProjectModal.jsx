import { useState } from "react"
import { createProject } from "../services/projectApi"
import Swal from "sweetalert2"

export default function AddProjectModal({ open, onClose, refresh }) {

  const [form, setForm] = useState({
    name: "",
    description: "",
    project_url: "",
    api_health_url: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    try {

      await createProject(form)

      Swal.fire({
        icon: "success",
        title: "Project berhasil ditambahkan"
      })

      refresh()
      onClose()

    } catch (error) {

      console.error(error)

      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan project",
        text: error.response?.data?.message || "Terjadi kesalahan server"
      })

    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-420px p-6 shadow-lg">

        <h2 className="text-lg font-semibold mb-4">
          Add Project
        </h2>

        <div className="space-y-3">

          <input
            name="name"
            placeholder="Project Name"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />

          <input
            name="project_url"
            placeholder="Project URL"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />

          <input
            name="api_health_url"
            placeholder="API Health URL"
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
            Create
          </button>

        </div>

      </div>

    </div>
  )
}