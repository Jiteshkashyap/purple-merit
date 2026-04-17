// components/layout/Navbar.jsx
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/authSlice";

export default function Navbar() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="bg-white px-6 py-4 shadow flex justify-between items-center">

   
      <h1 className="text-lg font-semibold text-gray-700">
        Dashboard
      </h1>

    
      <div className="flex items-center gap-4">

        
        <div className="text-sm text-gray-600">
          {user?.name}
        </div>

        
        <div className="w-9 h-9 bg-blue-600 text-white flex items-center justify-center rounded-full">
          {user?.name?.charAt(0)}
        </div>

        
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </div>
  );
}