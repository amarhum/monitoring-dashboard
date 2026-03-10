import API from "../utils/api"

export const getDashboardStats = () => {
  return API.get("/dashboard/stats")
}

export const getRequestChart = () => {
  return API.get("/dashboard/request-chart")
}

export const getDeviceAlerts = (page = 1) => {
  return API.get(`/dashboard/device-alerts?page=${page}`)
}