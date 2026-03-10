import { useEffect, useState } from "react"
import { Bell, CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react"
import { getAllAlerts } from "../services/alertService"

export default function Alerts() {
  const [typeFilter, setTypeFilter] = useState("All")
  const [channelFilter, setChannelFilter] = useState("All")
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await getAllAlerts()
        setAlerts(res.data)
      } catch (err) {
        console.error("Failed to fetch alerts:", err)
      }
    }

    fetchAlerts()
  }, [])

  const getIcon = (type) => {
    switch (type) {
      case "Error":
        return <XCircle className="text-red-500" size={20} />
      case "Warning":
        return <AlertTriangle className="text-yellow-500" size={20} />
      case "Success":
        return <CheckCircle className="text-green-500" size={20} />
      default:
        return <Info className="text-blue-500" size={20} />
    }
  }

  const getIconBg = (type) => {
    switch (type) {
      case "Error":
        return "bg-red-100"
      case "Warning":
        return "bg-yellow-100"
      case "Success":
        return "bg-green-100"
      default:
        return "bg-blue-100"
    }
  }

  // Filter alerts
  const filteredAlerts = alerts.filter((alert) => {
    const typeMatch = typeFilter === "All" || alert.type === typeFilter
    const channelMatch =
      channelFilter === "All" ||
      (channelFilter === "Both" && alert.channel === "Email + Telegram") ||
      alert.channel === channelFilter
    return typeMatch && channelMatch
  })

  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <p className="text-gray-500 text-sm mt-1">
            {alerts.filter(a => a.unread).length} unread notifications · Alert history for all projects
          </p>
        </div>
        <button className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium">
          Mark all as read
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-6">
        <div className="flex border rounded-xl p-1 bg-gray-50">
          {["All", "Error", "Warning", "Success", "Info"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
                typeFilter === t ? "bg-indigo-600 text-white" : "text-gray-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex border rounded-xl p-1 bg-gray-50">
          {["All", "Email", "Telegram", "Both"].map((t) => (
            <button
              key={t}
              onClick={() => setChannelFilter(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
                channelFilter === t ? "bg-indigo-600 text-white" : "text-gray-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ALERT LIST */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className="border border-indigo-200 rounded-xl p-5 flex gap-4 bg-white hover:bg-gray-50"
          >
            {/* ICON */}
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${getIconBg(alert.type)}`}>
              {getIcon(alert.type)}
            </div>

            {/* CONTENT */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-indigo-600">{alert.title}</h3>
                {alert.unread && <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>}
              </div>
              <p className="text-gray-600 text-sm mt-1">{alert.message}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-3">
                <span>{alert.project}</span>
                <span className="flex items-center gap-1">
                  <Bell size={14} />
                  {alert.channel}
                </span>
                <span>{new Date(alert.created_at).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}