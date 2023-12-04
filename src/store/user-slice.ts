import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  name: string;
  isAdmin: boolean;
  isPlayer: boolean;
  balance: number;
}

const userSlice = createSlice({
  name: "selectedUser",
  initialState: {
    user: {} as IUser,
  },
  reducers: {
    setSelectedUser(state, action) {
      state.user = action.payload;
    },
    setNoUser(state) {
      state.user = {
        name: "none",
        isAdmin: false,
        isPlayer: false,
        balance: 0
      };
    },
    setUserBalance(state, action) {
      state.user.balance = action.payload;
    },
    setUserName(state, action) {
      state.user.name = action.payload;
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
