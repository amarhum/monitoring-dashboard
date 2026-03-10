import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProjects } from "../services/projectApi"

export default function ApiProjects() {

  const [projects, setProjects] = useState([])
  const navigate = useNavigate()

  const fetchProjects = async () => {
    const res = await getProjects()
    setProjects(res.data)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (

    <div className="p-8">

      <div className="mb-6">

        <h1 className="text-2xl font-bold">
          API Monitoring
        </h1>

        <p className="text-gray-500 text-sm">
          Select a project to view API endpoints.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-6">

        {projects.map((p) => (

          <div
            key={p.id}
            onClick={() => navigate(`/apis/${p.id}`)}
            className="border  border-gray-300 rounded-xl p-6 hover:shadow cursor-pointer bg-white"
          >

            <h2 className="font-semibold text-lg">
              {p.name}
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Click to view API endpoints
            </p>

          </div>

        ))}

      </div>

    </div>

  )
}