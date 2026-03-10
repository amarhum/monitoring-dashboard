import API from "../utils/api"

// Ambil detail project berdasarkan ID
export const getProjectById = (id) => API.get(`/projects/${id}`);