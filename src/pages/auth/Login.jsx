import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Assume user already registered
    const role = localStorage.getItem("role");

    if (!role) {
      alert("Please register first");
      return;
    }

    navigate("/redirect");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          required
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded">
          Login
        </button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
