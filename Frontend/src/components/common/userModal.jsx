// components/common/UserModal.jsx
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { showError } from "../../utils/toast";

export default function UserModal({ isOpen, onClose, onSubmit, initialData }) {

const { user: loggedInUser } = useSelector((state) => state.auth);
const isManager = loggedInUser.role === "manager";


const [form, setForm] = useState({
  name: initialData?.name || "",
  email: initialData?.email || "",
  role: initialData?.role || "user",
  status: initialData?.status === true ? "active" 
        : initialData?.status === false ? "inactive" 
        : "active",
});

  // preload data for edit
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "",
        role: initialData.role || "user",
        status:initialData.status === true? "active": initialData.status === false
    ? "inactive" : "active",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!initialData && (!form.password || !form.password.trim())) {
      showError("Password is required to create a user");
      return;
    }
    onSubmit(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">

        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit User" : "Create User"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          
          {!initialData && (
            <input
              name="password"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          )}

          <select
            name="role"
            value={form.role}
            disabled={isManager}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          
          <div className="flex justify-end gap-2">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {initialData ? "Update" : "Create"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
