import API from "../utils/api"

// Ambil semua API berdasarkan project
export const getApisByProject = (projectId) => API.get(`/project-apis/project/${projectId}`)

// Tambah API baru
export const createApi = (data) => API.post("/project-apis", data)

// Update API
export const updateApi = (id, data) => API.patch(`/project-apis/${id}`, data)

// Delete API
export const deleteApi = (id) => API.delete(`/project-apis/${id}`)

//get projects for dropdown in add api modal
export const getProjects = () => API.get("/projects")