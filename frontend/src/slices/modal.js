import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'unactive',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    addModal: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
  },
});

export const { addModal } = modalSlice.actions;

export default modalSlice.reducer;
