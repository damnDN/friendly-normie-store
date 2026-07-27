//No Zod needed
import React, { useState } from "react";
import api from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate(); // Hook instantiation
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    field: "",
    password: "",
  });

  const handleChange = (event) => {
    let { name, value } = event.target;

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
      const response = await api.post("/api/v1/users/login", formData);
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

      setFormData({ field: "", password: "" });

      //Dynamic Redirect
      const destination = location.state?.from?.pathname || "/profile";
      navigate(destination, { replace: true });
    } catch (error) {
      console.log(error);
      // Fallback check in case backend error structure varies
      const data = error.response?.data;

      setErrors(
        data?.errors ?? {
          general: data?.message ?? "An error occurred",
        },
      );
      console.log(data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <section className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>

          <p className="mt-1 text-sm text-zinc-400">Sign in to continue.</p>
        </div>{" "}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label
              htmlFor="field"
              className="mb-2 block text-sm font-medium text-zinc-200"
            >
              Username or Email
            </label>{" "}
            <input
              required
              type="text"
              id="field"
              name="field"
              value={formData.field}
              onChange={handleChange}
              autoComplete="username"
              style={{ textTransform: "lowercase" }}
              placeholder="Enter username or email"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />
            {/* Doesn't work */}
            {errors.field && (
              <p className="mt-1 text-sm text-red-400">{errors.field}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="mt-2 block text-sm font-medium text-zinc-200"
            >
              Password
            </label>
            <input
              required
              minLength="8"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              placeholder="Enter password"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password}</p>
            )}
            {errors.general && (
              <p className="mt-1 text-sm text-red-400">{errors.general}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
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
          </div>
        </form>
        <div className="mt-6 border-t border-zinc-800 pt-4 text-center text-sm text-zinc-400">
          New here?
          <Link
            to="/signup"
            className="font-semibold text-pink-400 hover:text-pink-300"
          >
            Create an account
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Login;
