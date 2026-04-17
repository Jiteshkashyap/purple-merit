import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { updateProfile } from "../services/apiServices";
import { showSuccess, showError } from "../utils/toast";
import { showLoader, hideLoader } from "../redux/uiSlice";

export default function Profile() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: user?.name || "",
    password: "",
  });

  const loading = useSelector((state) => state.ui.loading);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(showLoader())

    try {
      const res = await updateProfile(form);

      dispatch(setUser(res.user));
      showSuccess(res.message || "Profile updated succesfully")

      setForm((prev) => ({ ...prev, password: "" }));

    } catch (err) {
      showError(err.response?.data?.error || "Update failed");
    }
    finally{
        dispatch(hideLoader())
    }
    
  };

  return (
    <MainLayout>
      <div className="max-w-xl bg-white p-6 rounded-xl shadow space-y-5 mx-auto">

        <h2 className="text-xl font-semibold">My Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

       
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              value={user?.email}
              disabled
              className="w-full border p-2 rounded mt-1 bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Role</label>
            <input
              value={user?.role}
              disabled
              className="w-full border p-2 rounded mt-1 bg-gray-100 capitalize"
            />
          </div>

        
          <div>
            <label className="text-sm text-gray-600">
              New Password (optional)
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

        </form>

      </div>
    </MainLayout>
  );
}