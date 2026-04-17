// components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const { user } = useSelector((s) => s.auth);

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-5 flex flex-col">

      
      <h2 className="text-2xl font-bold mb-8">UMS</h2>

      
      <nav className="flex flex-col gap-2">

{(user?.role === "admin" || user?.role === "manager") && (
  <NavLink
    to="/"
    className="px-3 py-2 rounded-lg hover:bg-gray-800 transition"
  >
    Dashboard
  </NavLink>
)}

        {(user?.role === "admin" || user?.role === "manager") && (
          <NavLink
            to="/users"
            className="px-3 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Users
          </NavLink>
        )}

        <NavLink
          to="/profile"
          className="px-3 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Profile
        </NavLink>

      </nav>

      
      <div className="mt-auto text-sm text-gray-400">
        Logged in as: {user?.role}
      </div>

    </div>
  );
}