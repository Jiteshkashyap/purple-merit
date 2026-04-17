import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { dashboard } from "../services/apiServices";
import { showError } from "../utils/toast";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../redux/uiSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    dispatch(showLoader());
    try {
      const res = await dashboard();
      setStats(res.stats);
    } catch (err) {
      showError("Failed to fetch dashboard stats");
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6">

        
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Total Users</p>
            <h2 className="text-2xl font-bold mt-2">{stats?.totalUsers ?? "-"}</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Active Users</p>
            <h2 className="text-2xl font-bold mt-2">{stats?.activeUsers ?? "-"}</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Inactive Users</p>
            <h2 className="text-2xl font-bold mt-2">{stats?.inactiveUsers ?? "-"}</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Admins</p>
            <h2 className="text-2xl font-bold mt-2">{stats?.usersByRole?.admin ?? "-"}</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Managers</p>
            <h2 className="text-2xl font-bold mt-2">{stats?.usersByRole?.manager ?? "-"}</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Users</p>
            <h2 className="text-2xl font-bold mt-2">{stats?.usersByRole?.user ?? "-"}</h2>
          </div>

        </div>

      
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Recent Activity</h2>
          <p className="text-gray-500 text-sm">No recent activity yet.</p>
        </div>

      </div>
    </MainLayout>
  );
}