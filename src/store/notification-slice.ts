import { createSlice } from "@reduxjs/toolkit";

export interface INotification {
  status: string;
  title: string;
  show: boolean;
}

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notification: {
      status: "",
      title: "",
      show: false,
    } as INotification,
  },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        show: action.payload.show,
      };
    },
    hideNotification(state) {
      state.notification = {
        status: "",
        title: "",
        show: false,
      };
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;
