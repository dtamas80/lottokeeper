import { createSlice } from "@reduxjs/toolkit";

export interface ITicket {
  id: string;
  date: number;
  numbers: number[];
  prize: number,
  results: number,
  isGenerated: boolean,
}

const ticketSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [] as ITicket[],
  },
  reducers: {
    getTickets(state, action) {
      state.tickets = action.payload;
    },
    addToTickets(state, action) {
      state.tickets.push({
        id: action.payload.id,
        date: action.payload.date,
        numbers: action.payload.numbers,
        prize: action.payload.prize,
        results: action.payload.results,
        isGenerated: action.payload.isGenerated,
      });
    },
  }
});

export const ticketActions = ticketSlice.actions;

export default ticketSlice.reducer;
