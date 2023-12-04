import { createSlice } from "@reduxjs/toolkit";

const firstRunSlice = createSlice({
  name: "firstrun",
  initialState: {
    isFirstRun: false
  },
  reducers: {
    setFirstRunModal(state, action) {
      state.isFirstRun = action.payload;
    },
  },
});

export const firstRunActions = firstRunSlice.actions;

export default firstRunSlice.reducer;
