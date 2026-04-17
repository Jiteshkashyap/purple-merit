import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { loading: false },
  reducers: {
    showLoader: (state) => { state.loading = true; },
    hideLoader: (state) => { state.loading = false; },
  },
});

export const { showLoader, hideLoader } = uiSlice.actions;
export default uiSlice.reducer;