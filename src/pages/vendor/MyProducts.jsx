import { useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  const addProduct = () => {
    setProducts([
      ...products,
      { name: "Sample Product", bought: 100, sold: 70 },
    ]);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Product Summary</h2>

      <button
        onClick={addProduct}
        className="bg-purple-600 text-white px-4 py-2 mb-4"
      >
        Add Product
      </button>

      {products.map((p, i) => (
        <div key={i} className="border p-3 mb-2">
          <p><b>{p.name}</b></p>
          <p>Bought: {p.bought}</p>
          <p>Sold: {p.sold}</p>
        </div>
      ))}
    </div>
  );
}
