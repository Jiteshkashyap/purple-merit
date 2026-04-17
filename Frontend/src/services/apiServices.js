import axios from "axios";
import store from "../redux/store";
import { setUser, logoutUser } from "../redux/authSlice";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(error); // network error, don't redirect

    if (
      originalRequest.url.includes("/auth/login") ||
      originalRequest.url.includes("/auth/register")
    ) {
      return Promise.reject(error);
    }

    if (originalRequest.url.includes("/auth/refresh-token")) {
      return Promise.reject(error); 
    }

    if (originalRequest._retry) {
      // Only redirect if it was a 401/403 after retry — not other errors
      if (error.response.status === 401 || error.response.status === 403) {
        store.dispatch(logoutUser());
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    //  Only attempt refresh on 401/403
    if (error.response.status === 401) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh-token");
        const res = await api.get("/user/profile");
        store.dispatch(setUser(res.data.user));
        return api(originalRequest); // retry original
      } catch (err) {
        //  Only redirect if refresh itself failed
        store.dispatch(logoutUser());
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

// LOGIN
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};
//  REGISTER
export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// LOGOUT
export const logoutUserAPI = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

// REFRESH TOKEN
export const refreshToken = async () => {
  const res = await api.post("/auth/refresh-token");
  return res.data;
};

// GET CURRENT USER
export const getMe = async () => {
  const res = await api.get("/user/profile");
  return res.data;
};

// GET USERS (pagination + filters)
export const getUsers = async (params) => {
  const res = await api.get("/admin/users", { params });
  return res.data;
};

// DASHBAORD
export const dashboard = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};

// CREATE USER
export const createUser = async (data) => {
  const res = await api.post("/admin/create", data);
  return res.data;
};

// UPDATE USER
export const updateUser = async (id, data) => {
  const res = await api.put(`/admin/update/${id}`, data);
  return res.data;
};

// DEACTIVATE USER
export const deactivateUser = async (id) => {
  const res = await api.patch(`/admin/delete/${id}`);
  return res.data;
};

// GET SINGLE USER
export const getUserById = async (id) => {
  const res = await api.get(`/admin/users/${id}`);
  return res.data;
};

// UPDATE PROFILE
export const updateProfile = async (data) => {
  const res = await api.put("/user/update-profile", data);
  return res.data;
};