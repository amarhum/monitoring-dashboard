// export default function DeviceCard({ device }) {

//   const alarm = device?.last_data?.alarm || "Normal"

//   const statusColor = {
//     active: "bg-green-100 text-green-600",
//     inactive: "bg-gray-100 text-gray-600",
//     error: "bg-red-100 text-red-600",
//     maintenance: "bg-yellow-100 text-yellow-600"
//   }

//   const battery = device?.battery_level ?? "-"
//   const speed = device?.last_data?.speed_kmh ?? "-"
//   const charging = device?.last_data?.is_charging === "1" ? "Yes" : "No"

//   const alarmColor = alarm.toLowerCase().includes("open door")
//     ? "bg-red-100 text-red-600"
//     : "bg-gray-100 text-gray-600"

//   return (

//     <div className="bg-white border border-gray-300 rounded-2xl p-5 hover:shadow-sm transition">

//       <div className="flex justify-between mb-2">

//         <div className="flex items-center gap-2">

//           <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded">
//             {device.type?.toUpperCase()}
//           </span>

//           <span
//             className={`text-xs px-2 py-1 rounded ${statusColor[device.status] || "bg-gray-100 text-gray-600"}`}
//           >
//             {device.status}
//           </span>

//         </div>

//         <span className="text-gray-300">›</span>

//       </div>


//       <h3 className="font-semibold mb-1">
//         {device.name}
//       </h3>

//       <p className="text-gray-400 text-sm mb-4">
//         {device.location}
//       </p>


//       {/* DEVICE METRICS */}

//       <div className="grid grid-cols-3 gap-3">

//         <div className="bg-gray-50 rounded-lg p-3 text-center">

//           <p className="font-semibold">
//             {battery}%
//           </p>

//           <p className="text-xs text-gray-400">
//             Battery
//           </p>

//         </div>

//         <div className="bg-gray-50 rounded-lg p-3 text-center">

//           <p className="font-semibold">
//             {speed}
//           </p>

//           <p className="text-xs text-gray-400">
//             Speed (km/h)
//           </p>

//         </div>

//         <div className="bg-gray-50 rounded-lg p-3 text-center">

//           <p className="font-semibold">
//             {charging}
//           </p>

//           <p className="text-xs text-gray-400">
//             Charging
//           </p>

//         </div>

//       </div>


//       {/* ALARM */}

//       <div className="mt-3 flex justify-between items-center">

//         <span className="text-xs text-gray-400">
//           Alarm
//         </span>

//         <span className={`text-xs px-2 py-1 rounded ${alarmColor}`}>
//           {alarm}
//         </span>

//       </div>

//     </div>

//   )

// }

export default function DeviceCard({ device }) {

  const data = device?.last_data || {}

  const alarm = data?.alarm || "Normal"

  const statusColor = {
    active: "bg-green-100 text-green-600",
    inactive: "bg-gray-100 text-gray-600",
    error: "bg-red-100 text-red-600",
    maintenance: "bg-yellow-100 text-yellow-600"
  }

  /* DEVICE METRICS*/

  const metrics = []

  const battery = device?.battery_level ?? data?.battery

  if (battery !== undefined) {

    metrics.push({
      type: "battery",
      label: "Battery",
      value: battery
    })

  }

  if (data?.speed_kmh !== undefined) {

    metrics.push({
      label: "Speed",
      value: `${data.speed_kmh} km/h`
    })

  }

  if (data?.is_charging !== undefined) {

    metrics.push({
      label: "Charging",
      value: data.is_charging === "1" ? "Yes" : "No"
    })

  }

  if (data?.mac) {

    metrics.push({
      label: "MAC",
      value: data.mac
    })

  }

  if (data?.status && !metrics.find(m => m.label === "Status")) {

    metrics.push({
      label: "Status",
      value: data.status
    })

  }

  if (data?.update_at) {

    metrics.push({
      label: "Last Update",
      value: new Date(data.update_at).toLocaleTimeString()
    })

  }

  /* fallback dynamic metrics */

  Object.keys(data).forEach(key => {

    if (metrics.length >= 3) return

    const ignore = [
      "alarm",
      "speed_kmh",
      "is_charging",
      "battery",
      "raw"
    ]

    if (!ignore.includes(key)) {

      metrics.push({
        label: key,
        value: String(data[key])
      })

    }

  })

  const alarmColor = alarm.toLowerCase().includes("open")
    ? "bg-red-100 text-red-600"
    : "bg-gray-100 text-gray-600"


  return (

    <div className="bg-white border border-gray-300 rounded-2xl p-5 hover:shadow-md hover:border-indigo-300 transition cursor-pointer">

      {/* HEADER */}

      <div className="flex justify-between mb-2">

        <div className="flex items-center gap-2">

          <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded">
            {device.type?.toUpperCase()}
          </span>

          <span
            className={`text-xs px-2 py-1 rounded ${statusColor[device.status] || "bg-gray-100 text-gray-600"}`}
          >
            {device.status}
          </span>

        </div>

        <span className="text-gray-300">›</span>

      </div>


      {/* DEVICE NAME */}

      <h3 className="font-semibold mb-1">
        {device.name}
      </h3>

      <p className="text-gray-400 text-sm mb-4">
        {device.location}
      </p>


      {/* DEVICE METRICS */}

      <div className="grid grid-cols-3 gap-3">

        {metrics.slice(0,3).map((m, i) => (

          <div
            key={i}
            className="bg-gray-50 rounded-lg p-3 text-center"
          >

            {/* BATTERY BAR */}

            {m.type === "battery" ? (

              <div>

                <p className="font-semibold">
                  {m.value ?? "-"}%
                </p>

                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">

                  <div
                    className={`h-2 rounded-full ${
                      m.value > 60
                        ? "bg-green-500"
                        : m.value > 30
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${m.value || 0}%` }}
                  />

                </div>

                <p className="text-xs text-gray-400 mt-1">
                  Battery
                </p>

              </div>

            ) : (

              <>

                <p className="font-semibold break-words">
                  {m.value || "-"}
                </p>

                <p className="text-xs text-gray-400">
                  {m.label}
                </p>

              </>

            )}

          </div>

        ))}

      </div>


      {/* ALARM */}

      <div className="mt-3 flex justify-between items-center">

        <span className="text-xs text-gray-400">
          Alarm
        </span>

        <span className={`text-xs px-2 py-1 rounded ${alarmColor}`}>
          {alarm}
        </span>

      </div>

    </div>

  )

}