export default function StatCard({ title, value }) {

  return (

    <div className="bg-gray-50 border rounded-xl p-4">

      <p className="text-xs text-gray-400 mb-1">
        {title}
      </p>

      <p className="font-semibold">
        {value}
      </p>

    </div>

  )
}