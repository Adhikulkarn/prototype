import { useState } from "react";

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

    // Prototype: just log data
    console.log("Post created with images:", images);

    alert("Post created (prototype)");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Marketing Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-3 w-full rounded"
          placeholder="Product Name"
          required
        />

        <textarea
          className="border p-3 w-full rounded"
          placeholder="Post Description"
          rows={4}
          required
        />

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-2">
            Upload Product Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {images.map((img, index) => (
              <div key={index} className="border rounded p-2">
                <img
                  src={img.preview}
                  alt="preview"
                  className="h-32 w-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}

        <button className="bg-purple-600 text-white px-6 py-3 rounded">
          Create Post
        </button>
      </form>
    </div>
  );
}
