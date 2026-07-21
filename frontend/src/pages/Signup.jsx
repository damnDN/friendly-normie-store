//No Zod needed
import React, { useState } from "react";
import api from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/features/auth/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate(); // Hook instantiation
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    let { name, value } = event.target;

    if (name === "username") {
      value = value.toLowerCase().replace(/\s/g, "");
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      // inside your try block in Signup.jsx
      const response = await api.post("/api/v1/users", formData);
      const data = response.data;

      // Dispatch data right into Redux state memory
      dispatch(
        setCredentials({
          user: {
            _id: data._id,
            username: data.username,
            email: data.email,
            isAdmin: data.isAdmin,
          },
          accessToken: data.accessToken,
        }),
      );

      console.log("Submitted successfully:", data);

      // Saving initial short-lived Access Token returned from registration endpoint is not needed with Redux applied.
      // localStorage.setItem("accessToken", data.accessToken);

      // Clear the form fields cleanly
      setFormData({ username: "", email: "", password: "" });

      // 🧭 DYNAMIC REDIRECT: Look for a saved location path, or fall back to /profile
      const destination = location.state?.from?.pathname || "/profile";
      navigate(destination, { replace: true });
    } catch (error) {
      console.log(error);
      // Fallback check in case backend error structure varies
      const backendErrors = error.response?.data?.errorMessages || {
        general: error.response?.data?.message || "An error occurred",
      };
      setErrors(backendErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <section className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Create Account</h1>

          <p className="mt-1 text-sm text-zinc-400">Sign up to get started.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-zinc-200"
            >
              Username
            </label>

            <input
              required
              title="3 to 15 lowercase letters or numbers only"
              pattern="[a-z0-9]{3,15}"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              style={{ textTransform: "lowercase" }}
              placeholder="Choose a username"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />

            {errors.username && (
              <p className="mt-1 text-sm text-red-400">{errors.username}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-zinc-200"
            >
              Email
            </label>

            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-zinc-200"
            >
              Password
            </label>

            <input
              required
              minLength={8}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Create a password"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <div className="my-4 flex items-center">
            <div className="h-px flex-1 bg-zinc-700" />
            <span className="px-3 text-sm text-zinc-500">OR</span>
            <div className="h-px flex-1 bg-zinc-700" />
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-3 font-medium text-white transition hover:bg-zinc-700"
            >
              Continue with Google
            </button>

            <button
              type="button"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-3 font-medium text-white transition hover:bg-zinc-700"
            >
              Continue with Discord
            </button>
          </div>
        </form>

        <div className="mt-6 border-t border-zinc-800 pt-4 text-center text-sm text-zinc-400">
          Already have an account?
          <Link
            to="/login"
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Signup;
