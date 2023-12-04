import { configureStore } from "@reduxjs/toolkit";

import userReducer from './user-slice';
import notificationReducer from './notification-slice';
import ticketReducer from './ticket-slice';
import modalReducer from './modal-slice';
import firstRunReducer from './firstRun-slice';
import drawReducer from './draw-slice';

const store = configureStore({
  reducer: {
    selectedUser: userReducer,
    notification: notificationReducer,
    ticket: ticketReducer,
    modal: modalReducer,
    firstRun: firstRunReducer,
    draw: drawReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
