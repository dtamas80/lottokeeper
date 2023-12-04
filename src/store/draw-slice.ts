import { createSlice } from "@reduxjs/toolkit";

export interface IDraw {
  isDraw: boolean;
  drawedNumbers: number[];
  sumResultsCount: number[];
  prizeAfterResults: number[];
  sumPrizeAfterResults: number[];
  sumTickets: number;
  sumIncome: number;
  sumPayment: number;
  sumOutcome: number;
}

export const DRAW_DATA: IDraw = {
  isDraw: false,
  drawedNumbers: [0, 0, 0, 0, 0, 0],
  sumResultsCount: [0, 0, 0, 0, 0, 0],
  prizeAfterResults: [0, 0, 0, 0, 0, 0],
  sumPrizeAfterResults: [0, 0, 0, 0, 0, 0],
  sumTickets: 0,
  sumIncome: 0,
  sumPayment: 0,
  sumOutcome: 0,
};

const drawSlice = createSlice({
  name: "draw",
  initialState: {
    drawData: DRAW_DATA,
  },
  reducers: {
    setDraw(state, action) {
      state.drawData = action.payload;
    },
  },
});

export const drawActions = drawSlice.actions;

export default drawSlice.reducer;
