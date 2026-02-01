import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("influencer");

  const handleRegister = (e) => {
    e.preventDefault();

    // Save role only (prototype)
    localStorage.setItem("role", role);

    navigate("/redirect");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-3 rounded"
        >
          <option value="influencer">Influencer</option>
          <option value="vendor">Vendor</option>
        </select>

        <button className="w-full bg-blue-600 text-white py-3 rounded">
          Create Account
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
