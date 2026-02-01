import { useState } from "react";
import PageWrapper from "../../components/common/PageWrapper";

export default function CreateCampaign() {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Post created (prototype)");
  };

  return (
    <PageWrapper
      title="Create Marketing Post"
      subtitle="Describe the product you want influencers to promote"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-5 max-w-3xl"
      >
        <div>
          <label className="block font-medium mb-1">
            Product Name
          </label>
          <input
            className="border p-3 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Description
          </label>
          <textarea
            className="border p-3 w-full rounded"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Upload Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={img.preview}
                alt="preview"
                className="h-32 w-full object-cover rounded"
              />
            ))}
          </div>
        )}

        <button className="bg-purple-600 text-white px-6 py-3 rounded">
          Publish Post
        </button>
      </form>
    </PageWrapper>
  );
}
