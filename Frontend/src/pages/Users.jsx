import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import SearchInput from "../components/common/SearchInput";
import FilterDropdown from "../components/common/FilterDropdown";
import StatusBadge from "../components/common/StatusBadge";
import UserModal from "../components/common/UserModal";
import Pagination from "../components/common/Pagination";
import { showSuccess, showError } from "../utils/toast";
import { showLoader, hideLoader } from "../redux/uiSlice";

import { useDispatch, useSelector } from "react-redux";
import {
  setUsers,
  setLoading,
  addUser,
  updateUserState,
  deactivateUserState,
} from "../redux/adminSlice";

import {
  getUsers,
  createUser,
  updateUser,
  deactivateUser,
} from "../services/apiServices";

export default function Users() {
  const dispatch = useDispatch();

  const { users, loading, totalPages } = useSelector(
    (state) => state.admin
  );

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  
  const fetchUsers = async () => {
    dispatch(showLoader());

    try {
      const res = await getUsers({
        page: currentPage,
        limit: 10,
        search,
        role,
        status,
      });

      dispatch(
        setUsers({
          users: res.users.users,
          totalPages: res.users.totalPages || 1,
        })
      );
    } catch (err) {
      showError("Failed to fetch users");
    }finally {
    dispatch(hideLoader());
  }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, search, role, status]);

  const handleCreate = async (data) => {
    dispatch(showLoader());
    try {
      const res = await createUser(data);

      dispatch(addUser(res.user || res.data?.user));
      showSuccess(res.message ||'User Created');
    } catch (err) {
      showError(err.response?.data?.message || "Create failed");
    }finally {
    dispatch(hideLoader());
  }
  };

  
  // Users.jsx
const handleUpdate = async (id, data) => {
    dispatch(showLoader());
  try {
    
    const payload = {
      ...data,
      ...(typeof data.status === "boolean" && {
        status: data.status ? "active" : "inactive",
      }),
    };

    const res = await updateUser(id, payload);
    dispatch(updateUserState(res.updatedUser || res.user || res.data?.user));
    showSuccess(res.message || "User updated")
  } catch (err) {
    showError(err.response?.data?.error || "Update failed");
  }
};


  const handleDeactivate = async (id) => {
    dispatch(showLoader())
    try {
      await deactivateUser(id);
      dispatch(deactivateUserState(id));
      showSuccess("User Deactivated")
    } catch (err) {
      showError(err.response?.data?.message ||"Deactivate failed");
    }finally{
        dispatch(hideLoader())
    }
  };

  
  const handleSubmit = (data) => {
    
    if (editUser) {
      handleUpdate(editUser._id, data);
    } else {
      handleCreate(data);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white p-6 rounded-xl shadow space-y-5">

        
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Users</h2>

          <button
            onClick={() => {
              setEditUser(null);
              setIsOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Create User
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap">
          <SearchInput value={search} onChange={setSearch} />

          <FilterDropdown
            options={["admin", "manager", "user"]}
            onChange={setRole}
          />

          <FilterDropdown
            options={["active", "inactive"]}
            onChange={setStatus}
          />
        </div>

        <table className="w-full border mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
                    <tr>
                    <td colSpan="5">Loading...</td>
                  </tr>
              ) : !users || users.length === 0 ? (
                <tr>
              <td colSpan="5">No users found</td>
                  </tr>
                ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u._id} className="border-t hover:bg-gray-50">
                  
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 capitalize">{u.role}</td>

                  <td className="p-3">
                    <StatusBadge status={u.status} />
                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() => {
                        setEditUser(u);
                        setIsOpen(true);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeactivate(u._id)}
                      className="text-red-600 hover:underline"
                    >
                      Deactivate
                    </button>

                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      </div>

      <UserModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        initialData={editUser}
      />
    </MainLayout>
  );
}