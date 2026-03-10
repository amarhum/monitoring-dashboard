import { useEffect, useState } from "react"
import { getProjects } from "../services/projectApi"
import ProjectCard from "../components/ProjectCard"
import AddProjectModal from "../components/AddProjectModal"
import EditProjectModal from "../components/EditProjectModal"

export default function Projects() {

  const [projects, setProjects] = useState([])
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)



  const fetchProjects = async () => {

    const res = await getProjects()
    setProjects(res.data)

  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleDelete = (id) => {

    setProjects(prev => prev.filter(p => p.id !== id))

  }

  const handleEdit = (project) => {

    setSelectedProject(project)
    setOpenEditModal(true)

  }

  return (

    <div className="p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-2xl font-bold">
            Projects
          </h1>

          <p className="text-gray-500 text-sm">
            Monitor all projects across your organization.
          </p>

        </div>

        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Project
        </button>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-6">

        {projects.map((p) => (

          <ProjectCard
            key={p.id}
            project={p}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />

        ))}

      </div>

      <AddProjectModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        refresh={fetchProjects}
      />

      <EditProjectModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        project={selectedProject}
        refresh={fetchProjects}
      />

    </div>

  )
}