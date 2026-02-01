export default function SalesAnalytics() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Sales Analytics</h1>

      <input className="w-full border p-3 mb-3 rounded" placeholder="Sales Before Campaign" />
      <input className="w-full border p-3 mb-3 rounded" placeholder="Sales During Campaign" />
      <input className="w-full border p-3 mb-3 rounded" placeholder="Sales After Campaign" />

      <button className="bg-blue-600 text-white px-6 py-3 rounded w-full">
        Analyze
      </button>

      <div className="mt-6 bg-green-100 p-4 rounded">
        <p className="font-semibold">Sales increased by 35%</p>
      </div>
    </div>
  );
}
