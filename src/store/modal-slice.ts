import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalStatus: false,
    nameModal: false,
    ticketCreationModal: false,
    drawModal: false,
    noDrawModal: false,
    newRoundModal: false,
    newGameModal: false,
  },
  reducers: {
    handleModal(state, action) {
      state.modalStatus = action.payload;
    },
    setNameModal(state, action) {
      state.nameModal = action.payload;
    },
    setTicketCreationModal(state, action) {
      state.ticketCreationModal = action.payload;
    },
    setDrawModal(state, action) {
      state.drawModal = action.payload;
    },
    setNoDrawModal(state, action) {
      state.noDrawModal = action.payload;
    },
    setNewRoundModal(state, action) {
      state.newRoundModal = action.payload;
    },
    setNewGameModal(state, action) {
      state.newGameModal = action.payload;
    },    
    resetAllModalState(state) {
      state.nameModal = false;
      state.ticketCreationModal = false;
      state.drawModal = false;
      state.noDrawModal = false;
      state.newRoundModal = false;
      state.newGameModal = false;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
