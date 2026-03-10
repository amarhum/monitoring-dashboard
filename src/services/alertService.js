import API from "../utils/api"

// Ambil semua alert
export const getAllAlerts = () => API.get("/alerts")

// Ambil alert berdasarkan project
export const getAlertsByProject = (projectId) => API.get(`/alerts/project/${projectId}`)

// (Optional) Buat alert baru
export const createAlert = (data) => API.post("/alerts", data)