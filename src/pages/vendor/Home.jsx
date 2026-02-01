import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/common/PageWrapper";

export default function VendorHome() {
  const navigate = useNavigate();

  // dummy posts for now
  const posts = [
    {
      id: 1,
      product: "Skincare Serum",
      status: "Active",
    },
    {
      id: 2,
      product: "Fitness Band",
      status: "Closed",
    },
  ];

  return (
    <PageWrapper
      title="My Marketing Posts"
      subtitle="Manage your influencer marketing campaigns"
    >
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/vendor/create")}
          className="bg-purple-600 text-white px-5 py-2 rounded"
        >
          + Create Post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">No posts yet</h2>
          <p className="text-gray-500 mt-2">
            Create your first post to reach influencers.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h3 className="font-semibold">{post.product}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Status: {post.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
