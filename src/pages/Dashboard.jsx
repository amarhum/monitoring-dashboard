import { useEffect, useState } from "react"
import {
  Bell,
  Folder,
  CheckCircle,
  AlertTriangle
} from "lucide-react"

import {
  getDashboardStats,
  getRequestChart,
  getDeviceAlerts
} from "../services/dashboardService"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts"

export default function Dashboard() {

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0
  })

  const [projects, setProjects] = useState([])
  const [chartData, setChartData] = useState([])
  const [alertDevices, setAlertDevices] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {

  const fetchDashboard = async () => {

    try {

      // FETCH STATS

      const statsRes = await getDashboardStats()

      if (statsRes.data.success) {
        setStats(statsRes.data.data)
      }

      // FETCH CHART

      const chartRes = await getRequestChart()

      if (chartRes.data.success) {
        setChartData(chartRes.data.data)
      }

      // FETCH DEVICE ALERTS

      const alertRes = await getDeviceAlerts(page)

      if (alertRes.data.success) {

        const devices = alertRes.data.data.map(d => ({
          project: d.project,
          name: d.device,
          status: d.status
        }))

        setAlertDevices(devices)
        setTotalPages(alertRes.data.pagination.total_pages)

      }

    } catch (err) {

      console.error("Dashboard fetch error:", err)

    }

  }

  fetchDashboard()

  const interval = setInterval(() => {
    fetchDashboard()
  }, 30000)

  return () => clearInterval(interval)

}, [page])


  return (

    <div className="p-8 bg-slate-100 min-h-screen">

      {/* HEADER */}
      <div className="flex items-start justify-between mb-8">

        <div>

          <p className="text-sm text-indigo-500 font-semibold mb-1">
            Live Monitoring
          </p>

          <h1 className="text-3xl font-bold mb-1">
            Dashboard
          </h1>

          <p className="text-gray-500 text-sm">
            Real-time overview of all API projects.
          </p>

        </div>

        <button className="flex items-center gap-2 bg-white border-gray-200 border px-4 py-2 rounded-xl shadow-sm">

          <Bell size={18}/>

          Notifications

          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">

            {alertDevices.length}

          </span>

        </button>

      </div>

      {/* KPI */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow-sm border">

          <Folder className="text-indigo-500 mb-3"/>

          <h2 className="text-3xl font-bold">
            {stats.total}
          </h2>

          <p className="text-gray-500 text-sm">
            Total Projects
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">

          <CheckCircle className="text-green-500 mb-3"/>

          <h2 className="text-3xl font-bold">
            {stats.active}
          </h2>

          <p className="text-gray-500 text-sm">
            Healthy Projects
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">

          <AlertTriangle className="text-red-500 mb-3"/>

          <h2 className="text-3xl font-bold">
            {stats.inactive}
          </h2>

          <p className="text-gray-500 text-sm">
            Down Projects
          </p>

        </div>

      </div>

      {/* DEVICE ALERTS */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">

        <h3 className="font-semibold mb-4 text-red-600">
          Device Alerts
        </h3>

        {alertDevices.length === 0 ? (

          <p className="text-gray-500 text-sm">
            No alerts. All devices running normally.
          </p>

        ) : (

          <>
            {/* GRID CARD */}
            <div className="grid grid-cols-3 gap-4 cursor-pointer">

              {alertDevices.map((device, i) => (

                <div
                  key={i}
                  className="bg-white p-4 rounded-xl border border-gray-300 flex justify-between items-center hover:shadow-md transition"
                >

                  <div>

                    <p className="font-medium text-sm">
                      {device.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {device.project}
                    </p>

                  </div>

                  <span className="text-red-500 text-sm font-semibold">
                    {device.status}
                  </span>

                </div>

              ))}

            </div>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-6 mt-6">

              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-white border rounded-lg shadow-sm disabled:opacity-40"
              >
                Prev
              </button>

              <span className="text-sm text-gray-600">
                Page {page} / {totalPages}
              </span>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 bg-white border rounded-lg shadow-sm disabled:opacity-40"
              >
                Next
              </button>

            </div>

          </>
        )}

      </div>

      {/* REQUEST CHART */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">

        <div className="flex justify-between items-center mb-4">

          <h3 className="font-semibold text-lg">
            API Requests Activity
          </h3>

          <span className="text-sm text-gray-400">
            per project
          </span>

        </div>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart
              data={chartData}
              barGap={6}
            >

              <defs>

                <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.3}/>
                </linearGradient>

              </defs>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
              />

              <YAxis />

              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                }}
              />

              <Legend />

              <Bar
                dataKey="requests"
                fill="url(#colorReq)"
                radius={[6,6,0,0]}
                animationDuration={1200}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  )

}