import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ApiCard from "../components/ApiCard"
import AddApiModal from "../components/AddApiModal"
import { getApisByProject } from "../services/apiService"

export default function ProjectApis() {

  const { projectId } = useParams()

  const [apis, setApis] = useState([])
  const [openAddModal, setOpenAddModal] = useState(false)

  const fetchApis = async () => {

    if (!projectId) return

    try {

      const res = await getApisByProject(projectId)

      if (res.data.success) {
        setApis(res.data.data)
      }

    } catch (error) {
      console.error("Failed to fetch APIs:", error)
    }

  }

  const totalRequests = apis.reduce(
  (sum, api) => sum + (api.total_requests || 0),
  0
  )

  const getRequests = apis
    .filter(api => api.method === "GET")
    .reduce((sum, api) => sum + (api.total_requests || 0), 0)

  const postRequests = apis
    .filter(api => api.method === "POST")
    .reduce((sum, api) => sum + (api.total_requests || 0), 0)

  const totalEndpoints = apis.length

  useEffect(() => {

    fetchApis()

    const interval = setInterval(() => {
      fetchApis()
    }, 30000)

    return () => clearInterval(interval)

  }, [projectId])

  return (

    <div className="p-8">

      <div className="flex justify-between mb-6">

        <div>

          <h1 className="text-2xl font-bold">
            API Endpoints
          </h1>

          <p className="text-gray-500 text-sm">
            Monitor API health and response metrics
          </p>

        </div>

        {/* <button
          onClick={() => setOpenAddModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          + Add API
        </button> */}


      </div>
      <div className="grid grid-cols-4 gap-6 mb-6">

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Endpoints
          </p>
          <h2 className="text-2xl font-bold text-purple-600 mt-2">
            {totalEndpoints}
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Requests
          </p>
          <h2 className="text-2xl font-bold text-indigo-600 mt-2">
            {totalRequests}
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            GET Requests
          </p>
          <h2 className="text-2xl font-bold text-green-600 mt-2">
            {getRequests}
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            POST Requests
          </p>
          <h2 className="text-2xl font-bold text-blue-600 mt-2">
            {postRequests}
          </h2>
        </div>

      </div>

      <div className="space-y-4">

        {apis.map((api) => (

          <ApiCard
            key={api.id}
            api={api}
          />

        ))}

      </div>

      <AddApiModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        refresh={fetchApis}
        projectId={projectId}
      />

    </div>

  )

}