import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./adminSlice"
import uiReducer from "./uiSlice";

 const store = configureStore({
  reducer: {
    auth: authReducer,
    admin:adminReducer,
    ui:uiReducer
  },
});

export default store;