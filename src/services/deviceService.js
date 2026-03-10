import API from "../utils/api"

// GET

// get all devices
export const getDevices = () => {
  return API.get("/devices")
}

// get devices by project
export const getDevicesByProject = (projectId) => {
  return API.get(`/devices/project/${projectId}`)
}
// get device count by project
export const getDeviceCountByProject = (projectId) => {
  return API.get(`/devices/project/${projectId}/count`)
}

// get device detail
export const getDeviceById = (id) => {
  return API.get(`/devices/${id}`)
}

// CREATE

export const createDevice = (data) => {
  return API.post("/devices", data)
}

// UPDATE

export const updateDevice = (id, data) => {
  return API.patch(`/devices/${id}`, data)
}

// DELETE

export const deleteDevice = (id) => {
  return API.delete(`/devices/${id}`)
}

export default API