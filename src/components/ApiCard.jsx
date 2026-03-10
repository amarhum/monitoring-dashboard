export default function ApiCard({ api }) {

  const methodColors = {
    GET: "bg-green-100 text-green-700",
    POST: "bg-blue-100 text-blue-700",
    PUT: "bg-yellow-100 text-yellow-700",
    DELETE: "bg-red-100 text-red-700",
  }

  const isHealthy = api.last_status_code === 200

  const statusColor = isHealthy
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700"

  const statusText = isHealthy ? "Healthy" : "Error"

  return (

    <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">

      <div className="flex justify-between items-center mb-4">

        <div className="flex items-center gap-3">

          <span
            className={`text-xs px-2 py-1 rounded font-medium ${methodColors[api.method]}`}
          >
            {api.method}
          </span>

          <div>

            <h3 className="font-semibold text-gray-800">
              {api.name}
            </h3>

            <p className="text-gray-500 text-sm">
              {api.endpoint_url}
            </p>

          </div>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
        >
          {statusText}
        </span>

      </div>

      <div className="grid grid-cols-4 gap-4 text-center">

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="font-semibold">
            {api.last_response_ms || api.avg_response_ms || 0} ms
          </p>
          <p className="text-xs text-gray-500">Response</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="font-semibold">
            {api.endpoint_hits || 0}
          </p>
          <p className="text-xs text-gray-500">Requests</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="font-semibold">
            {api.last_status_code || "-"}
          </p>
          <p className="text-xs text-gray-500">Status</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="font-semibold">
            {api.last_ip || "-"}
          </p>
          <p className="text-xs text-gray-500">Last IP</p>
        </div>

      </div>

    </div>

  )
}