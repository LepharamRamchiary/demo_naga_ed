import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-paper py-20">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-display font-bold text-center text-ink">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-sm text-smoke">
          Login to continue your learning journey.
        </p>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-2 text-center text-sm text-chili">
            {error}
          </p>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-turmeric"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-turmeric"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-chili py-3 font-semibold text-paper hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-chili font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
