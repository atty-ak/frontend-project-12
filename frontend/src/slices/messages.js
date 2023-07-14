import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel } from './channels';

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
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const newMessages = Object.values(state.entities)
        .filter((message) => message.channelId !== payload);
      messagesAdapter.setAll(state, newMessages);
    });
  },
});

export const { fetchMessages, addMessage } = messagesSlice.actions;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
