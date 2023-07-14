import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetchMessages: (state, { payload }) => {
      messagesAdapter.setAll(state, payload);
    },
    addMessage: messagesAdapter.addOne,
  },
});

export const { fetchMessages, addMessage } = messagesSlice.actions;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
