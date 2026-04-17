import "./App.css";
import { useEffect, useState, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setUser, logoutUser } from "./redux/authSlice";
import { getMe,refreshToken } from "./services/apiServices";
import { ToastContainer } from "react-toastify";

import Loader from "./components/common/Loader";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Profile from "./pages/Profile";


function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, user } = useSelector((s) => s.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const dispatch = useDispatch();

  const [authChecked, setAuthChecked] = useState(false);
  const hasCalled = useRef(false); 

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    const bootstrapAuth = async () => {
      try {
        await refreshToken();

        await new Promise((resolve) => setTimeout(resolve, 50));
       
        const res = await getMe();
 
        dispatch(setUser(res.user));

      } catch (err) {
        dispatch(logoutUser());
      } finally {
        setAuthChecked(true); 
      }
    };

    bootstrapAuth();
  }, [dispatch]);

  
  if (!authChecked) {
    return <Loader/>;
  }

  return (
  <>
  <ToastContainer position="top-right" autoClose={3000} />
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute roles={["admin" , "manager"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute roles={["admin", "manager"]}>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
  </>
);
}

export default App;