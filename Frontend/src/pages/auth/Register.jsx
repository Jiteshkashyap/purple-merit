import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/apiServices";
import { useDispatch } from "react-redux";
import { showError, showSuccess } from "../../utils/toast";
import { hideLoader, showLoader } from "../../redux/uiSlice";
import { useSelector } from "react-redux";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

const loading = useSelector((state) => state.ui.loading);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.password || !form.password.trim()) {
      showError("Password is required");
      return;
    }
    dispatch(showLoader());

    try {
      const res = await registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      showSuccess('Registered succefully')
      navigate("/login");

    } catch (err) {
      showError(err.response?.data?.error || "Register failed");
    }finally{
        dispatch(hideLoader())
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center items-center bg-blue-600 text-white p-10">
        <h1 className="text-4xl font-bold mb-4">Create Account</h1>
        <p className="text-lg text-center max-w-sm">
          Join the platform and manage users with ease.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center bg-gray-100 px-6">

        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Register 🚀
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Create your account
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </div>

      </div>
    </div>
  );
}
