import { useState } from "react";
import PageWrapper from "../../components/common/PageWrapper";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [bought, setBought] = useState("");
  const [sold, setSold] = useState("");

  const handleAddProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      bought: Number(bought),
      sold: Number(sold),
    };

    setProducts([...products, newProduct]);

    // reset form
    setName("");
    setBought("");
    setSold("");
  };

  const topProduct =
    products.length > 0
      ? products.reduce((a, b) => (b.sold > a.sold ? b : a))
      : null;

  return (
    <PageWrapper
      title="Product Summary"
      subtitle="Enter bought vs sold quantities to track performance"
    >
      {/* ADD PRODUCT FORM */}
      <form
        onSubmit={handleAddProduct}
        className="bg-white p-6 rounded-xl shadow mb-8 max-w-xl"
      >
        <h3 className="font-semibold mb-4">Add Product</h3>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="border p-3 w-full rounded mb-3"
          required
        />

        <input
          value={bought}
          onChange={(e) => setBought(e.target.value)}
          type="number"
          placeholder="Quantity Bought"
          className="border p-3 w-full rounded mb-3"
          required
        />

        <input
          value={sold}
          onChange={(e) => setSold(e.target.value)}
          type="number"
          placeholder="Quantity Sold"
          className="border p-3 w-full rounded mb-4"
          required
        />

        <button className="bg-purple-600 text-white px-5 py-2 rounded">
          Add Product
        </button>
      </form>

      {/* INSIGHT */}
      {topProduct && (
        <div className="bg-green-100 p-4 rounded mb-6">
          <b>Top Selling Product:</b> {topProduct.name}
        </div>
      )}

      {/* PRODUCT CARDS */}
      <div className="grid md:grid-cols-2 gap-6">
        {products.map((p, i) => {
          const left = p.bought - p.sold;

          return (
            <div
              key={i}
              className="bg-white p-5 rounded-xl shadow"
            >
              <h4 className="font-semibold">{p.name}</h4>
              <p>Bought: {p.bought}</p>
              <p>Sold: {p.sold}</p>
              <p className="mt-2 font-medium">
                Left in stock:{" "}
                <span className={left <= 10 ? "text-red-600" : "text-green-600"}>
                  {left}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
}
