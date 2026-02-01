import PageWrapper from "../../components/common/PageWrapper";

export default function VendorDashboard() {
  return (
    <PageWrapper
      title="Business Dashboard"
      subtitle="Overview of sales and AI suggestions"
    >
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Products</p>
          <h2 className="text-2xl font-bold">6</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Units Sold</p>
          <h2 className="text-2xl font-bold">420</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Profit/Loss</p>
          <h2 className="text-2xl font-bold text-green-600">
            +₹12,000
          </h2>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-2">
          💡 Gemini Suggestions
        </h3>
        <p className="text-gray-600">
          Based on your sales data, influencer marketing
          has positively impacted your top products.
          Consider continuing similar campaigns.
        </p>
      </div>
    </PageWrapper>
  );
}
