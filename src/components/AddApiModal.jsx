import { useEffect, useState } from "react"
import { getProjects,createApi } from "../services/apiService"

export default function AddApiModal({ open, onClose, refresh, projectId }) {

  const [projects, setProjects] = useState([])

  const [form, setForm] = useState({
    project_id: projectId || "",
    name: "",
    endpoint_url: "",
    method: "GET",
    expected_status: 200,
    interval_seconds: 60
  })

  useEffect(() => {

    const fetchProjects = async () => {
      const res = await getProjects()
      setProjects(res.data)
    }

    fetchProjects()

  }, [])

  const handleSubmit = async () => {

    await createApi(form)

    refresh()
    onClose()

  }

  if (!open) return null

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-xl p-6 w-400px">

        <h2 className="text-lg font-semibold mb-4">
          Add API Endpoint
        </h2>

        <div className="space-y-3">

          <select
            value={form.project_id}
            onChange={(e) => setForm({...form, project_id: e.target.value})}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option>Select Project</option>

            {projects.map(p => (

              <option key={p.id} value={p.id}>
                {p.name}
              </option>

            ))}

          </select>

          <input
            placeholder="API Name"
            className="w-full border border-gray-300 rounded p-2"
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />

          <input
            placeholder="Endpoint URL"
            className="w-full border border-gray-300 rounded p-2"
            onChange={(e)=>setForm({...form,endpoint_url:e.target.value})}
          />

          <select
            className="w-full border border-gray-300 rounded p-2"
            onChange={(e)=>setForm({...form,method:e.target.value})}
          >

            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>

          </select>

          <input
            type="number"
            placeholder="Expected Status"
            className="w-full border border-gray-300 rounded p-2"
            onChange={(e)=>setForm({...form,expected_status:e.target.value})}
          />

          <input
            type="number"
            placeholder="Interval Seconds"
            className="w-full border border-gray-300 rounded p-2"
            onChange={(e)=>setForm({...form,interval_seconds:e.target.value})}
          />

        </div>

        <div className="flex justify-end gap-2 mt-4">

          <button
            onClick={onClose}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-3 py-2 rounded"
          >
            Save
          </button>

        </div>

      </div>

    </div>

  )
}