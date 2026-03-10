import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import StatCard from "../components/StatCardDetailProject"
import DeviceCard from "../components/DeviceCard"

import { getDevicesByProject } from "../services/deviceService"
import { getProjectById } from "../services/projectService"

export default function ProjectDetail() {

  const { id } = useParams()

  const [project, setProject] = useState(null)
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function fetchData() {

      try {

        const [projectRes, deviceRes] = await Promise.all([
          getProjectById(id),
          getDevicesByProject(id)
        ])

        setProject(projectRes.data)
        setDevices(deviceRes.data)

      } catch (err) {

        console.error("Failed loading project detail", err)

      } finally {

        setLoading(false)

      }

    }

    fetchData()

  }, [id])


  if (loading) return <div className="p-8">Loading...</div>

  if (!project) return <div className="p-8">Project not found</div>


  /* DEVICE STATS*/

  const totalDevices = devices.length

  const online = devices.filter(d => d.status === "active").length

  const warning = devices.filter(d => d.status === "error").length

  const offline = devices.filter(d => d.status === "inactive").length

  const maintenance = devices.filter(d => d.status === "maintenance").length

  const alerts = devices.filter(
    d => d.last_data?.alarm?.toLowerCase().includes("open door")
  ).length


  return (

    <div className="p-8">

      {/* BACK */}
      <Link
        to="/projects"
        className="text-gray-500 text-sm mb-4 inline-block"
      >
        ← Back to Projects
      </Link>


      {/* HEADER */}
      <div className="bg-white border border-gray-300 rounded-2xl p-6 mb-6">

        <div className="flex justify-between">

          <div>

            <div className="flex items-center gap-3">

              <h1 className="text-xl font-semibold">
                {project.name}
              </h1>

              <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                Active
              </span>

            </div>

            <p className="text-gray-500 mt-2 max-w-3xl text-sm">
              {project.description}
            </p>

          </div>

          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm">
            {project.category}
          </span>

        </div>


        {/* PROJECT META */}
        <div className="grid  grid-cols-4 gap-4 mt-6">

          <StatCard className="border border-gray-300" title="Start" value={project.start_date || "-"} />
          <StatCard className="border border-gray-300" title="Due" value={project.due_date || "-"} />
          <StatCard className="border border-gray-300" title="Team" value={`${project.team || 0} members`} />
          <StatCard className="border border-gray-300" title="Updated" value={project.updated_at || "-"} />

        </div>

      </div>


      {/* STATS */}
      <div className="grid grid-cols-6 gap-4 mb-6">

        <StatCard title="Total Devices" value={totalDevices} />
        <StatCard title="Online" value={online} />
        <StatCard title="Warning" value={warning} />
        <StatCard title="Offline" value={offline} />
        <StatCard title="Maintenance" value={maintenance} />
        <StatCard title="Active Alerts" value={alerts} />

      </div>


      {/* DEVICE GRID */}
      <div className="grid grid-cols-2 gap-6">

        {devices.map((d) => (

          <DeviceCard
            key={d.id}
            device={d}
          />

        ))}

      </div>

    </div>

  )

}