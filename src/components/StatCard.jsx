export default function StatCard({ title, value }) {

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-300">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="text-2xl font-bold mt-2">
        {value}
      </h2>

    </div>
  )

}