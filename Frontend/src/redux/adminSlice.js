import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  totalPages: 1,
  loading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.users;
      state.totalPages = action.payload.totalPages;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    addUser: (state, action) => {
  if (!action.payload) return;
  state.users.unshift(action.payload);
},

updateUserState: (state, action) => {
  if (!action.payload) return;
  state.users = state.users.map((u) =>
    u._id === action.payload._id ? action.payload : u
  );
},

    deactivateUserState: (state, action) => {
      state.users = state.users.map((u) =>
        u._id === action.payload
          ? { ...u, status: "inactive" }
          : u
      );
    },
  },
});

export const {
  setUsers,
  setLoading,
  addUser,
  updateUserState,
  deactivateUserState,
} = adminSlice.actions;

export default adminSlice.reducer;