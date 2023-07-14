import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { type: 'unactive' },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    addModal: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.value = payload;
    },
  },
});

export const { addModal } = modalSlice.actions;

export default modalSlice.reducer;
