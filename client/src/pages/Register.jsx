import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(formData);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-paper py-20">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-display font-bold text-center text-ink">
          Create Account
        </h1>

        <p className="mt-2 text-center text-sm text-smoke">
          Start learning with DemoEdu today.
        </p>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-2 text-center text-sm text-chili">
            {error}
          </p>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-turmeric"
          />

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-turmeric"
          />

          <textarea
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full rounded-xl border px-4 py-3 outline-none resize-none focus:border-turmeric"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-turmeric"
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-chili py-3 font-semibold text-paper hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Register"}
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-chili font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
