import { useState   } from "react";
import { useDispatch , useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { loginUser } from "../../services/apiServices";
import { setUser } from "../../redux/authSlice";
import { showError,showSuccess } from "../../utils/toast";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
      email: "",
      password: "",
    });
  
const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.password || !form.password.trim()) {
    showError("Password is required");
    return;
  }

  try {
    const res = await loginUser({
      email: form.email.trim(),
      password: form.password,
    });
    showSuccess('Login succesfully')
    dispatch(setUser(res.user));
     const role = res.user.role;
    if (role === "admin" || role === "manager") {
      navigate("/");
    } else {
      navigate("/profile");
    }

  } catch (err) {
    showError(err.response?.data?.error|| "Login failed");
  }
};

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      
      <div className="hidden md:flex flex-col justify-center items-center bg-blue-600 text-white p-10">
        <h1 className="text-4xl font-bold mb-4">User Management System</h1>
        <p className="text-lg text-center max-w-sm">
          Manage users, roles, and permissions efficiently with a secure admin panel.
        </p>
      </div>

      
      <div className="flex items-center justify-center bg-gray-100 px-6">

        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

        
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back 
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Please login to your account
          </p>

          
          <form onSubmit={handleSubmit} className="space-y-5">

            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>

          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>

        </div>

      </div>
    </div>
  );
}
